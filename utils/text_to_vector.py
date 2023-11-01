from sentence_transformers import SentenceTransformer


def convert_text(sentences: [str], model='all-MiniLM-L6-v2'):
    model = SentenceTransformer(model)
    encoded = model.encode(sentences)
    return encoded
