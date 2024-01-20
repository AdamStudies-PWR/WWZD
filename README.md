# WWZD
Projekt na przedmiot: Wizualizacja wielkich zbiorów danych - serwer

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

## How to add new data set?
1. New data needs to be generated by generator app. Please refer to readme there for instructions How to do it.
2. Generated ```.json``` file needs to be copied into ```.dataframe``` folder located next to ```main.py``` file. If such folder does not exist it needs to be created by the user. **There is no need to restart the app after coping the data.**
