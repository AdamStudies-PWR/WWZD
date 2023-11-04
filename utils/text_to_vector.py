from sentence_transformers import SentenceTransformer


########################################################################################################################
# Other models to test:
# all-MiniLM-L6-v2
########################################################################################################################


def convert_text(sentences: [str], model='sentence-transformers/distiluse-base-multilingual-cased-v2'):
    model = SentenceTransformer(model)
    encoded = model.encode(sentences)
    return encoded
