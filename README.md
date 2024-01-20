# WWZD
Projekt na przedmiot: Wizualizacja wielkich zbiorów danych - przetwarzanie danych

Człownkowie:
* Adam Krizar
* Krzysztof Zubrzycki
* Yuri Dumitriuk

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

## Input preparation
### Data
Please make sure data text files are kept in a separate folder without any sub directories or non-data files. File name should be the same as file id. Files have to use ```.txt``` file extenetion.

### Metadata
Currently supported metada format:

```
[
    {
        "id": "Example id" <-- Has to be the same as file name (without the .txt part!),
        "title": "Example title",
        "src": "Example src" <-- Data gets grouped by this,
        "date": "Example date",
        "link": "Example link" <-- Link to article source,
        "tags" ["Example", "Tags"]
    },
]
```

Each of the above fields should be filled in metadata file. Any additional fields will be ignored.

## How to add new data set?

1. Prepare folder following the instructions above. Optionally prepare the metadata file.
2. Run command
    * For clarin:
    ```
    python3 main_clarin.py -m model_name -md ../path/to/metadata.json ../path/to/data/folder
    ```

    model_name can be:
    1. sbert-distiluse-base-multilingual-cased-v1'
    2. sbert-paraphrase-multilingual-mpnet-base-v2'
    3. multilingual-e5-base'
    4. multilingual-e5-large'
    5. sbert-klej-cdsc-r'


    * For local models:
    ```
    python3 main.py -m model_name -md ../path/to/metadata.json ../path/to/data/folder
    ```

    model_name can be:
    1. sbert-distiluse-base-multilingual-cased-v1'
    2. sbert-paraphrase-multilingual-mpnet-base-v2'
    3. multilingual-e5-base'
    4. multilingual-e5-large'
    5. sbert-klej-cdsc-r'

* Flag ``` -m ``` means that next argument will specify which model should be used. This flag is mandatory.
* Flag ``` -md ``` means that next argment will be path to metadata. Using it is not mandatory.
* ``` ../path/to/data/folder ``` is main program argument. It does not require any flags but it has to be last. The generator won't work without it.
3. Output will be saved to ```./dataframe``` folder. It will look like this: ```folder-in-which-the-dataset-was-located_model-name.json```. This ```.json``` file should be copied to ```.dataframe``` folder in server app.
