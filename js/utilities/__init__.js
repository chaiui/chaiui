
function ChaiUI() {}
ChaiUI.prototype.__init__ = function() {
    DOM.prototype.__init__();

    window.helper = new Helper();
    helper.__init__();

    Animation.prototype.__init__();
    chai.__init__();


    var createElements = new CreateElements();
    createElements.__init__();


    // gui
    BottomSheet.prototype.__init__();
    Dialogs.prototype.__init__();
    Forms.prototype.__init__();
    Intent.prototype.__init__();
    NavigationDrawer.prototype.__init__();
    TabBar.prototype.__init__();
};

ChaiUI.prototype.__init__();


// var dialog = new Dialog(document.getElementsByClassName("chai-dialog")[0]);
// document.getElementsByClassName("chai-button")[0].on("click", function() {
//     dialog.show();
// });
// document.getElementsByClassName("chai-fab")[0].on("click", function() {
//     dialog.close();
// });

var alert = new Confirm("Alert", "Hello, World");
alert.show();