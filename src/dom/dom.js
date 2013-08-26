window.onload = function () {

    function getAjaxRequest() {
        var request;

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return request;
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

    function getJSON() {
        var ajaxRequest = getAjaxRequest();
        if (ajaxRequest) {
            ajaxRequest.open("GET", "data.json", true);
            ajaxRequest.send();
            ajaxRequest.onreadystatechange = function () {

                function createDOMElements() {
                    var liElement = document.createElement("li");
                    var link = document.createElement("a");
                    var description = document.createElement("p");
                    var tags = document.createElement("p");
                    return {liElement: liElement, link: link, description: description, tags: tags};
                }

                function appendChildElements() {
                    ulElement.appendChild(liElement);
                    liElement.appendChild(link);
                    liElement.className = "listElement";
                    liElement.appendChild(description);
                    liElement.appendChild(tags);
                }

                function buildDOM() {
                    link.href = parsedJSON.items[i].url;
                    link.innerHTML = parsedJSON.items[i].url;
                    link.innerHTML = link.innerHTML.replace(/((http|https)(:\/\/))/g, "");
                    description.innerHTML = parsedJSON.items[i].description;
                    tags.innerHTML = parsedJSON.items[i].tags;
                }


                if (ajaxRequest.readyState == 4) {
                    var json = ajaxRequest.responseText;
                    var parsedJSON = JSON.parse(json);
                    var ulElement = document.createElement("ul");
                    ulElement.setAttribute("id", "list");
                    document.body.appendChild(ulElement);
                    //create unordered list
                    for (var i = 0; i < parsedJSON.items.length; i++) {
                        var __ret = createDOMElements();
                        var liElement = __ret.liElement;
                        var link = __ret.link;
                        var description = __ret.description;
                        var tags = __ret.tags;

                        appendChildElements();

                        tags.className = "tags";

                        buildDOM();

                        var position = parsedJSON.items[i].tags.indexOf("object");
                        if (position === 0) {
                            //link.style.color = "blue";
                        } else {
                           // link.style.color = "gray";
                        }
                    }

                    var list = document.getElementById("list");
                    var descending = false;
                    list.onclick = function () {
                        sortUnorderedList("list", descending);
                        descending = !descending;
                        return false;
                    };
                }
            };
        }
    }

    getJSON();
};




