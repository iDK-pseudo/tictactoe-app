import { PlayerModule } from "./Players.js";

export const GameModule = (function () {
    let gameBoard = [],containerEle = null,playerController = null;
    function init (){
        if(gameBoard.length === 0){
            gameBoard.push(["","",""]);
            gameBoard.push(["","",""]);
            gameBoard.push(["","",""]);
        }
        containerEle = document.createElement("div");
        containerEle.id = "container";
        playerController = PlayerModule;
        _render();
        _bindUIActions();
    }

    function _render(){ 
        //Actual GameBoard
        let fragment = new DocumentFragment();
        let rowVal = -1, colVal;
        gameBoard.forEach(function(row){
            rowVal++;colVal = 0;
            row.forEach(function(col){
                const div = document.createElement("div");
                div.textContent = col;
                div.className = "cell"
                div.setAttribute("row",rowVal);
                div.setAttribute("col",colVal++);
                fragment.appendChild(div);
            })
        })
        containerEle.append(fragment,document.createElement("br"));
        
        
        //Display Players (X,O) assignments
        fragment = new DocumentFragment();
        playerController.getPlayersList().forEach(function(player){
            const playerLabel = document.createElement("label");
            playerLabel.textContent = `${player.name} : ${player.tag}`;
            fragment.append(playerLabel,document.createElement("br"));
        })
        const bodyEle = document.querySelector("body");
        bodyEle.append(containerEle,fragment);
    }

    function _bindUIActions () {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(function(cell){
            cell.addEventListener("click",_playerInput);
        })
    }

    function _playerInput(event){
        if(event.target.textContent !== ""){
            alert("Position already filled. Choose someplace else.");
            return;
        }
        event.target.textContent = playerController.getCurrentPlayer().tag;
        gameBoard[event.target.getAttribute("row")][event.target.getAttribute("col")] = playerController.getCurrentPlayer().tag;
        if(_checkWin(playerController.getCurrentPlayer().tag)){
            alert(`${playerController.getCurrentPlayer().name} Wins !`);
        }else if(_checkDraw()){
            alert("It's a DRAW !!!");
        }
        playerController.changeCurrentPlayer();
    }

    function _checkWin(tag){
        let win = true;

        //For Row
        for(let i=0;i<gameBoard.length;i++){
            win = true;
            for(let j=0;j<gameBoard[i].length;j++){
                if(gameBoard[i][j]!==tag){
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
        win = true;

        //For Column
        for(let i=0;i<gameBoard.length;i++){
            win = true;
            for(let j=0;j<gameBoard[i].length;j++){
                if(gameBoard[j][i]!==tag){
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
        win = true;

        //For Diagonal
        for(let i=0,j=0;i<gameBoard.length && j<gameBoard[i].length;i++,j++){
            if(gameBoard[i][j]!==tag){
                win = false;
            }
        }
        if(win) return true;
    }

    function _checkDraw(){
        for(let i=0;i<gameBoard.length;i++){
            for(let j=0;j<gameBoard[i].length;j++){
                if(gameBoard[i][j]===""){
                    return false;
                }
            }
        }
        return true;
    }

  
    return {init}
})();