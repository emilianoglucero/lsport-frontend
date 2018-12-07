var phoneNumberFull;
var verificationId;
var usedPhoneNumber;

var phoneNumberToRead;
var phoneNumberToShow;

//contador para las veces que reenvia el sms
var countSMSInicio = 0;


$(document).ready(
  function() {
    //INIT HEADERS
    $('#lblWellcomeLogin').text(lblWellcomeLogin);
    $('#lblSendButtonLogin').text(lblSendButtonLogin);
    $('#lblInfoLogin').text(lblInfoLogin);

    $('#lblSendButtonLoginFacebookLogin').text(lblSendButtonLoginFacebook);
    $('#lblSendButtonLoginGoogleLogin').text(lblSendButtonLoginGoogle);
    $('#lblSendButtonLoginEmailLogin').text(lblSendButtonLoginEmail);

  }
);

//added to execute on login page
function loginBackButton() {
        myApp.confirm('Vas a salir de la App, estas seguro?', function () {
            navigator.app.exitApp();
        });
};


function confirmNumber() {

   var phoneNumber;
   var phoneNumberLenght;
   var countryCode;

   countryCode = document.getElementById('phone-code').value;
   phoneNumber = document.getElementById('phonenumber').value;
   phoneNumberLenght = document.getElementById('phonenumber').value.length;


   //si el numero de telefono comienza con 0 borra ese caracter antes de pasarlo a Firebase
   if (phoneNumber.charAt(0) === '0') {

      phoneNumber = phoneNumber.substr(1);

   }
   phoneNumberFull = countryCode + phoneNumber;
   phoneNumberToRead = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
   phoneNumberFinalToShow = countryCode + '-' + phoneNumberToRead;

//validacion de los campos de nombre y telefono
   if (phoneNumber == "") {


      myApp.alert(
          'Tenes que ingresar un numero de telefono!',  // message
           focusPhoneNumber,         // callback
           'Error',            // title
           'Ok'                  // buttonName
        );

      //alert("Error: tenes que ingresar un numero de telefono!");
        function focusPhoneNumber() {
            document.getElementById('phonenumber').focus();
            return false;
        }

   }

   else if (countryCode == "") {

          myApp.alert(
              'Tenes que ingresar un codigo de pais!',  // message
               focusCountryCode,         // callback
               'Error',            // title
               'Ok'                  // buttonName
            );

          function focusCountryCode() {
              return false;
          }


     }

     else if (phoneNumberLenght < 7) {

               myApp.alert(
                 'Tu numero tiene muy pocos digitos!',  // message
                  focusNumberLenght,         // callback
                  'Error',            // title
                  'Ok'                  // buttonName
               );

                function focusNumberLenght() {
                    document.getElementById('phonenumber').focus();
                    return false;
                }

     }

     else if (phoneNumberFull == usedPhoneNumber) {

                    $("#resend-smscode").attr('disabled', 'true');
                    $("#resend-smstime").fadeTo(2000, 1);
                    sec = 60;
                    //alert("Cuidado: ingresaste el mismo numero que antes!");

                    myApp.alert(
                     'Ingresaste el mismo numero que antes!',  // message
                      focusNumberLenght,         // callback
                      'Cuidado',            // title
                      'Ok'                  // buttonName
                    );

                    function focusNumberLenght() {
                        //go to the next page
                        mainView.router.load({pageName: 'smscode'});


                    }



     }
     //agregamos este condicional para tener un codigo de logueo
     else if (phoneNumber === '#132457689#') {
        //loadPageInit();

        $.ajax({
            // URL del Web Service
            url: getPathWS() + 'registrarUsuario',
            type: 'POST',
            //contentType: 'application/json',
            dataType: 'json',
            timeout: timeOut,
            data:  JSON.stringify({"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
                          "assertion": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwOTBjZGI5MmIzOTZiNTQyM2JhYjYyOWM5ZTk4MmFkYzIxYmQxMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVuZ3VhamUtc3BvcnQiLCJuYW1lIjoiSmFqYSAgSmFqYSAiLCJhdWQiOiJsZW5ndWFqZS1zcG9ydCIsImF1dGhfdGltZSI6MTU0NDIxMTExMywidXNlcl9pZCI6IkEzUVZjdHBmZmNRZkw5eE5WSERUbU1jVW05cDIiLCJzdWIiOiJBM1FWY3RwZmZjUWZMOXhOVkhEVG1NY1VtOXAyIiwiaWF0IjoxNTQ0MjE3Mzc2LCJleHAiOjE1NDQyMjA5NzYsInBob25lX251bWJlciI6Iis1NDkzNDc2NjA4MDExIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrNTQ5MzQ3NjYwODAxMSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.Az0UiQIpMbIopITduQ--CDbRYLSdtRx5htmA7orB22ljpiqGyA1j6q79jsQ3fvIU-GxWRWJGRjR_8ww7uvLbxKB3wkOcmRp-UusURS2iup960GVU_mD4fdEVN9pLxq2LZUYep_DVjhSmJHX3Gwonh-It2HjyZLmdqAkoRU0AynikXe-u6dIDmrftAgi03dyw9Wkvp3EVJeT9PIwVuDd1tWn74ZlVHlIsoxklzIj34jflLorhqBbnvrfqTuGAqnhs4occMtufvHG5nr970dMlMcZaf5lcDkTeBrYThJpDpFRO7H__dfqun62iQYecWJ9_1D1EPnlFwLWJO1I8sNLjhQ",
                          "dispositivoId": "fb9b38277c7910aa",
                          "tokenNotificacion": "fzF7Muav1_0:APA91bGCl76pUnVdxyZ_RQCLRAwXzJcshrlil9pbTWRgGMFdlSELaYWHwr6dqZG3hWD7s_5ABSBMr4DxS1C1G0WhjhPRy0gJaUu0tQSaIO1T2pHS8HuMdKncNofMctmiGPJk7ZVYMLhy",
                          "platforma": "Android",
                          "nombre" : "Michael",
                          "apellido" : "Jordan",
                          "correo" : "correo@mail.com"
            }),
            success: function(response){
                console.log(response);
                console.log(response.access_token);
                accessToken = response.access_token;
                mainView.router.load({pageName: 'home'});
                reloadContentHomePage();

            },
            error: function (data, status, error){
                console.log(data);
                console.log(status);
                console.log(error);
            },
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Content-Type','application/json' ); } //set tokenString before send

        });
     }
     else {

        var textMessage = 'Te vamos a enviar un SMS con un codigo al numero: ' + phoneNumber + '. ¿Está bien o queres modificarlo? Usa ese codigo para completar tu registro en la App.';
        myApp.confirm(textMessage, function () {
        if (platform == 'Android') {
            window.FirebasePlugin.verifyPhoneNumber(phoneNumberFull, 60, function(credential) {

                verificationId = credential.verificationId;

                //go to the next page
                mainView.router.load({pageName: 'smscode'});

            }, function(error) {
                console.error(error);
                countSMSInicio = countSMSInicio + 1;
                if (countSMSInicio >= 2) {
                        myApp.alert(
                         'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet. Si tenes problemas, tambien podes probar nuestras otras formas de logueo mas abajo y utilizar tu cuenta de Google, Facebook o E-mail',  // message
                          errorSmsCode,         // callback
                          'Error',            // title
                          'Ok'                  // buttonName
                        );


                        function errorSmsCode() {
                            $('#otherLoginInicio').show();
                        }
                } else{
                     myApp.alert(
                     'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet',  // message
                      errorSmsCode,         // callback
                      'Error',            // title
                      'Ok'                  // buttonName
                    );


                    function errorSmsCode() {
                        return false;
                    }


                }

            });


        }
        else {
            window.FirebasePlugin.getVerificationID(phoneNumberFull,function(id) {
                verificationId = id;

                //go to the next page
                mainView.router.load({pageName: 'smscode'});


            }, function(error) {
                console.error(error);
                countSMSInicio = countSMSInicio + 1;
                if (countSMSInicio >= 2) {
                        myApp.alert(
                         'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet. Si tenes problemas, tambien podes probar nuestras otras formas de logueo mas abajo y utilizar tu cuenta de Google, Facebook o E-mail',  // message
                          errorSmsCode,         // callback
                          'Error',            // title
                          'Ok'                  // buttonName
                        );


                        function errorSmsCode() {
                            $('#otherLoginInicio').show();
                            $('#lblSendButtonLoginFacebookLogin').focus();
                        }
                } else{
                     myApp.alert(
                     'Hubo un error, por favor revisa el numero ingresado y tu conexión a internet',  // message
                      errorSmsCode,         // callback
                      'Error',            // title
                      'Ok'                  // buttonName
                    );


                    function errorSmsCode() {
                        return false;
                    }


                }

            });
        }






     });

    }







}

