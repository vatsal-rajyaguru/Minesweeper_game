var time = 0;
var difficultySelector='';
var difficulty='';

const EASY_ARRAY_LENGTH = 10;
const MEDIUM_ARRAY_LENGTH = 40;
const HARD_ARRAY_LENGTH = 99;

const easy_array = [];
const medium_array = [];
const hard_array = [];
let setTimer='';

var MAX_ROWS = 0;
var MAX_COLS = 0;

for(let i = 0; i<EASY_ARRAY_LENGTH; i++) {
    var rand_1 = Math.floor(Math.random() * (80));

    if (!easy_array.includes(rand_1)) {
        easy_array.push(rand_1);
    }else {
        i--;
    }
}
console.log(easy_array);

for(let i = 0; i<MEDIUM_ARRAY_LENGTH; i++) {
    var rand_2 = Math.floor(Math.random() * (256));

    if (!medium_array.includes(rand_2)) {
        medium_array.push(rand_2);
    } else {
        i--;
    }
}

for(let i = 0; i<HARD_ARRAY_LENGTH; i++) {
    var rand_3 = Math.floor(Math.random() * (480));

    if (!hard_array.includes(rand_3)) {
        hard_array.push(rand_3);
    } else {
        i--;
    }
}


function buildGrid() {
 
setDifficulty();

    // Fetch grid and clear out old elements.
    var grid = document.getElementById("minefield");
    grid.innerHTML = "";

    // Build DOM Grid
    var tile;
    for (var y = 0; y < MAX_ROWS;y++) {
        for (var x = 0; x < MAX_COLS; x++) {
            tile = createTile(x,y);
            grid.appendChild(tile);
        }
    }
    
    var style = window.getComputedStyle(tile);
    var width = parseInt(style.width.slice(0, -2));
    var height = parseInt(style.height.slice(0, -2));
    
    grid.style.width = (MAX_COLS * width) + "px";
    grid.style.height = (MAX_ROWS * height) + "px";
}


counter = 0;
function createTile(x,y) {
    var tile = document.createElement("div");

    tile.classList.add("tile");
    tile.classList.add("hidden");
    tile.setAttribute("id",counter);counter+=1;

    tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click
    tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); // Right Click
    tile.addEventListener("mouseup", handleTileClick); // All Clicks
    
    return tile;
}

function startGame() {
    buildGrid();
    startTimer();
}

function smileyDown() {
   
    var smiley = document.getElementById("smiley");
    smiley.classList.toggle("face_down");
}

function smileyUp() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_down");
}


function handleTileClick(event) {

var num = Number(this.id);

  //left click on a normal tile
    if (event.which === 1) {

       if (recursiveFunction(parseInt(num/MAX_ROWS), num%MAX_COLS,num) === true)
       {
		document.getElementById(String(num)).className += ' mine_hit';

		const h1 = document.createElement('h1');
		h1.innerHTML = "GAME OVER. RESTART WINDOW TO PLAY AGAIN."
		document.getElementsByTagName('body')[0].appendChild(h1);
		window.clearInterval(setTimer)
       }

}
    // Right Click
    else if (event.which === 3) {
        //TODO toggle a tile flag
        this.classList.toggle("flag");
}
}

function isValid(curr_row, curr_column) {
    return (curr_row >= 0) && (curr_row < MAX_ROWS) &&

           (curr_column >= 0) && (curr_column < MAX_COLS);
}


function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
	
}


function isMine(curr_row, curr_column,num) {


	// console.log("mine function")
	
    if (difficulty=='0'){
        if (easy_array.includes(Number(num))) {
			// console.log("hit mine")
            return true;
        } else {return false;}
    } 

    else if (difficulty=='1') {
        if (medium_array.includes(Number(num))) {
            return true;
        } else {return false;}

    } else if (difficulty=='2') {
        if (hard_array.includes(Number(num))) {
            return true;
        } else {return false;}
    }
}


function countAdjacentMines(row, col,num) {
 
    var i;
    var count = 0;
 
    /*

        Count all the mines in the 8 adjacent

        cells
 

            N.W   N   N.E

              \   |   /

               \  |  /

            W----Cell----E

                 / | \

               /   |  \

            S.W    S   S.E
 

        Cell-->Current Cell (row, col)

        N -->  North        (row-1, col)

        S -->  South        (row+1, col)

        E -->  East         (row, col+1)

        W -->  West            (row, col-1)

        N.E--> North-East   (row-1, col+1)

        N.W--> North-West   (row-1, col-1)

        S.E--> South-East   (row+1, col+1)

        S.W--> South-West   (row+1, col-1)

    */

    //----------- 1st Neighbour (North) ------------
        if (isValid (row-1, col) == true)     {

               if (isMine (row-1, col,num-MAX_COLS) == true){
				   count++;
				   
			   }
               
        }
 

    //----------- 2nd Neighbour (South) ------------
        if (isValid (row+1, col) == true)      {

               if (isMine (row+1, col,num+MAX_COLS) == true){
				   count++;
			   }
        }
 

    //----------- 3rd Neighbour (East) ------------
        if (isValid (row, col+1) == true)      {

            if (isMine (row, col+1,num+1) == true)
               {
				   count++;
			   }
        }
 
    //----------- 4th Neighbour (West) ------------
        if (isValid (row, col-1) == true)      {

               if (isMine (row, col-1,num-1) == true)
               {
				   count++;
			   }
        }
 

    //----------- 5th Neighbour (North-East) ------------
        if (isValid (row-1, col+1) == true)      {

            if (isMine (row-1, col+1,num-MAX_COLS+1) == true)
              {
				   count++;
			   }
        }
 

     //----------- 6th Neighbour (North-West) ------------
         if (isValid (row-1, col-1) == true)      {

             if (isMine (row-1, col-1,num-MAX_COLS-1) == true)
               {
				   count++;
			   }
        }
 

     //----------- 7th Neighbour (South-East) ------------
        if (isValid (row+1, col+1) == true)       {

               if (isMine (row+1, col+1,num+MAX_COLS+1) == true)
               {
				   count++;
			   }
        }
 

    //----------- 8th Neighbour (South-West) ------------
        if (isValid (row+1, col-1) == true)       {

            if (isMine (row+1, col-1,num+MAX_COLS-1) == true)
               {
				   count++;
			   }
        }
	update_bomb_count(num,count)
    return (count);
}

