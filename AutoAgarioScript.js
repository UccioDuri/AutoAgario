debugger;
console.log('Avviato AutoAgarioScript');

var urlScriptDaModificare = 'http://jeu.video/agario/js/modes/iframe/agario_en.js';
var ContenitoreScript;
var ContenitoreDiv = document.getElementById('container');
var ScriptDaModificare = null;
var ScriptNuovo;
//var xhttp;
var TestoScript;
var StatoAutoAgario = false;
var FintoMouseX;
var FintoMouseY;
var AreaGioco;
var AreaGiocoX;
var AreaGiocoY;

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
//    } else {
//console.log('Scaricamento fallito. readyState = ' + xhttp.readyState + ', status = ' + xhttp.status);
//        
//    }
}

function AvviaAutoAgario() {
    ScriptNuovo = document.createElement("script");
    ScriptNuovo.type = 'text/javascript';
    ScriptNuovo.innerHTML = TestoScript;
    ContenitoreScript.removeChild(ScriptDaModificare);
    ContenitoreScript.appendChild(ScriptNuovo);
    
    AreaGioco = document.getElementById("canvas");
    AreaGiocoX = AreaGioco.style.width;
    AreaGiocoY = AreaGioco.style.height;
console.log('Avviato');
}

function CambiaStatoAutoAgario() {
    StatoAutoAgario = !StatoAutoAgario;
    return true;
}

function RicominciaPartita() {
    document.getElementById('playBtn').click();
console.log('Riavviato');
}

TrovaScript();
