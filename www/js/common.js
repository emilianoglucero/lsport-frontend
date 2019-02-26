var $$ = Dom7;
var timeOut = 12000;

//token que se le asigna al usuario cuando se registra y que necesitamos para hacer las llamadas ajax
var tokenUser;

//token que obtenemos luego del login del usuario contra el backend
var accessToken;

//token que obtenemos de la concatenacion de TOKEN + IdClub
var tokenNotificacion;

var mainView = myApp.addView(".view-main", {
  dynamicNavbar: true,
  domCache: true
});

var wsUrl = null;
var mobileUrl = null;
// CallBack WS URL
/*function callBackWsURL(e)
{
    console.log("callbacl");
    console.log(e);
	wsUrl = e;
	//WORKAROUND: Comienza la carga de la pagina de inicio cuando se obtiene el url.
	// para que no se produzca la llamada ajax y la misma devuelva error por no obtener url
	loadPageInit();
	
}
// CallBack MOBILE URL
function callBackMobileURL(e)
{
	mobileUrl = e;
}*/

var xhReq = new XMLHttpRequest();

jQuery(document).ready(function() {
  //INTERMEDIA DE INICIO
  xhReq.open("GET", "pages/page-initintermediate.html", false);
  xhReq.send(null);
  document.getElementById("page-initintermediate").innerHTML =
    xhReq.responseText;

  //LOGIN
  xhReq.open("GET", "pages/login/page-login.html", false);
  xhReq.send(null);
  document.getElementById("page-login").innerHTML = xhReq.responseText;

  xhReq.open("GET", "pages/login/page-emailsignup.html", false);
  xhReq.send(null);
  document.getElementById("page-emailsignup").innerHTML = xhReq.responseText;

  xhReq.open("GET", "pages/login/page-emailregister.html", false);
  xhReq.send(null);
  document.getElementById("page-emailregister").innerHTML = xhReq.responseText;

  xhReq.open("GET", "pages/login/page-pleaseverify.html", false);
  xhReq.send(null);
  document.getElementById("page-pleaseverify").innerHTML = xhReq.responseText;

  xhReq.open("GET", "pages/login/page-passwordrecovery.html", false);
  xhReq.send(null);
  document.getElementById("page-passwordrecovery").innerHTML =
    xhReq.responseText;

  //INGRESO CODIGO SMS PARA REGISTRO
  xhReq.open("GET", "pages/login/page-smscode.html", false);
  xhReq.send(null);
  document.getElementById("page-smscode").innerHTML = xhReq.responseText;

  //SETEO DE PERFIL EN REGISTRO
  xhReq.open("GET", "pages/login/page-setprofile.html", false);
  xhReq.send(null);
  document.getElementById("page-setprofile").innerHTML = xhReq.responseText;

  //CUENTA DE USUARIO
  xhReq.open("GET", "pages/page-user.html", false);
  xhReq.send(null);
  document.getElementById("page-user").innerHTML = xhReq.responseText;

  // INICIO
  xhReq.open("GET", "pages/page-home.html", false);
  xhReq.send(null);
  document.getElementById("page-home").innerHTML = xhReq.responseText;

  // CONFIGURACION INICIAL - FAVORITOS
  xhReq.open("GET", "pages/page-initsettings.html", false);
  xhReq.send(null);
  document.getElementById("page-initsettings").innerHTML = xhReq.responseText;

  // NOTIFICACIONES
  xhReq.open("GET", "pages/page-notifications.html", false);
  xhReq.send(null);
  document.getElementById("page-notifications").innerHTML = xhReq.responseText;

  // NOTICIAS
  xhReq.open("GET", "pages/page-news.html", false);
  xhReq.send(null);
  document.getElementById("page-news").innerHTML = xhReq.responseText;

  // DETALLES DE NOTICIA
  xhReq.open("GET", "pages/page-newdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-newdetails").innerHTML = xhReq.responseText;

  // DEPORTES
  xhReq.open("GET", "pages/page-sports.html", false);
  xhReq.send(null);
  document.getElementById("page-sports").innerHTML = xhReq.responseText;

  // DETALLES DE DEPORTE
  xhReq.open("GET", "pages/page-sportdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-sportdetails").innerHTML = xhReq.responseText;

  // TORNEO - FIXTURE
  xhReq.open("GET", "pages/tournaments/page-fixtures.html", false);
  xhReq.send(null);
  document.getElementById("page-fixtures").innerHTML = xhReq.responseText;

  // TORNEO - TABLA DE POSICIONES
  xhReq.open("GET", "pages/tournaments/page-positionstable.html", false);
  xhReq.send(null);
  document.getElementById("page-positionstable").innerHTML = xhReq.responseText;

  // TORNEO - TABLA DE GOLEADORES
  xhReq.open("GET", "pages/tournaments/page-shooterstable.html", false);
  xhReq.send(null);
  document.getElementById("page-shooterstable").innerHTML = xhReq.responseText;

  // TORNEO - DETALLE DE PARTIDO
  xhReq.open("GET", "pages/tournaments/page-matchdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-matchdetails").innerHTML = xhReq.responseText;

  // TORNEO - DETALLE DE LOS PARTIDOS
  xhReq.open("GET", "pages/tournaments/page-matchdetailsfixture.html", false);
  xhReq.send(null);
  document.getElementById("page-matchdetailsfixture").innerHTML =
    xhReq.responseText;

  // TORNEO - FIXTURE - FECHAS
  xhReq.open("GET", "pages/tournaments/page-dateslist.html", false);
  xhReq.send(null);
  document.getElementById("page-dateslist").innerHTML = xhReq.responseText;

  // ACTIVIDADES
  xhReq.open("GET", "pages/page-activities.html", false);
  xhReq.send(null);
  document.getElementById("page-activities").innerHTML = xhReq.responseText;

  // DETALLES DE ACTIVIDAD
  xhReq.open("GET", "pages/page-activitydetails.html", false);
  xhReq.send(null);
  document.getElementById("page-activitydetails").innerHTML =
    xhReq.responseText;

  // EVENTOS
  xhReq.open("GET", "pages/page-events.html", false);
  xhReq.send(null);
  document.getElementById("page-events").innerHTML = xhReq.responseText;

  // DETALLES DE EVENTO
  xhReq.open("GET", "pages/page-eventdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-eventdetails").innerHTML = xhReq.responseText;

  // Acerca de ...
  xhReq.open("GET", "pages/page-about.html", false);
  xhReq.send(null);
  document.getElementById("page-about").innerHTML = xhReq.responseText;

  // INSTALACIONES
  xhReq.open("GET", "pages/about/page-installations.html", false);
  xhReq.send(null);
  document.getElementById("page-installations").innerHTML = xhReq.responseText;

  // DETALLES DE INTALACION
  xhReq.open("GET", "pages/about/page-installationdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-installationdetails").innerHTML =
    xhReq.responseText;

  // TITULOS
  xhReq.open("GET", "pages/about/page-achievements.html", false);
  xhReq.send(null);
  document.getElementById("page-achievements").innerHTML = xhReq.responseText;

  // DETALLES DE TITULO
  xhReq.open("GET", "pages/about/page-achievementdetails.html", false);
  xhReq.send(null);
  document.getElementById("page-achievementdetails").innerHTML =
    xhReq.responseText;

  // HISTORIA
  xhReq.open("GET", "pages/about/page-milestones.html", false);
  xhReq.send(null);
  document.getElementById("page-milestones").innerHTML = xhReq.responseText;

  // DETALLES DE HITO
  xhReq.open("GET", "pages/about/page-milestonedetails.html", false);
  xhReq.send(null);
  document.getElementById("page-milestonedetails").innerHTML =
    xhReq.responseText;

  // COMISION DIRECTIVA
  xhReq.open("GET", "pages/about/page-managers.html", false);
  xhReq.send(null);
  document.getElementById("page-managers").innerHTML = xhReq.responseText;

  // CONTACTO
  xhReq.open("GET", "pages/about/page-contact.html", false);
  xhReq.send(null);
  document.getElementById("page-contact").innerHTML = xhReq.responseText;

  // CONFIGURACION
  xhReq.open("GET", "pages/page-settings.html", false);
  xhReq.send(null);
  document.getElementById("page-settings").innerHTML = xhReq.responseText;

  // POPUP CONFIGURACION DE FAVORITOS
  xhReq.open("GET", "pages/popup-settingsfavourites.html", false);
  xhReq.send(null);
  document.getElementById("popup-settingsfavourites").innerHTML =
    xhReq.responseText;

  xhReq.open("GET", "pages/page-update.html", false);
  xhReq.send(null);
  document.getElementById("page-update").innerHTML = xhReq.responseText;

  xhReq.open("GET", "pages/page-unsupported.html", false);
  xhReq.send(null);
  document.getElementById("page-unsupported").innerHTML = xhReq.responseText;

  //loadPageInit();
});

