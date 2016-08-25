// ==UserScript==
// @name         AutoAgarioPreLoader
// @namespace    AutoAgarioByUccio
// @version      0.0.0.2
// @description  Bot for Allkeyshop.com Agario
// @author       Uccio
// @match        http://jeu.video/agario/iframe/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/UccioDuri/AutoAgario/master/AutoAgarioPreLoader.js
// @homepage     https://www.twitch.tv/uccioduri
// @run-at       document-start
// ==/UserScript==

debugger;
console.log('Inizia AutoAgarioPreLoader');

document.addEventListener("beforescriptexecute", function(e) {

    src = e.target.src;
    content = e.target.text;

    if (src.search(urlScriptDaModificare) > -1) {
console.log('Trovato script');
        // Stop original script
        e.preventDefault();
        e.stopPropagation();
        window.jQuery(e.target).remove();

//        var script = document.createElement('script');

//        script.textContent = 'script you want';

//        (document.head || document.documentElement).appendChild(script);
//        script.onload = function() {
//            this.parentNode.removeChild(this);
//        }
    }
}, true);

