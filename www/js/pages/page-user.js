

$(document).ready(function(){

    $('#lblTitleUser').text(lblTitleUser);
    $('#lblNameUser').text(lblNameUser);
    $('#lblLogoutButton').text(lblLogoutButton);

    $('.lblNotLogged').text(lblNotLogged);

});

myApp.onPageInit('user', function (page)
{
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        $("#notLoggedUser").hide();
        $("#loggedUser").show();
    } else {
        $("#loggedUser").hide();
        $("#notLoggedUser").show();
    }


});
myApp.onPageReinit('user', function (page)
{
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        $("#notLoggedUser").hide();
        $("#loggedUser").show();
    } else {
        $("#loggedUser").hide();
        $("#notLoggedUser").show();
    }


});

myApp.onPageBeforeAnimation('user', function (page)
{
    document.getElementById("user-profile-name").placeholder = userFullName;
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



