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
function Chai() {
    this.animation = new Object();
    this.event = new Object();
    this.stack = new Object();
    this.initial = new Object();
    this.methods = new Object();

    this.recreateNode = function(el) {
        var elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
    }

    this.removeEventsOnDisabledElements = function() {
        var disabledElements = document.querySelectorAll("[data-disabled='true']");
        for (var i = 0; i < disabledElements.length; i++) {
            this.disableElement(disabledElements[i]);
        }
    }

    this.initial.addButtonAnimation = function() {
        var btns = [document.getElementsByClassName("chai-button"), document.getElementsByClassName("chai-fab")];
        if (helper.isAnimationAvailable()) {
            for (var i = 0; i < btns.length; i++) {
                for (var j = 0; j < btns[i].length; j++) {
                    if (btns[i][j].getAttribute("data-animation") !== "no-animation") {
                        btns[i][j].on(chai.event.onclick, chai.animation.ripple);
                    } 
                }
            }
        }
    }

    this.__init__ = function() {
        this.initial.addButtonAnimation();
        this.removeEventsOnDisabledElements();
    };
}
var chai = new Chai();
chai.disableElement = function(el) {
    var isBtn = (el.classList.contains("chai-button")) ? true : false;

    if (isBtn) {
        var type = el.getAttribute("data-type");
        if (type === "normal" || type === "large") {
            el.addStyles({backgroundColor: "#D1D1D1", color: "rgba(0, 0, 0, .26)", boxShadow: "none"});
        } else if (type === "flat") {
            el.addStyles({backgroundColor: "transparent", color: "rgba(0, 0, 0, .26)", boxShadow: "none"});
        }
    } else {
        el.addStyles({opacity: "0.3", boxShadow: "none"});
    }
    this.recreateNode(el);
};

chai.methods.preventDefault = function(e) {
    e.preventDefault();
}

chai.event.onclick = "click";

function Helper() {
    this.addStyle = function(element, keys, values) {
        for (var i = 0; i < keys.length; i++) {
            element.style[keys[i]] = values[i];
        }
    }
    this.is_touch_device = function() {  
        try {  
            document.createEvent("TouchEvent");  
            return true; 
        } catch (e) {  
            return false;  
        }  
    }

    this.isAnimationAvailable = function() {
        var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx  = '',
        elm = document.createElement('div');

        if( elm.style.animationName !== undefined ) { animation = true; }
        return animation;
    };

    this.getStyleValue = function(element, property) {
        return window.getComputedStyle(element,null).getPropertyValue(property);
    };

    this.touchSwipe = function(el) {
        var startX = null;
        var deltaX = null;
        
        el.addEventListener("touchstart", function(e) {
            startX = e.targetTouches[0].pageX;

            el.addEventListener("touchmove", function(e) {
                deltaX = e.targetTouches[0].pageX - startX;
                console.log(deltaX);

                e.preventDefault();
                e.stopPropagation();
            }, false);

            e.preventDefault();
            e.stopPropagation();
        }, false);

        el.addEventListener("touchend", function() {
            if (Math.abs(deltaX) >= 40) {
                console.log("swiped");

                // postive - right swiped
                if (deltaX > 0) {
                    return "right";
                } else {
                    return "left";                 
                }
            }
        }, false);
    };

    this.__init__ = function() {
        if (this.is_touch_device()) {
            chai.event.onclick = "touchend";
        } else {
            chai.event.onclick = "click";
        }
    };
}

// var helper = new Helper();
// helper.__init__();

function attributeFunc(element) {
    if (element.innerHTML === "") {
        if (element.getAttribute("data-icon") !== null && element.getAttribute("data-text") !== null) {
            element.setIconWithText(element.getAttribute("data-icon"), element.getAttribute("data-text"));
        } else if (element.getAttribute("data-text") !== null) {
            element.setText(element.getAttribute("data-text"));
        } else if (element.getAttribute("data-icon") !== null) {
            element.setIcon(element.getAttribute("data-icon"));
        }
    }
}