myApp.init();
//WORKAROUND: Se agregan las siguientes lineas para ocultar el navbar al inicio de la aplicacion en la pantalla "initintermediate"
// y para que no se abra el menu en dicha pantalla
myApp.hideNavbar(".navbar");
myApp.params.swipePanel = false;

var deviceID;
var platform;
//#################################################################################################################
//########################################          PHONE-GAP          ############################################
//#################################################################################################################

// Attach an event listener - This is an event that fires when PhoneGap is fully loaded
document.addEventListener("deviceready", onDeviceReady, false);

var isNewUser = false;
var existConnection;
function onDeviceReady() {
  //navigator.NativeSettings.wsURL(callBackWsURL, null, 'wsURL', null, null);
  //navigator.NativeSettings.mobileURL(callBackMobileURL, null, 'mobileURL', null, null);

  // set to lock the screen orientation on potrait (https://github.com/apache/cordova-plugin-screen-orientation)
  screen.orientation.lock("portrait");

  loadPageLogin();
  //loadPageInit();
  //ejecutamos la funcion de la push notification despues para evitar conflictos con el observer de OnAuthStateChange
  setTimeout(function() {
    setPushConfigurations();
  }, 2600);
  //loadPageLogin();
  //Start Tracker Google Analytics
  window.analytics.startTrackerWithId("UA-77665142-1");

  // DEVICE ID
  deviceID = device.uuid;

  // PLATFORM
  platform = device.platform;
  if (
    window.localStorage.getItem("TOKEN" + idClub) == null &&
    window.localStorage.getItem("CLIENTID" + idClub)
  ) {
    isNewUser = true;
  }

  //setPushConfigurations();

  // Attach an event listener - This is an event that fires when the user presses the device's back button
  document.addEventListener("backbutton", onBackKeyDown, false);

  // Hide Splash Screen when Phonegap Library is ready
  setTimeout(function() {
    navigator.splashscreen.hide();
  }, 2500);
}

