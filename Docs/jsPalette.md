#Class: jsPalette
Color selection control
Nathan Reed, reednj@gmail.com, http://twitter.com/reednj

##jsPalette Method: constructor

### Syntax
	var e = new jsPalette(element, options);

### Arguments

1. element - (*mixed*) an element or element id. This should be an empty div or span.
2. options - (*object*) jsPalette options

### Options

1. colors - (*array*) - array of css color strings. eg ["#ff0000", "#00ff00", "#0000ff"]
2. defaultColor - (*string*) - css string of the default color to select on startup
3. showColorText - (*boolean*) - show a text block under the palette with the # code for the current color

### Events

1. onClick(newColor) - called after a new color is selected

### Example

	new jsPalette.Popup('color-select', {
	    colors: ['#000000', '#ffffff', '#FF0000', '#00ff00', '#0000ff'],
	    defaultColor: '#0000ff',
	    'onClick': function(newColor) {
			alert('new color selected: ' + newColor);
	    }
	});

##jsPalette Method: setColor
### Syntax:
### Arguments:
### Example:

##jsPalette Method: getColor, getValue
### Syntax:
### Arguments:
### Example:

