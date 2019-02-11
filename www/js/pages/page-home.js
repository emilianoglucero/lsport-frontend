var arraySportsHomeWS = [];
var arrayActivitiesHomeWS = [];
var unreadNotifications = 0;

//cuantos suscesos por pagina se cargan
var itemsPage = 15;

//variable que almacena todos los sucesos
var allSucesosPageList = [];
//variable que almacena todos los sucesos separados por tipo
var allSucesosEventsList = [];
var allSucesosFechaTorneoList = [];
var allSucesosNewsList = [];
var allSucesosEncuentroList = [];
var allSucesosTorneoTablaPosicionList = [];

var areContentTabSucesosHomeDetailsBuilder = false;
var areContentTab2HomeDetailsBuilder = false;
var areContentTab3HomeDetailsBuilder = false;

var calendarInline;

var homeDetails2List;
var homeDetails3List;

var sportsList = [];
var activitiesList = [];

//acumuladores de sucesos de torneos y actividades
var tournamentNewsList = [];
var tournamentEventList = [];
var tournamentPositionList = [];
var tournamentMatchList = [];
var tournamentEncuentroList = [];

//almaceno todos los sucesos, reemplazo de allpagelist <- borrarlo
var newsListHome = [];

var nextPageNumberHomeNews = 1;
var loadingInfiniteScrollHomeNews = false;
var currentPageNumberHomeNews, currentTotalPageHomeNews;

var areAccessedServerHomeNews = false;
var areHomeNewsLoaded = false;

var torneoEncuentroState;

//var matchDetailFromHome = "home";
//var matchDetailFromCalendar = "calendar";
//var matchDetailFromSports = "sports";
//var matchDetailFromNews = "news"
//var matchDetailFromCalendar = "calendar";
var sucesoDetailFromHome = "home";
var sucesoDetailFromCalendar = "calendar";
var sucesoDetailFromSports = "sports";
var sucesoDetailFromNews = "news";

$(document).ready(function(){
	//INIT HEADERS
	    $('.lblNameClub').text(lblNameClub);
	    $('#lblHeaderHome').text(lblHeaderHome);
	    $('#lblHeaderNotifications').text(lblHeaderNotifications);
	    $('#lblHeaderNews').text(lblHeaderNews);
	    $('#lblHeaderSports').text(lblHeaderSports);
	    $('#lblHeaderActivities').text(lblHeaderActivities);
	    $('#lblHeaderEvents').text(lblHeaderEvents);
	    $('#lblHeaderEventDetails').text(lblHeaderEventDetails);
	    $('#lblHeaderAbout').text(lblHeaderAbout);
	    $('#lblHeaderSettings').text(lblHeaderSettings);
	    $('#lblHeaderUser').text(lblHeaderUser);
	    $('#lblHeaderSettingsFavourites').text(lblHeaderSettingsFavourites);
	    $('#lblHeaderSettingsNotifications').text(lblHeaderSettingsNotifications);
	    $('#lblHeaderInstallations').text(lblHeaderInstallations);
	    $('#lblHeaderInstallationDetails').text(lblHeaderInstallationDetails);
	    $('#lblHeaderAchievements').text(lblHeaderAchievements);
	    $('#lblHeaderAchievementDetails').text(lblHeaderAchievementDetails);
	    $('#lblHeaderMilestones').text(lblHeaderMilestones);
	    $('#lblHeaderMilestoneDetails').text(lblHeaderMilestoneDetails);
	    $('#lblHeaderNewDetails').text(lblHeaderNewDetails);
	    $('#lblHeaderActivityDetails').text(lblHeaderActivityDetails);
	    $('#lblHeaderSportDetails').text(lblHeaderSportDetails);
	    $('#lblHeaderManagers').text(lblHeaderManagers);
	    $('#lblHeaderContact').text(lblHeaderContact);
	    $('.lblHeaderBack').text(lblHeaderBack);

        $('#subnavbarHomeDetails1').text(lblTabHome1);
        $('#subnavbarHomeDetails2').text(lblTabHome2);
        //$('#subnavbarHomeDetails3').text(lblTabHome3);

	    //INIT LBL MENU
	    $('#lblMnuTitle').text(lblMnuTitle);
	    $('#lblMnuHome').text(lblMnuHome);
	    $('#lblMnuNews').text(lblMnuNews);
	    $('#lblMnuSports').text(lblMnuSports);
	    $('#lblMnuActivities').text(lblMnuActivities);
	    $('#lblMnuEvents').text(lblMnuEvents);
	    $('#lblMnuAbout').text(lblMnuAbout);
	    $('#lblMnuSettings').text(lblMnuSettings);
	    $('#lblMnuUser').text(lblMnuUser);

	    $('.divNoConnectionHeader').text(divNoConnectionHeader);
	    $('.divNoConnectionText').text(divNoConnectionText);
	    $('#lblFavoritesHome').text(lblFavoritesHome);
		$('#divLastestNewsHome').text(divLastestNewsHome);
		$('#bottonSaveNotificationsSettings').text(lblSaveFavouritesSettings);
		$('#spnMessagePopupSettingsFavourites').text(spnMessagePopupSettingsFavourites);
		$('#spnDisabledPopup').text(spnDisabledPopup);
		$('#headerPopupCustom').text(lblNameClub);
		$('#lblCloseButton').text(lblCloseButton);
});

myApp.onPageInit('home', function (page)
{
    //se usa para configurar el boton "fixture" en la pantalla de detalles de partido
    //torneoEncuentroState = true;
	myApp.initImagesLazyLoad(mainView.activePage.container);
	loadContentHomePage();

	/*$('#icon-settings-favourites-notifications').on('click', function(){
		mainView.router.load({pageName: 'settings'});
	});*/

    $$('#tabHomeDetails1').on('show', function () {
    console.log(areContentTabSucesosHomeDetailsBuilder);
		if(areContentTabSucesosHomeDetailsBuilder == false){
		console.log('inside tabhumedetails1');
			builderHomePage();
			areContentTabSucesosHomeDetailsBuilder = true;
		}
	});
	$$('#tabHomeDetails2').on('show', function () {
	    console.log(areContentTab2HomeDetailsBuilder);
	    if (areContentTab2HomeDetailsBuilder == false){
	    	builderHomeDetails2();
	    	areContentTab2HomeDetailsBuilder  = true;
	    }
	});
	/*$$('#tabHomeDetails3').on('show', function () {
	    if (areContentTab3HomeDetailsBuilder == false){
	    	//builderHomeDetails2();
	    	areContentTabHomeDetails3Builder  = true;
	    }
	    //alert('33');
	});*/

	//admob settings
	// place our admob ad unit id here
      /*var admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
          banner: 'ca-app-pub-4977768595563395/2701602073',
          interstitial: 'ca-app-pub-4977768595563395/7133346268',
          rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-4977768595563395/5628692908',
          interstitial: 'ca-app-pub-4977768595563395/3493484154',
          rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-6869992474017983/8878394753',
          interstitial: 'ca-app-pub-6869992474017983/1355127956',
          rewardvideo: '',
        };
      }

      // preppare and load ad resource in background, e.g. at begining of game level
        AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        isTesting: true,
        autoShow: false
      });


      // it will display smart banner at top center, using the default options
      AdMob.createBanner({
      	adId: admobid.banner,
      	position: AdMob.AD_POSITION.BOTTOM_CENTER,
      	autoShow: false,
      	isTesting: true,
      	success: function(){
      	},
      	error: function(){
      		alert('failed to create banner');
      	}
      });*/

      //admob finished

      // Pull to refresh content
      var ptrContent = $$('.pull-to-refresh-content');

      // Add 'refresh' listener on it
      ptrContent.on('ptr:refresh', function (e) {
          //refresh code
          loadContentHomePage();
          //alert('pull refresh');
              // When loading done, we need to reset it
              myApp.pullToRefreshDone();
      });
      //pull to refresh finishes



});

