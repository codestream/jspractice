/**
     * Polyfill section
     */

    /**
     * filter дляб ie
     */
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisp*/) {
            var len = this.length >>> 0;
            if (typeof fun != "function") {
                throw new TypeError();
            }

            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in this) {
                    var val = this[i];
                    if (fun.call(thisp, val, i, this)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    /**
     * indexOf для ie
     */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
            'use strict';
            if (this == null) {
                throw new TypeError();
            }
            var n, k, t = Object(this),
                len = t.length >>> 0;

            if (len === 0) {
                return -1;
            }
            n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }

    /**
     * Проверяем есть ли класс у елемента
     * @param node node
     * @param className className
     * @returns {Array|{index: number, input: string}}
     */
    function hasClass(node, className) {
        return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)', "g"));
    }

    /**
     * getElementsByClassName(className) для ie
     */
    if (!document.getElementsByClassName) {
        HTMLDocument.prototype.getElementsByClassName = function (className) {
            var nodes = document.getElementsByTagName('*');
            return [].filter.call(nodes, function (node) {
                return hasClass(node, className);
            })
        }
    }