function loadPageInit() {
  //LOGICA de redireccionamiento para mostrar home o config de favs al iniciar la app
  if (window.localStorage.getItem("PAGEINITCONFIG" + idClub) != null) {
    mainView.router.load({ pageName: "home" });
  } else {
    mainView.router.load({ pageName: "initsettings" });
  }
}

//variable que rellena el nombre del usuario seteado en firebase
var userName;
var userLastName;
var userFullName;
var userEmail;
var userPhoneNumber;

function loadPageLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.phoneNumber);
      if (user.emailVerified || user.phoneNumber || loggedByFacebook == true) {
        console.log("Email is verified or has phone or logged by facebook");

        userFullName = user.displayName;
        userEmail = user.email;
        userPhoneNumber = user.phoneNumber;

        if (userFullName == null) {
          mainView.router.load({ pageName: "setprofile" });
        } else {
          //if(window.localStorage.getItem("PAGEINITCONFIG"+idClub) != null)
          //{
          //me conecto con el ws de login y le paso todos los datos necesarios
          /*firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                                    console.log(idToken);
                                    tokenUser = idToken;
                                  }).catch(function(error) {
                                    console.log(error);
                                  });*/
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
              //we cannot pass tokenNotificacion = null to the server
              console.log(window.localStorage.getItem("TOKEN" + idClub));
              if (window.localStorage.getItem("TOKEN" + idClub) == null) {
                tokenNotificacion = "null";
              } else {
                tokenNotificacion = window.localStorage.getItem("TOKEN" + idClub);
              }
              console.log(tokenNotificacion);
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
                  tokenNotificacion: tokenNotificacion,
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
                  reloadContentHomePage();
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
        }
      } else {
        //alert('primero verifica neri');
        console.log("Email is not verified");
        mainView.router.load({ pageName: "pleaseverify" });
      }
    } else {
      mainView.router.load({ pageName: "login" });
    }
  });
}

