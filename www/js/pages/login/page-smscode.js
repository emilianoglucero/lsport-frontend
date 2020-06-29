
var smsCode;
var myTimer;
var myBtn;
var sec;

//variable para suplantar el emailverified = false, que nos da facebook
var loggedByFacebook = false;

//contador para las veces que reenvia el sms
var countSMS = 0;

$(document).ready(function(){

    $('#lblTitleSmsCode').text(lblTitleSmsCode);
    $('#lblSmsCode').text(lblSmsCode);
    $('#resend-smscode').text(lblReSendSmsCodeButton);
    $('#lblSendSmsCodeButton').text(lblSendSmsCodeButton);

    $('#lblSendButtonLoginFacebook').text(lblSendButtonLoginFacebook);
    $('#lblSendButtonLoginGoogle').text(lblSendButtonLoginGoogle);
    $('#lblSendButtonLoginEmail').text(lblSendButtonLoginEmail);
    sec =20;
    //$('#lblInfoSmsCode').text(lblInfoLogin);

}
);

myApp.onPageInit('smscode', function (page)
{

});

myApp.onPageBeforeAnimation('smscode', function (page)
{

 //agrega el numero de telefono en texto para modificarlo
 $('#phoneNumberText').html(phoneNumberFinalToShow);
//hago que siempre cuando arranque la pantalla los dos campos esten visibles y disable
 $("#resend-smscode").attr('disabled', 'true');
 $("#resend-smstime").fadeTo(2000, 1);

 //hide otherLogin
// $('#otherLogin').hide();
 countDown();

});


function countDown() {
myBtn = document.getElementById('resend-smscode');
myTimer = document.getElementById('resend-smstime');

var minutes = Math.floor(sec / 60);
var seconds = sec - minutes * 60;

    if (sec < 10) {
      //myTimer.innerHTML = "0" + sec;
      myTimer.innerHTML = minutes + ':0' + seconds;
    } else {
      //myTimer.innerHTML = sec;
      myTimer.innerHTML = minutes + ':' + seconds;
    }
    if (sec <= 0) {
      $("#resend-smscode").removeAttr("disabled");
      $("#resend-smstime").fadeTo(2500, 0);
      //myBtn.innerHTML = "Reenviar SMS";
      return;
    }
    sec -= 1;
    //window.setTimeout(countDown, 1000);
    setTimeout("countDown()", 1000);
}




function confirmSmsCode() {

smsCode = document.getElementById('smscode').value;

    if (smsCode == "") {


          myApp.alert(
             'Tenes que ingresar el codigo que recibiste por SMS!',  // message
              focusSmsCode,         // callback
              'Error',            // title
              'Ok'                  // buttonName
            );

            function focusSmsCode() {
                document.getElementById('smscode').focus();
                return false;
            }


    }

    //Get the intermediate AuthCredential object
    var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
    //Then, you can sign in the user with the credential:
    //firebase.auth().signInWithCredential(credential);

    firebase.auth().signInWithCredential(credential).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/invalid-verification-code') {
        myApp.alert(
         'El codigo que ingresaste es invalido. Por favor revisa que lo hayas escrito correctamente. Reenvia el SMS en caso de que persista el error.',  // message
          errorSmsCode,         // callback
          'Error',            // title
          'Ok'                  // buttonName
        );

        function errorSmsCode() {
            //document.getElementById('smscode').focus();
            return false;
        }
      } else {
            alert(error);
            return false;
      }
     });


}


function resendSmsCode() {




    if (platform == 'Android') {

        $("#resend-smscode").attr('disabled', 'true');
        $("#resend-smstime").fadeTo(2000, 1);
        sec = 20;
        countDown();
        countSMS = countSMS + 1;

        window.FirebasePlugin.verifyPhoneNumber(phoneNumberFull, 60, function(credential) {

            verificationId = credential.verificationId;

            }, function(error) {
                console.error(error);
                myApp.alert(
               'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet.',  // message
                internetorNumberError,         // callback
                'Error',            // title
                'Ok'                  // buttonName
              );

              function internetorNumberError() {
                  return false;
              }
            });


    }
    else {

        $("#resend-smscode").attr('disabled', 'true');
        $("#resend-smstime").fadeTo(2000, 1);
        sec = 20;
        countDown();
        countSMS = countSMS + 1;

        window.FirebasePlugin.getVerificationID(phoneNumberFull,function(id) {
                verificationId = id;

            }, function(error) {
                console.error(error);
                myApp.alert(
               'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet.',  // message
                internetorNumberError,         // callback
                'Error',            // title
                'Ok'                  // buttonName
              );

              function internetorNumberError() {
                  return false;
              }
            });
    }

    if (countSMS >= 2) {

        //mostrar botones que estan ocultos
        myApp.alert(
         '¿No recibiste tu SMS? Podes probar nuestras otras formas de logueo con tu cuenta de Google, Facebook o E-mail.',  // message
          showOtherLogin,         // callback
          'Error',            // title
          'Ok'                  // buttonName
        );

        function showOtherLogin() {
            $('#otherLogin').show();
            $('#lblSendButtonLoginFacebook').focus();
        }


    }

}

function changePhoneNumber() {
    usedPhoneNumber = phoneNumberFull;
    sec = 0;
    //go to the back page
    mainView.router.load({pageName: 'login'});
}


//Metodos de logueos alternativos

function confirmGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
      return firebase.auth().getRedirectResult();
    }).then(function(result) {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

}

function confirmFacebook() {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function() {
      return firebase.auth().getRedirectResult();
    }).then(function(result) {
    loggedByFacebook = true;
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
    console.log('error');
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log(error.email);
      if (errorCode === 'auth/account-exists-with-different-credential') {
          // Step 2.
          // User's email already exists.
          // The pending Facebook credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get registered providers for this email.
          firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
            // Step 3.
            // If the user has several providers,
            // the first provider in the list will be the "recommended" provider to use.
            if (providers[0] === 'password') {
              myApp.alert(
                  'Ya te registraste anteriormente con este correo mediante la opción de correo electronico. Por favor ingresa con ese metodo',  // message
                   toSignInPage,         // callback
                   'Error',            // title
                   'Ok'                  // buttonName
              );

                function toSignInPage() {
                //go to the login page
                mainView.router.load({pageName: 'emailsignup'});
                }

            return false;
            
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.
            // TODO: implement getProviderForProviderId.
            console.log(providers[0]);
            provider = providers[0];
            // At this point, you should let the user know that he already has an account
            // but with a different provider, and let him validate the fact he wants to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            console.log(provider);

            if(provider === 'google.com') {
                provider = new firebase.auth.GoogleAuthProvider();
            }

              myApp.alert(
                   'Ya te registraste anteriormente con este correo electronico desde Google, por favor volve a ingresar con esa cuenta',  // message
                   googleAuth,         // callback
                   'Error',            // title
                   'Ok'                  // buttonName
              );

                function googleAuth() {

                    firebase.auth().signInWithRedirect(provider).then(function() {
                      return firebase.auth().getRedirectResult();
                    }).then(function(result) {
                      // This gives you a Google Access Token.
                      // You can use it to access the Google API.
                      var token = result.credential.accessToken;
                      // The signed-in user info.
                      var user = result.user;
                      console.log(user);
                      //deberia linkear fb a su cuenta existente con google, pero no funciona
                      user.link(pendingCred);
                    }).catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                    });

                }

          });
        }

    });
}

function loginEmail() {

    //go to the register page
    mainView.router.load({pageName: 'emailregister'});

}
