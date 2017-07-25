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