function setPushConfigurations() {
  window.FirebasePlugin.grantPermission();

  window.FirebasePlugin.getToken(
    function(token) {
      console.log(token);
      // save this server-side and use it to push notifications to this device
      if (
        window.localStorage.getItem("TOKEN" + idClub) != token ||
        window.localStorage.getItem("CLIENTID" + idClub) == null
      ) {
        window.localStorage.setItem("TOKEN" + idClub, token);
        if (window.localStorage.getItem("TOKEN" + idClub)) {
          //registerNewClient();
        }
      }
    },
    function(error) {
      console.error(error);
    }
  );

  window.FirebasePlugin.onTokenRefresh(
    function(token) {
      console.log(token);
      // save this server-side and use it to push notifications to this device
      if (
        window.localStorage.getItem("TOKEN" + idClub) != token ||
        window.localStorage.getItem("CLIENTID" + idClub) == null
      ) {
        window.localStorage.setItem("TOKEN" + idClub, token);
        if (window.localStorage.getItem("TOKEN" + idClub)) {
          //registerNewClient();
        }
      }
    },
    function(error) {
      console.error(error);
    }
  );

  window.FirebasePlugin.onNotificationOpen(
    function(notification) {
      console.log(notification);
      var user = firebase.auth().currentUser;

      var params = JSON.parse(notification.wsParams);
      var paramsId = JSON.parse(params.params);
      console.log(paramsId);
      console.log(paramsId.id);
      //var ids = JSON.parse(params.params);

      //alert(ids);

      myApp.closeModal();
      /*
    	    Formato json notificaciones:
    	    ('title: ' + data.title);
    	    ('message: ' + data.message);
    	    ('pageName: '+data.additionalData.pageName);
    	    ('wsParams - name: '+data.additionalData.wsParams.name);
    		('wsParams - params - idClub: '+ params.idClub);
    	    ('wsParams - params - id: '+ params.id);
    	    ('notId: '+data.additionalData.notId);*/

      /*
    	    ('¿La app se inició haciendo touch en la PUSH sobre la barra de Notificaciones?: ' +
           	(data.additionalData.coldstart === undefined ? false : true));*/
      if (notification.pageName == "encuentro-vivo") {
        console.log("encuentro vivo");
        if (notification.tap == true) {
          if (user == null) {
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            //loadPageLogin();
            console.log("refreshss");
            //mainView.router.load({pageName: 'home'});
            //showLoadSpinnerWS();
            refreshMatchDetails1(ids.id);
            //hideLoadSpinnerWS();
            //refreshMatchDetails1(ids.id);
          }
        } else {
          console.log("tap false");
          if (user == null) {
            alert(
              "Acaba de llegar una notificacion, pero debes loguearte primero para visualizarla"
            );
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            console.log("tap false registrado");
            if (notification.title != undefined) {
              console.log(idLiveMatchActivePage);
              console.log(idLiveMatchSportDetails);

              if (
                idLiveMatchActivePage == ids.id ||
                idLiveMatchSportDetails == ids.id
              ) {
                console.log("idlivee");
                if (idLiveMatchActivePage == ids.id) {
                  console.log("idlivee2");
                  refreshMatchDetails1(ids.id);
                } else {
                  console.log("idlivee3");
                  refreshMatchDetails1(ids.id);
                }
              } else {
                console.log("not id livee");
                vibrate();
                var textNotification =
                  notification.message + messageNotificationLiveMatchConfirm;
                myApp.modal({
                  title: notification.title,
                  text: textNotification,
                  buttons: [
                    {
                      text: lblButtonCancel
                    },
                    {
                      text: lblButtonOk,
                      onClick: function() {
                        refreshMatchDetails1(ids.id);
                      }
                    }
                  ]
                });
              }
            } else {
              if (
                idLiveMatchActivePage == ids.id ||
                idLiveMatchSportDetails == ids.id
              ) {
                if (idLiveMatchActivePage == ids.id) {
                  refreshMatchDetails1(ids.id);
                } else {
                  refreshLiveMatchSportDetails(ids.id);
                }
              }
            }
          }
        }
      } else if (notification.pageName == "noticia") {
        if (notification.tap == true) {
          if (user == null) {
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            setTimeout(function() {
              console.log("set time function for push not");
              loadNewDetailsNotifications(
                paramsId.id,
                notification.notId,
                null
              );
            }, 6000);
          }
        } else {
          if (user == null) {
            alert(
              "Acaba de llegar una notificacion, pero debes loguearte primero para visualizarla"
            );
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            if (notification.title == undefined) {
              return;
            }
            vibrate();
            unreadNotifications++;
            setBadgeIconNotificationsHome();
            myApp.modal({
              title: lblNameClub,
              text: messageShowNotification,
              buttons: [
                {
                  text: lblButtonCancel
                },
                {
                  text: lblButtonOk,
                  onClick: function() {
                    loadNewDetailsNotifications(
                      paramsId.id,
                      notification.notId,
                      null
                    );
                  }
                }
              ]
            });
          }
        }
      } else if (notification.pageName == "evento") {
        if (notification.tap == true) {
          if (user == null) {
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            setTimeout(function() {
              console.log("set time function for push not evento");
              loadEventDetailsNotifications(
                paramsId.id,
                notification.notId,
                null
              );
            }, 6000);
          }
        } else {
          if (user == null) {
            alert(
              "Acaba de llegar una notificacion, pero debes loguearte primero para visualizarla"
            );
            mainView.router.load({ pageName: "login" });
            window.location.reload(true);
          } else {
            if (notification.title == undefined) {
              return;
            }
            vibrate();
            unreadNotifications++;
            setBadgeIconNotificationsHome();
            myApp.modal({
              title: lblNameClub,
              text: messageShowNotification,
              buttons: [
                {
                  text: lblButtonCancel
                },
                {
                  text: lblButtonOk,
                  onClick: function() {
                    loadEventDetailsNotifications(
                      paramsId.id,
                      notification.notId,
                      null
                    );
                  }
                }
              ]
            });
          }
        }
      }
    },
    function(error) {
      console.error(error);
    }
  );
}

