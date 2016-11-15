// ==UserScript==
// @name         Fix Jenkins Silly Dropdown menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix Jenkins Silly Dropdown menu
// @author       Happy Hacking Hans
// @match        http://eng-scmsrv-02.morphodetection.com:8080/*
// @grant        none
// ==/UserScript==


function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}


(function() {
    'use strict';

    var target = document.getElementById("breadcrumbs");
    triggerMouseEvent(target, "click");

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var items      = JSON.parse(xmlhttp.responseText).items;

                var side_panel = document.getElementById("side-panel");
                var container  = document.createElement('div');

                side_panel.insertBefore(container, side_panel.childNodes[0]);
                if (navigator.platform.substr(0, 3) == "Win") 
                    side_panel.insertBefore(document.createTextNode("MickeySoft Sux"), side_panel.childNodes[0]);
                for (var item of items) {
                    var button = document.createElement('input');

                    button.setAttribute('type',  'button');
                    button.setAttribute('name',  item.displayName);
                    button.setAttribute('value', item.displayName);
                    button.setAttribute('onclick', "location.href='" + item.url + "';");
                    button.style.minWidth  = "200px";
                    button.style.textAlign = "left";

                    container.appendChild(button);
                }
            } else if (xmlhttp.status == 400)
                console.log('There was an error 400');
            else
                console.log('something else other than 200 was returned');
         }
    };

    xmlhttp.open("GET", "/childrenContextMenu", true);
    xmlhttp.send();
})();
