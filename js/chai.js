function __Base__(){}var Base=new __Base__;Base.each=function(e,t){for(var n=Object.keys(e),s=0;s<n.length;s++)t(n[s],e[n[s]])},Base.addStyle=function(e,t){for(var n=Object.keys(t),s=0;s<n.length;s++)e.style[n[s]]=t[n[s]]},Base.select=function(e){var t=new Object,n=0,s=!1;return t.elements=document.querySelectorAll(e),t.index=function(e){return n=e,s=!0,t},t.html=function(e){if(void 0===e)return t.elements[n].innerHTML;if(s)t.elements[n].innerHTML=e;else for(var r=0;r<t.elements.length;r++)t.elements[r].innerHTML=e;return t},t.attr=function(e,r){if(arguments.length>2)throw"expect only '2' arguments, but '"+arguments.length+"' is given";if(void 0===e)throw"required a attrbute name as argument.";if(void 0===r)return t.elements[n].getAttribute(e);if(s)t.elements[n].setAttribute(e,r);else for(var i=0;i<t.elements.length;i++)t.elements[i].setAttribute(e,r);return t},t.addClass=function(e){if(void 0===e)throw"expect an argument, but '"+e+"' is given";if(s){var r=t.elements[n].getAttribute("class");null===r?t.elements[n].setAttribute("class",e):""!==e&&t.elements[n].setAttribute("class",r+" "+e)}else for(var i=0;i<t.elements.length;i++)null===(r=t.elements[i].getAttribute("class"))||0===r.length?t.elements[i].setAttribute("class",e):""!==e&&t.elements[i].setAttribute("class",r+" "+e);return t},t.removeClass=function(e){for(var r=0;r<e.length;r++)if(s){var i=t.elements[n].classList;if(0!==i.length){for(var a="",l=0;l<i.length;l++)i[l]!==e[r]&&(l<i.length-2?a+=i[l]+" ":a+=i[l]);t.elements[n].setAttribute("class",a)}}else for(var o=0;o<t.elements.length;o++)if(0!==(i=t.elements[o].classList).length){for(var a="",l=0;l<i.length;l++)i[l]!==e[r]&&(l<i.length-2?a+=i[l]+" ":a+=i[l]);t.elements[o].setAttribute("class",a)}return t},t.addStyle=function(e){if(s)Base.addStyle(t.elements[n],e);else for(var r=0;r<t.elements.length;r++)Base.addStyle(t.elements[r],e);return t},t.height=function(){return t.elements[n].offsetHeight},t.width=function(){return t.elements[n].offsetWidth},t.parent=function(){return t.elements[n].parentNode},t.children=function(){return t.elements[n].children},t.after=function(e){if("string"!=typeof e){var r=document.createElement("span");r.appendChild(e),e=r.innerHTML}if(s){(a=document.createElement("span")).innerHTML=e;l=a.childNodes;t.elements[n].parentNode.insertBefore(l,t.elements[n].nextSibling)}else for(var i=0;i<t.elements.length;i++){var a=document.createElement("span");a.innerHTML=e;for(var l=a.childNodes,o=0;o<l.length;o++)t.elements[i].parentNode.insertBefore(l[o],t.elements[i].nextSibling)}return t},t.each=function(e){Base.each(t.elements,e)},t},Base.animate=function(e){var t={},n=.25,s=0;return t.duration=function(e){return n=e,t},t.delay=function(e){return s=e,t},t.set=function(t,r){for(var i=Object.keys(r),a="",l={},o=0;o<i.length;o++)l[i[o]]=r[i[o]],a+=i[o]+" "+n+"s "+s+"s "+t+",";a=a.substring(0,a.length-1),console.log(a),Base.addStyle(e,{transition:a,"-webkit-transition":a,"-ms-transition":a,"-moz-transition":a,"-o-transition":a}),Base.addStyle(e,l)},t.ease=function(e,n){"undefined"===e?t.set("ease",n):t.set("ease-"+e,n)},t.linear=function(e){t.set("linear",e)},t.step=function(e,n){t.set("step-"+e,n)},t.cubicBezier=function(e,n){t.set("cubic-bezier("+e.startX+","+e.startY+","+e.endX+","+e.endY+")",n)},t},Base.events=function(e){var t={},n=function(t,n){var s,r={};r.dist=0,e.addEventListener("touchstart",function(e){s=e.touches[0].clientX},!1),r.on=function(t,n){"end"===t&&e.addEventListener("touchend",function(){n()},!1)},e.addEventListener("touchmove",function(e){var i=e.touches[0];if("right"===t){a=i.clientX-s;r.dist=-(screen.width-a)}else if("left"===t){var a=s-i.clientX;r.dist=screen.width-a}n(r)},!1)};return t.on=function(s,r){return"swipeleft"===s?n("left",r):"swiperight"===s?n("right",r):e.addEventListener(s,r,!1),t},t},Base.http=function(e){var t={},n=function(t,n,s){var r={};if(void 0===s)a={};else{for(var i=Object.keys(s),a="",l=0;l<i.length;l++)a+=i[l]+"="+s[i[l]]+"&";a=a.slice(0,-1)}var o=new XMLHttpRequest;r.on=function(e,t){o.addEventListener(e,t,!1)};var u={};o.onreadystatechange=function(){4===o.readyState&&(u.text=o.responseText,u.status=o.status,u.statusText=o.statusText,n(o))},o.open(t,e),o.send(a)};return t.get=function(e,t){return n("GET",e,t),_self},t.post=function(e,t){return n("POST",e,t),_self},t};

