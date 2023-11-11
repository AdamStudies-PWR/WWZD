import json
import umap.plot

import pandas as pd

from alive_progress import alive_it


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
        for record in metadata:
            if record["id"] == id:
                source.append(record["src"])
                title.append(record["title"])
                date.append(record["date"])
                metadata.remove(record)
                break

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
