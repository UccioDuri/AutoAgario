debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
var ContenitoreScript;
var ContenitoreDiv = document.getElementById('container');
var ScriptDaModificare = null;
var ScriptNuovo;
var xhttp;
var BackupTestoScript;
var TestoScript;
var StatoAutoAgario = false;
var FintoMouseX;
var FintoMouseY;

function TrovaScript() {
    var ScriptCaricati = document.getElementsByTagName('script');
    for (var i = ScriptCaricati.length; i >= 0; i--) {
        if (ScriptCaricati[i] && ScriptCaricati[i].getAttribute('src') !== null && ScriptCaricati[i].getAttribute('src').indexOf(urlScriptDaModificare) != -1 ) {
            ScriptDaModificare = ScriptCaricati[i];
            ContenitoreScript = ScriptDaModificare.parentNode;
console.log('Trovato: ' + ScriptDaModificare.getAttribute('src'));
            break;
        }
    }
}

function RichiediScript() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ModificaScript;
    xhttp.open("POST", ScriptDaModificare.getAttribute('src'), true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
console.log('Richiesto: ' + ScriptDaModificare.getAttribute('src'));
}

function ModificaScript() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        BackupTestoScript = xhttp.responseText;
console.log('Scaricato');

        var EspRegQ = / *87 \!\=.*keyCode/;
        var TestoTemp = BackupTestoScript.match(EspRegQ);
        TestoTemp = TestoTemp[0];
        var TestoTemp2 = TestoTemp.replace("87", "65");
        BackupTestoScript = BackupTestoScript.replace(TestoTemp, TestoTemp2 + ' || CambiaStatoAutoAgario();\n' + TestoTemp);

        var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
        var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
        TestoScript = BackupTestoScript.replace(EspRegX, 'FintoMouseX');
        TestoScript = TestoScript.replace(EspRegY, 'FintoMouseY');
console.log('Modificato');

        CambiaScript();
        RipristinaScript();

console.log('Avviato');
    }
}

function CambiaScript() {
    ScriptNuovo = document.createElement("script");
    ScriptNuovo.type = 'text/javascript';
    ScriptNuovo.innerHTML = TestoScript;
    ContenitoreScript.removeChild(ScriptDaModificare);
    ContenitoreScript.appendChild(ScriptNuovo);
    StatoAutoAgario = true;
}

function RipristinaScript() {
    ScriptDaModificare = document.createElement("script");
    ScriptDaModificare.type = 'text/javascript';
    ScriptDaModificare.innerHTML = BackupTestoScript;
    ContenitoreScript.removeChild(ScriptNuovo);
    ContenitoreScript.appendChild(ScriptDaModificare);
    StatoAutoAgario = false;
}

function CambiaStatoAutoAgario() {
    if (StatoAutoAgario) {
        RipristinaScript();
console.log('Ripristinato');
    } else {
        CambiaScript();
console.log('Cambiato');
    }
    return true;
}

function RicominciaPartita() {
    document.getElementById('playBtn').click();
}

TrovaScript();
RichiediScript();
