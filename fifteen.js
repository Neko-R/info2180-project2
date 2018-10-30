//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200

window.onload = function() {
    var puzArea = document.getElementById("puzzlearea");
    var pieces = puzArea.getElementsByTagName("div");
    var shuffle = document.getElementById("shufflebutton");

    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].setAttribute("style", "left: "+String((i*100)%400)+"px; " + "top: "+String(Math.floor(i/4)*100)+"px;" + "background-position: -"+String((i*100)%400)+"px " + String((Math.floor(i/4)*300)%400)+"px;");
        pieces[i].id = String(i+1); //give each puzzle piece a unique id
    };

    $("div.puzzlepiece").hover(enter,leave); //adding event handler to add "movablepiece" to piece's classlist when hovered over and remove class when leave you piece 

    shuffle.onclick = () => { //shuffle pieces
        let index = []; //creating array of indexes for pieces
        for(var j = 0; j<pieces.length;j++)
            index.push(j);

        for (var k = 0; k < pieces.length; k++) { 
            i = index[Math.floor(Math.random()*index.length)]; //get random index

            index = index.filter(function(value, index, arr){ //remove index obtained
                return value != i;
            });
            //placing puzzle piece of index k in position i on board.
            pieces[k].setAttribute("style", "left: "+String((i*100)%400)+"px; " + "top: "+String(Math.floor(i/4)*100)+"px;" + "background-position: -"+String((k*100)%400)+"px " + String((Math.floor(k/4)*300)%400)+"px;");
        }
    }

}

function enter(){ //hover piece
    var p = $("#"+String(this.id)).position();
    if ((Math.ceil(p.top) == 300  && Math.ceil(p.left) == 200) || (Math.ceil(p.top) == 200 && Math.ceil(p.left) == 300)){
        this.classList.add("movablepiece");
    }
}

function leave(){ //leave piece
    this.classList.remove("movablepiece");
}
