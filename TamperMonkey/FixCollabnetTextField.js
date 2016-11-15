// ==UserScript==
// @name         Fix Collabnet Flex Fields
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Flex fields extend beyond normal bounds
// @author       Hans Kramer
// @match        https://mdi.collab.net/sf/*/artf*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var text_nodes = document.getElementsByClassName("flexfield");

    for (var node of text_nodes)
        node.style.width = "100%";
})();
