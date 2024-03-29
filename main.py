import argparse
import os

from sentence_transformers import SentenceTransformer

from utils.data_builder import build_data
from utils.general_utils import get_dataset_name
from utils.plot_utils import display_plot
from utils.text_utils import load_texts


def get_available_models() -> str:
    return 'Options are: ' \
       + '\nsentence-transformers/distiluse-base-multilingual-cased-v2' \
       + '\nsentence-transformers/distiluse-base-multilingual-cased-v1' \
       + '\nsentence-transformers/paraphrase-multilingual-MiniLM-L12-v2' \
       + '\nsentence-transformers/paraphrase-multilingual-mpnet-base-v2' \


# Constants
DEPTH = 512*20

# Setup
parser = argparse.ArgumentParser(
    prog="TextAnalyzer",
    description="Project application for WWZD at Wroclaw University of Science (PWR)"
)
parser.add_argument('text_dir_path', type=str, help="Path to folder containging text files")
parser.add_argument('-m', '--model', dest='model', required=True, help=get_available_models())
parser.add_argument('-md', '--metadata', dest="metadata_path", required=False,
                    help='Path to metdata file describing the data')

# Parisng user input
args = parser.parse_args()
MODEL = args.model

WORK_DIR = args.text_dir_path
if not os.path.isdir(WORK_DIR):
    print("Provided path is not a directory")
    exit(0)

METADATA_PATH = args.metadata_path
if METADATA_PATH is not None:
    if not os.path.isfile(METADATA_PATH):
        print("Metadata does not point to a file")
        exit(0)


# Code
id, sentences = load_texts(WORK_DIR, DEPTH)

model = SentenceTransformer(MODEL)
encoded = model.encode(sentences, show_progress_bar=True)

name = get_dataset_name(WORK_DIR) + "_" + MODEL.split("/")[1] + ".json"
dataframe = build_data(encoded, id, METADATA_PATH, WORK_DIR, name)
display_plot(dataframe, (METADATA_PATH is not None))
