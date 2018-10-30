//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200

window.onload = function() {
    var puzArea = document.getElementById("puzzlearea");
    var pieces = puzArea.getElementsByTagName("div");
    var shuffle = document.getElementById("shufflebutton")

    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].setAttribute("style", "left: "+String((i*100)%400)+"px; " + "top: "+String(Math.floor(i/4)*100)+"px;" + "background-position: -"+String((i*100)%400)+"px " + String((Math.floor(i/4)*300)%400)+"px;");
    };

    shuffle.onclick = () => {
        let index = [];
        for(var j = 0; j<pieces.length;j++)
            index.push(j);

        for (var k = 0; k < pieces.length; k++) { 
            i = index[Math.floor(Math.random()*index.length)];

            index = index.filter(function(value, index, arr){
                return value != i;
            });

            pieces[k].setAttribute("style", "left: "+String((i*100)%400)+"px; " + "top: "+String(Math.floor(i/4)*100)+"px;" + "background-position: -"+String((k*100)%400)+"px " + String((Math.floor(k/4)*300)%400)+"px;");
        }
    }
}