function __Chai__() {};
var Chai = new __Chai__();

Chai.initLoading = function() {

  // 40, 20, 20, 15
  Base.select(".chai-loading_spinner").html('<svg class="circle-loader progress" width="30" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="11.25"></svg>');
};

function LoadingSpinner(el) {
  var children = el.children[0];
  console.log(el.children[0]);
  this.setColor = function(color) {
    children.style.stroke = color;
  };
  this.hide = function() {
    el.style.visibility = "hidden";
  };
  this.show = function() {
    el.style.visibility = "visible";
  };
}

function Progress(el) {
  var fill = document.createElement("div");
  fill.setAttribute("class", "chai-loading_progress_fill");
  el.appendChild(fill);

  this.value = 0;
  this.setValue = function(val) {
    this.value = val;
    fill.style.width = val + "%";
  };
  this.setColor = function(color) {
    fill.style.backgroundColor = color;
  };
}

Chai.initSliders = function() {
  Base.select(".chai-slider").each(function(i, el) {
    el.addEventListener("input", function() {
      var min = el.min;
      var max = el.max;
      var val = el.value;

      el.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

      if (el.value == 0) {
        el.setAttribute("class", "chai-slider chai-zero-input");
      } else {
        el.setAttribute("class", "chai-slider");
      }
    }, false);
  });
};

function RangeSlider(el) {
  this.setColor = function(color) {
    Base.addStyle(el, {
      backgroundImage: "-webkit-linear-gradient(" + color + ", " + color + ")",
      backgroundImage: "-moz-linear-gradient(" + color + ", " + color + ")",
      backgroundImage: "-o-linear-gradient(" + color + ", " + color + ")",
      backgroundImage: "linear-gradient(" + color + ", " + color + ")"
    });
    Base.select("style").index(0).html(".chai-slider[type=range]::-webkit-slider-thumb { background-color: " + color + "; }.chai-zero-input[type=range]::-webkit-slider-thumb { background: #FFF; border: 2px solid #BBB; }");
  };
  this.setValue = function(val) {
    el.value = val;

    var min = el.min;
    var max = el.max;

    el.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

    if (el.value == 0) {
      el.setAttribute("class", "chai-slider chai-zero-input");
    } else {
      el.setAttribute("class", "chai-slider");
    }
  };
}

Chai.initButtons = function() {
  Base.select(".chai-button_normal").addClass("chai-button chai-touch-effect");
  Base.select(".chai-button_flat").addClass("chai-button chai-touch-effect");
  Base.select(".chai-button_fab").addClass("chai-button chai-touch-effect");
};

Chai.initBadge = function() {
  Base.select(".chai-badge_material").each(function(i, el) {
    el.innerHTML = "<i class='material-icons'>" + el.innerHTML + "</i>";
  });
  Base.select(".chai-badge_material").each(function(i, el) {
    el.innerHTML += "<span class='chai-badge_count'>" + el.getAttribute("data-badge") + "</span>";
  });

  Base.select(".chai-badge").each(function(i, el) {
    el.innerHTML += "<span class='chai-badge_count'>" + el.getAttribute("data-badge") + "</span>";
  });
};

// Badge class
function Badge(el) {}
Badge.setBadgeCountStyle = function(el, obj) {
  var keys = Object.keys(obj);
  var children = el.children;
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < children.length; j++) {
      if (children[j].classList.contains("chai-badge_count")) {
        children[j].style[keys[i]] = obj[keys[i]];
      }
    }
  }
};




// Badge.setBadgeCountStyle(Base.select(".chai-badge").elements[0], {
//   backgroundColor: "red"
// });

