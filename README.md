# WWZD
Projekt na przedmiot: Wizualizacja wielkich zbiorów danych - przetwarzanie danych

Człownkowie:
* Adam Krizar

## Enviroment setup:

Tested under Linux OS

### Create venv
```
python3 -m venv venv/
```

### Startup venv
```
. venv/bin/activate
```

### Install dependencies
```
pip3 install -r requirements.txt
```

### Adding Clarin key
Create file api_keys.json with following contents

```
{
    "clarin": "YOUR_API_KEY"
}
```

## IMPORTANT
### Data
Please make sure data text files are kept in a separate folder without any sub directories or non-data files

**Metadafiles mixed with data files will casue crash while loading!**

### Metadata
Currently supported metada format:

```
[
    {
        "id": "example id",
        "title": "Example title",
        "src": "example src" <-- data gets grouped by this
        "date": "Example date"
    },
]

```

#### micro:
In metadata.json file following changes need to be made:
* remove the "files": label
* change "name" -> "id"
* change "label_0" -> "src"
* change "label_1" -> "title"
* change "label_2" -> "date"

#### korona
In out.json file following changes need to be made:
* change "data" -> "date"
