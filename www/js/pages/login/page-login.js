var tokenBooking;

$(document).ready(function() {
  //INIT HEADERS
  $("#lblWellcomeLogin").text(lblWellcomeLogin);
  $('#lblSendButtonLoginSign').text(lblSendButtonLoginSign);
  $('#lblInfoSignUp').text(lblInfoSignUp);

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

function confirmSignUp() {
  

  var email = document.getElementById('user-signemail').value;
  var password = document.getElementById('user-signpassword').value;


  //validacion de los campos de mail y pass
  if (email == "") {
    myApp.alert(
      "Tenes que ingresar un correo electronico!", // message
      focusEmail, // callback
      "Error", // title
      "Ok" // buttonName
    );

    //alert("Error: tenes que ingresar un mail!");
    function focusEmail() {
      document.getElementById("user-signemail").focus();
      return false;
    }
  } else if (password == "") {
    myApp.alert(
      "Tenes que ingresar una contraseña!", // message
      focusPassword, // callback
      "Error", // title
      "Ok" // buttonName
    );

    function focusPassword() {
      document.getElementById("user-signpassword").focus();
      return false;
    }
  } else {

      $.ajax({
        // URL del Web Service
            url: 'http://172.105.156.64/?rest_route=/salon/api/v1/login',
            dataType: 'json',
            data: { 'name': email,
                    'password': password
            },
            method: 'GET',
            timeout: timeOut,
            success: function(response){
              console.log(response);
              console.log(response.access_token);
              tokenBooking = response.access_token;
              mainView.router.load({ pageName: "home" });



            },
            error: function (data, status, error){
              alert('Hubo un error, por favor revisá tu correo y contraseña');

        }
      });

  }
}