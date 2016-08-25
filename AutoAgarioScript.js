debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
var ContenitoreScript;
var ContenitoreDiv = document.getElementById('container');
var ScriptDaModificare = null;
var ScriptNuovo;
var TestoScript;
var StatoAutoAgario = false;
var FintoMouseX;
var FintoMouseY;
var AreaGioco;
var AreaGiocoX;
var AreaGiocoY;
var LoopRandom;
var TLoopRandom = 1000;

function TrovaScript() {
    var ScriptCaricati = document.getElementsByTagName('script');
    for (var i = ScriptCaricati.length; i >= 0; i--) {
        if (ScriptCaricati[i] && ScriptCaricati[i].getAttribute('src') !== null && ScriptCaricati[i].getAttribute('src').indexOf(urlScriptDaModificare) != -1 ) {
            ScriptDaModificare = ScriptCaricati[i];
            ContenitoreScript = ScriptDaModificare.parentNode;
console.log('Trovato: ' + ScriptDaModificare.getAttribute('src'));

            RichiediScript();
            break;
        }
    }
}

function RichiediScript() {
    $.get(ScriptDaModificare.getAttribute('src'), function(scriptContent) {
        TestoScript = scriptContent;
        ModificaScript();
    });
console.log('Richiesto: ' + ScriptDaModificare.getAttribute('src'));
}

function ModificaScript() {
console.log('Scaricato');

        var EspRegQ = / *87 \!\=.*keyCode/;
        var TestoTemp = TestoScript.match(EspRegQ)[0];
        var TestoTemp2 = TestoTemp.replace("87", "65");
        TestoScript = TestoScript.replace(TestoTemp, TestoTemp2 + ' || CambiaStatoAutoAgario();\n' + TestoTemp);

        var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
        TestoTemp = TestoScript.match(EspRegX)[0];
        TestoScript = TestoScript.replace(EspRegX, '(StatoAutoAgario ? FintoMouseX : ' + TestoTemp + ')');

        var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
        TestoTemp = TestoScript.match(EspRegY)[0];
        TestoScript = TestoScript.replace(EspRegY, '(StatoAutoAgario ? FintoMouseY : ' + TestoTemp + ')');
console.log('Modificato');

        AvviaAutoAgario();
}

function AvviaAutoAgario() {
    ScriptNuovo = document.createElement("script");
    ScriptNuovo.type = 'text/javascript';
    ScriptNuovo.innerHTML = TestoScript;
    ContenitoreScript.removeChild(ScriptDaModificare);
    ContenitoreScript.appendChild(ScriptNuovo);
    
    AreaGioco = document.getElementById("canvas");
console.log('Avviato');
}

function CambiaStatoAutoAgario() {
    if (StatoAutoAgario) {
        clearInterval(LoopRandom);
        StatoAutoAgario = false;
    } else {
        LoopRandom = setInterval(AggiornaPosizione, TLoopRandom);
        StatoAutoAgario = true;
    }
    return true;
}

function RicominciaPartita() {
    document.getElementById('playBtn').click();
console.log('Riavviato');
}

function AggiornaPosizione() {
    AreaGiocoX = AreaGioco.style.width;
    AreaGiocoY = AreaGioco.style.height;
    
    FintoMouseX = Math.floor(Math.random() * AreaGiocoX);
    FintoMouseY = Math.floor(Math.random() * AreaGiocoY);
}

TrovaScript();
