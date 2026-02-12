import json

filename = "plateletcount.json"

file = open(filename)
file_data = json.load(file)

from classes import *
from setters import *

#set the data from the number line json to python objects
try:
    json_title = set_title(file_data)
except:
    print("A title is required.")
    quit()

try:
    json_data = set_data(file_data)
except:
    print("Data for the number line is required.")
    quit()

if "coloring" in file_data.keys():
    json_coloring = set_coloring(file_data)
else:
    json_coloring = Coloring("none")

if "separation" in file_data.keys():
    category_separation = set_category_separation(file_data)
else:
    json_category_separation = CategorySeparation()

if "labels" in file_data.keys():
    labels = set_category_labels(file_data)
else:
    json_labels = CategoryLabels()

if "tickmarks" in file_data.keys():
    json_tick_marks = set_tick_marks(file_data)
else:
    json_tick_marks = TickMarks()

if "value_indicator" in file_data.keys():
    json_value_indicator = set_value_indicator(file_data)
else:
    print("No value indicator was given.")


#convert it to a dict
vegalite_object = {}
#make a dict for each object that will be in the vegalite code
vegalite_title = {}

vegalite_data = {}
data_values = []

vegalite_encoding = {}
vegalite_x = {}
vegalite_size = {}
vegalite_color = {}
vegalite_color_scale = {}
vegalite_order = {}

#set title properties
vegalite_title["text"] = json_title.text
vegalite_title["align"] = json_title.align
vegalite_title["font"] = json_title.font
vegalite_title["fontSize"] = json_title.fontSize
vegalite_title["color"] = json_title.color

#set data values

category_index = 0 #used to set order for categories in number line
last_end_value = json_data.start
for json_category in json_data.categories:
    #subtracting the end value from the end value of the last category to get the category's size
    #it's still called "end" for the time being so it doesn't need to be changed everywhere
    #even though category size is more accurate'
    old_end_value = json_category["end"]
    json_category["end"] -= last_end_value
    last_end_value = old_end_value
    #add new order property to sort categories properly
    json_category["order"] = category_index
    category_index += 1
    data_values.append(json_category)
vegalite_data["values"] = data_values


#set x properties
vegalite_x["aggregate"] = "max"
vegalite_x["field"] = "end"
vegalite_x["type"] = "quantitative"
vegalite_x["scale"] = {"nice": False}
vegalite_x_axis = {}
vegalite_x_axis["title"] = None
vegalite_x_axis["tickCount"] = json_tick_marks.tickCount
vegalite_x["axis"] = vegalite_x_axis

#set size properties
vegalite_size["value"] = 21

#set color properties
vegalite_color["field"] = "name"
vegalite_color["title"] = "Categories"
vegalite_color["type"] = "ordinal"
domain = []
range = []
for json_category in json_data.categories:
    domain.append(json_category["name"])
    range.append(json_category["color"])
vegalite_color_scale["domain"] = domain
vegalite_color_scale["range"] = range
vegalite_color["scale"] = vegalite_color_scale

#set order properties
vegalite_order["aggregate"] = "max"
vegalite_order["field"] = "order"

#add all of encoding's properties to dict
vegalite_encoding["x"] = vegalite_x
vegalite_encoding["size"] = vegalite_size
vegalite_encoding["color"] = vegalite_color
vegalite_encoding["order"] = vegalite_order

#add all these properties to the vegalite object
vegalite_object["title"] = vegalite_title
vegalite_object["data"] = vegalite_data
vegalite_object["mark"] = "bar"
vegalite_object["encoding"] = vegalite_encoding

#turn the vegalite_object dict into json that can be used in vega-lite
vegalite_json = json.dumps(vegalite_object)
with open("vegalite.json", mode="w", encoding="utf-8") as vegalite_file:
    json.dump(vegalite_object, vegalite_file, indent=4)
'''
Structure:
- vegalite_title dict
- vegalite_data dict
    - contains just a list of values, which
    are all dicts containing category objects
- mark is bar chart (only non dict lol)
- vegalite_encoding dict full of dicts

INSIDE ENCODING
- vegalite_x dict
    - inside theres an axis dict
- size dict that always defaults to 21
- color dict
    - inside color dict is a scale dict
- then an order dict (even though order isn't working right with number lines)
'''


