import json

filename = "replicatedstudyB.json"

file = open(filename)
file_data = json.load(file)
all_files = []
current_file_number = 1
html_objects = []
value_indicator_present = True

from classes import *
from setters import *

#check if user put in just one object or multiple
if isinstance(file_data, dict):
    all_files = [file_data]
elif isinstance(file_data, list):
    all_files = file_data

for object_data in all_files:
    #set the data from the number line json to python objects
    try:
        json_title = set_title(object_data)
    except:
        print("A title is required.")
        quit()

    try:
        json_data = set_data(object_data)
    except:
        print("Data for the number line is required.")
        quit()

    if "coloring" in object_data.keys():
        json_coloring = set_coloring(object_data)
    else:
        json_coloring = Coloring("none")

    if "separation" in object_data.keys():
        json_category_separation = set_category_separation(object_data)
    else:
        json_category_separation = CategorySeparation()

    if "labels" in object_data.keys():
        json_labels = set_category_labels(object_data)
    else:
        json_labels = CategoryLabels()

    if "tickmarks" in object_data.keys():
        json_tick_marks = set_tick_marks(object_data)
    else:
        json_tick_marks = TickMarks()

    if "value_indicator" in object_data.keys():
        json_value_indicator = set_value_indicator(object_data)
    else:
        value_indicator_present = False


    #convert it to a dict
    vega_object = {}

    vega_title = {}

    vega_data = []
    vega_data_table = {}
    data_values = []
    vega_data_stacked = {}
    vega_data_separators = {}

    vega_scales = []
    vega_axes = []
    vega_marks = []


    #set title properties
    vega_title["text"] = json_title.text
    vega_title["align"] = json_title.align
    vega_title["font"] = json_title.font
    vega_title["fontSize"] = json_title.fontSize
    vega_title["color"] = json_title.color


    #used to move all objects by a certain amount
    offset = 0
    indicator_offset = 0
    category_label_y = 0
    if (json_tick_marks.position == "top"):
        if (json_labels.position == "over"):
            category_label_y = "0"
            indicator_offset = -15
            offset = 30
        elif (json_labels.position == "on"):
            category_label_y = "height/2"
            indicator_offset = -15
        elif (json_labels.position == "under"):
            category_label_y = "height + 10"
    elif (json_tick_marks.position == "bottom"):
        if (json_labels.position == "over"):
            category_label_y = "0"
            offset = 10
        elif (json_labels.position == "on"):
            category_label_y = "height/2"
        elif (json_labels.position == "under"):
            category_label_y = "height + 30"
            indicator_offset = 20



    #set data values
    category_index = 0 #used to set order for categories in number line
    last_end_value = 0
    for json_category in json_data.categories:
        old_end_value = json_category["end"]
        json_category["end"] -= last_end_value
        last_end_value = old_end_value
        #add new order property to sort categories properly
        json_category["order"] = category_index
        category_index += 1
        data_values.append(json_category)
    vega_data_table["name"] = "table"
    vega_data_table["values"] = data_values

    #create stacked data set
    vega_data_stacked["name"] = "stacked"
    vega_data_stacked["source"] = "table"
    vega_data_stacked["transform"] = [{"type":"stack", "field":"end", "sort":{"field":"order"}, "as":["x0", "x1"]},
                                    {"type": "formula", "as": "x0", "expr": "datum.order === 0 ? datum.x0 + {} : datum.x0".format(json_data.start)}]

    #create separator data set
    vega_data_separators["name"] = "separators"
    vega_data_separators["source"] = "stacked"
    vega_data_separators["transform"] = [{"type": "filter", "expr": "datum.x1 < data('stacked')[data('stacked').length - 1].x1"}]

    #create scales and axes
    vega_scales.append({"name":"xscale", "domain":{"data":"stacked", "field":"x1"}, "range":"width", "domainMin": json_data.start, "zero": False})
    vega_axes.append({"orient":json_tick_marks.position, "scale":"xscale", "offset":offset if json_tick_marks.position == "bottom" else -offset,
                      "tickCount":json_tick_marks.tickCount})


    #initialize all marks
    vega_marks_bars = {}
    vega_marks_category_labels = {}
    vega_marks_separators = {}
    vega_marks_arrow_line = {}
    vega_marks_arrow_triangle = {}
    vega_marks_indicator_text = {}
    vega_marks_indicator_number = {}

    #create mark to draw each section of RRNL

    #BARS
    vega_marks_bars["type"] = "rect"
    vega_marks_bars["from"] = {"data":"stacked"}
    bars_data = {}
    bars_data["height"] = {"value": 30}
    bars_data["x"] = {"scale": "xscale", "field": "x0"}
    bars_data["x2"] = {"scale": "xscale", "field": "x1"}
    bars_data["y"] = {"signal":  "{}".format(offset)}
    bars_data["fill"] = {"field": "color"}
    vega_marks_bars["encode"] = {"enter": bars_data}

    #LABELS
    vega_marks_category_labels["type"] = "text"
    vega_marks_category_labels["from"] = {"data":"stacked"}
    category_labels_data = {}
    category_labels_data["height"] = {"value": 30}
    #usual height: "signal":"height / 2"
    category_labels_data["y"] = {"signal":category_label_y}
    category_labels_data["align"] = {"value":"center"}
    category_labels_data["baseline"] = {"value":"middle"}
    category_labels_data["fill"] = {"value":"black"}
    category_labels_data["fontSize"] = {"value":12}
    category_labels_data["text"] = {"field":"name"}
    vega_marks_category_labels["encode"] = {"enter": category_labels_data, "update":{"x":{"signal":"scale('xscale', (datum.x0 + datum.x1) / 2)"}}}

    #SEPARATORS
    vega_marks_separators["type"] = "rule"
    vega_marks_separators["from"] = {"data":"separators"}
    separators_data = {}
    separators_data["x"] = {"scale":"xscale", "field":"x1"}
    separators_data["y"] = {"signal":  "{}".format(offset)}
    separators_data["y2"] = {"signal":"height + {}".format(offset)}
    separators_data["stroke"] = {"value":json_category_separation.color}
    separators_data["strokeWidth"] = {"value":json_category_separation.width}
    vega_marks_separators["encode"] = {"enter": separators_data}

    if value_indicator_present:
        #ARROW LINE
        vega_marks_arrow_line["type"] = "rule"
        arrow_line_data = {}
        arrow_line_data["x"] = {"scale":"xscale", "value":json_value_indicator.value}
        arrow_line_data["y"] = {"signal":"height + 25 + {} + {}".format(offset, indicator_offset)}
        arrow_line_data["y2"] = {"signal":"height + 70 + {} + {}".format(offset, indicator_offset)}
        arrow_line_data["stroke"] = {"value":"black"}
        arrow_line_data["strokeWidth"] = {"value":3}
        vega_marks_arrow_line["encode"] = {"enter": arrow_line_data}

        #ARROW POINT
        vega_marks_arrow_triangle["type"] = "symbol"
        arrow_triangle_data = {}
        arrow_triangle_data["x"] = {"scale":"xscale", "value":json_value_indicator.value}
        arrow_triangle_data["y"] = {"signal":"height + 25 + {} + {}".format(offset, indicator_offset)}
        arrow_triangle_data["shape"] = {"value":"triangle-up"}
        arrow_triangle_data["fill"] = {"value":"black"}
        arrow_triangle_data["size"] = {"value":150}
        vega_marks_arrow_triangle["encode"] = {"enter": arrow_triangle_data}

        #VALUE INDICATOR TEXT
        if json_value_indicator.title:
            vega_marks_indicator_text["type"] = "text"
            indicator_text_data = {}
            indicator_text_data["x"] = {"scale":"xscale", "value":json_value_indicator.value}
            indicator_text_data["y"] = {"signal":"height + 85 + {} + {}".format(offset, indicator_offset)}
            indicator_text_data["text"] = {"value":json_value_indicator.title}
            indicator_text_data["align"] = {"value":"center"}
            indicator_text_data["fill"] = {"value":"black"}
            indicator_text_data["fontSize"] = {"value":14}
            vega_marks_indicator_text["encode"] = {"enter": indicator_text_data}

        #VALUE INDICATOR VALUE
        vega_marks_indicator_number["type"] = "text"
        indicator_number_data = {}
        indicator_number_data["x"] = {"scale":"xscale", "value":json_value_indicator.value}
        if not json_value_indicator.title:
            indicator_offset = indicator_offset - 15
        indicator_number_data["y"] = {"signal":"height + 115 + {} + {}".format(offset, indicator_offset)}
        indicator_number_data["text"] = {"value":json_value_indicator.value}
        indicator_number_data["align"] = {"value":"center"}
        indicator_number_data["fill"] = {"value":"black"}
        indicator_number_data["fontSize"] = {"value":30}
        vega_marks_indicator_number["encode"] = {"enter": indicator_number_data}



    #add all marks to vega_marks
    vega_marks.append(vega_marks_bars)
    vega_marks.append(vega_marks_category_labels)
    vega_marks.append(vega_marks_separators)
    if value_indicator_present:
        vega_marks.append(vega_marks_arrow_line)
        vega_marks.append(vega_marks_arrow_triangle)
        if json_value_indicator.title:
            vega_marks.append(vega_marks_indicator_text)
        vega_marks.append(vega_marks_indicator_number)

    #add all data sets to data_values
    vega_data.append(vega_data_table)
    vega_data.append(vega_data_stacked)
    vega_data.append(vega_data_separators)

    #add all these properties to the vega object
    #vega_object["$schema"] = "https://vega.github.io/schema/vega/v6.json"
    vega_object["width"] = 300
    vega_object["height"] = 30
    vega_object["padding"] = 10
    vega_object["title"] = vega_title
    vega_object["data"] = vega_data
    vega_object["scales"] = vega_scales
    vega_object["axes"] = vega_axes
    vega_object["marks"] = vega_marks



    #turn the vega_object dict into json that can be used in vega
    vega_json = json.dumps(vega_object)
    html_objects.append(json.dumps(vega_object, indent=4))

    if (len(all_files) == 1):
        with open("vega.json", mode="w", encoding="utf-8") as vega_file:
            json.dump(vega_object, vega_file, indent=4)
    else:
        with open("vega{}.json".format(current_file_number), mode="w", encoding="utf-8") as vega_file:
            json.dump(vega_object, vega_file, indent=4)
        current_file_number = current_file_number + 1


#write all json objects to html
html_start = f"""
<!doctype html>
<html>
<head>
    <title>Vega</title>
    <script src="https://cdn.jsdelivr.net/npm/vega@6.2.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@6.4.2"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-embed@7.1.0"></script>
</head>
<body>
"""

html_body = ""

for index, object in enumerate(html_objects):
    html_body += f"""<div id="vis{index}"></div>\n"""

html_body += """<script type="text/javascript">\n"""

for index, object in enumerate(html_objects):
    html_body += f"const vegaspec{index} = {object};\n"
    html_body += f"vegaEmbed('#vis{index}', vegaspec{index});\n"

html_end = f"""
</script>
</body>
</html>
"""

object_as_html = html_start + html_body + html_end

with open("vega.html", "w") as f:
    f.write(object_as_html)