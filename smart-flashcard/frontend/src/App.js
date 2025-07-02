


import React from "react";
import FlashcardForm from "./FlashcardForm";
import FlashcardList from "./FlashcardList";
import { Container, Typography, Box, Paper } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            📚 Smart Flashcard System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Automatically detects subject from your question and answer
          </Typography>
        </Box>
        <FlashcardForm />
      </Paper>

      <Paper elevation={3} sx={{ p: 4 }}>
        <FlashcardList />
      </Paper>
    </Container>
  );
}

export default App;
