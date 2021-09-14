const PlayerModule = (function () {
   let playersList = [],currPlayer = null,currPlayerIndex = 0;
   
   function init(formData){
       let iter = formData.values();
       playersList.push({name : iter.next().value, tag : "X"});
       playersList.push({name : iter.next().value,tag : "O"});
       currPlayer = playersList[currPlayerIndex];
   }

   function getPlayersList () {
       return playersList;
   }

   function getCurrentPlayer() {
       return currPlayer;
   }

   function changeCurrentPlayer(){
       currPlayerIndex = +!currPlayerIndex;
       currPlayer = playersList[currPlayerIndex];
   }
   return { init, getPlayersList, getCurrentPlayer, changeCurrentPlayer }
})();