function registerNewClient() {
  $.ajax({
    // URL del Web Service
    url: getPathMobile() + "registrar",
    dataType: "jsonp",
    type: "GET",
    data: {
      deviceId: deviceID,
      platform: platform,
      token: window.localStorage.getItem("TOKEN" + idClub),
      clubId: idClub
    },
    timeout: timeOut,
    success: function(response) {
      if (response.errorCode != 0) {
      } else {
        window.localStorage.setItem("CLIENTID" + idClub, response.clientId);
      }
    },
    error: function(data, status, error) {}
  });
}

function existInternetConnection() {
  try {
    var networkState = navigator.connection.type;
    return networkState != Connection.NONE;
  } catch (e) {}
}

function activateStateItemMenu(activePage) {
  $("#ulListMenu")
    .children()
    .removeClass("activeStateMenu");
  switch (activePage) {
    case "home":
      $("#liHomeItemMenu").addClass("activeStateMenu");
      break;
    case "news":
      $("#liNewsItemMenu").addClass("activeStateMenu");
      break;
    case "sports":
      $("#liSportsItemMenu").addClass("activeStateMenu");
      break;
    case "activities":
      $("#liActivitiesItemMenu").addClass("activeStateMenu");
      break;
    case "events":
      $("#liEventsItemMenu").addClass("activeStateMenu");
      break;
    case "about":
      $("#liAboutItemMenu").addClass("activeStateMenu");
      break;
    case "settings":
      $("#liSettingsItemMenu").addClass("activeStateMenu");
      break;
    case "user":
      $("#liUserItemMenu").addClass("activeStateMenu");
      break;
    default:
      break;
  }
}

