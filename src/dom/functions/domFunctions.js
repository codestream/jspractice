'use strict';

window.onload = function () {
    var div = document.createElement("div");
    div.className = "lorem ipsum dolor sit amet consectetur adipisicing lorem ipsum";
    div.innerHTML = "It is test div";
    div.setAttribute("id", "testdiv");
    document.body.appendChild(div);

    function removeClass(node, className) {
        var element = document.getElementById(node.id);
        element.classList.remove(className);
    }

    function addClass(node, className) {
        if (className !== "") {
            var classNode = node.className;

            if (classNode.match(className)) {
                return;
            }

            if (classNode != '') {
                className = ' ' + className;
            }

            node.className = classNode + className;
        }

    }

    addClass(div, "red-label"); //correct
    addClass(div, "lorem"); //can't add
    removeClass(div, "lorem"); //removed all classes with className lorem

    console.log(div.className);
};