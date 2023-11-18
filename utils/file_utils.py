import os
import json

from flask import jsonify, make_response


DATA_PATH = "dataframe"


def build_ok_response(data):
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def build_bad_response(message: str, code:int):
    response = make_response(message, code)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def list_data():
    data = {}
    for filename in os.listdir(DATA_PATH):
        data_descriptor = filename.split(".")[0]
        split_descriptor = data_descriptor.split("_")
        dataset = split_descriptor[0]
        model = split_descriptor[1]
        data[dataset] = data.get(dataset, []) + [model]

    return build_ok_response(data)


def get_data(request):
    if  not "dataset" in request or not "model" in request:
        return  build_bad_response("Missing data", 400)

    dataset = request["dataset"]
    model = request["model"]
    path = os.path.join(DATA_PATH, dataset + "_" + model + ".json")

    if not os.path.exists(path):
        return build_bad_response("Json file for reqested dataset and model not found", 404)

    file = open(path)
    return build_ok_response(json.load(file))
