import os
import json


DATA_PATH = "dataframe"


def list_data():
    data = {}
    for filename in os.listdir(DATA_PATH):
        data_descriptor = filename.split(".")[0]
        split_descriptor = data_descriptor.split("_")
        dataset = split_descriptor[0]
        model = split_descriptor[1]
        data[dataset] = data.get(dataset, []) + [model]

    return json.dumps(data)


def get_data(request):
    if  not "dataset" in request or not "model" in request:
        return "Missing data", 400

    dataset = request["dataset"]
    model = request["model"]
    path = os.path.join(DATA_PATH, dataset + "_" + model + ".json")

    if not os.path.exists(path):
        print(path)
        return "Json file for reqested dataset and model not found", 404

    file = open(path)
    return json.load(file)
