# Minesweeper
it s a puzzle game , 1 player , you have to catch all the mine :
            the code :
                declear some variable and get some element from the html document
                start board function with parameter for the situation (restart , default , advanced option)
                    set loose equal false
                    clear the bomb map and the interface
                    create  the interface
                    put bombs randomly on the map
                    write the number of surronding bomb for each square on the bomb map
                    refresh
                refresh funciton :
                    check win
                    clear the board 
                    print the board 
                count bomb around function
                square click function :
                    start timer 
                    open the square , open the surronding square , mark the square
                open the square function :
                    if the square oppened was a bomb then loose
                    if the square oppened was flag dont open
                    if the square was vide then open the square and the succesive vide square on contact
                    if the square contain a number then display it 
                open surronding square function 
                mark the square function 
                    right click to mark the square flag , question mark , vide 
                successive open square function 
                    for every vide square on the board and have  contact with a vide square should open 
                flag counter function
                check win function 
                    if all the bomb was marked by flage or all the vide square oppened
                game over function
                game win function 
