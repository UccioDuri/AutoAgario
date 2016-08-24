// ==UserScript==
// @name         AutoAgario
// @namespace    http://tampermonkey.net/
// @version      0.2.0.3
// @description  Bot for Agario
// @author       Uccio
// @match        http://jeu.video/agario/iframe/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/UccioDuri/AutoAgario/master/AutoAgarioLoader.js
// @homepage     https://www.twitch.tv/uccioduri
// ==/UserScript==

(function() {
    'use strict';

console.log('Inizia AutoAgarioLoader');

    var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
    var urlScriptSupporto = 'https://rawgit.com/UccioDuri/AutoAgario/master/AutoAgarioScript.js';
    var Contenitore;
    var ScriptSupporto;

    function TrovaScript() {
        var ScriptCaricati = document.getElementsByTagName('script');
        for (var i = ScriptCaricati.length; i >= 0; i--) {
            if (ScriptCaricati[i] && ScriptCaricati[i].getAttribute('src') !== null && ScriptCaricati[i].getAttribute('src').indexOf(urlScriptDaModificare) != -1 ) {
                Contenitore = ScriptCaricati[i].parentNode;
console.log('Trovato: ' + ScriptCaricati[i].getAttribute('src'));
                break;
            }
        }
    }

    function CreaScriptSupporto() {
        ScriptSupporto = document.createElement("script");
        ScriptSupporto.type = 'text/javascript';
        ScriptSupporto.setAttribute('src', urlScriptSupporto);
        Contenitore.appendChild(ScriptSupporto);
console.log('Creato');
    }

    TrovaScript();
    CreaScriptSupporto();

})();
