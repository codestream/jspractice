'use strict';

window.onload = function () {
    var div = document.createElement("div");
    div.className = "lorem ipsum dolor sit amet consectetur adipisicing lorem ipsum main-col lorem-ipsum";
    div.innerHTML = "It is test div";
    div.setAttribute("id", "testdiv");
    document.body.appendChild(div);

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function removeClass(node, className) {
        if (node !== undefined && className !== undefined) {
            var cn = node.className;
            var rxp = new RegExp('(\\s|^)' + className + '(\\s|$)', "g");
            cn = cn.replace(rxp, " ");
            node.className = cn;
        }
    }

    function hasClass(node, className) {
        return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)', "g"));
    }

    function addClass(node, className) {
        if(hasClass(node,className) == null){
            var classNode = node.className;
            className = ' ' + className;
            node.className = classNode + className;
        }
    }

    addClass(div, "abs");

    console.log(hasClass(div, "abs"));
    removeClass(div, "lorem"); //removed all classes with className lorem
    removeClass(div, "lorem-ipsum");


    console.log(div.className);
};