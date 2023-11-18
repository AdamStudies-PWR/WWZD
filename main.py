import json

from flask import Flask, request

from utils.file_utils import get_data, list_data


app = Flask("news-room-api")


@app.route('/list_data', methods = ['GET'])
def list_data_():
    return list_data()


@app.route('/get_data', methods = ['POST'])
def get_data_():
    return get_data(json.loads(request.get_data()))

if __name__ == "__main__":
    app.run()
