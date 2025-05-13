from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

app = Flask(__name__)
CORS(app)

# Load the trained model and vectorizer
model = joblib.load('serialized_model/spam_classifier.pkl')
vectorizer = joblib.load('serialized_model/vectorizer.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        comments = data.get('comments', [])
        
        if not comments:
            return jsonify({'error': 'No comments provided'}), 400
            
        # Transform the comments using the vectorizer
        comments_transformed = vectorizer.transform(comments)
        
        # Get predictions and probabilities
        predictions = model.predict(comments_transformed)
        probabilities = model.predict_proba(comments_transformed)
        
        # Format the response
        results = []
        for comment, pred, prob in zip(comments, predictions, probabilities):
            results.append({
                'comment': comment,
                'is_spam': bool(pred),
                'spam_probability': float(prob[1]),
                'ham_probability': float(prob[0])
            })
            
        return jsonify({'results': results})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "message": "Server is running"})

if __name__ == '__main__':
    # Set debug=False for production environments
    app.run(host='0.0.0.0', port=5000, debug=False)

