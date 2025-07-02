from pymongo import MongoClient

# Connect to MongoDB 
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["smart_flashcard"]
collection = db["flashcards"]

def insert_flashcard(student_id, question, answer, subject):
    doc = {
        "student_id": student_id,
        "question": question,
        "answer": answer,
        "subject": subject
    }
    collection.insert_one(doc)
    
def get_flashcards_by_student(student_id):
    return list(collection.find({"student_id": student_id}))