myApp.onPageBeforeAnimation('home', function (page)
{
	if(areFavouritesChanged){
		$('#iconHeaderFavouritesHome').show();
		reloadContentHomePage();
	}
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);

	trackPageGA("Home");
	myApp.initImagesLazyLoad(mainView.activePage.container);

	// Mostrar/ocultar boton de atajo de "Configuracion"
	if(window.localStorage.getItem("COUNTERACCESSSETTINGS"+idClub) == null ||
			window.localStorage.getItem("INSTALLATIONDATE"+idClub) == null)
	{
		window.localStorage.setItem("COUNTERACCESSSETTINGS"+idClub,0);
		var now = getNowDate();
		window.localStorage.setItem("INSTALLATIONDATE"+idClub,now);
		$('#icon-settings-favourites-notifications').css('display','flex');
	}
	else
	{
		var days = dateSubtraction(getNowDate(),window.localStorage.getItem("INSTALLATIONDATE"+idClub));
		if(window.localStorage.getItem("COUNTERACCESSSETTINGS"+idClub) > 2)
		{
			$('#icon-settings-favourites-notifications').css('display','none');
		}
		else if(days > 7)
		{
			$('#icon-settings-favourites-notifications').css('display','none');
		}
		else
		{
			$('#icon-settings-favourites-notifications').css('display','flex');
		}
	}
});

function truncateNoticia(string){
console.log(string);
console.log(string.length);
   if (string.length > 280) {
   console.log('string is biig');
      return string.substring(0,280)+'...';
   } else {
   console.log('string is shoort');
      return string;
   }
};

function reloadPageHome(){
	if (existInternetConnection() == true){
		loadContentHomePage();
	} else{
		showLoadSpinnerWS();
		setTimeout(function(){
			hideLoadSpinnerWS();
		}, 1500);
	}
}

function loadContentHomePage(){
	$('#divNoConnectionHome').hide();
	$('#divExistConnectionHome').hide();
	//$("#footer").hide();
	showLoadSpinnerWS();
	var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	if (currentFavouritesList == null)
	{
		setDefaultFavourites();
		currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	}
	var currentFavouritesSports = [];
	var currentFavouritesActivities = [];
	if(currentFavouritesList != null){
		$.each( currentFavouritesList, function( i, item ){
			if(item.idCategory != null){
				currentFavouritesSports.push(item.idCategory);
			}
			else {
				currentFavouritesActivities.push(item.id);
			}
		});
	}
	clientId = window.localStorage.getItem("CLIENTID"+idClub);
	console.log(deviceID);
    $.ajax({
      url: getPathWS() + 'getHome',
      dataType: 'json',
      success: function(response){
      console.log(response);
     /* if(response.errorCode != 0)
        {
            hideLoadSpinnerWS();
            $('#divNoConnectionHome').show();
            filterCodeErrorWS(response);
            return;
        }*/
        /*if(isAppUpdate(response.serverVersion) == false){
            hideLoadSpinnerWS();
            mainView.router.load({pageName: 'update'});
            return;
        }*/
        newsListHome = response.sucesosPanel.sucesos;
        console.log(newsListHome);
        homeDetails3List = response.torneoPanel;
        homeDetails2List = response.calendarioPanel;
        console.log(homeDetails2List);
        console.log(homeDetails3List);
        sportsList = response.menu.deportes;
        activitiesList = response.menu.actividades;
        if (newsListHome !== "") {
            console.log('es la primera');
            allSucesosPageList = response.sucesosPanel.sucesos;
            console.log(allSucesosPageList);
            var allSucesosPageListLength = allSucesosPageList.length - 1;

            for (i = 0; i <= allSucesosPageListLength; i++) {
                console.log(newsListHome[i]);
                console.log(newsListHome[i].id);
                console.log(newsListHome[i].tipoObjeto);
                //allSucesosPageList.push(newsListHome[i]);
                if (newsListHome[i].tipoObjeto === 'evento') {
                    console.log('agrego evento');
                    allSucesosEventsList.push(newsListHome[i]);
                }
                if (newsListHome[i].tipoObjeto === 'noticia') {
                    console.log('agrego noticia');
                    allSucesosNewsList.push(newsListHome[i]);
                }
                if (newsListHome[i].tipoObjeto === 'torneo-tabla-posicion') {
                    console.log('agrego tabla');
                    allSucesosTorneoTablaPosicionList.push(newsListHome[i]);
                }
                if (newsListHome[i].tipoObjeto === 'torneo-fecha') {
                    console.log('agrego fecha');
                    allSucesosFechaTorneoList.push(newsListHome[i]);
                }
                if (newsListHome[i].tipoObjeto === 'torneo-encuentro') {
                    console.log('agrego encuentro');
                    allSucesosEncuentroList.push(newsListHome[i]);
                }
                /*if (allSucesosPageList[i].tipoObjeto === 'evento'){
                 console.log('agrego evento');
                     allSucesosEventsList.push(newsListHome[i]);
                }*/
                console.log(allSucesosEventsList);
                console.log(allSucesosNewsList);
                console.log(allSucesosFechaTorneoList);
                console.log(allSucesosTorneoTablaPosicionList);
                /*if (newsListHome[i].tipoObjeto === 'evento'){
                    allSucesosEventsList.push(newsListHome[i]);
                }*/
            }
        }
        console.log(allSucesosEventsList);


        currentPageNumberHomeNews = parseInt(response.sucesosPanel.paginaActual);
        currentTotalPageHomeNews = parseInt(response.sucesosPanel.paginasTotal);
        nextPageNumberHomeNews = parseInt(response.sucesosPanel.paginaActual) + 1;
        console.log(currentTotalPageHomeNews);
        console.log(currentPageNumberHomeNews);
        console.log(nextPageNumberHomeNews);


        //arraySportsHomeWS = response.home.arraySports;
        //arrayActivitiesHomeWS = response.home.arrayActivities;
        //builderHomeBanner(response.home.banner);
        //unreadNotifications = response.home.unreadNotifications;
        //setBadgeIconNotificationsHome();

        //admob interstitial
                    // show the interstitial later, e.g. at end of game level
                          //if(AdMob) AdMob.showInterstitial();

        areHomeNewsLoaded = true;
        areContentTabSucesosHomeDetailsBuilder = true;

        builderHomePage();
        $('#divExistConnectionHome').show();
        hideLoadSpinnerWS();
        //$("#footer").show();



        },
        error: function (data, status, error){
        console.log(error);
        console.log(data);
        console.log(status);
        $('#divNoConnectionHome').show();
        hideLoadSpinnerWS();
        showMessageToast(messageConexionError);
        },
      beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
    });
    /*
    	$.ajax({
    		// URL del Web Service
    		url: getPathWS() + 'getHome',
    		dataType: 'jsonp',
    		data: { 'idClub': idClub,
    				'clientId': window.localStorage.getItem("CLIENTID"+idClub),
    				'arrayIdSports': currentFavouritesSports.toString(),
    				'arrayIdActivities': currentFavouritesActivities.toString()
    			 },
    		timeout: timeOut,
    		success: function(response){
    			if(response.errorCode != 0)
    			{
    			    hideLoadSpinnerWS();
    			    $('#divNoConnectionHome').show();
    			    filterCodeErrorWS(response);
    			    return;
    			}
    			if(isAppUpdate(response.serverVersion) == false){
    				hideLoadSpinnerWS();
    				mainView.router.load({pageName: 'update'});
    				return;
    			}
    			newsListHome = response.home.arrayHomeNews;

    			currentPageNumberHomeNews = parseInt(response.home.arrayHomeNews.pageNumber);
    			currentTotalPageHomeNews = parseInt(response.home.arrayHomeNews.totalPage);
    			nextPageNumberHomeNews = parseInt(response.home.arrayHomeNews.pageNumber) + 1;

    			arraySportsHomeWS = response.home.arraySports;
    			arrayActivitiesHomeWS = response.home.arrayActivities;
    			//builderHomeBanner(response.home.banner);
    			unreadNotifications = response.home.unreadNotifications;
    			setBadgeIconNotificationsHome();

    			//admob interstitial
                			// show the interstitial later, e.g. at end of game level
                                  //if(AdMob) AdMob.showInterstitial();

    			areHomeNewsLoaded = true;

    			builderHomePage(currentFavouritesSports,currentFavouritesActivities);
    			$('#divExistConnectionHome').show();
    			hideLoadSpinnerWS();
    			//$("#footer").show();



    		},
    		error: function (data, status, error){
    			$('#divNoConnectionHome').show();
    			hideLoadSpinnerWS();
    			showMessageToast(messageConexionError);
    	   }
    	});*/

}

