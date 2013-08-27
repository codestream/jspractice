'use strict';

window.onload = function () {

    function getAjaxRequest() {
        var ajaxRequest;

        if (window.XMLHttpRequest) {
            ajaxRequest = new XMLHttpRequest();
        } else {
            ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return ajaxRequest;
    }

    function loadJSON() {
        var request = getAjaxRequest();
        request.open('get', "data.json");
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                handleResponse(request);
            }
        };

        request.send();
    }

    loadJSON();

    function createDOMElements() {
        var liElement = document.createElement("li");
        var link = document.createElement("a");
        var description = document.createElement("p");
        var tags = document.createElement("p");
        return {liElement: liElement, link: link, description: description, tags: tags};
    }

    function appendChildElements(ulElement, liElement, link, description, tags) {
        ulElement.appendChild(liElement);
        liElement.appendChild(link);
        liElement.appendChild(description);
        liElement.appendChild(tags);
    }

    function setTagElementsClass(tags) {
        tags.className = "tags";
    }

    function buildDOM(link, parsedJSON, i, description, tags) {
        link.href = parsedJSON.items[i].url;
        link.innerHTML = parsedJSON.items[i].url;
        link.innerHTML = link.innerHTML.replace(/((http|https)(:\/\/))/g, "");
        description.innerHTML = parsedJSON.items[i].description;
        tags.innerHTML = parsedJSON.items[i].tags;
    }

    function setLinkBackgroundColor(parsedJSON, i, link) {
        var position = parsedJSON.items[i].tags.indexOf("object");
        if (position === 0) {
            link.style.backgroundColor = "#C2F5E7";
        }
        return position;
    }

    function createULElement() {
        var ulElement = document.createElement("ul");
        ulElement.setAttribute("id", "list");
        document.body.appendChild(ulElement);
        return ulElement;
    }

    function sortUnorderedList(ul, sortDescending) {
        if (typeof ul == "string") {
            ul = document.getElementById(ul);
        }

        var lis = ul.getElementsByTagName("LI");
        var vals = [];

        for (var i = 0, l = lis.length; i < l; i++) {
            vals.push(lis[i].innerHTML);
        }

        vals.sort();

        if (sortDescending) {
            vals.reverse();
        }

        for (var i = 0, l = lis.length; i < l; i++) {
            lis[i].innerHTML = vals[i];
        }
    }

    function sortListEvent() {
        var list = document.getElementById("list");
        var descending = false;
        list.onclick = function () {
            sortUnorderedList("list", descending);
            descending = !descending;
            return false;
        };
    }

    function handleResponse(ajaxRequest) {
        var json = ajaxRequest.responseText;
        var parsedJSON = JSON.parse(json);
        var ulElement = createULElement();
        for (var i = 0; i < parsedJSON.items.length; i++) {
            var elements = createDOMElements();
            var liElement = elements.liElement;
            var link = elements.link;
            var description = elements.description;
            var tags = elements.tags;

            appendChildElements(ulElement, liElement, link, description, tags);

            setTagElementsClass(tags);

            buildDOM(link, parsedJSON, i, description, tags);

            setLinkBackgroundColor(parsedJSON, i, link);
        }

        sortListEvent();
    }
};



