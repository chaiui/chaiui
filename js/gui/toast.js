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