function ActionBar(el) {
    this.setText = function(text) {
        var children = el.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].classList.contains("chai-actionbar-title")) {
                children[i].innerHTML = text;
            }
        }
    };
}