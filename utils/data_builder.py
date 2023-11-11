import json
import umap.plot

import pandas as pd

from alive_progress import alive_bar


def trim_file_extensions(ids):
    temp = []
    for id in ids:
        split = id.split(".")
        temp.append(split[0])
    return temp


def load_metadata(df, ids, metadata_path):
    ids = trim_file_extensions(ids)
    metadata_file = open(metadata_path)
    metadata = json.load(metadata_file)

    source = []
    title = []
    date = []

    with alive_bar(len(ids)) as bar:
        bar.title("Patching Metadata")
        for id in ids:
            for record in metadata:
                if record["id"] == id:
                    source.append(record["source"])
                    title.append(record["title"])
                    date.append(record["date"])
                    break
            bar()

    # DEBUG
    print("Dataframe: " + str(df.shape))
    print("ID: " + str(len(ids)))
    print("Labels: " + str(len(source)))
    print("Title: " + str(len(title)))
    print("Date: " + str(len(date)))
    # DEBUG

    df["label"] = source
    df["title"] = title
    df["date"] = date
    return df


def build_data(encoded, ids, metadata_path):
    flat = umap.UMAP().fit(encoded)
    sdf = pd.DataFrame(flat.embedding_)
    sdf.rename(columns={0:'x', 1:'y'}, inplace=True)

    if metadata_path is not None:
        sdf = load_metadata(sdf, ids, metadata_path)

    return sdf
