var illegalChars = /^[a-zA-Z\s]*$/;

$(document).ready(
  function() {
    //INIT HEADERS
    $('#lblSendButtonLoginToSignPage').text(lblSendButtonLoginToSignPage);
    $('#lblSendButtonLoginRegister').text(lblSendButtonLoginRegister);
    $('#lblInfoEmailLogin').text(lblInfoEmailLogin);

  }
);



function confirmRegister() {

    userName = document.getElementById('user-registername').value;
    userLastName = document.getElementById('user-registerlastname').value;
    userEmail = document.getElementById('user-registeremail').value;
    userPassword = document.getElementById('user-registerpassword').value;
    userRePassword = document.getElementById('user-registerrepassword').value;

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    var resultEmailValidation = validateEmail(userEmail);


    if (userEmail == "" || userPassword == "" || userRePassword == "" || userName == ""  || userLastName == "") {

          //alert("Error: tenes que ingresar tu nombre!");
          myApp.alert(
             'Tenes que completar todos los campos!',  // message
              focusUserName,         // callback
              'Error',            // title
              'Ok'                  // buttonName
            );

            function focusUserName() {
                document.getElementById('user-registeremail').focus();
                return false;
            }


    }

    else if (illegalChars.test(userName) !== true || illegalChars.test(userLastName) !== true ) {

              //alert("Error: tenes que ingresar tu apellido!");
                myApp.alert(
                   'Recordá que solo podes ingresar caracteres alfabeticos!',  // message
                    illegalChar,         // callback
                    'Error',            // title
                    'Ok'                  // buttonName
                );

                  function illegalChar() {

                      return false;
                  }


    }

    else if (resultEmailValidation == false) {

        //alert('no va ese mail');
            myApp.alert(
               'Ingresaste una dirección de correo electronico invalida, por favor revisala!',  // message
                illegalEmail,         // callback
                'Error',            // title
                'Ok'                  // buttonName
            );

              function illegalEmail() {
                  document.getElementById('user-registeremail').focus();
                  return false;
              }

    }

    else if(userPassword !== userRePassword) {

        myApp.alert(
           'Ingresaste dos contraseñas distintas, por favor revisa que sean iguales!',  // message
            illegalPass,         // callback
            'Error',            // title
            'Ok'                  // buttonName
        );

          function illegalPass() {
              document.getElementById('user-registerpassword').focus();
              return false;
          }

    }

    else if(userRePassword.length > 20 || userPassword.length > 20 || userPassword.length < 6 || userRePassword.length < 6) {

        myApp.alert(
           'Recordá que la contraseńa no puede tener menos de 7 caracteres y mas de 20!',  // message
            illegalPassLength,         // callback
            'Error',            // title
            'Ok'                  // buttonName
        );

          function illegalPassLength() {
              document.getElementById('user-registerpassword').focus();
              return false;
          }

    }


    else {


        firebase.auth()
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then(function(user){
              if(user && user.emailVerified === false){
                user.sendEmailVerification().then(function(){
                  console.log("email verification sent to user");
                });
              }
              //Seteamos el nombre y apellido
              userFullName = userName + ' ' + userLastName;
              var user = firebase.auth().currentUser;

                  user.updateProfile({
                    displayName: userFullName
                  }).then(function() {
                    // Update successful.
                    console.log('email succes');
                    //loadPageInit();
                  }).catch(function(error) {
                    // An error happened.
                  });

            }).catch(function(error) {


              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);

              if(errorCode == 'auth/email-already-in-use') {
                firebase.auth().fetchProvidersForEmail(userEmail).then(function(providers) {
                //console.log(provider);
                console.log(providers[0]);
                provider = providers[0];
                console.log(providers);

                    if (providers[0] === 'password') {
                          myApp.alert(
                            'Ya te registraste con este correo electronico, por favor logueate en la siguiente pantalla. Si no recordas tu contraseña podes buscar el boton para recuperarla',  // message
                             focusEmailInUse,         // callback
                             'Error',            // title
                             'Ok'                  // buttonName
                          );

                          function focusEmailInUse() {
                            //go to the signup page
                            mainView.router.load({pageName: 'emailsignup'});
                          }
                        return false;
                    }

                    if(provider === 'google.com') {
                          myApp.alert(
                            'Ya te registraste con este correo electronico utilizando el logueo de Google, por favor ingresá con ese metodo.',  // message
                             focusEmailInUse,         // callback
                             'Error',            // title
                             'Ok'                  // buttonName
                          );

                          function focusEmailInUse() {
                            //go to the signup page
                            mainView.router.load({pageName: 'smscode'});
                          }
                        return false;
                    }

                    if(provider === 'facebook.com') {
                          myApp.alert(
                            'Ya te registraste con este correo electronico utilizando el logueo de Facebook, por favor ingresá con ese metodo.',  // message
                             focusEmailInUse,         // callback
                             'Error',            // title
                             'Ok'                  // buttonName
                          );

                          function focusEmailInUse() {
                            //go to the signup page
                            mainView.router.load({pageName: 'smscode'});
                          }
                        return false;
                    }

                });

              }

            });

    }

}

function toSignUpPage() {

    //go to the signup page
    mainView.router.load({pageName: 'emailsignup'});

}