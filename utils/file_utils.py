import os
import json

from flask import jsonify, make_response


DATA_PATH = "dataframe"


def get_snipet_by_id(id, json_file):
    for record in json_file["filenames"]:
        if json_file['filenames'][str(record)] == id:
            return json_file['snipets'][str(record)]
    return "No data"


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

    path = os.path.join(DATA_PATH, request["dataset"] + "_" + request["model"] + ".json")
    if not os.path.exists(path):
        return build_bad_response("Json file for reqested dataset and model not found", 404)

    file = open(path)
    json_file = json.load(file)
    if 'snipets' in json_file:
        del json_file['snipets']

    return build_ok_response(json_file)


def get_snipet(request):
    if  not "dataset" in request or not "model" in request or not "id" in request:
        return  build_bad_response("Missing data", 400)

    id = request["id"]
    path = os.path.join(DATA_PATH, request["dataset"] + "_" + request["model"] + ".json")
    if not os.path.exists(path):
        return build_bad_response("Json file for reqested dataset and model not found", 404)

    file = open(path)
    json_file = json.load(file)
    data = {"snipet": get_snipet_by_id(id, json_file)}
    return build_ok_response(json.loads(json.dumps(data)))
