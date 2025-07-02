SUBJECT_KEYWORDS = {
    "Physics": ["force", "acceleration", "velocity", "newton", "gravity", "motion"],
    "Biology": ["photosynthesis", "cell", "organism", "enzyme", "respiration", "dna"],
    "Math": ["equation", "algebra", "calculus", "integral", "derivative", "matrix"],
    "Chemistry": ["atom", "molecule", "reaction", "compound", "acid", "base"],
    "History": ["war", "empire", "revolution", "ancient", "dynasty", "king"],
    "Geography": ["continent", "river", "mountain", "climate", "ocean", "glacier"],
    "Computer Science": ["algorithm", "data structure", "binary", "recursion", "python", "java"],
}

def infer_subject(text):
    text = text.lower()
    for subject, keywords in SUBJECT_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return subject
    return "General"
