

//$(document).ready(function(){



//});

myApp.onPageInit('user', function (page)
{


});

myApp.onPageBeforeAnimation('user', function (page)
{
    //document.getElementById("user-profile-name").placeholder = userFullName;
});

function logOutUser() {

        var textMessage = 'Estas seguro que queres cerrar sesion en este dispositivo?';
        myApp.confirm(textMessage, function () {

                firebase.auth().signOut();
                usedPhoneNumber = '';
                smsCode = '';
                //vaciar el input smscode y setear el tiempo que quedo corriendo a 0
                $("#smscode").val('');
                sec = 0;
                showLoadSpinnerWS();
                setTimeout("hideLoadSpinnerWS()", 1000);
                window.location.reload(true);

        });

}



