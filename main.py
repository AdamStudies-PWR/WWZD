import argparse
import os
import umap.plot

from sentence_transformers import SentenceTransformer

from utils.test_utils import load_texts


# Constants
DEPTH = 512*20 # sprawdzić bez ograniczeń
MODEL = 'sentence-transformers/distiluse-base-multilingual-cased-v2'

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


# Code
id, sentences = load_texts(WORK_DIR, DEPTH)

model = SentenceTransformer(MODEL)
encoded = model.encode(sentences)

mapper = umap.UMAP().fit(encoded)

import pandas as pd
import numpy as np

hover_data = pd.DataFrame({'index': np.arange(len(sentences)), 'label': id})
print(hover_data)

# sprawdzić plotly
plot = umap.plot.interactive(mapper, labels=id,
                             hover_data=hover_data,
                             point_size=2, background="black")
umap.plot.show(plot)
