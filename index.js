var ids=[[],[],[],[],[],[],[],[],[]]

var board=[[],[],[],[],[],[],[],[],[]]
for(var i=0;i<9;i++)
{
    for(var j=0;j<9;j++)
    {
        board[i][j]=0;
        
    }
}
for(var i=0;i<9;i++)
{
    for(var j=0;j<9;j++)
    {
        
        ids[i][j]=document.getElementById(i*9+j+1);
    }
}
console.log(board);


function updateboard(board)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(board[i][j]!=0)
            {
                
                ids[i][j].value=board[i][j];
                

            }
            else
               ids[i][j].value='';
        }
    }
}
function updateboard1(board)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(board[i][j]!=0)
            {
                ids[i][j].classList.add("act");
                ids[i][j].value=board[i][j];
                ids[i][j].disabled=true;

            }
            else
               ids[i][j].value='';
        }
    }
}

function check(board)
{
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
           if(ids[i][j].value=='')
            board[i][j]=0;
            else
            {
              if(ids[i][j].value<'0'||ids[i][j].value>'9')
              {
                  ids[i][j].classList.add("alt");
                  alert("Enter no between 0 and 9");
                  return false;
              }
              else
              {
                ids[i][j].classList.add("act");
            board[i][j]=ids[i][j].value;
            
              }
            }

    }
}
return true;
}


let button=document.getElementById('gen')
let sol=document.getElementById('sol');
var flag=false
button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
         for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            ids[i][j].value=' ';
            board[i][j]=0;

        }
    }

        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        board = response.board
        updateboard1(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    xhrRequest.send()
    flag=true;
}

function canplace(arr, rr, cc, val) {
    for (var row = 0; row < 9; row++) {
        if (arr[row][cc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (arr[rr][col] == val) {
            return false;
        }
    }

    var r = rr - rr % 3;
    var c = cc- cc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cd = c; cd < c + 3; cd++) {
            if (arr[cr][cd] == val) {
                return false;
            }
        }
    }
    return true;

}
function solvethesuduko(board)
{
    solve(board,0,0);
}
var clear=document.getElementById("clc");
function solve(board,row,col)
{
   
    if(row==9)
    {
        updateboard(board);
        return true;
    }
    if(row>=9)
    return ;
    if(col==9)
    {
        
        return solve(board,row+1,0);
    }
    if(board[row][col]!=0)
    {
        
        return solve(board,row,col+1);
    }
    
    for(var i=1;i<=9;i++)
    {
          if(canplace(board,row,col,i))
          {
              
              board[row][col]=i;
              if(solve(board,row,col+1))
              {
                
                return true;
              }
              board[row][col]=0;
          }
    }

    return false;
}

clear.onclick=function()
{  
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            ids[i][j].value='';
            board[i][j]=0;
            ids[i][j].disabled=false;
            ids[i][j].classList.remove("alt");
            ids[i][j].classList.remove("act");
           
        }
    }
    

}
sol.onclick=function(){
   var re= check(board);
   if(!re)
    return;
    var ans=solvethesuduko(board);
    if(ans==false)
    {
        alert("incorrect input");
        clear(board);
    }
}
