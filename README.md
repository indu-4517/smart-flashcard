# smart-flashcard

A smart web application that allows students to create flashcards using just questions and answers. The system automatically classifies each flashcard by subject (e.g., Physics, Biology) and enables students to retrieve a mix of flashcards intelligently.

## Features

- Automatically detects subject from flashcard text
- Submit flashcards with only question and answer
- Subject-mixed flashcard retrieval
- Displays results in a **Material-UI Dialog**
- MongoDB for persistent storage

  ### Prerequisites
- Node.js & npm
- Python 3.7+
- MongoDB

1. Navigate to the backend folder:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

2.Navigate to frontend folder:
cd ../frontend
npm install
npm start
Runs at http://localhost:5000
