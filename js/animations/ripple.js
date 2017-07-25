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