function Intent(current_activity) {
    chai.stack.activies_stack.push(current_activity);
    this.startActivity = function(act) {
        chai.stack.activies_stack.push(act);
        chai.methods.hideActivities();
        chai.stack.activies_stack[chai.stack.activies_stack.length - 1].addStyles({
            visibility: "visible",
            top: "0",
            opacity: "1"
        });
    };
    this.finish = function() {
        chai.methods.hideActivities();
        chai.stack.activies_stack[chai.stack.activies_stack.length - 2].addStyles({
            visibility: "visible",
            top: "0",
            opacity: "1"
        });
        chai.stack.activies_stack.pop();
    };
}

Intent.prototype.__init__ = function() {
    chai.stack.activies = document.getElementsByClassName("chai-activity");

    chai.methods.hideActivities = function() {
        for (var i = 0; i < chai.stack.activies.length; i++) {
            chai.stack.activies[i].addStyles({
                visibility: "hidden",
                top: "20px",
                opacity: "0"
            });
        }
    };
    chai.methods.hideActivities();
    chai.stack.activies[0].addStyles({
        visibility: "visible",
        top: "0",
        opacity: "1"
    });

    chai.stack.activies_stack = [];
};

// Intent.prototype.__init__();

// var activies = document.getElementsByClassName("chai-activity");
// var intent = new Intent(activies[0]);

// document.getElementById("act1").on("click", function() {
//     intent.startActivity(activies[1]);
// }, false);

// document.getElementById("act2").on("click", function() {
//     intent.finish();
// }, false);
