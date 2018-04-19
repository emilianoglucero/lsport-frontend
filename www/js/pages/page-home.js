var arraySportsHomeWS = [];
var arrayActivitiesHomeWS = [];
var unreadNotifications = 0;

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



	//admob settings
	// place our admob ad unit id here
var admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
          banner: 'ca-app-pub-4977768595563395/2607409361',
          interstitial: 'ca-app-pub-4977768595563395/9771583516',
          rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-4977768595563395/6925928321',
          interstitial: 'ca-app-pub-4977768595563395/2862436523',
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
	});
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
			    filterCodeErrorWS(response);
			    $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'update'});
				return;
			}
			arraySportsHomeWS = response.home.arraySports;
			arrayActivitiesHomeWS = response.home.arrayActivities;
			//builderHomeBanner(response.home.banner);
			unreadNotifications = response.home.unreadNotifications;
			setBadgeIconNotificationsHome();
			builderFavouritesHome();
			$('#iconHeaderFavouritesHome').hide();
			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
			hideLoadSpinnerWS();
			areFavouritesChanged = false;

		},
		error: function (data, status, error){
			showMessageToast(messageConexionError);
			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
	   }
	});
}



function builderHomePage(currentFavouritesSports, currentFavouritesActivities){

	builderFavouritesHome();

            if(currentPageNumberHomeNews < currentTotalPageHomeNews){
				myApp.attachInfiniteScroll('.infinite-scroll-homenews');
				$$('.infinite-scroll-homenews').on('infinite', function () {

					if (loadingInfiniteScrollHomeNews){
						return;
					}
					loadingInfiniteScrollHomeNews = true;

					if (areAccessedServerHomeNews == false){
						loadNewsHomeSportDetails(currentFavouritesSports, currentFavouritesActivities);
					} else {
						$('#noConnection-content-block-homenews').show();
					}
				});
			}
			else{
				myApp.detachInfiniteScroll('.infinite-scroll');
			}

            if(newsListHome != "")
            {
            				//areContentTabNewsSportDetailsBuilder = true;
            			builderNewsHomeDetails();
            }
    //$('#last-news-list-block').append(builderNewsHomeDetails());

	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#page-content-home').scroll(function()
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
	$('#page-content-home').scroll(function()
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

/*function builderHomeBanner(banner){
	var strHomeBanner = [];
	$('#footer').html('');
	if(banner.urlAdBanner != ""){
		strHomeBanner.push('<img data-src="'+banner.urlAdBanner+'" onclick="openBrowser(\''+banner.linkAdBanner+'\')" class="lazy lazy-fadeIn"/>');
	}
	else{
		strHomeBanner.push('<img src="img\\banner-publicidad.png"/>');
	}
	$('#footer').html(strHomeBanner.join(""));
}*/

function loadNewsHomeSportDetails(currentFavouritesSports, currentFavouritesActivities){
	//showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getHomeNews',
			dataType: 'jsonp',
			data: { 'idClub': idClub,
                    'arrayIdSports': currentFavouritesSports.toString(),
                    'arrayIdActivities': currentFavouritesActivities.toString(),
                    'pageNumber': nextPageNumberHomeNews
                     },
			timeout: timeOut,
			success: function(response){
				if(response.errorCode != 0)
				{
				    hideLoadSpinnerWS();
				    filterCodeErrorWS(response);
				    return;
				}
				if(isAppUpdate(response.serverVersion) == false){
					hideLoadSpinnerWS();
					mainView.router.load({pageName: 'update'});
					return;
				}

				nextPageNumberHomeNews = parseInt(response.pageNumber) + 1;

				if( response.pageNumber == 1 ){
					$('#last-news-list-block').html("");
					newsListHome = [];
					newsListHome = response;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					hideLoadSpinnerWS();
				} else {
					newsListHome = [];
					newsListHome = response;
					builderNewsHomeDetails();
					//$('#last-news-list-block').append(builderNewsHomeDetails());
					hideLoadSpinnerWS();
				}

				if( response.totalPage < nextPageNumberHomeNews ){
					myApp.detachInfiniteScroll('.infinite-scroll-homenews');
				}
				loadingInfiniteScrollHomeNews = false;
				areAccessedServerHomeNews = false;
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
		   }
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
	//$('#last-news-list-block').html('');
	var strBuilderLastNewsContent = [];
	if(newsListHome.news.length == 0){
			strBuilderLastNewsContent.push('<div class="divNotLastestNews">'+divNotLastestNews+'</div>');
	}
	else{
		strBuilderLastNewsContent.push('<div class="list-block list-block-home media-list">');
		strBuilderLastNewsContent.push('<ul>');
		$.each( newsListHome.news, function( i, item ){
            if(item.type == "banner"){
                        strBuilderLastNewsContent.push('<div class="item-list-banner">');
                            strBuilderLastNewsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
                        strBuilderLastNewsContent.push('</div>');
            } else{
                    strBuilderLastNewsContent.push('<li>');
                    strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
                        var urlImgNewsList = getDefaultImageNewsList();
                        if(item.urlImgMin != ""){
                            urlImgNewsList = item.urlImgMin;
                        }
                        strBuilderLastNewsContent.push('<div class="item-media"><img alt="'+item.altImg+'" data-src="'+urlImgNewsList+'" class="lazy lazy-fadeIn imgNewsSportDetails"></img></div>');
                        strBuilderLastNewsContent.push('<div class="item-inner">');
                            strBuilderLastNewsContent.push('<div class="item-title-row">');
                                strBuilderLastNewsContent.push('<div class="item-title">'+item.title+'</div>');
                            strBuilderLastNewsContent.push('</div>');
                            strBuilderLastNewsContent.push('<div class="item-text">');
                        strBuilderLastNewsContent.push('<span class="item-date">'+item.publishDate+'</span>');
                        strBuilderLastNewsContent.push('<span class="item-shortContent">'+item.shortContent+'</span>');
                    strBuilderLastNewsContent.push('</div>');
                        strBuilderLastNewsContent.push('</div>');
                    strBuilderLastNewsContent.push('</a>');
                    strBuilderLastNewsContent.push('</li>');
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