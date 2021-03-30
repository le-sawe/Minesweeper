var board_height =15;
var board_width =20;
var bomb_number =30;
var sec = 0;
var bomb_indicator=bomb_number;
// bomb_map initialization
var bomb_map =[];// 0 mean vide , 9 mean bomb , any number between 1 and 8 is the number of surronded bomb
var interface=[];// 0 mean closed ,9 mean oppened , 10 mean flag ,11 mean bomb , 12 mean question mark ,any number between 1 and 8 is the number of surronded bomb
var row =[];
var start = false;  
the_board =document.getElementById("board");
function start_board(){
   // board_height = prompt("Please enter board height:", 15);
    //board_width = prompt("Please enter board width:", 20);
    //bomb_number = prompt("Please enter bomb number:", 30);
    sec = 0;
    board_height =15;
    board_width =20;
    bomb_number =30;
    bomb_indicator=bomb_number;
   // bomb_map initialization
    bomb_map =[];// 0 mean vide , 9 mean bomb , any number between 1 and 8 is the number of surronded bomb
    interface=[];// 0 mean closed ,9 mean oppened , 10 mean flag ,11 mean bomb , 12 mean question mark ,any number between 1 and 8 is the number of surronded bomb
    row =[];
    start = false;  
    // created the bomb map with a board_height row and board_width colum
    for(var i=0;i<board_height;i++){
        row =[];
        for(var j=0;j<board_width;j++){
            row.push(0);
        }
        bomb_map.push(row);
        
    }
    for(var i=0;i<board_height;i++){
        row =[];
        for(var j=0;j<board_width;j++){
            row.push(0);
        }
        interface.push(row);
        
    }

    // distirbute the bombs on the map
    for (var i=0;i<bomb_number;i++){
        var y =getRndInteger(0, board_height);
        var x =getRndInteger(0, board_width);
        if(bomb_map[y][x]==9)i=i-1;
        else{
            bomb_map[y][x]=9;
        }   
    }
    // write the number of surronded bomb for each square on all non bomb square 
    for(var i=0;i<board_height;i++){
        for(var j=0;j<board_width;j++){
            if (bomb_map[i][j]!=9)bomb_map[i][j]=count_bomb_around(i,j);
        }  
    }
    refresh();
}
// get the surrond bomb number function
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

// refresh function
function refresh(){
    // check for win
    check_win();
    // refresh the bomb indicator
    document.getElementById("bomb_indicator").innerHTML=bomb_indicator;
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
            the_row.innerHTML += "<button class='"+square_class+"' oncontextmenu='right_click(" + j + "," + i + ");'  onclick='open1(" + j + "," + i + ");'>"+number+"</button>";//print cell
        }       
    }
}

function right_click(y,x){
    if (interface[y][x]==0 && bomb_indicator>0){interface[y][x]=10;bomb_indicator--;}// set a flag
    else if (interface[y][x]==10){interface[y][x]=12;bomb_indicator++;}// set a question mark
    else if (interface[y][x]==12)interface[y][x]=0;// retrun
    refresh();
}
// open function left click on square
function open1(y,x){
    // start timer
    start=true;
    // if you open a bomb square --> game over
    if (bomb_map[y][x] ==9)game_over();
    // if you open a vide square the square will open and the surrond vide square will open
    else if (bomb_map[y][x] ==0){
        // if you open a square with a flag on it it will counted
        if (interface[y][x]==10)bomb_indicator++;
        interface[y][x]=9;// open the square
        successive_open1(); // open the surrondd squares
    }
    // if a number square oppened the number will apear
    else{
        interface[y][x] =bomb_map[y][x];
        // if the oppened square has a flag the flag will counted
        if (interface[y][x]==10)bomb_indicator++;
    }
    refresh();
}
// get board element


function game_over(){  
    // stop the time
    start=false;
    //descover the board
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if(bomb_map[j][i]==9){interface[j][i]=11;}           
        }
    }   
    // refresh
    refresh();
    alert("GAME OVER");
}
// if you press on vide the surond vide will open and when we arrive to a number will show it
function successive_open1(){
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

// Get a random integer between two number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

// make the right click drop menu disabeled
window.addEventListener("contextmenu", e => e.preventDefault());

// function check win
function check_win(){
    var z=0,s=0;
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
                if(bomb_map[j][i]==9 && interface[j][i]==0)z++;// if we have a flag on bomb z+1
                if(bomb_map[j][i]==0 && interface[j][i]==9)s++;// if we have oppend square on vide square s++
        }
    }
    if(z<bomb_number)return false;// if we dont cover all the bomb return false
    if(s<(board_width * board_width)-bomb_number)return false;// if still a vide square not oppened return false
    // if win
    // descover the bomb_map
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){
            if(bomb_map[j][i]==9){interface[j][i]=11;}    
        }
    }    
    //refresh the page
    refresh();
    alert("win");
}
// Timer 
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    if (start){document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));}  
}, 1000);