function onBackKeyDown() {
  var isPopoverOpening = $(".modal-overlay").attr("class");
  var isPopupOpening = $("#popup-settingsfavourites").attr("class");
  if (
    isPopoverOpening == "modal-overlay modal-overlay-visible" ||
    isPopupOpening == "popup tablet-fullscreen modal-in"
  ) {
    myApp.closeModal();
  } else {
    var currentPage = myApp.getCurrentView().activePage.name;

    if (myPhotoBrowserPhotoGalleryNewDetails.swiper != undefined) {
      myPhotoBrowserPhotoGalleryNewDetails.close();
    } else if (myPhotoBrowserVideoGalleryNewDetails.swiper != undefined) {
      myPhotoBrowserVideoGalleryNewDetails.close();
    } else if (myPhotoBrowserPhotoGalleryInstallation.swiper != undefined) {
      myPhotoBrowserPhotoGalleryInstallation.close();
    } else if (myPhotoBrowserVideoGalleryInstallation.swiper != undefined) {
      myPhotoBrowserVideoGalleryInstallation.close();
    } else if (myPhotoBrowserPhotoGalleryAchievement.swiper != undefined) {
      myPhotoBrowserPhotoGalleryAchievement.close();
    } else if (myPhotoBrowserVideoGalleryAchievement.swiper != undefined) {
      myPhotoBrowserVideoGalleryAchievement.close();
    } else if (myPhotoBrowserPhotoGalleryEvent.swiper != undefined) {
      myPhotoBrowserPhotoGalleryEvent.close();
    } else if (myPhotoBrowserVideoGalleryEvent.swiper != undefined) {
      myPhotoBrowserVideoGalleryEvent.close();
    } else if (myPhotoBrowserPhotoGalleryMilestone.swiper != undefined) {
      myPhotoBrowserPhotoGalleryMilestone.close();
    } else if (myPhotoBrowserVideoGalleryMilestone.swiper != undefined) {
      myPhotoBrowserVideoGalleryMilestone.close();
    } else if ($$("body").hasClass("with-panel-left-reveal")) {
      myApp.closePanel();
    } else if (
      currentPage == "home" ||
      currentPage == "update" ||
      currentPage == "unsupported" ||
      currentPage == "initsettings" ||
      currentPage == "initintermediate"
    ) {
      navigator.app.exitApp();
    } else if (
      currentPage == "login" ||
      currentPage == "smscode" ||
      currentPage == "setprofile"
    ) {
      loginBackButton();
    } else if (
      currentPage == "news" ||
      currentPage == "sports" ||
      currentPage == "activities" ||
      currentPage == "events" ||
      currentPage == "about"
    ) {
      mainView.router.back({
        pageName: "home",
        force: true
      });
    } else if (currentPage == "settings") {
      confirmChangesFavouritesSettings();
    } else if ($(".modal-preloader").hasClass("modal-in") == true) {
    } else {
      mainView.router.back();
    }
  }
}

function onConfirm(button) {
  //touchControl();
  // if the user selected "Aceptar"
  if (button == 2) {
    navigator.app.exitApp();
  }
}

