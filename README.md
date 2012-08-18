jsPalette
=========

jsPalette is a mootools plugin designed to make it easy for a user to select a color from a preset palette.

It can be embedded inline, or used as a popup.

![popup palette](http://i.imgur.com/Iy2L2.png)

How to Use
----------

Given an element:

	<div id='palette'></div>

To turn this into a palette with the default colors, just run this:

	var jsp = new jsPalette('palette');

You can get and set the currently selected color programmatically with getColor, and setColor.

You can also use jsPalette.Popup to automatically load the palette into a simple dialog. Use it the same as the normal jsPalette:

	<div id='color-preview' style='height:50px; width:50px'></div>

	var jsp = new jsPalette.Popup('color-preview');

Except this time the element passed should be the thing you want the user to click on to open the palette. The palette element is created automatically.

jsPalette is mobile friendly, and will automatically restyle when it detects that it is running on a small display.

![mobile palette](http://i.imgur.com/4bAgq.png)

Thanks to [syronex](http://www.syronex.com/software/jquery-color-picker) for the inspiration and default color palette used in jsPalette.


Class Documentation
-------------------

#Class: jsPalette
Color selection control

##jsPalette Method: constructor

### Syntax
	var e = new jsPalette(element, options);

### Arguments

1. element - (*element, string*) an element or element id. This should be an empty div or span.
2. options - (*object*) jsPalette options

### Options

1. colors - (*array*) - array of css color strings. eg ["#ff0000", "#00ff00", "#0000ff"]. If not specified a default will be used.
2. defaultColor - (*string*) - css string of the default color to select on startup
3. showColorText - (*boolean*) - show a text block under the palette with the # code for the current color

### Events

1. onClick(newColor) - called after a new color is selected

### Example

	new jsPalette('color-select', {
	    colors: ['#000000', '#ffffff', '#FF0000', '#00ff00', '#0000ff'],
	    defaultColor: '#0000ff',
	    'onClick': function(newColor) {
			alert('new color selected: ' + newColor);
	    }
	});

##jsPalette Method: setColor
### Syntax:

	jsp.setColor(newColor);

### Arguments:

1. newColor - a string representing the color in hex triplet form. (ie '#005588'). The initial # is optional.

### Example:

	jsp.setColor('#FF00FF');

##jsPalette Method: getColor, getValue
### Syntax:

	jsp.getColor()

### Example:

	var color = jsp.getColor();
	alert(color); // displays '#FFFFFF' (for example)

#Class: jsPalette.Popup

This class extends the standard palette so that it opens in a popup, instead of sitting inline
on the page. By default the background of the link element that opens the popup is set to the selected
color.

##jsPalette Method: constructor

### Syntax
	var e = new jsPalette.Popup(element, options);

### Arguments

1. element - (*element, string*) This is the element that will open the palette when clicked on.
2. options - (*object*) Options are the same as for jsPalette

### Events

1. onColorSelect(newColor) - called after a new color is selected

### Example

	new jsPalette.Popup('color-select', {
	    colors: ['#000000', '#ffffff', '#FF0000', '#00ff00', '#0000ff'],
	    defaultColor: '#0000ff',
	    'onColorSelect': function(newColor) {
			alert('new color selected: ' + newColor);
	    }
	});

##jsPalette Method: openPalette

Displays the color selection palette. Hides all other open palettes on the page.

### Syntax:

	jsp.openPalette();

##jsPalette Method: closePalette

Closes the color selection palette.

### Syntax:

	jsp.closePalette();
