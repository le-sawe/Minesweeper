//initialize some variable 
var loose =false;
var board_height =15; // default board rows
var board_width =20; // default board colums
var bomb_number =30; // default bomb number
var sec = 0; // initial value for the second variable
var bomb_map =[];// 0 mean vide , 9 mean bomb , any number between 1 and 8 is the number of surronded bomb
var interface=[];// 0 mean closed ,9 mean oppened , 10 mean flag ,11 mean bomb , 12 mean question mark ,any number between 1 and 8 is the number of surronded bomb
var row =[];// row used to generate the two array
var start = false;  // boolean variable for the game status
var the_board =document.getElementById("board"); // get the board

// Genereate the board data
function start_board(status){   // status 2 mean restart , status 1 mean advanced option ,0 mean start
    // use default value if its not restart (if its restart the old value will remain)
    if (status !=2){        
        board_height =15;
        board_width =20;
        bomb_number =30;   
    }
    // if its a advance option the user can select the board height and width and bomb number
    if (status==1){
    board_height = prompt("Please enter board height:", 15);
    board_width = prompt("Please enter board width:", 20);
    bomb_number = prompt("Please enter bomb number:", 30);
    }
    // reset the timer
    sec = 0;

   // bomb_map initialization
    bomb_map =[];// 0 mean vide , 9 mean bomb , any number between 1 and 8 is the number of surronded bomb
    interface=[];// 0 mean closed ,9 mean oppened , 10 mean flag ,11 mean bomb , 12 mean question mark ,any number between 1 and 8 is the number of surronded bomb
    row =[];
    start = false;  
    // created the bomb map with a board_height row and board_width colum
    for(var i=0;i<board_height;i++){
        row =[];
        for(var j=0;j<board_width;j++){row.push(0);}
        bomb_map.push(row);      
    }
    // create the interface array
    for(var i=0;i<board_height;i++){
        row =[];
        for(var j=0;j<board_width;j++){row.push(0);}
        interface.push(row);     
    }
    // distirbute the bombs on the map
    for (var i=0;i<bomb_number;i++){
        var y =getRndInteger(0, board_height);
        var x =getRndInteger(0, board_width);
        if(bomb_map[y][x]==9)i=i-1;else{bomb_map[y][x]=9;}   // if there a old bomb on this square just replaced and add 1 to the loop counter
    }
    // write the number of surronded bomb for each square on all non bomb square 
    for(var i=0;i<board_height;i++){
        for(var j=0;j<board_width;j++){
            if (bomb_map[i][j]!=9)bomb_map[i][j]=count_bomb_around(i,j);
        }  
    }
    // refresh the board for the first time
    refresh();
}

// refresh function
function refresh(){
    // check for win
    check_win();
    // refresh the bomb indicator
    document.getElementById("bomb_indicator").innerHTML=bomb_number-flag_counter();
    // clear the board
    the_board.innerHTML='';   
    // print the updated board
    for(var j=0;j<board_height;j++){           
        //print row
        the_board.innerHTML +="<div id ='row"+j+"'class='row'></div>";
        var the_row = document.getElementById("row"+j);
        for(var i=0;i<board_width;i++){
            // print colume
            var square_class="";
            var number="";
            // each cell status has a style
            if(interface[j][i]==0){square_class="closed_square";}
            else if(interface[j][i]==9){square_class="open_square";}
            else if(interface[j][i]==10){square_class="flag_square";}
            else if(interface[j][i]==11){square_class="bomb_square";}
            else if(interface[j][i]==12){square_class="question_square";}
            else{square_class="number_square";number =""+interface[j][i];}
            // print the cell
            the_row.innerHTML += "<button id ='row"+j+"col"+i+"' class='"+square_class+"' onmousedown='square_click(event," + j + "," + i + ");' >"+number+"</button>";//print cell
        }       
    }
}