function CreateElements() {
    var registerElements = function() {
        var tags = ["chai-button", "chai-fab", "chai-bottom-sheet-element", "chai-toast"];
        for (var i = 0; i < tags.length; i++) {
            var elements = document.getElementsByClassName(tags[i]);
            for (var j = 0; j < elements.length; j++) {
                attributeFunc(elements[j]);
            }
        }
    };
    this.__init__ = function() {
        registerElements();
    };
}
function Animation() {}
Animation.prototype.__init__ = function() {
    chai.animation.ripple = function(e) {
        var el = this;
        var cHeight = this.clientHeight;
        var cWidth = this.clientWidth;
        var circle = document.createElement("div");
        var d = Math.max(this.clientWidth, this.clientHeight);
        circle.style.height = circle.style.width = d + "px";
        this.appendChild(circle);

        var pY = (cHeight / 2) - (circle.clientHeight / 2);
        var pX =  (cWidth / 2) -  (circle.clientWidth / 2);

        circle.style.top = pY + "px";
        circle.style.left = pX + "px";

        circle.classList.add("ripple");

        setTimeout(function() {
            el.removeChild(circle);
        }, 650);
    }
};

// Animation.prototype.__init__();
function ActionBar(el) {
    this.setText = function(text) {
        var children = el.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].classList.contains("chai-actionbar-title")) {
                children[i].innerHTML = text;
            }
        }
    };
}

function BottomSheet() {}
BottomSheet.prototype.__init__ = function() {
    chai.stack.bottom_sheet = document.getElementsByClassName("chai-bottom-sheet");

    chai.stack.bottom_sheet_overlay = document.createElement("div");
    chai.stack.bottom_sheet_overlay.setAttribute("class", "chai-bottom-sheet-overlay");
    document.body.appendChild(chai.stack.bottom_sheet_overlay);
    chai.stack.bottom_sheet_overlay.addStyles({display: "none"});

    for (var i = 0; i < chai.stack.bottom_sheet.length; i++) {
        var children = chai.stack.bottom_sheet[i].children;

        var parent = chai.stack.bottom_sheet[i];
        parent.addStyles({bottom: "-" + parent.clientHeight + "px"});
        chai.stack.bottom_sheet[i].hide = function() {
            var height = parent.clientHeight;
            parent.addStyles({
                transitionDuration: ".2s",
                bottom: "-" + height + "px",
                opacity: "0",
                visibility: "hidden"
            });
            chai.stack.bottom_sheet_overlay.addStyles({display: "none"});
        };

        chai.stack.bottom_sheet[i].show = function() {
            parent.addStyles({
                transitionDuration: ".2s",
                bottom: "0",
                opacity: "1",
                visibility: "visible"
            });
            chai.stack.bottom_sheet_overlay.addStyles({display: "block"});
        };

        chai.stack.bottom_sheet_overlay.on("click", parent.hide);

        if (helper.isAnimationAvailable()) {
            for (var j = 0; j < children.length; j++) {
                if (children[j].classList.contains("chai-bottom-sheet-element")) {
                    children[j].on(chai.event.onclick, chai.animation.ripple);
                }
            }
        }
    }
};

// BottomSheet.prototype.__init__();

// document.getElementsByTagName("body")[0].on("click", chai.stack.bottom_sheet[0].show);
// document.getElementsByTagName("chai-fab")[0].on("click", function() {
//     alert(0);
// });

// chai.disableElement(document.getElementsByTagName("chai-fab")[0]);

// chai.__init__();

function Dialogs() {}
Dialogs.prototype.__init__ = function() {
    chai.stack.dialog_alert_overlay = document.createElement("div");
    chai.stack.dialog_alert_overlay.setAttribute("class", "chai-dialog-alert-overlay");
    document.body.appendChild(chai.stack.dialog_alert_overlay);
    chai.stack.dialog_alert_overlay.addStyles({display: "none"});

    chai.stack.dialog_overlay = document.createElement("div");
    chai.stack.dialog_overlay.setAttribute("class", "chai-dialog-overlay");
    document.body.appendChild(chai.stack.dialog_overlay);
    chai.stack.dialog_overlay.addStyles({display: "none"});

    chai.stack.dialog_alert_overlay.addEventListener("touchmove", chai.methods.preventDefault, false);
};



