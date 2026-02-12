class Title:
    def __init__ (self, text: str):
        self.text = text
        self.align = "center"
        self.font = "Arial"
        self.fontSize = 14
        self.color = "black"

    def set_align(self, align: str):
        self.align = align

    def set_font(self, font: str):
        self.font = font

    def set_fontSize(self, fontSize: int):
        self.fontSize = fontSize

    def set_color(self, color: str):
        self.color = color

class Data:
    def __init__ (self, categories: list):
        self.categories = categories
        self.start = 0

    def set_start(self, start: int):
        self.start = start

class Coloring:
    def __init__ (self, gradient: str):
        self.gradient = gradient

class CategorySeparation:
    def __init__ (self):
        self.color = "black"
        self.width = 0
        self.excludeEnds = True

class CategoryLabels:
    def __init__ (self):
        self.align = "center"
        self.position = "on"

class TickMarks:
    def __init__ (self):
        self.tickCount = 10
        self.showNumbers = "all"
        self.position = "bottom"

class ValueIndicator:
    def __init__ (self, value: float, title: str):
        self.value = value
        self.title = title
        self.overlap = False