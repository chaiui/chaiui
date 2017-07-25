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