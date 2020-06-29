var codeCheckUser;

myApp.onPageInit('codecheck', function (page)
{
    console.log("codecheck page");
    //resolve codecheck

    //erase later
   //dateFinal = "2020-06-02";
    //hourFinal = "12:00";
    
    codeBooking(dateFinal, hourFinal, radioValueId);
    

});

function verifyCodeCheck(){
    console.log("verify codecheck");

    codeCheckUser = document.getElementById('user-codecheck').value;
    
    if (codeCheckUser != "") {
       
        if (codeBooking(dateFinal, hourFinal, radioValueId) == codeCheckUser) {
            console.log("codecheck its ok");
            mainView.router.load({ pageName: "review" });
        } else {
            showMessage("El código es incorrecto, intenta nuevamente");
        }

    } else {
        showMessage("Debes ingresar un valor en el campo de código");
    }
}