// Alert Box
function Alert(title, text) {
    this.dialog_alert = document.createElement("span");
    this.dialog_alert.setAttribute("class", "chai-dialog-alert");
    this.dialog_alert.setAttribute("data-title", title);
    this.dialog_alert.setAttribute("data-text", text);
    document.body.appendChild(this.dialog_alert);

    this.dialog_alert.innerHTML = "<div class='title'>" + title + "</div><div class='text' style='max-height: " + (window.innerHeight / 2) + "px'>" + text + "</div>";

    var btn = document.createElement("span");
    btn.setAttribute("class", "chai-button");
    btn.setAttribute("data-type", "flat");
    btn.innerHTML = "ok";
    this.dialog_alert.appendChild(btn);

    this.onAction = function(callback) {
        btn.addEventListener(chai.event.onclick, callback);
    };
    this.close = function() {
        this.dialog_alert.addStyles({
            top: "60%",
            opacity: "0",
            visibility: "hidden"
        });
        document.getElementsByClassName("chai-dialog-alert-overlay")[0].addStyles({display: "none"});
    };
    this.show = function() {
        this.dialog_alert.addStyles({
            top: "50%",
            opacity: "1",
            visibility: "visible"
        });
        document.getElementsByClassName("chai-dialog-alert-overlay")[0].addStyles({display: "block"});
    };
}


// Confirm Box
function Confirm(title, text) {
    this.dialog_confirm = document.createElement("span");
    this.dialog_confirm.setAttribute("class", "chai-dialog-confirm");
    this.dialog_confirm.setAttribute("data-title", title);
    this.dialog_confirm.setAttribute("data-text", text);
    document.body.appendChild(this.dialog_confirm);

    this.dialog_confirm.innerHTML = "<div class='title'>" + title + "</div><div class='text' style='max-height: " + (window.innerHeight / 2) + "px'>" + text + "</div>";

    var btn1 = document.createElement("span");
    btn1.setAttribute("class", "chai-button");
    btn1.setAttribute("data-type", "flat");
    btn1.innerHTML = "ok";
    this.dialog_confirm.appendChild(btn1);

    var btn2 = document.createElement("span");
    btn2.setAttribute("class", "chai-button");
    btn2.setAttribute("data-type", "flat");
    btn2.innerHTML = "cancel";
    this.dialog_confirm.appendChild(btn2);

    this.onSuccess = function(callback) {
        btn1.addEventListener(chai.event.onclick, callback);
    };
    this.onCancel = function(callback) {
        btn2.addEventListener(chai.event.onclick, callback);
    };
    this.show = function() {
        this.dialog_confirm.addStyles({
            top: "50%",
            opacity: "1",
            visibility: "visible"
        });
        document.getElementsByClassName("chai-dialog-alert-overlay")[0].addStyles({display: "block"});
    };
    this.close = function() {
        this.dialog_confirm.addStyles({
            top: "60%",
            opacity: "0",
            visibility: "hidden"
        });
        document.getElementsByClassName("chai-dialog-alert-overlay")[0].addStyles({display: "none"});
    };
}

// custom dialog
function Dialog(el) {
    this.show = function() {
        el.addStyles({
            top: "50%",
            opacity: "1",
            visibility: "visible"
        });
        document.getElementsByClassName("chai-dialog-overlay")[0].addStyles({display: "block"});
    };

    this.close = function() {
        el.addStyles({
            top: "60%",
            opacity: "0",
            visibility: "hidden"
        });
        document.getElementsByClassName("chai-dialog-overlay")[0].addStyles({display: "none"});
    };

    document.getElementsByClassName("chai-dialog-overlay")[0].addEventListener(chai.event.onclick, function() {
        el.addStyles({
            top: "60%",
            opacity: "0",
            visibility: "hidden"
        });
        this.addStyles({display: "none"});
    });
}


// Dialogs.prototype.__init__();

// var dialog = new Dialog(document.getElementsByClassName("chai-dialog")[0]);
// document.getElementsByClassName("chai-button")[0].on("click", function() {
//     dialog.show();
// });
// document.getElementsByClassName("chai-fab")[0].on("click", function() {
//     dialog.close();
// });
function Forms() {}
Forms.prototype.__init__ = function() {
    chai.stack.search_fields = document.getElementsByClassName("chai-text-field-search");

    for (var i = 0; i < chai.stack.search_fields.length; i++) {
        chai.stack.search_fields[i].innerHTML += "<i class='material-icons'>search</i>";
    }

    // range slider code
    chai.stack.range_slider = document.querySelectorAll("input[type='range']");

    for (var i = 0; i < chai.stack.range_slider.length; i++) {
        chai.stack.range_slider[i].addEventListener("input", function() {
            var min = this.min;
            var max = this.max;
            var val = this.value;
            
            this.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

            if (this.value == 0) {
                this.setAttribute("class", "zero-input");
            } else {
                this.setAttribute("class", "");
            }
            
        }, false);
    }
};

