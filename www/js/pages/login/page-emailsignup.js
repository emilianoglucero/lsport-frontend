
/*$(document).ready(
  function() {
    //INIT HEADERS
    $('#lblSendButtonLoginSign').text(lblSendButtonLoginSign);
    $('#lblTitleSignUp').text(lblTitleSignUp);
    $('#lblSendButtonResetPassSign').text(lblSendButtonResetPassSign);
    $('#lblInfoSignUp').text(lblInfoSignUp);

  }
);

function confirmSignUp() {

    var email = document.getElementById('user-signemail').value;
    var password = document.getElementById('user-signpassword').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log (errorCode);
      console.log (errorMessage);

      if (error.code === 'auth/user-not-found') {

        myApp.alert(
          'Tu correo electronico no se encuentra registrado, por favor registrate primero o verifica que lo hayas escrito bien',  // message
           focusEmailSign,         // callback
           'Error',            // title
           'Ok'                  // buttonName
        );

        function focusEmailSign() {
            document.getElementById('user-signemail').focus();
            return false;
        }


      }

      if (error.code === 'auth/wrong-password') {

          myApp.alert(
            'Tu contraseña es incorrecta, por favor revisala',  // message
             focusPassSign,         // callback
             'Error',            // title
             'Ok'                  // buttonName
          );

          function focusPassSign() {
              document.getElementById('user-signpassword').focus();
              return false;
          }


      }

    });


}

function confirmPasswordSign() {
    //go to the password recovery page
    mainView.router.load({pageName: 'passwordrecovery'});
}*/