// get the surrond bomb number function take y and x and return the bomb number arround
function count_bomb_around(y,x){
    var bomb_surond_number =0;    
    if(y>-1 && y< board_height && x+1 < board_width && x+1>-1)if (bomb_map[y][x+1]==9)bomb_surond_number++;
    if(y+1>-1 && y+1< board_height && x+1 < board_width && x+1>-1)if (bomb_map[y+1][x+1]==9)bomb_surond_number++;
    if(y-1>-1 && y-1< board_height && x+1 < board_width && x+1>-1)if (bomb_map[y-1][x+1]==9)bomb_surond_number++;
    if(y>-1 && y< board_height && x-1 < board_width && x-1>-1)if (bomb_map[y][x-1]==9)bomb_surond_number++;
    if(y+1>-1 && y+1< board_height && x-1 < board_width && x-1>-1)if (bomb_map[y+1][x-1]==9)bomb_surond_number++;
    if(y-1>-1 && y-1< board_height && x-1 < board_width && x-1>-1)if (bomb_map[y-1][x-1]==9)bomb_surond_number++;
    if(y+1>-1 && y+1< board_height && x < board_width && x>-1)if (bomb_map[y+1][x]==9)bomb_surond_number++;
    if(y-1>-1 && y-1< board_height && x< board_width && x>-1)if (bomb_map[y-1][x]==9)bomb_surond_number++;   
    return bomb_surond_number;
}

// when a square clicked if its a left click open square , if middle click open surrounding bombs and if its a right click mark the square
function square_click(event,y,x){
    // start timer
    start=true;
    if(event.button==0 && interface[y][x] != 10)open_the_square(y,x);// left click and if the clicked square don t have a flag
    if(event.button==1)open_surrounding_square(y,x); // middle click
    if(event.button==2)mark_the_square(y,x);// right click
    if(loose){game_over(y,x)}else refresh(); // refresh
    
}

// CLICKS FUNCTION------------- Start

// open the selected square (from closed square to open square)
function open_the_square(y,x){
    // if you open a bomb square --> game over
    if (bomb_map[y][x] ==9)loose=true;
    // if you open a vide square the square will open and the surrond vide square will open
    else if (bomb_map[y][x] ==0){    
        interface[y][x]=9;// open the square
        successive_open_the_square(); // open the surrondd squares
    }
    // if a number square oppened the number will apear
    else{interface[y][x] =bomb_map[y][x];}   
}

// open the selected square and the surrounding square
function open_surrounding_square(j,i){
    open_the_square(j,i);
    if(j>-1 && j< board_height && i+1 < board_width && i+1>-1)open_the_square(j,i+1);
    if(j+1>-1 && j+1< board_height && i+1 < board_width && i+1>-1)open_the_square(j+1,i+1);
    if(j-1>-1 && j-1< board_height && i+1 < board_width && i+1>-1)open_the_square(j-1,i+1);
    if(j>-1 && j< board_height && i-1 < board_width && i-1>-1)open_the_square(j,i-1);
    if(j+1>-1 && j+1< board_height && i-1 < board_width && i-1>-1)open_the_square(j+1,i-1);
    if(j-1>-1 && j-1< board_height && i-1 < board_width && i-1>-1)open_the_square(j-1,i-1);
    if(j+1>-1 && j+1< board_height && i < board_width && i>-1)open_the_square(j+1,i);
    if(j-1>-1 && j-1< board_height && i< board_width && i>-1)open_the_square(j-1,i);  
}

// mark the square (flag , question mark )
function mark_the_square(y,x){
    if (interface[y][x]==0 && bomb_number-flag_counter()>0){interface[y][x]=10;}// set a flag
    else if (interface[y][x]==10){interface[y][x]=12;}// set a question mark
    else if (interface[y][x]==12)interface[y][x]=0;// retrun to gray
}

