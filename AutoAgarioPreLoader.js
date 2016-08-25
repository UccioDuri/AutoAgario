document.addEventListener("beforescriptexecute", function(e) {

    src = e.target.src;
    content = e.target.text;

    if (src.search(urlScriptDaModificare) > -1) {
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
}, false);
