# YouTube Comments Spam Classifier

A machine learning-powered web application that classifies YouTube comments as spam or legitimate (ham). The application uses a trained machine learning model to analyze comment text and provide spam probability scores.

## Features

- Real-time spam detection for YouTube comments
- Probability scores for spam/legitimate classification
- Modern, responsive user interface
- RESTful API backend
- Machine learning model trained on YouTube comments dataset

## Tech Stack

### Frontend

- React 19
- TypeScript
- Material-UI (MUI)
- Vite
- Axios for API calls

### Backend

- Python Flask
- scikit-learn
- pandas
- joblib for model serialization

## Project Structure

youtube-comments-spam-classifier/
├── frontend/ # React frontend application
│ ├── src/ # Source files
│ ├── public/ # Static assets
│ └── package.json # Frontend dependencies
├── backend/ # Python Flask backend
│ ├── app.py # Flask application
│ ├── model.py # ML model training code
│ ├── data/ # Training data
│ └── requirements.txt
└── README.md

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173

## Usage

1. Open the application in your web browser
2. Enter or paste YouTube comments in the input field
3. Click "Analyze" to get spam classification results
4. View the spam probability scores for each comment

## API Endpoints

### POST /api/predict

Analyzes a list of comments and returns spam classification results.

Request body:

```json
{
  "comments": ["comment1", "comment2", ...]
}
```

Response:

```json
{
  "results": [
    {
      "comment": "comment text",
      "is_spam": true/false,
      "spam_probability": 0.95,
      "ham_probability": 0.05
    }
  ]
}
```

## Development

- Frontend development server: `npm run dev`
- Backend development server: `python app.py`
- Build frontend: `npm run build`
- Lint frontend code: `npm run lint`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
