function Forms() {}
Forms.prototype.__init__ = function() {
    chai.stack.search_fields = document.getElementsByClassName("chai-text-field-search");

    for (var i = 0; i < chai.stack.search_fields.length; i++) {
        chai.stack.search_fields[i].innerHTML += "<i class='material-icons'>search</i>";
    }

    // range slider code
    chai.stack.range_slider = document.querySelectorAll("input[type='range']");

    for (var i = 0; i < chai.stack.range_slider.length; i++) {
        chai.stack.range_slider[i].addEventListener("input", function() {
            var min = this.min;
            var max = this.max;
            var val = this.value;
            
            this.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

            if (this.value == 0) {
                this.setAttribute("class", "zero-input");
            } else {
                this.setAttribute("class", "");
            }
            
        }, false);
    }
};

// Forms.prototype.__init__();


// var nav = new NavigationDrawer(document.getElementsByClassName("chai-navigation-drawer")[0]);

// document.getElementById("navbtn").on("click", function() {
//     nav.show();
// });