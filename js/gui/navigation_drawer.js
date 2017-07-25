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