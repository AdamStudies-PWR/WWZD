import argparse
import os
import umap.plot

from lpmn_client_biz import Connection, Task

from utils.api_keys import get_clarin_key
from utils.test_utils import load_texts


# Constants
DEPTH = 512*20
MODEL = "sbert-distiluse-base-multilingual-cased-v1"

TOKEN = get_clarin_key()
if TOKEN is None:
   print("Please create api_key file with clarin token filled")
   exit(0)


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

connection = Connection(api_token = TOKEN)
task = Task([MODEL], connection)
encoded = task.run_sent(sentences)

mapper = umap.UMAP().fit(encoded)
plot = umap.plot.interactive(mapper, labels=id, point_size=2, background="black")
umap.plot.show(plot)
