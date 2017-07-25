function BottomSheet() {}
BottomSheet.prototype.__init__ = function() {
    chai.stack.bottom_sheet = document.getElementsByClassName("chai-bottom-sheet");

    chai.stack.bottom_sheet_overlay = document.createElement("div");
    chai.stack.bottom_sheet_overlay.setAttribute("class", "chai-bottom-sheet-overlay");
    document.body.appendChild(chai.stack.bottom_sheet_overlay);
    chai.stack.bottom_sheet_overlay.addStyles({display: "none"});

    for (var i = 0; i < chai.stack.bottom_sheet.length; i++) {
        var children = chai.stack.bottom_sheet[i].children;

        var parent = chai.stack.bottom_sheet[i];
        parent.addStyles({bottom: "-" + parent.clientHeight + "px"});
        chai.stack.bottom_sheet[i].hide = function() {
            var height = parent.clientHeight;
            parent.addStyles({
                transitionDuration: ".2s",
                bottom: "-" + height + "px",
                opacity: "0",
                visibility: "hidden"
            });
            chai.stack.bottom_sheet_overlay.addStyles({display: "none"});
        };

        chai.stack.bottom_sheet[i].show = function() {
            parent.addStyles({
                transitionDuration: ".2s",
                bottom: "0",
                opacity: "1",
                visibility: "visible"
            });
            chai.stack.bottom_sheet_overlay.addStyles({display: "block"});
        };

        chai.stack.bottom_sheet_overlay.on("click", parent.hide);

        if (helper.isAnimationAvailable()) {
            for (var j = 0; j < children.length; j++) {
                if (children[j].classList.contains("chai-bottom-sheet-element")) {
                    children[j].on(chai.event.onclick, chai.animation.ripple);
                }
            }
        }
    }
};

// BottomSheet.prototype.__init__();

// document.getElementsByTagName("body")[0].on("click", chai.stack.bottom_sheet[0].show);