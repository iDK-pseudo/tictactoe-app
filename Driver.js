var MainModule = (function () {
    let gameController = null,playerController = null,formData = null;

    function init () {
        _bindUIActions();
        gameController = GameModule;
        playerController = PlayerModule;
    }

    function _bindUIActions(){
        const mainForm = document.getElementById("main-form");
        mainForm.addEventListener("submit",_newSession);
    }

    function _newSession(){
        formData = new FormData(document.querySelector('form'));    
        if(!_validateFields(formData)){
            alert("Please check the Player Names provided.");
            return;
        }
        playerController.init(new FormData(document.querySelector('form')));
        _clearForm();
        gameController.init();
    }

    function _validateFields(formData){
        let iter = formData.values();
        if(!iter.next().value || !iter.next().value){
            return false;
        }
        return true;
    }

    function _clearForm() {
        const mainForm = document.getElementById("main-form");
        const bodyEle = document.querySelector("body");
        bodyEle.removeChild(mainForm);
    }

    return {init}
})();
const mainController = MainModule;
mainController.init();