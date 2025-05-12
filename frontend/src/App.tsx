import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import { theme } from "./theme";
import axios from "axios";
import spamLogo from "./assets/spam-youtube-logo.webp";

interface PredictionResult {
  comment: string;
  is_spam: boolean;
  spam_probability: number;
  ham_probability: number;
}

function App() {
  const [comment, setComment] = useState<string>("");
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        comments: [comment],
      });
      setResults(response.data.results);
      setComment("");
    } catch (err) {
      setError("Error analyzing comment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={spamLogo}
              alt="Spam on YouTube Logo"
              style={{
                maxWidth: 220,
                width: "100%",
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          </Box>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            YouTube Spam Classifier
          </Typography>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Enter a YouTube comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !comment.trim()}
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress size={24} /> : "Analyze"}
              </Button>
            </form>
          </Paper>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <List>
            {results.map((result, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: "background.paper",
                  mb: 2,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <ListItemText
                  primary={result.comment}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={result.is_spam ? "Spam" : "Not Spam"}
                        color={result.is_spam ? "error" : "success"}
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Spam probability:{" "}
                        {(result.spam_probability * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
