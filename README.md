# WWZD
Projekt na przedmiot: Wizualizacja wielkich zbiorów danych - prezentacja danych

Członkowie:
* Adam Krizar
* Krzysztof Zubrzycki
* Yuri Dumitriuk

## Enviroment setup:

Tested under Linux OS


### Starting
Enter ```news-room``` directory and type

```
npm start
```

## How to add new data set?
1. First follow instruction located in readme files for generator and server app.
2. Press the "Refresh Options" button to refresh available datasets.

![Picture showing "Refresh Options"](/pictures/refresh_options.png "Przycisk \"Refresh Options\"")

## Instructions

User can:
* Change dataset/model using dropdowan list with proper label.
* Load new models/dataset list by using the "Refresh Options" button.
* Hover over record to display details.
* Load text fragment connected with the record by covering over it and pressing LMB together with ctrl button.
* Select records by pressing LMB on a record.
* Filter displayed records by clicking category name located on the left side of the plot.
* Pan, zoom, selec, download plot as png by using options provided by Plotly.js
* Download slected items list as ```.json``` or ```.txt``` by pressing the "Save selected filenames as ..." button located at te bottom of the page.
* Clear selection by: Manually removing all selections, use "Remove All Selected Items" buttion located under the plot, or select diffrent model/dataset from the list.

## Examples

1. Choosing dataset

![Picture showing how to slecet new dataset](/pictures/selecting_dataset.png "How to select new dataset?")

2. Choosing model

![Picture showing how to slecet new model](/pictures/selecting_model.png "How to select new model?")

3. Selecting items

![Picture showing how selecting items works](/pictures/slected_items.png "Slecting new items")

4. Selected item list

![Picture showing selected item list](/pictures/selected_items_list.png "Selected items list")

5. Selected items list with snippets

![Picture showing items list with snipets](/pictures/slected_items_with_snipet.png "Expanded items list")
