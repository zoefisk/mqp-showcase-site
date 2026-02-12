from classes import *

def set_title(data):
    title = Title(data["title"]["text"])
    title.set_align(data["title"].get("align", "center"))
    title.set_font(data["title"].get("font", "Arial"))
    title.set_fontSize(data["title"].get("fontSize", 13))
    title.set_color(data["title"].get("color", "black"))
    return title

def set_data(data):
    categories = data["data"]["categories"]
    data_obj = Data(categories)
    data_obj.set_start(data["data"].get("start", 0))
    return data_obj

def set_coloring(data):
    coloring = Coloring(data["coloring"]["gradient"])
    return coloring

def set_category_separation(data):
    cat_sep = CategorySeparation()
    cat_sep.color = data["separation"].get("color", "black")
    cat_sep.width = data["separation"].get("width", 0)
    cat_sep.excludeEnds = data["separation"].get("excludeEnds", True)
    return cat_sep

def set_category_labels(data):
    cat_labels = CategoryLabels()
    cat_labels.align = data["labels"].get("align", "center")
    cat_labels.position = data["labels"].get("position", "on")
    return cat_labels

def set_tick_marks(data):
    tick_marks = TickMarks()
    tick_marks.tickCount = data["tickmarks"].get("tickCount", 10)
    tick_marks.showNumbers = data["tickmarks"].get("showNumbers", "all")
    tick_marks.position = data["tickmarks"].get("position", "bottom")
    return tick_marks

def set_value_indicator(data):
    value_indicator = ValueIndicator(data["value_indicator"]["value"], data["value_indicator"].get("title", ""))
    value_indicator.overlap = data["value_indicator"].get("overlap", False)
    return value_indicator