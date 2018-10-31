//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200
var empty = {'row':3, 'col':3};

window.onload = function() {
    var puzArea = document.getElementById("puzzlearea");
    var pieces = puzArea.getElementsByTagName("div");
    var shuffle = document.getElementById("shufflebutton");

    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].id = String(i+1); //give each puzzle piece a unique id
        $("#"+String(i)).css({"left":String((i*100)%400)+"px", "top":String(Math.floor(i/4)*100)+"px", "background-position": "-"+String((i*100)%400)+"px " + String((Math.floor(i/4)*300)%400)+"px"})
    };

    $("div.puzzlepiece").hover(enter,leave); //adding event handler to add "movablepiece" to piece's classlist when hovered over and remove class when leave you piece 
    $("div.puzzlepiece").click(pressed); //adding event handler for when piece is clicked, it'll move if it can

    shuffle.onclick = () => { //shuffle pieces
        let index = []; //creating array of indexes for pieces
        for(var j = 0; j<=pieces.length;j++)
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
    let p = $("#"+String(this.id)).position();
    if( neighbour( Math.ceil(p.top)/100, Math.ceil(p.left)/100)[0] ){
        this.classList.add("movablepiece");
    }

}

function leave(){ //leave piece
    this.classList.remove("movablepiece");
}

function pressed(){ //piece pressed
    let id = this.id;
    let p = $("#"+String(id)).position();
    let r = Math.ceil(p.top)/100;
    let c =  Math.ceil(p.left)/100;
    move(r,c,id); //move piece if can move
}

function move(r,c,id){ //move piece if it's a neighbour of blank square
    let pb = neighbour(r,c);
    if( pb[0] ){
        if(pb[1] == "top"){ //if top piece
            $("#"+String(id)).css("top",String((r+1)*100)+"px"); //move down one row 
        }else if(pb[1] == "bottom"){
            $("#"+String(id)).css("top",String((r-1)*100)+"px"); //move up one row
        }else if(pb[1] == "left"){
            $("#"+String(id)).css("left", +String((c+1)*100)+"px"); //move right one column
        }else if(pb[1] == "right"){
            $("#"+String(id)).css("left",String((c-1)*100)+"px"); //move left one column
        }
        empty = {"row": r, "col": c}; //empty coordinates now equals the previous position of piece just pressed
    }
}

function neighbour(r,c){ //check if the row-column of piece is a neighbour of blank square
    if((r == (empty.row - 1)) && (c == empty.col)){ //top
        return [true,"top"];
    }else if((r == (empty.row + 1)) && (c == empty.col)){ //bottom
        return [true,"bottom"];
    }else if((c == (empty.col - 1)) && (r == empty.row)){ //left
        return [true,"left"];
    }else if((c == (empty.col + 1)) && (r == empty.row)){//right
        return [true,"right"];
    }else{
        return false; //not a neighbour of blank square
    }
}