Chai.initChips = function() {
  Base.select(".chai-chip_normal").addClass("chai-chip chai-touch-effect");
  Base.select(".chai-chip_normal_deletable").addClass("chai-chip chai-touch-effect");
  Base.select(".chai-chip_contact").addClass("chai-chip chai-touch-effect");
  Base.select(".chai-chip_contact_deletable").addClass("chai-chip chai-chip_contact chai-touch-effect");
};

Chai.initToggles = function() {
  Base.select(".chai-switch").each(function(i, el) {
    var id = el.children[0].getAttribute("id");
    var label = document.createElement("label");
    label.setAttribute("for", id);
    el.appendChild(label);
  });
};

function Switch(el) {
  this.setColor = function(bgColor, needleColor) {
    var style = ".chai-switch input:checked ~ label { background-color: " + bgColor + "; } .chai-switch input:checked ~ label:after { background-color: " + needleColor + ";}"
    document.getElementsByTagName("style")[1].innerHTML = style;
  }
}

function Checkbox(el) {
  this.setColor = function(bgColor, tickColor) {
    var style = ".chai-checkbox input:checked ~ label:after { background-color: " + bgColor + "; color: " + tickColor + "; }";
    document.getElementsByTagName("style")[2].innerHTML = style;
  };
}

function Radio(el) {
  this.setColor = function(color) {
    var style = ".chai-radio input[type=\"radio\"]:checked + label:before { border-color: " + color + "; } .chai-radio label:after { background-color: " + color + "; }";
    document.getElementsByTagName("style")[3].innerHTML = style;
  };
}

Chai.initDialogs = function() {
  Base.select(".chai-dialog_alert").addClass("chai-dialog");
  Base.select(".chai-dialog_confirm").addClass("chai-dialog");

  Base.select(".chai-dialog_text").addStyle({
    maxHeight: (window.innerHeight / 2) + "px"
  });
};


var removeEvents = function(element) {
  var clone = element.cloneNode();
  while (element.firstChild) {
    clone.appendChild(element.lastChild);
  }
  element.parentNode.replaceChild(clone, element);
};

// alert dialog
function Alert(context, title, message) {
  var el = document.createElement("div");
  var btn = document.createElement("button");
  var action = document.createElement("div");
  action.setAttribute("class", "chai-dialog_action");
  btn.setAttribute("class", "chai-button_flat");
  el.setAttribute("class", "chai-dialog_alert");
  el.innerHTML = '<div class="chai-dialog_title">' + title + '</div><div class="chai-dialog_text">' + message + '</div>';
  btn.innerHTML = "ok";

  action.appendChild(btn);
  el.appendChild(action);
  context.appendChild(el);

  Chai.initButtons();
  Chai.initDialogs();

  this.show = function() {
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "top": "50%",
          "visibility": "visible" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "visibility": "visible"});
    removeEvents(Base.select(".chai-overlay").elements[0]);
  };
  this.close = function() {
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "top": "60%",
          "visibility": "hidden" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "visibility": "hidden"});
  };

  this.onClose = function(callback) {
    btn.addEventListener("touchend", function() {
      callback();
    }, false);
  };

}


// confirm dialog
function Confirm(context, title, message) {
  var el = document.createElement("div");
  var btn = document.createElement("button");
  var btn2 = document.createElement("button");
  var action = document.createElement("div");
  action.setAttribute("class", "chai-dialog_action");
  btn.setAttribute("class", "chai-button_flat");
  btn2.setAttribute("class", "chai-button_flat");
  el.setAttribute("class", "chai-dialog_confirm");
  el.innerHTML = '<div class="chai-dialog_title">' + title + '</div><div class="chai-dialog_text">' + message + '</div>';
  btn.innerHTML = "ok";
  btn2.innerHTML = "cancel";

  action.appendChild(btn2);
  action.appendChild(btn);
  el.appendChild(action);
  context.appendChild(el);

  Chai.initButtons();
  Chai.initDialogs();

  this.show = function() {
    var self = {};
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "top": "50%",
          "visibility": "visible" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "visibility": "visible"});

    removeEvents(Base.select(".chai-overlay").elements[0]);
    self.onOverlayCancel = function(callback) {
      Base.select(".chai-overlay").elements[0].addEventListener("touchend", callback, false);
    };
    return self;
  };
  this.close = function() {
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "top": "60%",
          "visibility": "hidden" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "visibility": "hidden"});
  };

  this.onSuccess = function(callback) {
    btn.addEventListener("touchend", callback, false);
  };
  this.onCancel = function(callback) {
    btn2.addEventListener("touchend", callback, false);
  };
}


