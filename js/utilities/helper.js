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
