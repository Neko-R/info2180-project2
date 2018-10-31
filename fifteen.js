//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200
var empty = {'row': 3, 'col': 3};

window.onload = function() {
    var puzArea = document.getElementById("puzzlearea");
    var pieces = puzArea.getElementsByTagName("div");
    var shuffle = document.getElementById("shufflebutton");

    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].id = String(i+1); //give each puzzle piece a unique id
        $("#"+String(i+1)).css({"left":String((i*100)%400)+"px", "top":String(Math.floor(i/4)*100)+"px", "background-position": "-"+String((i*100)%400)+"px " + String((Math.floor(i/4)*300)%400)+"px"})
    };

    $("div.puzzlepiece").hover(enter,leave); //adding event handler to add "movablepiece" to piece's classlist when hovered over and remove class when leave you piece 
    $("div.puzzlepiece").click(pressed); //adding event handler for when piece is clicked, it'll move if it can

    shuffle.onclick = () => { //shuffle pieces

        let neighbours = [];
        for (var k = 0; k < pieces.length; k++) { 
            let p = $("#"+String(k+1)).position();
            let r = Math.ceil(p.top)/100;
            let c =  Math.ceil(p.left)/100;
            let pb = neighbour(r,c);
            if(pb[0]){
                neighbours.push({"iD": (k+1), "row":r, "col": c, "pos":pb[1]});
            }
        }
        
        piece = neighbours[Math.floor(Math.random()*neighbours.length)]; //get random piece that can move
        move(piece.iD, piece.pos, piece.row, piece.col); //move piece obtained
        }
   
}

function enter(){ //hover piece
    let p = $("#"+String(this.id)).position();
    let r = Math.ceil(p.top)/100;
    let c =  Math.ceil(p.left)/100;
    if( neighbour(r,c)[0]){
        this.classList.add("movablepiece");
    }
}

function leave(){ //leave piece
    this.classList.remove("movablepiece");
}

function pressed(){ //piece pressed
    let p = $("#"+String(this.id)).position();
    let r = Math.ceil(p.top)/100;
    let c =  Math.ceil(p.left)/100;
    let pb = neighbour(r,c);
    if(pb[0]){
        move(this.id, pb[1], r, c); //move piece if can move
    }
}

function move(id,pos,r,c){ //move piece if it's a neighbour of blank square
    if(pos == "top"){ //if top piece
        $("#"+String(id)).css("top",String((r+1)*100)+"px"); //move down one row 
    }else if(pos == "bottom"){
        $("#"+String(id)).css("top",String((r-1)*100)+"px"); //move up one row
    }else if(pos == "left"){
        $("#"+String(id)).css("left", +String((c+1)*100)+"px"); //move right one column
    }else if(pos == "right"){
        $("#"+String(id)).css("left",String((c-1)*100)+"px"); //move left one column
    }
    empty = {"row": r, "col": c}; //empty coordinates now equals the previous position of piece just pressed
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