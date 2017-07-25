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