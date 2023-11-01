import argparse
import os

from utils.text_to_vector import convert_text


# Constants
DEPTH = 512


# Setup
parser = argparse.ArgumentParser(
    prog="TextAnalyzer",
    description="Project application for WWZD at Wroclaw University of Science (PWR)"
)
parser.add_argument('text_dir_path', type=str, help="Path to folder containging text files")


# Parisng user input
args = parser.parse_args()

WORK_DIR = args.text_dir_path
if not os.path.isdir(WORK_DIR):
    print("Not a directory")
    exit(0)


# Main functions
id:[str] = []
sentences:[str] = []

for filename in os.listdir(WORK_DIR):
    path = os.path.join(WORK_DIR, filename)
    if not (os.path.isfile(path)):
        continue
    id.append(filename)
    file = open(path, 'r')
    sentences.append(file.read(DEPTH))
    file.close()

encoded = convert_text(sentences)
for name, sentence, result in zip(id, sentences, encoded):
    print("ID: ", name)
    print("Sentence: ", sentence)
    print("Embedding: ", encoded)
    print("")