function reloadContentHomePage(){
	$('#iconHeaderFavouritesHome .icon').addClass('animation-preloader');
	var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	if (currentFavouritesList == null)
	{
		setDefaultFavourites();
		currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	}
	var currentFavouritesSports = [];
	var currentFavouritesActivities = [];

	$.each( currentFavouritesList, function( i, item ){
		if(item.idCategory != null){
			currentFavouritesSports.push(item.idCategory);
		}
		else {
			currentFavouritesActivities.push(item.id);
		}
	});

	$.ajax({
	// URL del Web Service
    		url: getPathWS() + 'getHome',
    		dataType: 'json',
    		timeout: timeOut,
    		success: function(response){
    			/*if(response.errorCode != 0)
    			{
    				hideLoadSpinnerWS();
    			    filterCodeErrorWS(response);
    			    $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    			    return;
    			}
    			if(isAppUpdate(response.serverVersion) == false){
    				hideLoadSpinnerWS();
    				mainView.router.load({pageName: 'update'});
    				return;
    			}*/
    			//arraySportsHomeWS = response.sucesosPanel.arraySports;
    			//arrayActivitiesHomeWS = response.home.arrayActivities;
    			//chequear como armar esto builderHomeBanner(response.home.banner);
    			//unreadNotifications = response.home.unreadNotifications;
    			//setBadgeIconNotificationsHome();
    			//builderFavouritesHome();
    			$('#iconHeaderFavouritesHome').hide();
    			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    			hideLoadSpinnerWS();
    			areFavouritesChanged = false;

    		},
    		error: function (data, status, error){
    			showMessageToast(messageConexionError);
    			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    	   },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
	});
}



function builderHomePage(){

	//builderFavouritesHome();
console.log(currentPageNumberHomeNews);
console.log(currentTotalPageHomeNews);
            if(currentPageNumberHomeNews < currentTotalPageHomeNews){
            console.log('totalpagemayorcurrent');
				myApp.attachInfiniteScroll('.infinite-scroll-homenews');
				$$('.infinite-scroll-homenews').on('infinite', function () {

					if (loadingInfiniteScrollHomeNews){
					console.log('return loadinginfinitescroll');
						return;
					}
					loadingInfiniteScrollHomeNews = true;

					if (areAccessedServerHomeNews == false){
					console.log('areaccesesloadhomesportdetails');
						loadNewsHomeSportDetails();
					} else {
					console.log('noconnection');
						$('#noConnection-content-block-homenews').show();
					}
				});
			}
			else{
			console.log('detachscroll');
				myApp.detachInfiniteScroll('.infinite-scroll');
			}

            if(newsListHome != "")
            {
            				//areContentTabNewsSportDetailsBuilder = true;
            				console.log('newlisthomefail');
            			//builderNewsHomeDetails();
            			builderNewsHomeDetails();
            }
    //$('#last-news-list-block').append(builderNewsHomeDetails());

	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#tabHomeDetails1').scroll(function()
	{
		if ($(this).scrollTop() < 30)
		{
			//$("#footer").slideDown();
		}
		else
		{
			//$("#footer").slideUp();
			$("#whiteSpaceHomePublicity").fadeOut(0);
		}
	});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#tabHomeDetails1').scroll(function()
	{
		if ($(this).scrollTop() < 30)
		{
			//$("#footer").slideDown();
		}
		else
		{
			//$("#footer").slideUp();
			$("#whiteSpaceHomePublicity").fadeOut(0);
		}
	});
}

function builderHomeBanner(banner){
	var strHomeBanner = [];
	$('#footer').html('');
	if(banner.urlAdBanner != ""){
		strHomeBanner.push('<img data-src="'+banner.urlAdBanner+'" onclick="openBrowser(\''+banner.linkAdBanner+'\')" class="lazy lazy-fadeIn"/>');
	}
	else{
		strHomeBanner.push('<img src="img\\banner-publicidad.png"/>');
	}
	$('#footer').html(strHomeBanner.join(""));
}

function loadNewsHomeSportDetails(){
console.log('insideloadnews');
console.log(currentPageNumberHomeNews);
console.log(nextPageNumberHomeNews);
	//showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getSucesos',
			dataType: 'json',
			data: { 'paginaActual': nextPageNumberHomeNews,
			        'itemsPorPagina': itemsPage
            },
            //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer Bearer dcce59676c43e1c54a342e5207dfce0dc00fd502' ); }, //set tokenString before send
			timeout: timeOut,
			success: function(response){
				/*if(response.errorCode != 0)
				{
				    hideLoadSpinnerWS();
				    filterCodeErrorWS(response);
				    return;
				}
				if(isAppUpdate(response.serverVersion) == false){
					hideLoadSpinnerWS();
					mainView.router.load({pageName: 'update'});
					return;
				}*/

				nextPageNumberHomeNews = parseInt(response.paginaActual) + 1;
                console.log(nextPageNumberHomeNews);
				if( response.paginaActual == 1 ){
				console.log('primer pag');
					$('#last-news-list-block').html("");
					//newsListHome = [];
					newsListHome = response.sucesos;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					hideLoadSpinnerWS();
				} else {
				console.log('segunda pag');
					//newsListHome = [];
					newsListHome = response.sucesos;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					//hideLoadSpinnerWS();
					//logica para almacenar todas las noticias, y así poder acceder al detalle de todas
                            //if (allSucesosPageList == ""){
                            //console.log('no agrega y es la primera');
                                //allSucesosPageList = response.sucesosPanel.sucesos;
                            //} else {
                            //console.log('agrega sucesos');
                            //console.log(allSucesosPageList.length);
                            var allSucesosPageListLength = newsListHome.length - 1;
                            console.log(allSucesosPageListLength);
                                for (i = 0; i <= allSucesosPageListLength ; i++) {
                                    console.log(newsListHome[i]);
                                    console.log(newsListHome[i].id);
                                    console.log(newsListHome[i].tipoObjeto);
                                    allSucesosPageList.push(newsListHome[i]);
                                    if (newsListHome[i].tipoObjeto === 'evento'){
                                        allSucesosEventsList.push(newsListHome[i]);
                                    }
                                    if (newsListHome[i].tipoObjeto === 'noticia'){
                                     console.log('agrego noticia');
                                         allSucesosNewsList.push(newsListHome[i]);
                                    }
                                    if (newsListHome[i].tipoObjeto === 'torneo-tabla-posicion'){
                                     console.log('agrego fecha del torneo');
                                         allSucesosTorneoTablaPosicionList.push(newsListHome[i]);
                                    }
                                    if (newsListHome[i].tipoObjeto === 'torneo-fecha') {
                                        console.log('agrego torneo fecha');
                                        allSucesosFechaTorneoList.push(newsListHome[i]);
                                    }
                                    if (newsListHome[i].tipoObjeto === 'torneo-encuentro') {
                                        console.log('agrego encuentro');
                                        allSucesosEncuentroList.push(newsListHome[i]);
                                    }
                                    console.log(allSucesosNewsList);
                                    /*if (newsListHome[i].tipoObjeto === 'evento'){
                                        allSucesosEventsList.push(newsListHome[i]);
                                    }*/
                                }
                                //allNewsPageList.push(response.noticias);
                                console.log(allSucesosEventsList);
                                console.log(allSucesosFechaTorneoList);
                                console.log(allSucesosNewsList);

				}

				if( response.paginasTotal < nextPageNumberHomeNews ){
					myApp.detachInfiniteScroll('.infinite-scroll-homenews');
				}
				loadingInfiniteScrollHomeNews = false;
				areAccessedServerHomeNews = false;

				areContentTabSucesosHomeDetailsBuilder = true;
				//$('#noConnection-content-block-sportdetails').hide();

			},
			error: function (data, status, error){
		          if( nextPageNumberHomeNews == 1 ){
		          	builderErrorNewsSportDetails();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	loadingInfiniteScrollHomeNewss = false;
		          	areAccessedServerHomeNews = true;
		          }
		   },
		   beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send

	});
}



function setBadgeIconNotificationsHome(){
	if(unreadNotifications <= 0){
		$('#icon-notifications-home').removeClass('icon-notifications-home');
	}
	else if (unreadNotifications < 100)
	{
		$('#icon-notifications-home').addClass('icon-notifications-home');
		$('.icon-notifications-home').attr('data-content',unreadNotifications);
	} else{
		$('#icon-notifications-home').addClass('icon-notifications-home');
		$('.icon-notifications-home').attr('data-content','99');
	}
}

