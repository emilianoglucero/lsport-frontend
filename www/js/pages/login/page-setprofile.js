var illegalChars = /^[a-zA-Z\s]*$/;
$(document).ready(function(){

    $('#lblTitleSetProfile').text(lblTitleSetProfile);
    $('#lblInfoSetProfile').text(lblInfoSetProfile);
    $('#lblSendButtonProfile').text(lblSendButtonProfile);

}
);


function confirmSetProfile() {

    userName = document.getElementById('user-name').value;
    userLastName = document.getElementById('user-lastname').value;

    if (userName == "") {

          //alert("Error: tenes que ingresar tu nombre!");
          myApp.alert(
             'Tenes que ingresar tu nombre!',  // message
              focusUserName,         // callback
              'Error',            // title
              'Ok'                  // buttonName
            );

            function focusUserName() {
                document.getElementById('user-name').focus();
                return false;
            }


    }

    else if (userLastName == "") {

          //alert("Error: tenes que ingresar tu apellido!");
            myApp.alert(
               'Tenes que ingresar tu apellido!',  // message
                focusLastName,         // callback
                'Error',            // title
                'Ok'                  // buttonName
            );

              function focusLastName() {
                  document.getElementById('user-lastname').focus();
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
    else {
        userFullName = userName + ' ' + userLastName;
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: userFullName
        }).then(function() {
          // Update successful.
          //loadPageInit();
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function(idToken) {
              //console.log(idToken);
              tokenUser = idToken;
              console.log(userFullName); //nombre y apellido del usuario
              console.log(tokenUser);
              //we cannot pass devideID = null to the server
              if (deviceID == null) {
                deviceID = "null";
              }
              console.log(deviceID);
              console.log(window.localStorage.getItem("TOKEN" + idClub));
              console.log(platform);
              console.log(userEmail);

              $.ajax({
                // URL del Web Service
                url: getPathWS() + "registrarUsuario",
                type: "POST",
                //contentType: 'application/json',
                dataType: "json",
                //timeout: 5566456,
                headers: {
                  "Content-Type": "application/json"
                },
                data: JSON.stringify({
                  grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                  assertion: tokenUser,
                  dispositivoId: deviceID,
                  tokenNotificacion: window.localStorage.getItem(
                    "TOKEN" + idClub
                  ),
                  platforma: platform,
                  nombre: userFullName,
                  apellido: "",
                  correo: userEmail,
                  telefono: userPhoneNumber
                }),
                success: function(response) {
                  //showLoadSpinnerWS();
                  console.log(response.access_token);
                  accessToken = response.access_token;
                  mainView.router.load({ pageName: "home" });
                  loadContentHomePage();
                  //hideLoadSpinnerWS();
                },
                error: function(data, status, error) {
                  console.log(data);
                  console.log(status);
                  console.log(error);
                }
              });

              //mainView.router.load({pageName: 'home'});
              //reloadContentHomePage();
            })
            .catch(function(error) {
              console.log(error);
            });
        }).catch(function(error) {
          // An error happened.
        });

        //ejecutar el ws
    }

}