// if you press on vide the surond vide will open and when we arrive to a number will show it
function successive_open_the_square(){
    var x =0;
    while(x< board_height*board_width){
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if (interface[j][i]==9){
                if(j>-1 && j< board_height && i+1 < board_width && i+1>-1)if (bomb_map[j][i+1]==0)interface[j][i+1]=9;else if(bomb_map[j][i+1]!=9)interface[j][i+1]=bomb_map[j][i+1];
                if(j+1>-1 && j+1< board_height && i+1 < board_width && i+1>-1)if (bomb_map[j+1][i+1]==0)interface[j+1][i+1]=9;else if(bomb_map[j+1][i+1]!=9)interface[j+1][i+1]=bomb_map[j+1][i+1];
                if(j-1>-1 && j-1< board_height && i+1 < board_width && i+1>-1)if (bomb_map[j-1][i+1]==0)interface[j-1][i+1]=9;else if(bomb_map[j-1][i+1]!=9)interface[j-1][i+1]=bomb_map[j-1][i+1];
                if(j>-1 && j< board_height && i-1 < board_width && i-1>-1)if (bomb_map[j][i-1]==0)interface[j][i-1]=9;else if(bomb_map[j][i-1]!=9)interface[j][i-1]=bomb_map[j][i-1];
                if(j+1>-1 && j+1< board_height && i-1 < board_width && i-1>-1)if (bomb_map[j+1][i-1]==0)interface[j+1][i-1]=9;else if(bomb_map[j+1][i-1]!=9)interface[j+1][i-1]=bomb_map[j+1][i-1];
                if(j-1>-1 && j-1< board_height && i-1 < board_width && i-1>-1)if (bomb_map[j-1][i-1]==0)interface[j-1][i-1]=9;else if(bomb_map[j-1][i-1]!=9)interface[j-1][i-1]=bomb_map[j-1][i-1];
                if(j+1>-1 && j+1< board_height && i < board_width && i>-1)if (bomb_map[j+1][i]==0)interface[j+1][i]=9;else if(bomb_map[j+1][i]!=9)interface[j+1][i]=bomb_map[j+1][i];
                if(j-1>-1 && j-1< board_height && i< board_width && i>-1)if (bomb_map[j-1][i]==0)interface[j-1][i]=9;else if(bomb_map[j-1][i]!=9)interface[j-1][i]=bomb_map[j-1][i];
            }
            }  
        }       
        x++
    }  
}

// CLICKS FUNCTION-------------  End

// count the flag on the board and return it
function flag_counter(){
    var bomb_left=0;
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if (interface[j][i]==10)bomb_left++;
        }
    }
    return bomb_left;
}

// function check win
function check_win(){
    var z=0,s=0;
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
                if(bomb_map[j][i]==9 && interface[j][i]==10)z++;// if we have a flag on bomb z+1
                if(bomb_map[j][i]!=9 && interface[j][i]!=0)s++;// if the square dont have a bomb and the square close s++
        }
    }
    if(z==bomb_number){game_win();}// if you discover all the bomb position
    else if(s==(board_width * board_width)-bomb_number){game_win();}// if all vide square oppened
    else return false;// if we dont cover all the bomb return false
    // if win
    
    
}

// when game is over 
function game_over(y,x){  
    // stop the time
    start=false;
    //discover the board
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if(bomb_map[j][i]==9){interface[j][i]=11;}           
        }
    }   
    alert("GAME OVER");
    refresh();
    document.getElementById('row'+y+'col'+x).className = "nuclear_square";
}

// when game win
function game_win(){
    // stop the time
    start=false;
    // discover the bomb_map
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if(bomb_map[j][i]==9){interface[j][i]=11;}    
        }
    }    
    alert("WIN");
}

// Get a random integer between two number used on bomb distirbution
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

// make the right click drop menu disabeled
window.addEventListener("contextmenu", e => e.preventDefault());


// Timer 
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    if (start){document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));}  
}, 1000);