function builderFavouritesHome(){
	var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	if(arraySportsHomeWS != ""){
		$.each( arraySportsHomeWS, function( iWS, itemWS ){
			$.each( currentFavouritesList, function( iLocal, itemLocal ){
				if (itemWS.id == itemLocal.id && itemWS.idCategory == itemLocal.idCategory){
					$('#boxFavouriteHome'+itemLocal.order).attr("onclick","loadSportDetails("+itemWS.id+","+itemWS.idCategory+")");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("src", "");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("data-src", itemWS.urlImgContent);
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("alt", itemWS.altImg);
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-loaded");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-fadeIn");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').addClass("lazy lazy-fadeIn");
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').text(itemWS.name);
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').attr( 'width',$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').width() ).addClass( "ellipsis" );
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-second').text(itemWS.shortCategoryName);
					itemLocal.id = null;
				}
			});
		});
	}
	if (arrayActivitiesHomeWS != ""){
		$.each( arrayActivitiesHomeWS, function( iWS, itemWS ){
			$.each( currentFavouritesList, function( iLocal, itemLocal ){
				if ( itemLocal.idCategory == null && itemLocal.id == itemWS.id){
					$('#boxFavouriteHome'+itemLocal.order).attr("onclick","loadActivityDetails("+itemWS.id+")");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("src", "");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("data-src", itemWS.urlImgContent);
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("alt", itemWS.altImg);
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-loaded");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-fadeIn");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy");
					$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').addClass("lazy lazy-fadeIn");
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').text(itemWS.shortName);
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').attr( 'width',$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').width() ).addClass( "ellipsis" );
					$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-second').text("");
					itemLocal.id = null;
				}
			});
		});
	}
	$.each( currentFavouritesList, function( iLocal, itemLocal ){
		if(itemLocal.id != null){
			$('#boxFavouriteHome'+itemLocal.order).attr("onclick","showMessage(\'"+messageFavouriteNotExist+"\')");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("src", "");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("data-src", "img/template/home_icon_disabled.png");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').attr("alt", itemLocal.name);
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-loaded");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy-fadeIn");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').removeClass("lazy");
			$('#boxFavouriteHome'+itemLocal.order+' .img-sport-fav').addClass("lazy lazy-fadeIn");
			$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').text(itemLocal.name);
			$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').attr( 'width',$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-first').width() ).addClass( "ellipsis" );
			$('#boxFavouriteHome'+itemLocal.order+' .p-sport-fav-second').text(lblFavouriteNotExists);
		}
	});
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderNewsHomeDetails(){
console.log('arranca builder de los suceso');
	//$('#last-news-list-block').html('');
	var strBuilderLastNewsContent = [];
	console.log(newsListHome);
	console.log(newsListHome.length);
	if(newsListHome.length == 0){
			strBuilderLastNewsContent.push('<div class="divNotLastestNews">'+divNotLastestNews+'</div>');
	}
	else{
		strBuilderLastNewsContent.push('<div class="list-block list-block-home media-list">');
		//strBuilderLastNewsContent.push('<ul>');
		$.each( newsListHome, function( i, item ){
		console.log(item.id);
		console.log(item);
            if(item.tipoObjeto == "banner"){
                        strBuilderLastNewsContent.push('<div class="item-list-banner">');
                            strBuilderLastNewsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
                        strBuilderLastNewsContent.push('</div>');
            } else if (item.tipoObjeto == "noticia") {

                var noticiaTruncada = truncateNoticia(item.detalleTxt);
                console.log(noticiaTruncada);
                strBuilderLastNewsContent.push('<div class="card demo-card-header-pic"><div style="background-image:url('+item.imagenPrincipalMin+'); height:150px;" valign="bottom" class="card-header color-white no-border">');
                strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+',\''+sucesoDetailFromHome+'\')" href="#" class="item-link item-content">');
                    strBuilderLastNewsContent.push('<div class="chipHomeContainer">');
                        //strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
                       // strBuilderLastNewsContent.push('<div class="chip chipHomeDate"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeDateLabel">'+formatDateSucesos(item.fecha.fecha)+'</div></div>');
                       if (item.tags.publicador != "") {
                           strBuilderLastNewsContent.push('<div class="chip chipHomeCategory"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.publicador+'</div></div>');
                       }
                        //strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i class="icon icon-home-tiposuceso"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.categoria+'</div></div>');
                        strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i style="background-image: url('+item.tags.icono+');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.categoria+'</div></div>');
                        strBuilderLastNewsContent.push('</div></div>');
                        strBuilderLastNewsContent.push('<div class="card-content news-content">');

                            strBuilderLastNewsContent.push('<div class="card-content-inner">');
                            var urlImgNewsList = getDefaultImageNewsList();
                            if(item.urlImgMin != ""){
                                urlImgNewsList = item.urlImgMin;
                            }
                            strBuilderLastNewsContent.push('<div class="row"><div class="col-70"><div class="">'+item.titulo+'</div></div>');
                            strBuilderLastNewsContent.push('<div class="col-30"><div class="dateTitleNew color-gray">15/09/2018</div></div></div>');
                             strBuilderLastNewsContent.push('<div class="row"><div class="col-100"><div class="color-gray homeCardcontent">'+noticiaTruncada+'</div></div></div>');

                            strBuilderLastNewsContent.push('</div></div>');
                            strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a>');
                            strBuilderLastNewsContent.push('</div>');

                //}
            } else if (item.tipoObjeto == "torneo-encuentro") {

                console.log(item.id);


                     // var encuentroFecha = 0;
                   console.log(item.id);
                    strBuilderLastNewsContent.push('<div class="card tournament-matches"><a onclick="loadMatchDetails1('+item.id+', \''+sucesoDetailFromHome+'\')" href="#">');
                    strBuilderLastNewsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
                    strBuilderLastNewsContent.push('<div class="tournament-matches-icon"><img data-src='+item.torneo.organizador.imagenPrincipalMin+' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
                    strBuilderLastNewsContent.push('<div class="tournament-matches-name">'+item.torneo.nombre+'</div>');
                    strBuilderLastNewsContent.push('<div class="tournament-matches-division">'+item.torneo.deporteCategoria.nombreCorto+'');
                    if (item.vivo == "true") {
                        strBuilderLastNewsContent.push('<div class="tournament-matches-matchday-live animated infinite pulse">PARTIDO EN VIVO</div></div></div>');
                    } else {
                        strBuilderLastNewsContent.push('<div class="tournament-matches-matchday">'+item.fechaEncuentro.fecha+'</div></div></div>');
                    }
                    strBuilderLastNewsContent.push('<div class="card-content tournament-matches-content">');
                    strBuilderLastNewsContent.push('<div class="card-content-inner">');
                    //var verMasFecha = false;

                    //$.each( item.encuentros, function( n, match ){
                       // encuentroFecha = encuentroFecha+1;
                        console.log(encuentroFecha);
                        //if (encuentroFecha < 3){
                            strBuilderLastNewsContent.push('<div class="row no-gutter row-tournament-matches">');
                            strBuilderLastNewsContent.push('<div class="col-25 team-lastmatch-left">'+item.local.nombre+'</div>');
                            //if (match.local.imagenPrincipalMin != ""){
                              //strBuilderLastNewsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
                            //} else {
                              strBuilderLastNewsContent.push('<div class="col-15" img-lastmatch><img data-src='+item.local.imagenPrincipalMin+' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
                            //}
                            //if (match.local.tantos != "" || match.visit.tantos != ""){
                              //strBuilderLastNewsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
                            //}
                            //else {
                              strBuilderLastNewsContent.push('<div class="col-20 match-scorer-lastmatch">'+item.local.tantos+' - '+item.visitante.tantos+'</div>');
                            //}
                            strBuilderLastNewsContent.push('<div class="col-15 img-lastmatch"><img data-src='+item.visitante.imagenPrincipalMin+' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
                            strBuilderLastNewsContent.push('<div class="col-25 team-lastmatch-right">'+item.visitante.nombre+'</div></div>');
                       // }
                   // });
                    strBuilderLastNewsContent.push('</div></div>');
                    strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a></div>');


            } else if (item.tipoObjeto == "evento") {
                            var noticiaTruncada = truncateNoticia(item.detalleTxt);
                            console.log(noticiaTruncada);
                            strBuilderLastNewsContent.push('<div class="card demo-card-header-pic"><div style="background-image:url('+item.imagenPrincipalMin+'); height:150px;" valign="bottom" class="card-header color-white no-border">');
                            strBuilderLastNewsContent.push('<a onclick="loadEventDetails1(' + item.id + ',\''+sucesoDetailFromHome+'\')" href="#" class="item-link item-content">');
                                strBuilderLastNewsContent.push('<div class="chipHomeContainer">');
                                    //strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
                                    if (item.tags.publicador != "") {
                                    strBuilderLastNewsContent.push('<div class="chip chipHomeCategory"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.publicador+'</div></div>');
                                    }
                                    strBuilderLastNewsContent.push('<div class="chip chipHomeDate"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeDateLabel">'+formatDateSucesos(item.fecha.fecha)+'</div></div>');
                                    //strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i class="icon icon-home-tiposuceso"></i></div><div class="chip-label chipHomePublisherLabel">El canducho</div></div>');
                                    strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i style="background-image: url('+item.tags.icono+');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.categoria+'</div></div>');
                                    strBuilderLastNewsContent.push('</div></div>');
                                    strBuilderLastNewsContent.push('<div class="card-content news-content">');

                                        strBuilderLastNewsContent.push('<div class="card-content-inner">');
                                        var urlImgNewsList = getDefaultImageNewsList();
                                        if(item.urlImgMin != ""){
                                            urlImgNewsList = item.urlImgMin;
                                        }
                                        strBuilderLastNewsContent.push('<div class="">'+item.titulo+'</div>');
                                        strBuilderLastNewsContent.push('<div class="color-gray homeCardcontent">'+noticiaTruncada+'</div>');

                                        strBuilderLastNewsContent.push('</div></div>');
                                        strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div>');
                                        strBuilderLastNewsContent.push('</div>');

                    //strBuilderLastNewsContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+','+false+')">');
                        /*strBuilderLastNewsContent.push('<div class="card card-event-home">');
                        strBuilderLastNewsContent.push('<div class="card-header-home">'+item.titulo+'</div>');
                        strBuilderLastNewsContent.push('<div class="card-event-home-content">');
                            strBuilderLastNewsContent.push('<div class="card-content card-content-event">');
                                strBuilderLastNewsContent.push('<div class="content-block">');
                                    strBuilderLastNewsContent.push('<div class="row row-events-page">');
                                        strBuilderLastNewsContent.push('<div class="col-50">');
                                            strBuilderLastNewsContent.push('<img data-src="'+item.imagenPrincipalMin+'" alt="'+item.titulo+'" class="lazy lazy-fadeIn imgCardEvent"/>');
                                        strBuilderLastNewsContent.push('</div>');
                                        strBuilderLastNewsContent.push('<div class="col-50">');
                                            strBuilderLastNewsContent.push('<table class="table-events-page">');
                                                strBuilderLastNewsContent.push('<tr><td><i class="icon icon-date-event"></i></td><td><span>'+item.fecha.fecha+'</span></td></tr>');
                                                strBuilderLastNewsContent.push('<tr><td><i class="icon icon-hour-event"></i></td><td><span>'+item.fecha.hora+'</span></td></tr>');
                                            strBuilderLastNewsContent.push('</table>');
                                        strBuilderLastNewsContent.push('</div>');
                                    strBuilderLastNewsContent.push('</div>');
                                strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('</div>');
                        strBuilderLastNewsContent.push('</div>');
                    strBuilderLastNewsContent.push('</div>');
            console.log('evento');
            console.log(item);*/

            } else if (item.tipoObjeto == "torneo-tabla-posicion") {
            console.log(item);
            console.log('torneo');

            //$('#lblHeaderPositionsTables').text(nameTournamentSelected);
            $('#positionstable-list').html('');
            //var strBuilderLastNewsContent = [];
            //$.each(positionTables, function(n, table) {
                console.log(item.id);
                      strBuilderLastNewsContent.push('<div class="card tournament-matches"> <a onclick="loadPositionsTableDetails('+item.id+', '+false+')" href="#">');
                      strBuilderLastNewsContent.push('<div id="tournament-matches-header" class="card-header no-border">');

                      strBuilderLastNewsContent.push('<div class="tournament-header-titulo">'+item.titulo+'</div>');
                      strBuilderLastNewsContent.push('<div class="tournament-header-fecha">'+item.titulo+'</div>');

                      strBuilderLastNewsContent.push('</div>');
                      strBuilderLastNewsContent.push('<div class="card-content tournament-matches-content">');
                      strBuilderLastNewsContent.push('<div class="card-content-inner">');
                      var verMasFecha = false;
                //console.log(item);
                //console.log(item.tablaGeneral.cabecera);
                strBuilderLastNewsContent.push('<div class="row tournament-father no-gutter">');
                $.each(item.tablaGeneral.cabecera, function(i, item) {
                //console.log(item.nombreCorto);
                //console.log(item.columna);
                    if (item.columna == 'eq'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-40 tournament-father-team">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'pt'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-10 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'pj'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'pe'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'pp'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'tf'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'tc'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    } else if (item.columna == 'td'){
                        if(item.columna != "" && item.columna != undefined){
                            strBuilderLastNewsContent.push('<div class="col-10 tournament-father-numbers">'+item.nombreCorto+'</div>');
                        }
                    }


                    //}
                });
                strBuilderLastNewsContent.push('</div>');
                var verMas = false;
                $.each(item.tablaGeneral.cuerpo, function(i, item) {
                    strBuilderLastNewsContent.push('<div class="row tournament-child no-gutter">');
                    var pos = i+1;
                    var equipoTabla = i+1;

                    console.log(item);
                    console.log(equipoTabla);
                    console.log(verMas);
                    if (equipoTabla < 5){
                        if(item.eq.nombre !== "" && item.eq.nombre !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-40 tournament-child-team"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.eq.nombre+'</span></div>');
                        }
                        if(item.pt !== "" && item.pt !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-10 tournament-child-numbers">'+item.pt+'</div>');
                        }
                        if(item.pj !== "" && item.pj !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-child-numbers">'+item.pj+'</div>');
                        }
                        if(item.pe !== "" && item.pe !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-child-numbers">'+item.pe+'</div>');
                        }
                        if(item.pp !== "" && item.pp !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-child-numbers">'+item.pp+'</div>');
                        }
                        if(item.tf !== "" && item.tf !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-child-numbers">'+item.tf+'</div>');
                        }
                        if(item.tc !== "" && item.tc !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-8 tournament-child-numbers">'+item.tc+'</div>');
                        }
                        if(item.td  !== "" && item.td !== undefined){
                            strBuilderLastNewsContent.push('<div class="col-10 tournament-child-numbers">'+item.td+'</div>');
                        }
                    } else{

                        if (verMas == false){
                        strBuilderLastNewsContent.push('<div class="col-50"> ...</div>');
                        verMas = true;
                        }

                    }
                    strBuilderLastNewsContent.push('</div>');
                });

                strBuilderLastNewsContent.push('</div></div>');
                strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></div>');

            //$('#positionstable-list').append(strBuilderListCards.join(""));
            //mainView.router.load({pageName: 'positionstable'});
            //myApp.initImagesLazyLoad(mainView.activePage.container);

        } else if (item.tipoObjeto == "torneo-fecha") {
          var encuentroFecha = 0;
          console.log(item.id);
          strBuilderLastNewsContent.push('<div class="card tournament-matches"> <a onclick="loadMatchDetailsFixture('+item.id+' ,\''+sucesoDetailFromHome+'\')" href="#">');
          strBuilderLastNewsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
          strBuilderLastNewsContent.push('<div class="tournament-matches-icon"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-tournament" ></div>');
          strBuilderLastNewsContent.push('<div class="tournament-matches-name">'+item.nombre+'</div>');
          strBuilderLastNewsContent.push('<div class="tournament-matches-division">', item.nombre);
          strBuilderLastNewsContent.push('<div class="tournament-matches-matchday">'+item.nombre+'</div></div></div>');
          strBuilderLastNewsContent.push('<div class="card-content tournament-matches-content">');
          strBuilderLastNewsContent.push('<div class="card-content-inner">');
          var verMasFecha = false;

          $.each( item.encuentros, function( n, match ){
              encuentroFecha = encuentroFecha+1;
              console.log(encuentroFecha);
              if (encuentroFecha < 3){
                  strBuilderLastNewsContent.push('<div class="row row-tournament-matches">');
                  strBuilderLastNewsContent.push('<div class="col-30">'+match.local.nombre+'</div>');
                  if (match.local.imagenPrincipalMin != ""){
                    strBuilderLastNewsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
                  } else {
                    strBuilderLastNewsContent.push('<div class="col-10"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-team"></div>');
                  }
                  if (match.local.tantos != null || match.visit.tantos != null){
                    strBuilderLastNewsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
                  }
                  else {
                    strBuilderLastNewsContent.push('<div class="col-20 match-scorer">'+match.getFechaOcurrencia.fecha+'</div>');
                  }
                  strBuilderLastNewsContent.push('<div class="col-10"><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
                  strBuilderLastNewsContent.push('<div class="col-30">'+match.visitante.nombre+'</div></div>');
              }
          });
          strBuilderLastNewsContent.push('</div></div>');
          strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></div>');


            /*
          //$.each( fixturesList, function( i, item ){
                //$.each( item.dates, function( n, date ){
                        //if (date.idDate == idDateSelected){
                            //$('#lblHeaderDatesList').text(item.tableTitle);
                            strBuilderLastNewsContent.push('<div class="card card-table-tournaments"> <a onclick="loadMatchDetailsFixture('+item.id+')" href="#">');
                            //strBuilderLastNewsContent.push('<div class="card-header card-header-center card-header-datelist">'+item.nombre'</div>');
                            //strBuilderLastNewsContent.push('<div class="card-header card-header-center card-header-datelist">primera division</div>');
                            strBuilderLastNewsContent.push('<div class="card-header card-header-center">'+item.nombre+'</div>');
                            strBuilderLastNewsContent.push('<div class="card-content">');
                            strBuilderLastNewsContent.push('<div class="card-content-inner">');
                            strBuilderLastNewsContent.push('<div class="list-block lastmatch-tournaments">');
                            strBuilderLastNewsContent.push('<div class="item-content" style="overflow-x:auto;">');
                            strBuilderLastNewsContent.push('<table class="table-tournaments table-datelist">');

                            var verMasFecha = false;

                            $.each( item.encuentros, function( n, match ){
                                var encuentroFecha = i+1;
                                console.log(encuentroFecha);
                                if (encuentroFecha < 3){
                                /*if(match.interzonal == true){
                                                    strBuilderLastNewsContent.push('<tr class="interzonal-datelist">');
                                                    strBuilderLastNewsContent.push('<td class="td-35-tournaments">');
                                                    strBuilderLastNewsContent.push('<div>'+match.local.name+'</div>');
                                                    if (match.local.urlShield != ""){
                                                        strBuilderLastNewsContent.push('<div><img data-src="'+match.local.urlShield+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                    }
                                                    else{
                                                        strBuilderLastNewsContent.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                        }
                                                        strBuilderLastNewsContent.push('</td>');
                                                        strBuilderLastNewsContent.push('<td class="td-30-tournaments">');
                                                        strBuilderLastNewsContent.push('<table>');
                                                    if (match.local.score != "" || match.visit.score != ""){
                                                        strBuilderLastNewsContent.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.score+'</td>');
                                                        strBuilderLastNewsContent.push('<td class="td-30-tournaments"><div class="interzonal-label-datelist">'+lblInterzonal+'</div><a onclick="loadMatchDetails('+match.idMatch+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                                        strBuilderLastNewsContent.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visit.score+'</td>');
                                                    } else {
                                                        strBuilderLastNewsContent.push('<td><div class="interzonal-label-datelist">'+lblInterzonal+'</div><div>'+match.matchDate+'</div></td>');
                                                    }

                                 }else{
                                                    strBuilderLastNewsContent.push('<tr>');
                                                    strBuilderLastNewsContent.push('<td class="td-35-tournaments">');
                                                    strBuilderLastNewsContent.push('<div>'+match.local.nombre+'</div>');
                                                    if (match.local.imagenPrincipalMin != ""){
                                                        strBuilderLastNewsContent.push('<div><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                    }
                                                    else{
                                                        strBuilderLastNewsContent.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                    }
                                                    strBuilderLastNewsContent.push('</td>');
                                                    strBuilderLastNewsContent.push('<td class="td-30-tournaments">');
                                                    strBuilderLastNewsContent.push('<table>');
                                                    if (match.local.tantos != "" || match.visit.tantos != ""){
                                                        strBuilderLastNewsContent.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                                        strBuilderLastNewsContent.push('<td class="td-30-tournaments"><a href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                                        strBuilderLastNewsContent.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                                    } else {
                                                        strBuilderLastNewsContent.push('<td>'+match.getFechaOcurrencia.fecha+'</td>');

                                                    }

                                                //}
                                                    strBuilderLastNewsContent.push('</tr>');
                                                    strBuilderLastNewsContent.push('</table>');
                                                    strBuilderLastNewsContent.push('</td>');
                                                    strBuilderLastNewsContent.push('<td class="td-35-tournaments">');
                                                        strBuilderLastNewsContent.push('<div>'+match.visitante.nombre+'</div>');
                                                        //if (match.visit.urlShield != ""){
                                                            strBuilderLastNewsContent.push('<div><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                        //}
                                                        //else{
                                                            //strBuilderLastNewsContent.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                        //}
                                                    strBuilderLastNewsContent.push('</td>');
                                                    strBuilderLastNewsContent.push('</tr>');
                                                    } else {
                                                        if (verMasFecha == false){
                                                        strBuilderLastNewsContent.push('<td class="td-50-tournaments-more">Ver mas...</th>');
                                                        verMasFecha = true;
                                                        }

                                                    }
                            });

                            strBuilderLastNewsContent.push('</table>');
                            strBuilderLastNewsContent.push('</div>');
                            //if(date.freeTeam != ""){
                                //strBuilderLastNewsContent.push('<div class="description-lastmatch-tournament">'+lblFreeTeam++match.fecha.freeTeam+'</div>');
                            //}
                            strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('</div>');
                        //}
                //});
                        //});




*/
          } else {

          }
    });
    strBuilderLastNewsContent.push('</ul>');
    strBuilderLastNewsContent.push('</div>');
	}
	//return(strBuilderLastNewsContent.join(""));
	$('#last-news-list-block').append(strBuilderLastNewsContent.join(""));
}

function showPageNews(){
	mainView.router.load({pageName: 'news'});
}

function showPageSettings(){
	mainView.router.load({pageName: 'settings'});
}

/**** builder de la 2da tab ****/

function convert(d){
console.log(d)
  var w = d.split("/");
  console.log(w[2], w[1]-1, w[0]);
  return new Date(w[2],w[1]-1,w[0]);
}

function builderHomeDetails2() {
console.log('builderhomedetails222222222');
//areContentTabSucesosHomeDetailsBuilder = true;


var strBuilderTab2Content = [];
//$('#tabHomeDetails2').html('');
var events = [];
console.log(homeDetails2List.calendario);
console.log(newsListHome)
for(var k in homeDetails2List.calendario){
            //console.log(newsListHome[k].fecha.fecha);
            console.log(homeDetails2List.calendario[k]);
            //console.log(homeDetails2List.calendario[k].fechaOcurrencia.fecha);
            //events.push(convert(newsListHome[k].fecha.fecha));
            if (homeDetails2List.calendario[k].tipoObjeto == 'evento') {
                events.push(convert(homeDetails2List.calendario[k].fechaOcurrencia.fecha));
            }
            if (homeDetails2List.calendario[k].tipoObjeto == 'torneo-encuentro') {
                events.push(convert(homeDetails2List.calendario[k].fechaEncuentro.fecha));
            }
}
console.log(events);

builderTimeLineEventsHome();

        //funcion para esconder y mostrar el div con la vista que corresponda
        $('#timeLineView').show();
        $('#calendarView').hide();
        $('#selectTypeView').change(function(){
            if($('#selectTypeView').val() == 'timeline') {
                $('#calendarView').hide();
                $('#timeLineView').show();
            } else {
                $('#calendarView').show();
                $('#timeLineView').hide();
            }
        });

         var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];

         calendarInline = myApp.calendar({
         container: '#calendar-inline-container',
         value: [new Date()],
         weekHeader: false,
         events,
         toolbarTemplate:
             '<div class="toolbar calendar-custom-toolbar">' +
                 '<div class="toolbar-inner">' +
                     '<div class="left">' +
                         '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                     '</div>' +
                     '<div class="center"></div>' +
                     '<div class="right">' +
                         '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                     '</div>' +
                 '</div>' +
             '</div>',
         onOpen: function (p) {
             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
             $$('.calendar-custom-toolbar .left .link').on('click', function () {
                 calendarInline.prevMonth();
             });
             $$('.calendar-custom-toolbar .right .link').on('click', function () {
                 calendarInline.nextMonth();
             });
         },
         onMonthYearChangeStart: function (p) {
             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
         },
         onDayClick: function (p, dayContainer, year, month, day) {
                //construye la fecha seleccionada en el calendario
                 console.log(year, month, day);
                 var monthFinal = parseInt(month) + 1;
                 if (month.length == 1) {
                  monthFinal = '0' + monthFinal
                 }
                 var dayFinal = parseInt(day);
                 if (day.length == 1) {
                   dayFinal = '0' + dayFinal
                  }
                 var eventDay = dayFinal + '/' + monthFinal + '/' + year;
                 console.log(eventDay);

                 //mostrar eventos del dia
                 builderDayEvents(eventDay);

         }

        });


}

function builderDayEvents(eventDay) {
var strBuilderCalendarContent = [];
var arrayEvents = [];
console.log(homeDetails2List);
//$('#calendarEventsView').html("");

$.each( homeDetails2List.calendario, function( i, item ){


    //if (item.tipoObjeto == "noticia"){
    console.log(eventDay);
    //console.log(item.fecha.fecha);
    //if (item.tipoObjeto == 'torneo-encuentro'){
    //arrayEvents.push(item.fechaEncuentro.fecha);
    //} else {
    arrayEvents.push(item.fechaOcurrencia.fecha);
    //}
        if (item.fechaOcurrencia.fecha == eventDay) {
        console.log(item.id);
        //console.log(item.fecha.fecha);

        console.log('evento coincideee');
            if (item.tipoObjeto == "evento"){
            $('#calendarEventsView').html("");
            //poner aca el builder que esta mas abajo para construir
            strBuilderCalendarContent.push('<div class="timeline-item">');
            strBuilderCalendarContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fechaOcurrencia.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fecha.fecha, 1)+'</small></div>');
            strBuilderCalendarContent.push('<div class="timeline-item-divider"></div>');
                //strBuilderCalendarContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                    strBuilderCalendarContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');
                    strBuilderCalendarContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1(' + item.id + ', \'' + sucesoDetailFromCalendar + '\')">');
                        strBuilderCalendarContent.push('<div class="card card-event-home">');
                        strBuilderCalendarContent.push('<div class="card-header-home">'+item.titulo+'</div>');
                            strBuilderCalendarContent.push('<div class="card-event-home-content">');
                                strBuilderCalendarContent.push('<div class="card-content card-content-event">');
                                    strBuilderCalendarContent.push('<div class="content-block">');
                                        strBuilderCalendarContent.push('<div class="row row-events-page">');
                                            strBuilderCalendarContent.push('<div class="col-100">');
                                                strBuilderCalendarContent.push('<img src="'+item.imagenPrincipalMin+'" alt="'+item.titulo+'" class="imgCardEvent"/>');
                                            strBuilderCalendarContent.push('</div>');
                                            strBuilderCalendarContent.push('<div class="col-100">');
                                                strBuilderCalendarContent.push('<table class="table-events-page">');
                                                    strBuilderCalendarContent.push('<tr><td><i class="icon icon-date-event"></i></td><td><span>'+item.fecha.fecha+'</span></td></tr>');
                                                    strBuilderCalendarContent.push('<tr><td><i class="icon icon-hour-event"></i></td><td><span>'+item.hora.hora+'</span></td></tr>');
                                                strBuilderCalendarContent.push('</table>');
                                            strBuilderCalendarContent.push('</div>');
                                        strBuilderCalendarContent.push('</div>');
                                    strBuilderCalendarContent.push('</div>');
                                strBuilderCalendarContent.push('</div>');
                            strBuilderCalendarContent.push('</div>');
                        strBuilderCalendarContent.push('</div>');
                    strBuilderCalendarContent.push('</div>');
                    strBuilderCalendarContent.push('</a>');
            strBuilderCalendarContent.push('</div>');
            $('#calendarEventsView').append(strBuilderCalendarContent.join(""));
            } else if (item.tipoObjeto == 'torneo-encuentro') {
            $('#calendarEventsView').html("");
            console.log(item);

                if (item == "")
                {
                    strBuilderCalendarContent.push('');
                }
                else
                {

                        /*if(lastMatch.liveMatch == true)
                        {
                            strBuilderLastNewsContent.push('<div class="card">');
                                idLiveMatchSportDetails = lastMatch.idMatch;
                                strBuilderLastNewsContent.push('<div class="card-header card-header-center animated infinite pulse">');
                                strBuilderLastNewsContent.push(lblLiveMatchTournaments);
                                strBuilderLastNewsContent.push('</div>');
                        }
                        else
                        {*/
                            idLiveMatchSportDetails = null;
                            strBuilderCalendarContent.push('<div class="timeline-item">');
                                strBuilderCalendarContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 1)+'</small></div>');
                                strBuilderCalendarContent.push('<div class="timeline-item-divider"></div>');
                                    strBuilderCalendarContent.push('<div class="card card-event-home">');
                                        strBuilderCalendarContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">')

                                            strBuilderCalendarContent.push('<div class="card-header card-header-center">'+item.torneo.nombre+'</div>');
                        //}

                                                strBuilderCalendarContent.push('<div onclick="loadMatchDetails1('+item.id+', \''+matchDetailFromCalendar+'\')" class="card-content">');
                                                    strBuilderCalendarContent.push('<div class="card-content-inner">');
                                                        strBuilderCalendarContent.push('<div class="list-block lastmatch-tournaments">');
                                                            strBuilderCalendarContent.push('<div class="item-content">');
                                                                strBuilderCalendarContent.push('<div class="row" id="row-lastmatch-tournament-calendar">');
                                                                        strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament">');
                                                                            strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-team">'+item.local.nombre+'</div>');
                                                                            /*if(lastMatch.local.urlShield != ""){
                                                                            strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                            }
                                                                            else{*/
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch"/></div>');
                                                                            //}
                                                                        strBuilderCalendarContent.push('</div>');
                                                                        /*if(lastMatch.liveMatch == true){
                                                                            strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-name">'+item.fecha.fecha+'</div>');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-result"><p>1 - 0</p></div>');
                                                                                if(lastMatch.actualClock != "")
                                                                                {
                                                                                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+item.fecha.hora+'</div>');
                                                                                }

                                                                            strBuilderCalendarContent.push('</div>');
                                                                        } else{*/
                                                                            strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-nametournament">'+item.torneo.deporteCategoria.nombreCorto+'</div>');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-name">'+item.fechaEncuentro.hora+'</div>');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');
                                                                                strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-date">'+item.fechaEncuentro.fecha+'</div>');
                                                                            strBuilderCalendarContent.push('</div>');
                                                                        //}

                                                                    strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament">');
                                                                        strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-team">'+item.visitante.nombre+'</div>');
                                                                        /*if(lastMatch.visit.urlShield != ""){
                                                                            strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                        }
                                                                        else{*/
                                                                            strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                        //}
                                                                    strBuilderCalendarContent.push('</div>');
                                                                strBuilderCalendarContent.push('</div>');
                                                            strBuilderCalendarContent.push('</div>');
                                                            strBuilderCalendarContent.push('<div class="description-lastmatch-tournament">');
                                                                strBuilderCalendarContent.push(item.visitante.nombe);
                                                            strBuilderCalendarContent.push('</div>');
                                                        strBuilderCalendarContent.push('</div>');
                                                    strBuilderCalendarContent.push('</div>');
                                                strBuilderCalendarContent.push('</div>');


                                        strBuilderCalendarContent.push('</div>');
                                    strBuilderCalendarContent.push('</div>');
                                strBuilderCalendarContent.push('</div>');
                            //strBuilderCalendarContent.push('</div>');
                            $('#calendarEventsView').append(strBuilderCalendarContent.join(""));
                }


            } else {
            console.log('otro tipo de evento');
            }

        }

    //}
});

