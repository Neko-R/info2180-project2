//INFO2180 - Web Development I
//Project 2 - The Fifteen Puzzles
//ID - 620100200

var empty = {'row': 3, 'col': 3}; //keep track of the position of the empty square
var puzArea; //full puzzle area
var pieces; //nodelist of puzzle pieces
var shuffle; //shuffle button
var testWin = {}; //boolen for each piece for whether they in correct spot
var win = true;

window.onload = function() {
    puzArea = document.getElementById("puzzlearea");
    pieces = puzArea.getElementsByTagName("div");
    shuffle = document.getElementById("shufflebutton");
    
    for (var i = 0; i < pieces.length; i++) { 
        pieces[i].classList.add("puzzlepiece"); 
        pieces[i].id = String(Math.floor(i/4)) + String(((i*100)%400)/100); //give each puzzle piece a unique id (rc - row column)
        testWin[pieces[i].id] =  true; //initialize testWin for piece to true since they will start off in correct position
        $("#"+pieces[i].id).css({"left":String((i*100)%400)+"px", "top":String(Math.floor(i/4)*100)+"px", "background-position": "-"+String((i*100)%400)+"px " + String((Math.floor(i/4)*300)%400)+"px"})
    };

    $("div.puzzlepiece").hover(enter,leave); //adding event handler to add "movablepiece" to piece's classlist when hovered over and remove class when leave you piece 
    $("div.puzzlepiece").click(pressed); //adding event handler for when piece is clicked, it'll move if it can

    shuffle.onclick = shufflePieces;
}

function enter(){ //hover piece
    if(!win){
        let p = $("#"+String(this.id)).position(); //get the value of the piece's 'top' and 'left' attribute
        let r = Math.ceil(p.top)/100; //vaue of top attribute (0-3)
        let c =  Math.ceil(p.left)/100; //value of left attribute (0-3)
        if( neighbour(r,c)[0]){ //check if it's a neighbour
            this.classList.add("movablepiece");
        }
    }
}

function leave(){ //leave piece
    this.classList.remove("movablepiece");
}

function pressed(){ //piece pressed
    if(!win){
        let p = $("#"+String(this.id)).position(); //get the value of the piece's 'top' and 'left' attribute
        let r = Math.ceil(p.top)/100; //vaue of top attribute (0-3)
        let c =  Math.ceil(p.left)/100; //value of left attribute (0-3)
        let pb = neighbour(r,c);
        if(pb[0]){
        move(this.id, pb[1], r, c,true); //move piece if can move
        }
    }
}

function move(id,pos,r,c,a){ //move piece if it's a neighbour of blank square
    let coord;
    if(pos == "top"){ //if top piece
        if(a){
            aniMoveFromTop(id,r*100,(r+1)*100); //move down one row 
        }else{
            $("#"+id).css("top", String((r+1)*100)+"px"); 
        }
        coord = String(r+1)+String(c);
    }else if(pos == "bottom"){
        if(a){
            aniMoveFromBttm(id,r*100,(r-1)*100); //move up one row 
        }else{
            $("#"+id).css("top", String((r-1)*100)+"px"); 
        }
        coord = String(r-1)+String(c);
    }else if(pos == "left"){
        if(a){
            aniMoveFromLeft(id,c*100,(c+1)*100); //move up one row 
        }else{
            $("#"+id).css("left", String((c+1)*100)+"px"); 
        }
        coord = String(r)+String(c+1);
    }else if(pos == "right"){
        if(a){
            aniMoveFromRight(id,c*100,(c-1)*100); //move up one row 
        }else{
            $("#"+id).css("top", String((c-1)*100)+"px"); 
        }
        coord = String(r)+String(c-1);
    }
    if(id == coord){ //if current position of piece is the same as its id (which indicates the correct position it should be in)
        testWin[id] = true; // set testWin for piece to true since it is in correct position
        checkWin(); //check if all pieces are in correct position
    }else{
        testWin[id] = false; //set testWin to false since piece is not in correct position
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

function shufflePieces(){ //shuffle pieces
    win = false; //set win to false for new game since board is now shuffled
    for(var j = 0; j<50; j++){
        let neighbours = []; //array to hold neighbours of empty square
        for (var k = 0; k < pieces.length; k++) { 
            let p = $("#"+pieces[k].id).position(); //get the value of the piece's 'top' and 'left' attribute
            let r = Math.ceil(p.top)/100; //vaue of top attribute (0-3)
            let c =  Math.ceil(p.left)/100; //value of left attribute (0-3)
            let pb = neighbour(r,c);
            if(pb[0]){
                neighbours.push({"iD": pieces[k].id, "row":r, "col": c, "pos":pb[1]}); //add neighbour to array
            }
        }
        
        piece = neighbours[Math.floor(Math.random()*neighbours.length)]; //get random piece that can move
        move(piece.iD, piece.pos, piece.row, piece.col,false); //move piece obtained
    }
}

function checkWin(){ //check is pieces are in correct order/position
    let final = true;
    for(var j = 0; j < pieces.length; j++){ //checking if testWin is true for all pieces
         final = final && testWin[pieces[j].id];
    }
    if(final){ // if testWin is true for all then game Won
        alert("You Won!");
        win = true; 
    }
}

function aniMoveFromTop(id,cur,fut){
    var pos = cur;
    var t = setInterval(frame, 5);
    function frame() {
        if (pos == fut) {
            clearInterval(t);
        } else {
            pos++; 
            $("#"+id).css("top",String(pos)+"px"); 
        }
    }
}

function aniMoveFromBttm(id,cur,fut){
    var pos = cur;
    var t = setInterval(frame, 5);
    function frame() {
        if (pos == fut) {
            clearInterval(t);
        } else {
            pos--; 
            $("#"+id).css("top",String(pos)+"px"); 
        }
    }
}

function aniMoveFromLeft(id,cur,fut){
    var pos = cur;
    var t = setInterval(frame, 5);
    function frame() {
        if (pos == fut) {
            clearInterval(t);
        } else {
            pos++; 
            $("#"+id).css("left",String(pos)+"px"); 
        }
    }
}

function aniMoveFromRight(id,cur,fut){
    var pos = cur;
    var t = setInterval(frame, 5);
    function frame() {
        if (pos == fut) {
            clearInterval(t);
        } else {
            pos--; 
            $("#"+id).css("left",String(pos)+"px"); 
        }
    }
}