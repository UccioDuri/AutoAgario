//debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'https://jeu.video/agario/js/modes/iframe/agario_en.js';
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
var MaxTLoopRandom = 5000;
var DivFinePartita = document.getElementById('overlays');
var PulsanteGioca = document.getElementById('playBtn');
var DivPubblicita = document.getElementById('interModal');
var PulsanteChiudiPub = DivPubblicita.children[0].children[0].children[0].children[0];
var DivLivello = document.getElementById('levelModal');
var PulsanteChiudiLvl = DivLivello.children[0].children[0].children[0].children[0];


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

        var EspRegQ = / *87 *\!\=.*?keyCode/;
        TestoVarX = TestoScript.match(EspRegQ)[0];
        TestoVarY = TestoVarX.replace("87", "65");
        TestoScript = TestoScript.replace(TestoVarX, TestoVarY + ' || CambiaStatoAutoAgario();\n' + TestoVarX);

        var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
        TestoVarX = TestoScript.match(EspRegX)[0];
        TestoScript = TestoScript.replace(EspRegX, '((StatoAutoAgario === true) ? FintoMouseX : ' + TestoVarX + ')');

        var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
        TestoVarY = TestoScript.match(EspRegY)[0];
        TestoScript = TestoScript.replace(EspRegY, '((StatoAutoAgario === true) ? FintoMouseY : ' + TestoVarY + ')');
console.log('Modificato');
//TestoScript = TestoScript.replace(/mousemove\: function \(a\) \{/, "mousemove: function (a) {\ndebugger;\n");

        AvviaAutoAgario();
}

function AvviaAutoAgario() {
    ScriptNuovo = document.createElement("script");
    ScriptNuovo.type = 'text/javascript';
    ScriptNuovo.innerHTML = TestoScript;
    ContenitoreScript.removeChild(ScriptDaModificare);
    ContenitoreScript.appendChild(ScriptNuovo);
    
console.log('Avviato');
}

function CambiaStatoAutoAgario() {
    if (StatoAutoAgario) {
        clearTimeout(LoopRandom);

        StatoAutoAgario = false;
    } else {
        
        AreaGioco = document.getElementById("canvas");
        AreaGiocoX = AreaGioco.width;
        AreaGiocoY = AreaGioco.height;

        StatoAutoAgario = true;

        AggiornaPosizione();
    }
console.log('Nuovo stato: ' + StatoAutoAgario);
    return true;
}

function RicominciaPartita() {
    if (DivPubblicita.style.display == 'block') {
        PulsanteChiudiPub.click();
    }
    if (DivLivello.style.display == 'block') {
        PulsanteChiudiLvl.click();
    }
    PulsanteGioca.click();

    AreaGioco = document.getElementById("canvas");
    AreaGiocoX = AreaGioco.width;
    AreaGiocoY = AreaGioco.height;

console.log('Riavviato');
}

function AggiornaPosizione() {
    if (StatoAutoAgario === true) {
        if (DivFinePartita.style.display == 'block') {
            RicominciaPartita();

            LoopRandom = setTimeout(AggiornaPosizione, 500);
        } else {

            FintoMouseX = parseInt(Math.random() * AreaGiocoX);
            FintoMouseY = parseInt(Math.random() * AreaGiocoY);

            var e = new Event('mousemove');
            AreaGioco.dispatchEvent(e);

            LoopRandom = setTimeout(AggiornaPosizione, parseInt(Math.random() * MaxTLoopRandom));
        }
    }
}

TrovaScript();
