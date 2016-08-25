debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
var ContenitoreScript;
var ContenitoreDiv = document.getElementById('container');
var ScriptDaModificare = null;
var ScriptNuovo;
var xhttp;
var BackupTestoScript;
var TestoScriptNuovo;
var TestoScriptVecchio;
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

            RichiediScript();
            break;
        }
    }
}

function RichiediScript() {
    $.get(ScriptDaModificare.getAttribute('src'), function(scriptContent) {BackupTestoScript = scriptContent; ModificaScript()});
//    xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = ModificaScript;
//    var Url = ScriptDaModificare.getAttribute('src');
//    var Param = Url.split('?');
//    Url = Param[0];
//    Param = Param[1];
//    xhttp.open("POST", Url, true);
//    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//    xhttp.send(Param);
console.log('Richiesto: ' + ScriptDaModificare.getAttribute('src'));
}

function ModificaScript() {
//    if (xhttp.readyState == 4 && xhttp.status == 200) {
//        BackupTestoScript = xhttp.responseText;
console.log('Scaricato');

        var EspRegQ = / *87 \!\=.*keyCode/;
        var TestoTemp = BackupTestoScript.match(EspRegQ);
        TestoTemp = TestoTemp[0];
        var TestoTemp2 = TestoTemp.replace("87", "65");
        TestoScriptVecchio = BackupTestoScript.replace(TestoTemp, TestoTemp2 + ' || CambiaStatoAutoAgario();\n' + TestoTemp);

        var EspRegX = /[a-zA-Z0-9.]+\.clientX/g;
        var EspRegY = /[a-zA-Z0-9.]+\.clientY/g;
        TestoScriptNuovo = TestoScriptVecchio.replace(EspRegX, 'FintoMouseX');
        TestoScriptNuovo = TestoScriptNuovo.replace(EspRegY, 'FintoMouseY');
console.log('Modificato');

        AvviaAutoAgario();
//    } else {
//console.log('Scaricamento fallito. readyState = ' + xhttp.readyState + ', status = ' + xhttp.status);
//        
//    }
}

function AvviaAutoAgario() {
    ScriptNuovo = document.createElement("script");
    ScriptNuovo.type = 'text/javascript';
    ScriptNuovo.innerHTML = TestoScriptVecchio;
    ContenitoreScript.removeChild(ScriptDaModificare);
    ContenitoreScript.appendChild(ScriptNuovo);
console.log('Avviato');
}

function CambiaScript() {
    ScriptNuovo.innerHTML = TestoScriptNuovo;
    StatoAutoAgario = true;
console.log('Cambiato');
}

function RipristinaScript() {
    ScriptNuovo.innerHTML = TestoScriptVecchio;
    StatoAutoAgario = false;
console.log('Ripristinato');
}

function CambiaStatoAutoAgario() {
    if (StatoAutoAgario) {
        RipristinaScript();
    } else {
        CambiaScript();
    }
    return true;
}

function RicominciaPartita() {
    document.getElementById('playBtn').click();
console.log('Riavviato');
}

TrovaScript();