// Forms.prototype.__init__();


// var nav = new NavigationDrawer(document.getElementsByClassName("chai-navigation-drawer")[0]);

// document.getElementById("navbtn").on("click", function() {
//     nav.show();
// });
function Intent(current_activity) {
    chai.stack.activies_stack.push(current_activity);
    this.startActivity = function(act) {
        chai.stack.activies_stack.push(act);
        chai.methods.hideActivities();
        chai.stack.activies_stack[chai.stack.activies_stack.length - 1].addStyles({
            visibility: "visible",
            top: "0",
            opacity: "1"
        });
    };
    this.finish = function() {
        chai.methods.hideActivities();
        chai.stack.activies_stack[chai.stack.activies_stack.length - 2].addStyles({
            visibility: "visible",
            top: "0",
            opacity: "1"
        });
        chai.stack.activies_stack.pop();
    };
}

Intent.prototype.__init__ = function() {
    chai.stack.activies = document.getElementsByClassName("chai-activity");

    chai.methods.hideActivities = function() {
        for (var i = 0; i < chai.stack.activies.length; i++) {
            chai.stack.activies[i].addStyles({
                visibility: "hidden",
                top: "20px",
                opacity: "0"
            });
        }
    };
    chai.methods.hideActivities();
    chai.stack.activies[0].addStyles({
        visibility: "visible",
        top: "0",
        opacity: "1"
    });

    chai.stack.activies_stack = [];
};

// Intent.prototype.__init__();

// var activies = document.getElementsByClassName("chai-activity");
// var intent = new Intent(activies[0]);

// document.getElementById("act1").on("click", function() {
//     intent.startActivity(activies[1]);
// }, false);

// document.getElementById("act2").on("click", function() {
//     intent.finish();
// }, false);

function Loading() {};
Loading.prototype.__init__ = function() {
    chai.stack.loader = document.getElementsByClassName("chai-loading");
    for (var i = 0; i < chai.stack.loader.length; i++) {
        chai.stack.loader[i].innerHTML = '<svg class="chai-loader" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg>';
    }
};
Loading.prototype.changeColor = function(el, color) {
    el.children[0].style.stroke = color;
};

Loading.prototype.__init__();
// Loading.prototype.changeColor(document.getElementsByClassName("chai-loading")[0], "red");
function NavigationDrawer(el) {
    this.overlay = document.createElement("span");
    this.overlay.setAttribute("class", "chai-navigation-drawer-overlay");
    el.appendChild(this.overlay);
    var ov = this.overlay;

    this.overlay.addEventListener(chai.event.onclick, function() {
        el.addStyles({left: "-" + (el.clientWidth + 50) + "px"});
        this.addStyles({
            transitionDuration: "0s",
            left: "0",
            visibility: "hidden"
        });
    });

    this.show = function() {
        el.addStyles({left: "0"});
        this.overlay.addStyles({
            transitionDuration: "0.3s",
            left: el.clientWidth + "px",
            visibility: "visible"
        });
    };

    this.hide = function() {
        el.addStyles({left: "-" + (el.clientWidth + 50) + "px"});
        this.overlay.addStyles({
            transitionDuration: "0s",
            left: "0",
            visibility: "hidden"
        });
    };
}
NavigationDrawer.prototype.__init__ = function() {
    chai.stack.navdraw = document.getElementsByClassName("chai-navigation-drawer");

    for (var i = 0; i < chai.stack.navdraw.length; i++) {
        chai.stack.navdraw[i].addStyles({
            left: "-" + (chai.stack.navdraw[i].clientWidth + 50) + "px"
        });
    }
};
// NavigationDrawer.prototype.__init__();
function TabBar() {}
TabBar.prototype.__init__ = function() {
    chai.stack.tabbar = document.getElementsByClassName("chai-tabbar");

    for (var i = 0; i < chai.stack.tabbar.length; i++) {
        var children = chai.stack.tabbar[i].children;
        for (var j = 0; j < children.length; j++) {
            children[j].style.width = (100 / children.length) + "%";
            if (j === 0) {
                children[j].addClasses(["tab-active"]);
                document.getElementById(children[j].getAttribute("data-target")).style.display = "block";
            }

            // adding ripple animation
            children[j].on(chai.event.onclick, chai.animation.ripple);
            children[j].on(chai.event.onclick, function() {
                var childs = this.parentNode.children;
                for (var k = 0; k < childs.length; k++) {
                    childs[k].removeClasses(["tab-active"]);
                }
                this.addClasses(["tab-active"]);

                var id = this.getAttribute("data-target");
                var el = document.getElementById(id);
                for (var l = 0; l < el.parentNode.children.length; l++) {
                    el.parentNode.children[l].style.display = "none";
                }
                el.style.display = "block";
            });

            // setting text and icons
            if (children[j].getAttribute("data-text") !== null && children[j].getAttribute("data-icon") !== null) {
                children[j].setIconWithText(children[j].getAttribute("data-icon"), children[j].getAttribute("data-text"));
            } else {
                if (children[j].getAttribute("data-text") !== null) {
                    children[j].setText(children[j].getAttribute("data-text"));
                } else if(children[j].getAttribute("data-icon") !== null) {
                    children[j].setIcon(children[j].getAttribute("data-icon"));
                }
            }
        }
    }
};

