//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200

window.onload = function() {
    var puzArea = document.getElementById("puzzlearea");
    var pieces = puzArea.getElementsByTagName("div");

    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].setAttribute("style", "left: "+String((i*100)%400)+"px; " + "top: "+String(Math.floor(i/4)*100)+"px;");
    };
}
