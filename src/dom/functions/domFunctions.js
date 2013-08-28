'use strict';

window.onload = function () {
    var div = document.createElement("div");
    div.className = "text red test red";
    div.innerHTML = "It is test div";
    document.body.appendChild(div);

    function removeClass(node, className) {
        var classNode = node.className;
        var regex = new RegExp("\\s?\\b" + className + "\\b", "g");
        classNode = classNode.replace(regex, '');
        node.className = classNode;
    }

    removeClass(div, "red");
};