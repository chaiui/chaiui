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
