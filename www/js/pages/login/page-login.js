var phoneNumberFull;
var verificationId;
var usedPhoneNumber;

var phoneNumberToRead;
var phoneNumberToShow;

//contador para las veces que reenvia el sms
var countSMSInicio = 0;

$(document).ready(function() {
  //INIT HEADERS
  $("#lblWellcomeLogin").text(lblWellcomeLogin);
  $("#lblSendButtonLogin").text(lblSendButtonLogin);
  $("#lblInfoLogin").text(lblInfoLogin);

  $("#lblSendButtonLoginFacebookLogin").text(lblSendButtonLoginFacebook);
  $("#lblSendButtonLoginGoogleLogin").text(lblSendButtonLoginGoogle);
  $("#lblSendButtonLoginEmailLogin").text(lblSendButtonLoginEmail);

 
  if (platform != "Android"){
    $("#otherlogin-buttonFacebookInicio").hide();
  }

});

myApp.onPageInit('login', function (page) {
    console.log('login on page init');
    /*console.log(platform);
    if (platform != "Android"){
      $("#otherlogin-buttonFacebookInicio").hide();
    }*/
    //myApp.hideNavbar(".navbar");
    //myApp.params.swipePanel = false;
});


//added to execute on login page
function loginBackButton() {
  myApp.confirm("Vas a salir de la App, estas seguro?", function() {
    navigator.app.exitApp();
  });
}

function confirmNumber() {
  var phoneNumber;
  var phoneNumberLenght;
  var countryCode;

  countryCode = document.getElementById("phone-code").value;
  phoneNumber = document.getElementById("phonenumber").value;
  phoneNumberLenght = document.getElementById("phonenumber").value.length;

  //si el numero de telefono comienza con 0 borra ese caracter antes de pasarlo a Firebase
  if (phoneNumber.charAt(0) === "0") {
    phoneNumber = phoneNumber.substr(1);
  }
  phoneNumberFull = countryCode + phoneNumber;
  phoneNumberToRead = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  phoneNumberFinalToShow = countryCode + "-" + phoneNumberToRead;

  //validacion de los campos de nombre y telefono
  if (phoneNumber == "") {
    myApp.alert(
      "Tenes que ingresar un numero de telefono!", // message
      focusPhoneNumber, // callback
      "Error", // title
      "Ok" // buttonName
    );

    //alert("Error: tenes que ingresar un numero de telefono!");
    function focusPhoneNumber() {
      document.getElementById("phonenumber").focus();
      return false;
    }
  } else if (countryCode == "") {
    myApp.alert(
      "Tenes que ingresar un codigo de pais!", // message
      focusCountryCode, // callback
      "Error", // title
      "Ok" // buttonName
    );

    function focusCountryCode() {
      return false;
    }
  } else if (phoneNumberLenght < 7) {
    myApp.alert(
      "Tu numero tiene muy pocos digitos!", // message
      focusNumberLenght, // callback
      "Error", // title
      "Ok" // buttonName
    );

    function focusNumberLenght() {
      document.getElementById("phonenumber").focus();
      return false;
    }
  } else if (phoneNumberFull == usedPhoneNumber) {
    $("#resend-smscode").attr("disabled", "true");
    $("#resend-smstime").fadeTo(2000, 1);
    sec = 60;
    //alert("Cuidado: ingresaste el mismo numero que antes!");

    myApp.alert(
      "Ingresaste el mismo numero que antes!", // message
      focusNumberLenght, // callback
      "Cuidado", // title
      "Ok" // buttonName
    );

    function focusNumberLenght() {
      //go to the next page
      mainView.router.load({ pageName: "smscode" });
    }
  }
  //agregamos este condicional para tener un codigo de logueo
  else if (phoneNumber === "#132457689#") {
    //accessToken = "2854cf6bfcb0e5639ea7729a6a75b9e4aed5dd9e";
    //loadPageInit();
    mainView.router.load({ pageName: "emailsignup" });
    //reloadContentHomePage();
  } else {
    var textMessage =
      "Te vamos a enviar un SMS con un codigo al numero: " +
      phoneNumber +
      ". ¿Está bien o queres modificarlo? Usa ese codigo para completar tu registro en la App.";
    myApp.confirm(textMessage, function() {
      if (platform == "Android") {
        window.FirebasePlugin.verifyPhoneNumber(
          phoneNumberFull,
          60,
          function(credential) {
            verificationId = credential.verificationId;

            //go to the next page
            mainView.router.load({ pageName: "smscode" });
          },
          function(error) {
            console.error(error);
            countSMSInicio = countSMSInicio + 1;
            if (countSMSInicio >= 2) {
              myApp.alert(
                "Hubo un error, por favor revisa el numero ingresado y tu conexión a internet. Si tenes problemas, tambien podes probar nuestras otras formas de logueo mas abajo y utilizar tu cuenta de Google, Facebook o E-mail", // message
                errorSmsCode, // callback
                "Error", // title
                "Ok" // buttonName
              );

              function errorSmsCode() {
                $("#otherLoginInicio").show();
              }
            } else {
              myApp.alert(
                "Hubo un error, por favor revisa el numero ingresado y tu conexión a internet", // message
                errorSmsCode, // callback
                "Error", // title
                "Ok" // buttonName
              );

              function errorSmsCode() {
                return false;
              }
            }
          }
        );
      } else {
        window.FirebasePlugin.getVerificationID(
          phoneNumberFull,
          function(id) {
            verificationId = id;

            //go to the next page
            mainView.router.load({ pageName: "smscode" });
          },
          function(error) {
            console.error(error);
            countSMSInicio = countSMSInicio + 1;
            if (countSMSInicio >= 2) {
              myApp.alert(
                "Hubo un error, por favor revisa el numero ingresado y tu conexión a internet. Si tenes problemas, tambien podes probar nuestras otras formas de logueo mas abajo y utilizar tu cuenta de Google, Facebook o E-mail", // message
                errorSmsCode, // callback
                "Error", // title
                "Ok" // buttonName
              );

              function errorSmsCode() {
                $("#otherLoginInicio").show();
                $("#lblSendButtonLoginFacebookLogin").focus();
              }
            } else {
              myApp.alert(
                "Hubo un error, por favor revisa el numero ingresado y tu conexión a internet", // message
                errorSmsCode, // callback
                "Error", // title
                "Ok" // buttonName
              );

              function errorSmsCode() {
                return false;
              }
            }
          }
        );
      }
    });
  }
}
