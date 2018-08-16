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
          loadPageInit();
        }).catch(function(error) {
          // An error happened.
        });

        //ejecutar el ws




    }

}