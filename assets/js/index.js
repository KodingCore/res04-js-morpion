const body = document.querySelector("body");
const mainGrid = document.createElement("main");
const divWin = document.createElement("h1");
divWin.classList.add("win");
body.appendChild(divWin);

let joueur1Win =  false;
let joueur2Win =  false;
let winText;

let allBoxes = [];
let checkedJ1ClassList = []; //Boxes checké par le joueur 1
let checkedJ2ClassList = []; //Boxes checké par le joueur 2

let turn = "joueur1";

function gridCreation()
{
    
    body.appendChild(mainGrid);
    mainGrid.classList.add("grid");
    
    let newBox = null;
    
    let rowsCounter = 1;
    let columnsCounter = 1;
    
    for(let i= 0 ; i < 9; i++)
    {
        
        newBox = document.createElement("div");
        mainGrid.appendChild(newBox);
        newBox.classList.add("box-" + rowsCounter + "-" + columnsCounter);
        
        allBoxes.push(newBox);
        
        newBox.style.gridRowStart = rowsCounter;
        newBox.style.gridColumnStart = columnsCounter;
        
        columnsCounter++;
        
        if(columnsCounter > 3)
        {
            
            rowsCounter++;
            columnsCounter = 1;
        }
    }
}

function clickBoxListener()
{   
    for(let box of allBoxes)
    {
        box.addEventListener("click", function(event)
        {
            if(!joueur1Win && !joueur2Win && allBoxes.lastIndexOf(event.target) != -1){ //si l'éléménet clické est encore présent dans le tableau
                let nodeCheck = null;
        
                if(turn === "joueur1")
                {
                    nodeCheck = document.createTextNode("X");
                    checkedJ1ClassList.push(event.target.classList.value[4] + event.target.classList.value[6]);
                    checkWin();
                    turn = "joueur2";
                }
                else
                {
                    nodeCheck = document.createTextNode("O");
                    checkedJ2ClassList.push(event.target.classList.value[4] + event.target.classList.value[6]);
                    checkWin();
                    turn = "joueur1";
                }
                
                box.appendChild(nodeCheck);
                allBoxes.splice(allBoxes.indexOf(box), 1); // On supprime l'élément clické du tableau
            }
        });
    }
}

function checkWin(){
    //8 possibilitées de combianisons
    const winCombianaisons = 
    [
        ['11','12','13'], 
        ['21','22','23'], 
        ['31','32','33'], 
        ['11','21','31'], 
        ['12','22','32'], 
        ['13','23','33'],
        ['11','22','33'],
        ['13','22','31']
    ];
    
    let i = 0;
    
    
    
        
    for(let aWinCombine of winCombianaisons){ //pour chaque combianison ganantes
        
        for(let one of aWinCombine){ //pour chaque nombre de la combianison gagnante
            
            for(let aClass of checkedJ1ClassList){ //pour chaque nombre de la combianaison effectué
                
                if(aClass === one){
                    i++;
                    console.log(aClass + " " + i + " " + one);
                }
                if(i === 3){
                    joueur1Win = true;
                    winText = document.createTextNode("Joueur 1 win!");
                    divWin.appendChild(winText);
                }
            }    
              
        }
        i = 0;
    }
    
    for(let aWinCombine of winCombianaisons){ //pour chaque combianison ganantes
        
        for(let one of aWinCombine){ //pour chaque nombre de la combianison gagnante
            
            for(let aClass of checkedJ2ClassList){ //pour chaque nombre de la combianaison effectué
                
                if(aClass === one){
                    i++;
                    console.log(aClass + " " + i + " " + one);
                }
                if(i === 3){
                    joueur2Win = true;
                    winText = document.createTextNode("Joueur 2 win!");
                    divWin.appendChild(winText);
                }
            }    
              
        }
        i = 0;
    }

}

//DOMContentLoaded Listener
window.addEventListener("DOMContentLoaded", function()
{
      gridCreation();
      clickBoxListener();
      
});