function showLoadSpinnerWS() {
  myApp.showPreloader(messageLoading);
}

function hideLoadSpinnerWS() {
  myApp.hidePreloader();
}

function openBrowser(url) {
  window.open(url, "_system");
}

function openYoutube(url) {
  window.open(url, "_system", "location=yes");
}

function openPhoneCaller(phoneNumber) {
  window.open("tel:" + phoneNumber, "_system");
}

function openMailer(subject, mail) {
  var shareByMail = "mailto:" + mail + "?subject=" + subject;
  window.open(shareByMail, "_system");
}

function openMap(latitude, longitude) {
  window.open(
    "http://maps.google.com/?q=" + latitude + "," + longitude,
    "_system"
  );
}

function playVideo(urlVideo) {
  window.open(urlVideo, "_system", "location=yes");
}

function vibrate() {
  navigator.vibrate(50);
}

function getPathWS() {
  //return wsUrl;
  //return 'http://testing.lenguajesport.com/webservice/';
  //return 'http://clubes.lenguajesport.com/webservice/';
  return "https://clubes.lenguajefutbol.com/9/api/";
}

function getPathMobile() {
  //return mobileUrl;
  //return 'http://testing.lenguajesport.com/movil/';
  //return 'http://clubes.lenguajesport.com/movil/';
  return "https://clubes.lenguajefutbol.com/9/api/";
}

function showMessage(message) {
  myApp.alert(message);
}

function showMessageToast(message) {
  var messageToast = myApp.toast(message, "", {});
  messageToast.show();
}

function getDefaultImageNewsList() {
  return "img/default-news-list.png";
}

function getDefaultImageNewDetails() {
  return "img/default-new-details.png";
}

function getDefaultImageProfile() {
  return "img/template/default-profile.png";
}

function trackPageGA(pageName) {
  if (isMobile() == true) {
    window.analytics.trackView(idClub + " - " + lblNameClub + " - " + pageName);
  }
}

// Determina si la plataforma actual es Mobile
function isMobile() {
  if (
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function builderBannerPublicityList(url, link) {
  var strBuilderBanner = [];
  if (url != "") {
    strBuilderBanner.push(
      '<img data-src="' +
        url +
        '" onclick="openBrowser(\'' +
        link +
        '\')" class="lazy lazy-fadeIn img-list-banner"/>'
    );
  } else {
    strBuilderBanner.push(
      '<img class="img-list-banner" src="img/banner-publicidad.png"/>'
    );
  }
  return strBuilderBanner.join("");
}

function builderBannerPublicityDetail(banner) {
  var strBuilderBanner = [];
  if (banner.urlAdBanner != "") {
    strBuilderBanner.push(
      '<img data-src="' +
        banner.urlAdBanner +
        '" onclick="openBrowser(\'' +
        banner.linkAdBanner +
        '\')" class="lazy lazy-fadeIn imgAdBannerBottom"/>'
    );
  } else {
    strBuilderBanner.push(
      '<img class="imgAdBannerBottom" src="img\\advertising_01.jpg" alt="Espacio Publicitario"/>'
    );
  }
  return strBuilderBanner.join("");
}

function isAppUpdate(serverVersion) {
  if (serverVersion != numberVersionWS) {
    return false;
  } else {
    return true;
  }
}

// devuelve la fecha en formato dd/mm/aaaa
// por ejemplo 1/11/2016
function getNowDate() {
  var now = new Date();
  var nowDate = now.getDate();
  var nowMonth = now.getMonth() + 1;
  var nowYear = now.getFullYear();
  var nowFormat = nowDate + "/" + nowMonth + "/" + nowYear;

  return nowFormat;
}

//Calcula la diferencia en días de las dos fechas pasadas por parametro
function dateSubtraction(yesterday, today) {
  var aFecha1 = yesterday.split("/");
  var aFecha2 = today.split("/");
  var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
  var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
  var dif = fFecha2 - fFecha1;
  var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
  return dias;
}
