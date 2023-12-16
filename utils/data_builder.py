import os
import json
import umap

import pandas as pd

from alive_progress import alive_it


DF_STORAGE = "dataframe"
SNIPET_LEN = 500


def save_data(df, filename):
    if not os.path.exists(DF_STORAGE):
        os.makedirs(DF_STORAGE)

    dest_path = os.path.join(DF_STORAGE, filename)
    df.to_json(dest_path)


def trim_file_extensions(ids):
    temp = []
    for id in ids:
        split = id.split(".")
        temp.append(split[0])
    return temp


def load_snipet(filepath):
    if not os.path.isfile(filepath):
        return "Unknown"
    with open(filepath) as file:
        return file.read(SNIPET_LEN)


def validate_value(value):
    if value is None:
        return "Unknown"
    if value == "":
        return "Unknown"
    return value


def validate_table(table):
    if table is None:
        return ["Unknown"]
    if not table:
        return ["Unknown"]
    return table


def load_metadata(df, ids, metadata_path, text_path):
    ids = trim_file_extensions(ids)
    metadata_file = open(metadata_path)
    metadata = json.load(metadata_file)

    source = []
    title = []
    date = []
    tags = []
    links = []
    snipets = []
    filenames = []

    bar = alive_it(ids, title="Patching Metadata")
    for id in bar:
        file_path = text_path + "/" + id + ".txt"
        found = False
        for record in metadata:
            if record["id"] == id:
                source.append(validate_value(record["src"]))
                title.append(validate_value(record["title"]))
                date.append(validate_value(record["date"]))
                tags.append(validate_table(record["tags"]))
                links.append(validate_value(record["link"]))
                snipets.append(load_snipet(file_path))
                filenames.append(id + ".txt")
                found = True
                metadata.remove(record)
                break
        if not found:
            source.append("Unknown")
            title.append("Unknown")
            date.append("Unknown")
            tags.append("Unknown")
            links.append("Unknown")
            snipets.append(load_snipet(file_path))
            filenames.append(id + ".txt")

    size = df.shape[0]
    df["label"] = source[:size]
    df["title"] = title[:size]
    df["date"] = date[:size]
    df["tags"] = tags[:size]
    df["links"] = links[:size]
    df["snipets"] = snipets[:size]
    df["filenames"] = filenames[:size]
    return df


def build_data(encoded, ids, metadata_path, text_path, model_name="Unknown"):
    flat = umap.UMAP().fit(encoded)
    sdf = pd.DataFrame(flat.embedding_)
    sdf.rename(columns={0:'x', 1:'y'}, inplace=True)

    if metadata_path is not None:
        sdf = load_metadata(sdf, ids, metadata_path, text_path)

    save_data(sdf, model_name)
    return sdf
