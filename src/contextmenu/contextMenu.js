'use strict';
window.onload = function () {

    /**
     * Проверяем есть ли класс у елемента
     * @param node node
     * @param className className
     * @returns {Array|{index: number, input: string}}
     */
    function hasClass(node, className) {
        return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)', "g"));
    }

    function removeClass(node, className) {
        if (node !== undefined && className !== undefined) {
            var cn = node.className;
            var rxp = new RegExp('(\\s|^)' + className + '(\\s|$)', "g");
            cn = cn.replace(rxp, " ");
            node.className = cn;
        }
    }

    function addClass(node, className) {
        if (hasClass(node, className) == null) {
            var classNode = node.className;
            className = ' ' + className;
            node.className = classNode + className;
        }
    }

    function handleRightClick() {
        var menu = document.getElementById("menu");
        var submenu = document.getElementById("submenu");
        var submenu1 = document.getElementById("submenu1");
        var submenu2 = document.getElementById("submenu2");
        if (document.addEventListener) {
            document.addEventListener('contextmenu', function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }

                menu.style.display = (menu.style.display === "none") ? "block" : "none";
                menu.style.top = event.clientY + "px";
                menu.style.left = event.clientX + "px";
                if ((hasClass(submenu, "enabled shift"))
                    && (hasClass(submenu1, "enabled shift"))
                    && (hasClass(submenu2, "enabled shift"))) {
                    removeClass(submenu, "enabled shift");
                    removeClass(submenu1, "enabled shift");
                    removeClass(submenu2, "enabled shift");
                }
            });
        }
    }

    handleRightClick();

    function showChildElements() {
        var element = document.getElementById("marked-item");
        element.onmouseover = function () {
            var submenu = document.getElementById("submenu");
            addClass(submenu, "enabled shift");
        };

        var el = document.getElementById("marked-sub-item");
        el.onmouseover = function () {
            var submenu = document.getElementById("submenu1");
            addClass(submenu, "enabled shift");
        };

        var subEl = document.getElementById("marked-sub-item1");
        subEl.onmouseover = function () {
            var submenu = document.getElementById("submenu2");
            addClass(submenu, "enabled shift");
        };
    }

    showChildElements();
};