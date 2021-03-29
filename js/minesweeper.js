var board_height =15;
var board_width =20;
var bomb_number =30;
// bomb_map initialization
var bomb_map =[];// 0 mean vide , 9 mean bomb , any number between 1 and 8 is the number of surronded bomb
var interface=[];// 0 mean closed ,9 mean oppened , 10 mean flag ,11 mean bomb , 12 mean question mark ,any number between 1 and 8 is the number of surronded bomb
var row =[];
console.log(interface);
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
console.log(interface);
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
    console.log("sico");
    the_board.innerHTML='';   
    for(var j=0;j<board_height;j++){           
        the_board.innerHTML +="<div id ='row"+j+"'class='row'></div>";
        var the_row = document.getElementById("row"+j);
        for(var i=0;i<board_width;i++){
            var square_class="";
            var number="";
            if(interface[j][i]==0){square_class="closed_square";}
            else if(interface[j][i]==9){square_class="open_square";}
            else if(interface[j][i]==10){square_class="flag_square";}
            else if(interface[j][i]==11){square_class="bomb_square";}
            else if(interface[j][i]==12){square_class="question_square";}
            else{square_class="number_square";number =""+interface[j][i];}
            the_row.innerHTML += "<button class='"+square_class+"' oncontextmenu='right_click(" + j + "," + i + ");'  onclick='open1(" + j + "," + i + ");'>"+number+"</button>";//print cell
            
        }
        
    }
}

function right_click(y,x){
    if (interface[y][x]==0)interface[y][x]=10;
    if (interface[y][x]==10)interface[y][x]=12;
    refresh();
}
// open function left click on square
function open1(y,x){
    if (bomb_map[y][x] ==9)game_over();
    else if (bomb_map[y][x] ==0){
        interface[y][x]=9;
        successive_open1();
    }
    else{
        interface[y][x] =bomb_map[y][x];
    }
    refresh();
}
// get board element
the_board =document.getElementById("board");

function game_over(){
    alert("GAME OVER");
}

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
    for(var j=0;j<board_height;j++){
        for(var i=0;i<board_width;i++){

        }
    }    
}

// Get a random integer between two number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  

console.log("sico");