// TabBar.prototype.__init__();
function Toast(msg, duration, legacy) {
    if (legacy === undefined) { legacy = false; }
    var toast = document.createElement("span");
    
    if (legacy) {
        toast.setAttribute("class", "chai-toast-legacy");
    } else {
        toast.setAttribute("class", "chai-toast");
    }
    toast.innerHTML += "<div class='text'>" + msg + "</div>";
    
    this.hide = function() {
        if (legacy) {
            toast.addStyles({
                opacity: "0",
                visibility: "hidden"
            });
        } else {
            toast.addStyles({
                bottom: "-" + (toast.clientHeight) + "px",
                visibility: "hidden"
            });
        }
    };

    this.show = function() {
        if (legacy) {
            toast.addStyles({
            opacity: "1",
            visibility: "visible"
        });
        } else {
            toast.addStyles({
                bottom: "20px",
                visibility: "visible"
            });
        }

        var t = this;
        setTimeout(function() {
            t.hide();
        }, duration * 1000);
    };

    if (!legacy) {
        this.setOption = function(op, callback) {
            var btn = document.createElement("span");
            btn.setAttribute("class", "chai-button");
            btn.setAttribute("data-type", 'flat');
            btn.setAttribute("data-text", op);
            btn.setAttribute("data-animation", "no-animation");
            btn.addStyles({
                lineHeight: toast.clientHeight + "px"
            });

            btn.addEventListener(chai.event.onclick, callback);
            toast.appendChild(btn);
        }
    }

    document.body.appendChild(toast);
    if (legacy) {
        toast.addStyles({
            opacity: "0"
        });
    } else {
        toast.addStyles({
            bottom: "-" + (toast.clientHeight) + "px"
        });
    }
}
// toast constants
Toast.LENGTH_SHORT = 2;
Toast.LENGTH_LONG = 5;
Toast.LEGACY = true;


// var toast = new Toast("Hello, world!", Toast.LENGTH_SHORT);
// // toast.show();
// toast.setOption("dismiss", function() {
//     toast.hide();
// });

// document.getElementsByClassName("chai-button")[0].on("click", function() {
//     toast.show();
// });

function ChaiUI() {}
ChaiUI.prototype.__init__ = function() {
    DOM.prototype.__init__();

    window.helper = new Helper();
    helper.__init__();

    Animation.prototype.__init__();
    chai.__init__();


    var createElements = new CreateElements();
    createElements.__init__();


    // gui
    BottomSheet.prototype.__init__();
    Dialogs.prototype.__init__();
    Forms.prototype.__init__();
    Intent.prototype.__init__();
    NavigationDrawer.prototype.__init__();
    TabBar.prototype.__init__();
};

ChaiUI.prototype.__init__();


// var dialog = new Dialog(document.getElementsByClassName("chai-dialog")[0]);
// document.getElementsByClassName("chai-button")[0].on("click", function() {
//     dialog.show();
// });
// document.getElementsByClassName("chai-fab")[0].on("click", function() {
//     dialog.close();
// });

var alert = new Confirm("Alert", "Hello, World");
alert.show();
//# sourceMappingURL=chai.js.map
