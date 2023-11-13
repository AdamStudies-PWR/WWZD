import argparse
import os

from lpmn_client_biz import Connection, Task

from utils.api_keys import get_clarin_key
from utils.data_builder import build_data
from utils.general_utils import get_dataset_name
from utils.plot_utils import display_plot
from utils.text_utils import load_texts


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
parser.add_argument('-m', '--metadata', dest="metadata_path", required=False)


# Parisng user input
args = parser.parse_args()

WORK_DIR = args.text_dir_path
if not os.path.isdir(WORK_DIR):
    print("Not a directory")
    exit(0)

METADATA_PATH = args.metadata_path
if METADATA_PATH is not None:
    if not os.path.isfile(METADATA_PATH):
        print("Metadata does not point to a file")
        exit(0)


# Code
id, sentences = load_texts(WORK_DIR, DEPTH)

connection = Connection(api_token = TOKEN)
task = Task([MODEL], connection)
print("Running clarin task...")
encoded = task.run_sent(sentences)
print("Done")

name = get_dataset_name(WORK_DIR) + "_" + MODEL + ".json"
dataframe = build_data(encoded, id, METADATA_PATH, name)
display_plot(dataframe, (METADATA_PATH is not None))
