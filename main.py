from flask import Flask, request

from utils.file_utils import get_data, list_data


app = Flask("news-room-api")


@app.route('/list_data', methods = ['GET'])
def list_data_():
    return list_data()


@app.route('/get_data', methods = ['GET'])
def get_data_():
    j_request = request.get_json()
    return get_data(j_request)

if __name__ == "__main__":
    app.run()
