var arraySportsHomeWS = [];
var arrayActivitiesHomeWS = [];
var unreadNotifications = 0;

//cuantos suscesos por pagina se cargan
var itemsPage = 15;

var areContentTabSucesosHomeDetailsBuilder = false;

var newsListHome = [];
var nextPageNumberHomeNews = 1;
var loadingInfiniteScrollHomeNews = false;
var currentPageNumberHomeNews, currentTotalPageHomeNews;

var areAccessedServerHomeNews = false;
var areHomeNewsLoaded = false;

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
        $('#subnavbarHomeDetails3').text(lblTabHome3);

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
	myApp.initImagesLazyLoad(mainView.activePage.container);
	loadContentHomePage();

	$('#icon-settings-favourites-notifications').on('click', function(){
		mainView.router.load({pageName: 'settings'});
	});

    $$('#tabHomeDetails1').on('show', function () {
    console.log(areContentTabSucesosHomeDetailsBuilder);
		if(areContentTabSucesosHomeDetailsBuilder == false){
		console.log('inside tabhumedetails1');
			builderHomePage();
			areContentTabSucesosHomeDetailsBuilder = true;
		}
	});
	$$('#tabHomeDetails2').on('show', function () {
	    if (areContentTabSucesosHomeDetailsBuilder == false){
	    	builderNewsSportDetails();
	    	areContentTabNewsSportDetailsBuilder  = true;
	    }
	    alert('22');
	});
	$$('#tabHomeDetails3').on('show', function () {
	    if (areContentTabSucesosHomeDetailsBuilder == false){
	    	builderTournamentsSportDetails();
	    }
	    alert('33');
	});

	//admob settings
	// place our admob ad unit id here
      var admobid = {};
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
        isTesting: false,
        autoShow: true
      });


      // it will display smart banner at top center, using the default options
      AdMob.createBanner({
      	adId: admobid.banner,
      	position: AdMob.AD_POSITION.BOTTOM_CENTER,
      	autoShow: true,
      	isTesting: false,
      	success: function(){
      	},
      	error: function(){
      		alert('failed to create banner');
      	}
      });

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
        calendarListHome = response.calendarioPanel;
        tournamentListHome = response.torneoPanel;
        console.log(newsListHome);

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
      beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer dcce59676c43e1c54a342e5207dfce0dc00fd502' ); } //set tokenString before send
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
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer dcce59676c43e1c54a342e5207dfce0dc00fd502' ); } //set tokenString before send
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
					newsListHome = [];
					newsListHome = response.sucesos;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					hideLoadSpinnerWS();
				} else {
				console.log('segunda pag');
					newsListHome = [];
					newsListHome = response.sucesos;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					//hideLoadSpinnerWS();
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
		   beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer dcce59676c43e1c54a342e5207dfce0dc00fd502' ); } //set tokenString before send

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
	var resultSearch = newsListHome.filter(function( obj ) {
      return obj.id == 48;
    });
    console.log(resultSearch);
	if(newsListHome.length == 0){
			strBuilderLastNewsContent.push('<div class="divNotLastestNews">'+divNotLastestNews+'</div>');
	}
	else{
		strBuilderLastNewsContent.push('<div class="list-block list-block-home media-list">');
		strBuilderLastNewsContent.push('<ul>');
		$.each( newsListHome, function( i, item ){
		console.log(item);
            if(item.tipoObjeto == "banner"){
                        strBuilderLastNewsContent.push('<div class="item-list-banner">');
                            strBuilderLastNewsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
                        strBuilderLastNewsContent.push('</div>');
            } else if (item.tipoObjeto == "noticia") {
                    strBuilderLastNewsContent.push('<li>');
                    strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
                        var urlImgNewsList = getDefaultImageNewsList();
                        if(item.urlImgMin != ""){
                            urlImgNewsList = item.urlImgMin;
                        }
                        strBuilderLastNewsContent.push('<div class="item-media"><img alt="'+item.imagenPrincipalMin+'" data-src="'+urlImgNewsList+'" class="lazy lazy-fadeIn imgNewsSportDetails"></img></div>');
                        strBuilderLastNewsContent.push('<div class="item-inner">');
                            strBuilderLastNewsContent.push('<div class="item-title-row">');
                                strBuilderLastNewsContent.push('<div class="item-title">'+item.titulo+'</div>');
                            strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('<div class="item-text">');
                        strBuilderLastNewsContent.push('<span class="item-date">'+item.fecha.fecha+'</span>');
                        strBuilderLastNewsContent.push('<span class="item-shortContent">'+item.detalle+'</span>');
                    strBuilderLastNewsContent.push('</div>');
                        strBuilderLastNewsContent.push('</div>');
                    strBuilderLastNewsContent.push('</a>');
                    strBuilderLastNewsContent.push('</li>');

                    //almaceno en un objeto toda la info de la noticia

            } else if (item.tipoObjeto == "evento") {
                    strBuilderLastNewsContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails('+item.id+')">');
                        strBuilderLastNewsContent.push('<div class="card card-event-home">');
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
            console.log(item);


            } else {
            console.log(item);
            console.log('torneo');

            //$('#lblHeaderPositionsTables').text(nameTournamentSelected);
            $('#positionstable-list').html('');
            var strBuilderListCards = [];
            //$.each(positionTables, function(n, table) {
                strBuilderLastNewsContent.push('<div class="card card-table-tournaments">');
                strBuilderLastNewsContent.push('<div class="card-header card-header-center card-header-positionstable">'+item.tablaGeneral.titulo+'</div>');
                //strBuilderLastNewsContent.push('<div class="card-header card-header-center">'+item.titulo+'</div>');
                strBuilderLastNewsContent.push('<div class="card-content">');
                strBuilderLastNewsContent.push('<div class="card-content-inner">');
                strBuilderLastNewsContent.push('<div class="list-block">');
                strBuilderLastNewsContent.push('<div style="overflow-x:auto;">');
                strBuilderLastNewsContent.push('<table class="table-tournaments table-positionstable">');
                strBuilderLastNewsContent.push('<tr class="tr-header">');
                console.log(item);
                console.log(item.tablaGeneral.cabecera);
                $.each(item.tablaGeneral.cabecera, function(i, item) {
                console.log(item.nombreCorto);
                    if (item.nombreCorto == 'eq'){
                        if(item.nombreCorto != "" && item.nombreCorto != undefined){
                            strBuilderLastNewsContent.push('<th class="th-40-tournaments">'+item.nombreCorto+'</th>');
                        }
                    } else {
                        if(item.nombreCorto != "" && item.nombreCorto != undefined){
                            strBuilderLastNewsContent.push('<th class="th-10-tournaments">'+item.nombreCorto+'</th>');
                        }
                    }
                });
                strBuilderLastNewsContent.push('</tr>');

                $.each(item.tablaGeneral.cuerpo, function(i, item) {
                    strBuilderListCards.push('<tr>');
                    var pos = i+1;
                    console.log(item);
                    if(item.eq.nombre != "" && item.eq.nombre != undefined){
                        strBuilderLastNewsContent.push('<td class="td-40-tournaments"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.eq.nombre+'</span></th>');
                    }
                    if(item.pt != "" && item.pt != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.pt+'</th>');
                    }
                    if(item.pj != "" && item.pj != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.pj+'</th>');
                    }
                    if(item.pe != "" && item.pe != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.pe+'</th>');
                    }
                    if(item.pp != "" && item.pp != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.pp+'</th>');
                    }
                    if(item.tf != "" && item.tf != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.tf+'</th>');
                    }
                    if(item.tc != "" && item.tc != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.tc+'</th>');
                    }
                    if(item.td != "" && item.td != undefined){
                        strBuilderLastNewsContent.push('<td class="td-10-tournaments">'+item.td+'</th>');
                    }
                    strBuilderLastNewsContent.push('</tr>');
                });

                strBuilderLastNewsContent.push('</table>');
                strBuilderLastNewsContent.push('</div>');
                /*if(table.tableNotes != "" || table.tableNotes != undefined){
                    strBuilderLastNewsContent.push('<div class="description-table-tournament">'+table.tableNotes+'</div>');
                }*/
                strBuilderLastNewsContent.push('</div>');
                strBuilderLastNewsContent.push('</div>');
                strBuilderLastNewsContent.push('</div>');
                strBuilderLastNewsContent.push('</div>');

            //$('#positionstable-list').append(strBuilderListCards.join(""));
            //mainView.router.load({pageName: 'positionstable'});
            //myApp.initImagesLazyLoad(mainView.activePage.container);

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