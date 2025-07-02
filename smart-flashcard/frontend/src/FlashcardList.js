
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const FlashcardList = () => {
  const [studentId, setStudentId] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  const handleFetch = async () => {
    if (!studentId) {
      setError("Please enter a student ID");
      return;
    }

    const fullStudentId = studentId.startsWith("stu") ? studentId : `stu${studentId}`;

    try {
      const response = await fetch(
        `http://localhost:5000/get-subject?student_id=${fullStudentId}&limit=${limit}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to fetch flashcards");
        return;
      }

      if (data.length === 0) {
        setError("No flashcards found for this student.");
        setFlashcards([]);
        setOpenDialog(false);
      } else {
        setFlashcards(data);
        setError("");
        setOpenDialog(true); 
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFlashcards([]);
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
         View Flashcards by Subject Mix
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Student ID"
          variant="outlined"
          size="small"
          placeholder="e.g., 001"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.replace(/^stu/, ""))}
          InputProps={{
            startAdornment: <span style={{ marginRight: 4 }}>stu</span>,
          }}
        />
        <TextField
          label="Limit"
          type="number"
          variant="outlined"
          size="small"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <Button variant="contained" onClick={handleFetch}>
           Search Flashcards
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Flashcard Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle> Flashcards</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {flashcards.map((card, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ backgroundColor: "#fefefe", borderLeft: "6px solid #1976d2" }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Subject: {card.subject}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      Q: {card.question}
                    </Typography>
                    <Typography variant="body2">A: {card.answer}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlashcardList;
