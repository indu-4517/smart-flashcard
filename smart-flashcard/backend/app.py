from flask import Flask, request, jsonify
from flask_cors import CORS
from flashcard_classifier import *
from database import *
import random

app = Flask(__name__)
CORS(app)

@app.route("/flashcard", methods=["POST"])
def add_flashcard():
    data = request.get_json()
    student_id_raw = data.get("student_id")
    question = data.get("question")
    answer = data.get("answer")

    if not all([student_id_raw, question, answer]):
        return jsonify({"error": "Missing fields"}), 400

    # Enforce "stu" prefix
    student_id = student_id_raw.strip()
    if not student_id.startswith("stu"):
        student_id = "stu" + student_id

    subject = infer_subject(f"{question} {answer}")
    insert_flashcard(student_id, question, answer, subject)

    return jsonify({
        "message": "Flashcard added successfully",
        "subject": subject
    }), 200
    
    
@app.route("/get-subject", methods=["GET"])
def get_mixed_flashcards():
    student_id = request.args.get("student_id")
    limit = int(request.args.get("limit", 5))

    if not student_id:
        return jsonify({"error": "Missing student_id"}), 400

    flashcards = get_flashcards_by_student(student_id)

    if not flashcards:
        return jsonify([])

    # Group flashcards by subject
    subject_map = {}
    for card in flashcards:
        subject = card["subject"]
        subject_map.setdefault(subject, []).append(card)

    # Pick one flashcard per subject (up to limit)
    selected = []
    subjects = list(subject_map.keys())
    random.shuffle(subjects)

    for subject in subjects:
        if len(selected) >= limit:
            break
        selected.append(random.choice(subject_map[subject]))

    # If we still have space, fill with random (but avoid duplicates)
    remaining_cards = [card for cards in subject_map.values() for card in cards if card not in selected]
    random.shuffle(remaining_cards)

    while len(selected) < limit and remaining_cards:
        selected.append(remaining_cards.pop())

    random.shuffle(selected)

    return jsonify([
        {
            "question": card["question"],
            "answer": card["answer"],
            "subject": card["subject"]
        } for card in selected
    ])



if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)
