/*
ISC License

Copyright (c) 2017, Jeevakumar

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


function DOM() {}
DOM.prototype.__init__ = function() {
    Element.prototype.setText = function(value) {
        this.innerHTML = value;
    };
    Element.prototype.setIcon = function(icon_name) {
        this.innerHTML = "<i class='material-icons'>" + icon_name + "</i>";
    };
    Element.prototype.setIconWithText = function(icon_name, text) {
        this.innerHTML = "<i class='material-icons'>" + icon_name + "</i>" + text;
    };
    Element.prototype.on = function(ev, callback) {
        this.addEventListener(ev, callback, false);
    };
    Element.prototype.removeBoxShadows = function() {
        this.style.boxShadow = "none";
    }
    Element.prototype.addStyles = function(styles) {
        var keys = Object.keys(styles);
        for (var i = 0; i < keys.length; i++) {
            this.style[keys[i]] = styles[keys[i]];
        }
    }
    Element.prototype.getStyleValue = function(property) {
        return window.getComputedStyle(this,null).getPropertyValue(property);
    };
    Element.prototype.addClasses = function(cls) {
        var classes = this.getAttribute("class");
        if (classes === null) {
            this.setAttribute("class", tcls);
            return;
        }

        tcls = "";
        for (var i = 0; i < cls.length; i++) {
            if (i === (cls.length - 1)) {
                tcls += cls[i];
            } else {
                tcls += (cls[i] + " ");
            }
        }

        this.setAttribute("class", (classes + " " + tcls));
    }
    Element.prototype.removeClasses = function(cls) {
        var classes = this.classList;
        var new_classes = "";
        for (var j = 0; j < cls.length; j++) {
            for (var i = 0; i < classes.length; i++) {
                if (cls[j] !== classes[i]) {
                    if (i === (classes.length - 1)) {
                        new_classes += classes[i];
                    } else {
                        new_classes += (classes[i] + " ");
                    }
                }
            }
        }
        this.setAttribute("class", new_classes);
    }
};

// DOM.prototype.__init__();