// custom disloag
function Dialog(el) {
  var t  = this;
  this.show = function() {
    var self = {};
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "top": "50%",
          "visibility": "visible" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "1",
          "visibility": "visible"});

    self.onOverlayCancel = function(callback) {
      Base.select(".chai-overlay").elements[0].addEventListener("touchend", callback, false);
    };

    return self;
  };

  this.close = function() {
    Base.animate(el)
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "top": "60%",
          "visibility": "hidden" });
    Base.animate(Base.select(".chai-overlay").elements[0])
        .duration(0.1)
        .ease("in", {
          "opacity": "0",
          "visibility": "hidden"});
  };
}

Chai.initSnackBar = function() {
  Base.select(".chai-snackbar").each(function(i, el) {
    el.innerHTML = '<div class="chai-snackbar_text">' + el.innerHTML + '</div>';
  });
};

function SnackBar(el) {
  var t = this;

  this.setAction = function(text, callback) {
    var div = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute("class", "chai-button_flat");
    div.setAttribute("class", "chai-snackbar_action");
    btn.innerHTML = text;
    div.appendChild(btn);
    el.appendChild(div);
    Chai.initButtons();
    btn.addEventListener("touchend", callback, false);
  };

  this.hide = function() {
    el.style.bottom = "-200px";
    el.style.visibility = "hidden";
  };

  this.show = function(timeout) {
    if (timeout === undefined) {
      timeout = 2000;
    }
    Base.animate(el).cubicBezier({
      startX: .4,
      startY: 0,
      endX: 1,
      endY: 1
    }, {
      "visibility": "visible",
      "bottom": "0"
    });
    setTimeout(function() {
      t.hide();
    }, timeout);
  }
}

Chai.initIntent = function() {
  Base.select(".chai-activity").addStyle({
    "z-index": "-1",
    "visibility": "hidden",
    "opacity": "0"
  });
  Base.select(".chai-activity").index(0).addStyle({
    "visibility": "visible",
    "opacity": "1",
    "z-index": "1"
  });
}


function Intent(activity) {
  var stack = [activity];

  this.startActivity = function(target) {
    stack.push(target);
    Base.addStyle(stack[stack.length - 2], { "z-index": "-1" });
    Base.addStyle(stack[stack.length - 1], { "z-index": "1" });

    Base.animate(stack[stack.length - 1]).duration(.15).ease("in", {
      "visibility": "visible",
      "opacity": "1"
    });
    Base.animate(stack[stack.length - 2]).duration(1).ease("in", {
      "visibility": "hidden",
      "opacity": "0"
    });
  };

  this.finish = function() {
    var self = {};

    self.onFirstActivity = function(callback) {
      if (stack.length == 1) {
        callback();
      }
    };

    if (stack.length != 1) {
      Base.addStyle(stack[stack.length - 1], { "z-index": "-1" });
      Base.addStyle(stack[stack.length - 2], { "z-index": "1" });
      console.log(stack[stack.length - 1]);
      console.log(stack[stack.length - 2]);

      Base.animate(stack[stack.length - 2]).duration(.15).ease("in", {
        "visibility": "visible",
        "opacity": "1",
        "z-index": "1"
      });
      Base.animate(stack[stack.length - 1]).duration(.1).ease("in", {
        "visibility": "hidden",
        "opacity": "0",
        "z-index": "-1"
      });
      stack.pop();
    }
    return self;
  };
}

Chai.__init__ = function() {
  var ov = document.createElement("div");
  ov.setAttribute("class", "chai-overlay");
  document.body.insertBefore(ov, document.body.firstChild);

  if (document.getElementsByTagName("style").length === 0) {
    var style = document.createElement("style");
    style.setAttribute("media", "screen");
    document.getElementsByTagName("head")[0].appendChild(style);

    var style2 = document.createElement("style");
    style2.setAttribute("media", "screen");
    document.getElementsByTagName("head")[0].appendChild(style2);

    var style3 = document.createElement("style");
    style3.setAttribute("media", "screen");
    document.getElementsByTagName("head")[0].appendChild(style3);

    var style4 = document.createElement("style");
    style4.setAttribute("media", "screen");
    document.getElementsByTagName("head")[0].appendChild(style4);
  }

  Chai.initLoading();
  Chai.initSliders();
  Chai.initBadge();
  Chai.initToggles();
  Chai.initButtons();
  Chai.initChips();
  Chai.initDialogs();
  Chai.initSnackBar();
  Chai.initIntent();

  // adding touch effect element
  Base.select(".chai-touch-effect").each(function(i, el) {
    el.innerHTML = "<span class='chai-touch-effect_overlay'></span>" + el.innerHTML;
  });
};

// initilize Chai functionalities
Chai.__init__();


// your code below here

//# sourceMappingURL=chai.js.map
