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