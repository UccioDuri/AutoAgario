debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
var ContenitoreScript;
var ContenitoreDiv = document.getElementById('container');
var ScriptDaModificare = null;
var ScriptNuovo;
var TestoScript;
var TestoVarX;
var TestoVarY;
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
        TestoVarX = TestoScript.match(EspRegQ)[0];
        TestoVarY = TestoVarX.replace("87", "65");
        TestoScript = TestoScript.replace(TestoVarX, TestoVarY + ' || CambiaStatoAutoAgario();\n' + TestoVarX);

        var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
        TestoVarX = TestoScript.match(EspRegX)[0];
        TestoScript = TestoScript.replace(EspRegX, '(StatoAutoAgario ? FintoMouseX : ' + TestoVarX + ')');

        var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
        TestoVarY = TestoScript.match(EspRegY)[0];
        TestoScript = TestoScript.replace(EspRegY, '(StatoAutoAgario ? FintoMouseY : ' + TestoVarY + ')');
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
//LoopRandom = setInterval(AggiornaPosizione, TLoopRandom);
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
    if (StatoAutoAgario) {
        AreaGiocoX = AreaGioco.width;
        AreaGiocoY = AreaGioco.height;
    
        FintoMouseX = Math.floor(Math.random() * AreaGiocoX);
        FintoMouseY = Math.floor(Math.random() * AreaGiocoY);

        $(document).trigger($.Event('mousemove'));
    }
}

TrovaScript();
