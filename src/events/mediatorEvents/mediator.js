'use strict';

window.onload = function () {

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

    var mediator = (function () {

        var events;

        events = {};
        return {
            subscribe: function (event_name, callback) {
                if (!events[event_name]) {
                    events[event_name] = [];
                }
                events[event_name].push(callback);
            },

            unsubscribe: function (event_name, callback_) {
                if (arguments.length === 1) {
                    delete events[event_name];
                } else {
                    if (events[event_name]) {
                        events[event_name] = events[event_name].filter(function (callback) {
                            return callback !== callback_;
                        });
                    }
                }
            },

            publish: function (event_name, data) {
                var callbacks;
                var i;

                callbacks = events[event_name];
                if (callbacks && callbacks.length) {
                    for (i = 0; i < callbacks.length; i += 1) {
                        callbacks[i].call(undefined, data);
                    }
                }
            }
        }
    }());

    function measureUserTimeOnPage() {
        var minutes = 5,
            seconds = 60,
            millis = 1000;

        var total = minutes * seconds * millis;

        setTimeout(function () {
            mediator.publish('5minsOnPage', 'You\' ve been spent 5 min on this page');
        }, total);
    }

    measureUserTimeOnPage();

    function onScrollToBottom() {
        var listener = function () {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                mediator.publish('bottomScroll', 'bottom of the page');
                document.removeEventListener('scroll', listener, false);
            }
        };

        document.addEventListener('scroll', listener, false);
    }

    onScrollToBottom();

    function onScrollToRedButton() {
        var element = document.getElementById("red-button");
        if (document.addEventListener) {
            document.addEventListener("scroll", function () {
                var coords = element.getBoundingClientRect();
                var clientWidth = document.documentElement.clientWidth;
                var clientHeight = document.documentElement.clientHeight;

                if (coords.top > 0 && coords.bottom < clientHeight && coords.left > 0
                    && coords.right < clientWidth) {
                    mediator.publish('scrollTillRedButton', 'we see red button!');
                }
            });
        }
    }

    onScrollToRedButton();

    function getEventTarget(event) {
        event = event || window.event;
        return event.target || event.srcElement;
    }


    mediator.subscribe('5minsOnPage', function () {
        console.log("You have been successfully subscribed");
    });

    mediator.subscribe("bottomScroll", function () {
        console.log("You're at the bottom of the page and successfully subscribed");
    });

    mediator.subscribe("scrollTillRedButton", function () {
        console.log("You see red button");
    });

    var getLinkIndex = (function () {
        var links = document.getElementsByTagName("a");

        return {

            getIndex: function () {
                var clickListener = function (event) {
                    for (var i = 0; i < links.length; i++) {
                        if (links[i] == getEventTarget(event)) {
                            console.log("Link number " + i);
                        }
                    }
                };

                document.addEventListener('click', clickListener, false);
            }
        }
    }());

    getLinkIndex.getIndex();
};