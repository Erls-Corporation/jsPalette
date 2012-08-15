// this is now implemented in mootool.more (finally!)
Element.implement({
   show: function() {this.setStyle('display','');},
   hide: function() {this.setStyle('display','none');}
});


// jsPalette for mootools
//
// Given a container element on the page, this class creates a color palette picker
// so the user can selected from some predefined colors.
//
// See the readme for exact usage details.
//
var jsPalette = new Class({
    initialize: function (element, options) {
        this.element = $(element);
        this.options = options || {};
        this.options.colors = this.options.colors || ["#EEEEEE", "#FFFF88", "#FF7400", "#CDEB8B", "#6BBA70", "#006E2E", "#C3D9FF", "#4096EE", "#356AA0", "#FF0096", "#FFFFFF", "#000000"];
        this.options.onClick = this.options.onClick || $empty;
        this.options.defaultColor = this.options.defaultColor || this.options.colors[0];
        this.options.showColorText = this.options.showColorText === true ? true : false;

        this.selectedElement = null;
        this.colorText = null;

        this.element.addClass('js-palette');
        this.addColors();

        if (this.options.showColorText == true) {
            this.addColorText();
        }
        
        this.setColor(this.options.defaultColor);
    },

    addColorText: function () {
        this.colorText = new Element('div.jsp-desc', {'text': '#000000'}).inject(this.element);
    },

    addColors: function () {
        this.container = new Element('div.jsp-cont');
        this.element.grab(this.container);

        if ($type(this.options.colors)) {
            this.options.colors.each(function (color) {
                this.addColor(color);
            } .bind(this));
        }
    },

    addColor: function (colorString) {
        new Element('span', {
            'text': ' ',
            styles: { 'backgroundColor': colorString },
            events: { 'click': this.onClick.bind(this) }
        }).inject(this.container);
    },

    setColor: function (colorString) {
        if (colorString == null) {
            return;
        }

        if (colorString.charAt(0) != '#') {
            colorString = '#' + colorString;
        }

        // look though the elements, find the one with the color passed in, make it the selected one.
        // Note that this depends on the color array and the element colors matching. Which they should
        // unless something external has changed them
        this.element.getElements('span').each(function (item, index) {
            if (colorString.toLowerCase() == this.options.colors[index].toLowerCase()) {
                this.selectElement(item);
            }
        } .bind(this));
    },

    selectElement: function (newElement) {
        if (this.selectedElement) {
            this.selectedElement.removeClass('jsp-selected');
        }

        this.selectedElement = newElement;
        this.selectedElement.addClass('jsp-selected');

        // set the color text
        if (this.colorText != null) {
            this.colorText.innerHTML = this.getColor().toLowerCase();
        }
    },

    onClick: function (e) {
        this.selectElement(e.target);
        this.options.onClick(this.getColor());
    },

    getColor: function () {
        if(this.selectedElement != null) {
            return this.selectedElement.getStyle('backgroundColor');
        } else {
            return null;
        }
    },

    getValue: function () {
        return this.getColor();
    }

});

// jsPalette.Popup for mootools
//
// Show the standard color selector in a popup box placed at the location
// the user click. The element passed to the constructor is the element that
// triggers the popup to show when clicked. After a color is selected the back
// ground color of that element is set to the selected color.
//
// See the readme for exact usage details
//
jsPalette.Popup = new Class({
    initialize: function (element, options) {
        this.linkElement = $(element);
        this.options = options || {};
        this.options.onColorSelect = this.options.onColorSelect || $empty;

        this.paletteBox = new Element('div.jsp-popup', {'styles': {'display': 'none'}}).inject(document.body);
        this.paletteElement = new Element('div.js-palette').inject(this.paletteBox);

        var paletteOptions = this.options;
        paletteOptions.onClick = this.onColorSelect.bind(this);
        this.palette = new jsPalette(this.paletteElement, paletteOptions);

        // we want the palette to open when the user clicks on the link, and close
        this.linkElement.addEvent('click', this.openPalette.bind(this));
        document.addEvent('click', this.closePalette.bind(this));

        this.linkElement.setStyle('backgroundColor', this.palette.getColor());
    },

    openPalette: function (e) {
        e.stop();

        this.paletteBox.show();
        this.paletteBox.setStyle('left', e.client.x);
        this.paletteBox.setStyle('top', Math.max(e.client.y - this.paletteBox.getSize().y, 0));
    },

    closePalette: function () {
        this.paletteBox.hide();
    },

    onColorSelect: function (color) {
        this.linkElement.setStyle('backgroundColor', color);
        this.options.onColorSelect(color);
    }
});

