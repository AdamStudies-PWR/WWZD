import json


TOKEN_FILE = "api_keys.json"


def get_clarin_key() -> str:
    file = open(TOKEN_FILE)
    data = json.load(file)
    if "clarin" in data:
        return data["clarin"]
    else:
        return None
