import os
import json
import umap

import pandas as pd

from alive_progress import alive_it


DF_STORAGE = "dataframe"


def save_data(df, filename):
    if not os.path.exists(DF_STORAGE):
        os.makedirs(DF_STORAGE)

    dest_path = os.path.join(DF_STORAGE, filename)
    print(dest_path)
    df.to_csv(dest_path, sep=",", index=False, encoding="utf-8")


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

    bar = alive_it(ids, title="Patching Metadata")
    for id in bar:
        found = False
        for record in metadata:
            if record["id"] == id:
                source.append(record["src"])
                title.append(record["title"])
                date.append(record["date"])
                found = True
                metadata.remove(record)
                break
        if not found:
            source.append("Unknown")
            title.append("Unknown")
            date.append("Unknown")

    size = df.shape[0]
    df["label"] = source[:size]
    df["title"] = title[:size]
    df["date"] = date[:size]
    return df


def build_data(encoded, ids, metadata_path, model_name="Unknown"):
    flat = umap.UMAP().fit(encoded)
    sdf = pd.DataFrame(flat.embedding_)
    sdf.rename(columns={0:'x', 1:'y'}, inplace=True)

    if metadata_path is not None:
        sdf = load_metadata(sdf, ids, metadata_path)

    save_data(sdf, model_name)
    return sdf
