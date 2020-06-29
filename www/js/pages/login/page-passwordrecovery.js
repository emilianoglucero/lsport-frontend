$(document).ready(
  function() {
    //INIT HEADERS
    $('#lblTitlePassRecovery').text(lblTitlePassRecovery);
    $('#lblSendButtonPasswordRecovery').text(lblSendButtonPasswordRecovery);
    $('#lblInfoPasswordRecovery').text(lblInfoPasswordRecovery);

  }
);

function sendResetPasswordEmail() {

    var auth = firebase.auth();
    var emailAddress = document.getElementById('user-passwordemail').value;
    console.log(emailAddress);

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
            myApp.alert(
               'El E-mail de reseteo de contraseña ha sido enviado y llegara en breve, por favor chequea tu bandeja de entrada',  // message
                PasswordResetMessage,         // callback
                'Error',            // title
                'Ok'                  // buttonName
              );

              function PasswordResetMessage() {
                  //go to the register page
                  mainView.router.load({pageName: 'emailsignup'});
              }
    }).catch(function(error) {
            // An error happened.
              myApp.alert(
                 'Ha ocurrido un error, por favor revisa el E-mail ingresado',  // message
                  PasswordResetMessageError,         // callback
                  'Error',            // title
                  'Ok'                  // buttonName
                );

                function PasswordResetMessageError() {
                    //go to the register page
                    return false;
                }
    });



}