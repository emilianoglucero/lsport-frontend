var countReSendEmail = 0;

$(document).ready(function(){

    $('#lblVerifyTitle').text(lblVerifyTitle);
    $('#lblVerifyInfo').text(lblVerifyInfo);
    $('#lblResendEmailButton').text(lblResendEmailButton);
    $('#lblVerifyLogOut').text(lblVerifyLogOut);
    $('#lblVerifyRefresh').text(lblVerifyRefresh);
}
);

function reSendEmail() {

    var user = firebase.auth().currentUser;

    countReSendEmail = countReSendEmail + 1;
    if (countReSendEmail < 5) {
    user.sendEmailVerification().then(function() {
      // Email sent.
       myApp.alert(
       'Se ha reenviado el E-mail de verificacion, aguarda unos instantes y revisa tu correo por favor.',  // message
        resentEmailVerificationMessage,         // callback
        'Error',            // title
        'Ok'                  // buttonName
      );

      function resentEmailVerificationMessage() {
          return false;
      }
    }).catch(function(error) {
      // An error happened.
      console.log('error resent')
    });

    }
    else {
       myApp.alert(
       'Haz hecho hasta 4 reintentos de correo electronico, deja pasar unos minutos por favor.',  // message
        resentEmailVerificationMessage,         // callback
        'Error',            // title
        'Ok'                  // buttonName
      );

      function resentEmailVerificationMessage() {
          return false;
      }
    }



}

function reloadPage() {
    window.location.reload(true);
}