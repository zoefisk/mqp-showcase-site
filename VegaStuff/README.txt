Put everything in here in the same folder and open it in VSCode (or whatever IDE or the command prompt if that suits your fancy)

The 0.5 file is just the original file but without the ability to upload multiple JSON objects at once in an array, you can ignore it

Also ignore the Vega-Lite file unless you really want to use it for some reason, I put it there for completeness sake

To create a Vega object of a different file, you have to go in the numberline_to_vegalite.py and change the "filename" variable that's hardcoded since I haven't bothered to put in functionality to just like type in a file name into the terminal lol

"all" is just multiple objects in one file so it will let you see what that looks like and the output that comes out when you run it

Also the "vega.html" that's created can just be pasted into an html viewer like this https://html.onlineviewer.net/ so you can easily see what the output looks like

simple.json is like the least info possible you need to create one, you could also have one with just a single data point but then it would barely be a number line lol

you can use template.json if you want, but know that no properties are required besides the title and data, and a value if you need a value indicator

If you have any other questions just ask me