//si la fecha del evento no se encuentra en el array con todas las fechas, muestro que no existen eventos
if (!arrayEvents.includes(eventDay)){
    $('#calendarEventsView').html("");
    console.log('no existen eventos');
    strBuilderCalendarContent.push('<div class="content-block content-block-information">');
    strBuilderCalendarContent.push('<div class="noEventsCalendarMsg"> No existen eventos para este dia </div>');
    strBuilderCalendarContent.push('</div>');
    $('#calendarEventsView').append(strBuilderCalendarContent.join(""));

}



}
function dateTimeLineEventsSplitedFormat(date, n){
//funcion para recortar la fecha
    var dateTimeLineEvents = date;
    var dateTimeLineEventsSplited = dateTimeLineEvents.split("/");
    //console.log(dateTimeLineEventsSplited);
    //console.log(dateTimeLineEvents);
    return dateTimeLineEventsSplited[n];
}

function builderTimeLineEventsHome() {
console.log(homeDetails2List)
//console.log(newsListHome);

var strBuilderTimeLineContent = [];
    strBuilderTimeLineContent.push('<div class="timeline">');

    $.each( homeDetails2List.calendario, function( i, item ){
        if (item.tipoObjeto == 'evento') {
        console.log(item);
        //console.log(item.fecha.fecha);

                strBuilderTimeLineContent.push('<div class="timeline-item">');
                strBuilderTimeLineContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fecha.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fecha.fecha, 1)+'</small></div>');
                strBuilderTimeLineContent.push('<div class="timeline-item-divider"></div>');
                    strBuilderTimeLineContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1(' + item.id + ',\''+sucesoDetailFromCalendar+'\')">');
                     strBuilderTimeLineContent.push('<div class="card card-event-home">');
                        strBuilderTimeLineContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');
                            //strBuilderTimeLineContent.push('<div class="card card-event-home">');
                            strBuilderTimeLineContent.push('<div class="card-header-home">'+item.titulo+'</div>');
                                strBuilderTimeLineContent.push('<div class="card-event-home-content">');
                                    strBuilderTimeLineContent.push('<div class="card-content card-content-event">');
                                        strBuilderTimeLineContent.push('<div class="content-block">');
                                            strBuilderTimeLineContent.push('<div class="row row-events-page">');
                                                strBuilderTimeLineContent.push('<div class="col-100">');
                                                    strBuilderTimeLineContent.push('<img src="'+item.imagenPrincipalMin+'" alt="'+item.titulo+'" class="imgCardEvent"/>');
                                                strBuilderTimeLineContent.push('</div>');
                                                strBuilderTimeLineContent.push('<div class="col-100">');
                                                    strBuilderTimeLineContent.push('<table class="table-events-page">');
                                                        strBuilderTimeLineContent.push('<tr><td><i class="icon icon-date-event"></i></td><td><span>'+item.fecha.fecha+'</span></td></tr>');
                                                        strBuilderTimeLineContent.push('<tr><td><i class="icon icon-hour-event"></i></td><td><span>'+item.hora.hora+'</span></td></tr>');
                                                    strBuilderTimeLineContent.push('</table>');
                                                strBuilderTimeLineContent.push('</div>');
                                            strBuilderTimeLineContent.push('</div>');
                                        strBuilderTimeLineContent.push('</div>');
                                    strBuilderTimeLineContent.push('</div>');
                                strBuilderTimeLineContent.push('</div>');
                            strBuilderTimeLineContent.push('</div>');
                        strBuilderTimeLineContent.push('</div>');
                    strBuilderTimeLineContent.push('</a>');
                strBuilderTimeLineContent.push('</div>');
                //strBuilderTimeLineContent.push('</div>');
        } else if (item.tipoObjeto == 'torneo-encuentro') {
        console.log(item);

            if (item == "")
            {
                strBuilderLastNewsContent.push('');
            }
            else
            {

                    /*if(lastMatch.liveMatch == true)
                    {
                        strBuilderLastNewsContent.push('<div class="card">');
                            idLiveMatchSportDetails = lastMatch.idMatch;
                            strBuilderLastNewsContent.push('<div class="card-header card-header-center animated infinite pulse">');
                            strBuilderLastNewsContent.push(lblLiveMatchTournaments);
                            strBuilderLastNewsContent.push('</div>');
                    }
                    else
                    {*/
                        idLiveMatchSportDetails = null;
                        strBuilderTimeLineContent.push('<div class="timeline-item">');
                            strBuilderTimeLineContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 1)+'</small></div>');
                            strBuilderTimeLineContent.push('<div class="timeline-item-divider"></div>');
                                strBuilderTimeLineContent.push('<div class="card card-event-home">');
                                    strBuilderTimeLineContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">')

                                        strBuilderTimeLineContent.push('<div class="card-header card-header-center">'+item.torneo.nombre+'</div>');
                    //}

                                            strBuilderTimeLineContent.push('<div onclick="loadMatchDetails1(' + item.id + ', \'' + sucesoDetailFromCalendar + '\')" class="card-content">');
                                                strBuilderTimeLineContent.push('<div class="card-content-inner">');
                                                    strBuilderTimeLineContent.push('<div class="list-block lastmatch-tournaments">');
                                                        strBuilderTimeLineContent.push('<div class="item-content">');
                                                            strBuilderTimeLineContent.push('<div class="row" id="row-lastmatch-tournament-calendar">');
                                                                    strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament">');
                                                                        strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-team">'+item.local.nombre+'</div>');
                                                                        /*if(lastMatch.local.urlShield != ""){
                                                                        strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                        }
                                                                        else{*/
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch"/></div>');
                                                                        //}
                                                                    strBuilderTimeLineContent.push('</div>');
                                                                    /*if(lastMatch.liveMatch == true){
                                                                        strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-name">'+item.fecha.fecha+'</div>');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-result"><p>1 - 0</p></div>');
                                                                            if(lastMatch.actualClock != "")
                                                                            {
                                                                                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+item.fecha.hora+'</div>');
                                                                            }

                                                                        strBuilderTimeLineContent.push('</div>');
                                                                    } else{*/
                                                                        strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-nametournament">'+item.torneo.deporteCategoria.nombreCorto+'</div>');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-name">'+item.fechaEncuentro.hora+'</div>');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');
                                                                            strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-date">'+item.fechaEncuentro.fecha+'</div>');
                                                                        strBuilderTimeLineContent.push('</div>');
                                                                    //}

                                                                strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament">');
                                                                    strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-team">'+item.visitante.nombre+'</div>');
                                                                    /*if(lastMatch.visit.urlShield != ""){
                                                                        strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                    }
                                                                    else{*/
                                                                        strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                                                                    //}
                                                                strBuilderTimeLineContent.push('</div>');
                                                            strBuilderTimeLineContent.push('</div>');
                                                        strBuilderTimeLineContent.push('</div>');
                                                        strBuilderTimeLineContent.push('<div class="description-lastmatch-tournament">');
                                                            strBuilderTimeLineContent.push(item.visitante.nombe);
                                                        strBuilderTimeLineContent.push('</div>');
                                                    strBuilderTimeLineContent.push('</div>');
                                                strBuilderTimeLineContent.push('</div>');
                                            strBuilderTimeLineContent.push('</div>');


                                    strBuilderTimeLineContent.push('</div>');
                                strBuilderTimeLineContent.push('</div>');
                            strBuilderTimeLineContent.push('</div>');
                        //strBuilderTimeLineContent.push('</div>');
            }


        }

    });

    strBuilderTimeLineContent.push('</div>');
    $('#timeLineView').append(strBuilderTimeLineContent.join(""));

}

function formatDateSucesos(dateNew) {
    var dateEvent = dateNew;
    var datearray = dateEvent.split("/");

    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];

        var date = new Date(newdate);
        //console.log(date)

        var options = {
            year: "numeric",
            month: "short",
            day: "numeric"
        };

        return date.toLocaleDateString("es", options) //en is language option, you may specify..


}

function formatDateMonthSucesos(dateNew) {
    var dateEvent = dateNew;
    var datearray = dateEvent.split("/");

    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];

        var date = new Date(newdate);
        //console.log(date)

        var options = {
            year: "numeric",
            month: "short",
            day: "numeric"
        };

        var newdateFormated = date.toLocaleDateString("es", options) //en is language option, you may specify..
        console.log(newdateFormated);
        var newdateArray = dateEvent.split("/");
        var newdateEventFormated = datearray[1];
        console.log(newdateEventFormated);


}