from flask import Flask

from utils.file_utils import


app = Flask("news-room-api")

@app.route('/data', methods = ['GET'])
def data_list():
    pass
