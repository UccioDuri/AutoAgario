// ==UserScript==
// @name         AutoAgario
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Bot for Agario
// @author       Uccio
// @match        http://jeu.video/agario/iframe/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

console.log('Inizia AutoAgario2');

    var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
    var Contenitore;
    var ScriptDaModificare;
    var ScriptNuovo;
    var BackupTestoScript;
    var TestoScript;
    var xhttp;
    var FintoMouseX;
    var FintoMouseY;

    function TrovaScript() {
        var ScriptCaricati = document.getElementsByTagName('script');
        for (var i = ScriptCaricati.length; i >= 0; i--) {
            if (ScriptCaricati[i] && ScriptCaricati[i].getAttribute('src') !== null && ScriptCaricati[i].getAttribute('src').indexOf(urlScriptDaModificare) != -1 ) {
                ScriptDaModificare = ScriptCaricati[i];
                Contenitore = ScriptDaModificare.parentNode;
console.log('Trovato: ' + ScriptDaModificare.getAttribute('src'));
                break;
            }
        }
    }

    function RichiediScript() {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ModificaScript;
        xhttp.open("GET", ScriptDaModificare.getAttribute('src'), true);
        xhttp.send();
console.log('Richiesto: ' + ScriptDaModificare.getAttribute('src'));
    }

    function ModificaScript() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            BackupTestoScript = xhttp.responseText;
console.log('Scaricato');

            var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
            var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
            TestoScript = BackupTestoScript.replace(EspRegX, 'FintoMouseX');
            TestoScript = TestoScript.replace(EspRegY, 'FintoMouseY');
console.log('Modificato');
        }
    }

    function CambiaScript() {
        ScriptNuovo = document.createElement("script");
        ScriptNuovo.type = 'text/javascript';
        ScriptNuovo.innerHTML = TestoScript;
        Contenitore.removeChild(ScriptDaModificare);
        Contenitore.appendChild(ScriptNuovo);
console.log('Cambiato');
    }

    function RipristinaScript() {
        ScriptDaModificare = document.createElement("script");
        ScriptDaModificare.type = 'text/javascript';
        ScriptDaModificare.innerHTML = BackupTestoScript;
        Contenitore.removeChild(ScriptNuovo);
        Contenitore.appendChild(ScriptDaModificare);
console.log('Ripristinato');
    }

    TrovaScript();
    RichiediScript();
    CambiaScript();
    RipristinaScript();

})();