function update_bomb_count(num,count) {
	
	if (count == 0) {
		return;
		document.getElementById(String(num)).innerHTML = String(count)
	}
	else {
		document.getElementById(String(num)).innerHTML = String(count)
	}
	
}


function check_tiles(curr_row, curr_column,num,parent_num) {
	
	if (isValid(curr_row, curr_column) == false) { 
    	console.log("bounadry reached");
    	return false; }	//boundary reached. continue recursion tree.

	if (isMine(curr_row,curr_column,num) == true) {  
	   console.log("bomb hit: " + String(num));

	if (document.getElementById(String(parent_num)).innerHTML.length == 0) {
		document.getElementById(String(parent_num)).innerHTML = '1'
	}
	else {
		document.getElementById(String(parent_num)).innerHTML = String(document.getElementById(String(parent_num)).innerHTML) + 1
	}
	document.getElementById(String(num)).classList.contains("recursed")
	return false;  }	//bomb hit

	if (document.getElementById(String(num)).classList.contains("recursed") == true) {
		console.log("tile already checked");
		return false;}
	else {
		reveal(num);
		document.getElementById(String(num)).className += " recursed";
	}
	
	var count = countAdjacentMines(curr_row, curr_column,num);
	
	if (count==0) {
		
			if (isValid(curr_row-1, curr_column) == true) { reveal(num-MAX_COLS); }
			if (isValid(curr_row+1, curr_column) == true) { reveal(num+MAX_COLS); }
			if (isValid(curr_row, curr_column+1) == true) { reveal(num+1); }
			if (isValid(curr_row, curr_column-1) == true) {reveal(num-1);}
			if (isValid(curr_row-1, curr_column+1) == true) {reveal(num-MAX_COLS+1);}
			if (isValid(curr_row-1, curr_column-1) == true) {reveal(num-MAX_COLS-1);}
			if (isValid(curr_row+1, curr_column+1) == true) {reveal(num+MAX_COLS+1);}
			if (isValid(curr_row+1, curr_column-1) == true) {reveal(num+MAX_COLS-1);}
			
		   check_tiles(curr_row-1, curr_column,num-MAX_COLS,parent_num)
		   check_tiles(curr_row+1, curr_column,num+MAX_COLS,parent_num)
		   check_tiles(curr_row, curr_column+1,num+1,parent_num) 
		   check_tiles(curr_row, curr_column-1,num-1,parent_num) 
		   check_tiles(curr_row-1, curr_column+1,num-MAX_COLS+1,parent_num)
		   check_tiles(curr_row-1, curr_column-1,num-MAX_COLS-1,parent_num) 
		   check_tiles(curr_row+1, curr_column+1,num+MAX_COLS+1,parent_num)
		   check_tiles(curr_row+1, curr_column-1,num+MAX_COLS-1,parent_num)
		   	
	}
	else { return false;}
	
}

function reveal(num){
	document.getElementById(String(num)).classList.remove("hidden");

}

function recursiveFunction (curr_row, curr_column,num) {
    console.log(MAX_ROWS, MAX_COLS);

	// check if clicked tile is mine as game over case
    if (isMine(curr_row,curr_column,num) == true) {
        return true;
    } 
        
	check_tiles(curr_row, curr_column,num);
  
    return false;
}


function setDifficulty() {
    var difficultySelector = document.getElementById("difficulty");
    difficulty = difficultySelector.selectedIndex;
    if (difficulty == "0") {
        // this.rows = 9;
        // this.columns = 9;
        MAX_ROWS = 9;
        MAX_COLS = 9;

    } else if (difficulty == "1") {
        // this.rows = 16;
        // this.columns = 16;
        MAX_ROWS = 16;
        MAX_COLS = 16;

    } else if (difficulty == "2") {
        // this.rows = 16;
        // this.columns = 30;
        MAX_ROWS = 30;
        MAX_COLS = 16;
    }

}

let timeValue=0
function startTimer() {
	if (timeValue == 0){
		timeValue = 0;
		setTimer = window.setInterval(onTimerTick, 1000);}
}

function onTimerTick() {
    timeValue++;
    updateTimer();
}

function updateTimer() {
    document.getElementById("timer").innerHTML = timeValue;
}