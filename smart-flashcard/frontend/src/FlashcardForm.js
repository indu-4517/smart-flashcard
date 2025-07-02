// import React, { useState } from "react";

// const FlashcardForm = () => {
//   const [formData, setFormData] = useState({
//     student_id: "",
//     question: "",
//     answer: "",
//   });

//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await fetch("http://localhost:5000/flashcard", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             ...formData,
//             student_id: `stu${formData.student_id}`,
//           }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//         return;
//       }

//       setResponse(data);
//       setFormData({ student_id: "", question: "", answer: "" });
//     } catch (err) {
//       setError("Server error. Is the backend running?");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//       <input
//         type="text"
//         name="student_id"
//         placeholder="e.g., 001"
//         value={formData.student_id}
//         onChange={(e) =>
//             setFormData({ ...formData, student_id: e.target.value.replace(/^stu/, "") })
//         }
//         required
//         />

//         <textarea
//           name="question"
//           placeholder="Enter the question"
//           value={formData.question}
//           onChange={handleChange}
//           rows="3"
//           required
//         />
//         <textarea
//           name="answer"
//           placeholder="Enter the answer"
//           value={formData.answer}
//           onChange={handleChange}
//           rows="3"
//           required
//         />
//         <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
//           ➕ Add Flashcard
//         </button>
//       </form>

//       {response && (
//         <div style={{ marginTop: "1rem", color: "green" }}>
//           ✅ {response.message} <br />
//           🧠 Detected Subject: <strong>{response.subject}</strong>
//         </div>
//       )}

//       {error && (
//         <div style={{ marginTop: "1rem", color: "red" }}>
//           ❌ {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlashcardForm;






import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
} from "@mui/material";

const FlashcardForm = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    question: "",
    answer: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.replace(/^stu/, "") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/flashcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          student_id: `stu${formData.student_id}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResponse(data);
      setOpenDialog(true); 
    } catch (err) {
      setError("Server error. Is the backend running?");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({ student_id: "", question: "", answer: "" });
    setResponse(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Add Flashcard
      </Typography>

      <TextField
        label="Student ID"
        name="student_id"
        value={formData.student_id}
        onChange={handleChange}
        required
        fullWidth
        placeholder="e.g., 001"
        InputProps={{
          startAdornment: <span style={{ marginRight: "4px" }}>stu</span>,
        }}
      />

      <TextField
        label="Question"
        name="question"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
        required
        multiline
        rows={3}
        fullWidth
      />

      <TextField
        label="Answer"
        name="answer"
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
        required
        multiline
        rows={3}
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button type="submit" variant="contained" color="primary">
         Add Flashcard
      </Button>

      {/* Success Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        >
        <DialogTitle> Flashcard Added</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {response?.message}
          </Typography>
          <Typography>
            <strong>Detected Subject:</strong> {response?.subject}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlashcardForm;
