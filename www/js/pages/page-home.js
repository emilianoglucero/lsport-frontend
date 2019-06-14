var arraySportsHomeWS = [];
var arrayActivitiesHomeWS = [];
var unreadNotifications = 0;

//cuantos sucesos por pagina se cargan
//how many sucesos per page are loaded
var itemsPage = 15;

//variable que almacena todos los sucesos
//saves all the sucesos
var allSucesosPageList = [];
//variable que almacena todos los sucesos separados por tipo
//saves all the sucesos sorted by type
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
//accumulators of tournaments and activities
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

$(document).ready(function () {
    //INIT HEADERS
    $('.lblNameClub').text(lblNameClub);
    $('#lblHeaderHome').text(lblHeaderHome);
    $('#lblHeaderNotifications').text(lblHeaderNotifications);
    $('#lblHeaderNews').text(lblHeaderNews);
    // $('#lblHeaderSports').text(lblHeaderSports);
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
    // $('#lblHeaderActivityDetails').text(lblHeaderActivityDetails);
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

myApp.onPageInit('home', function (page) {
    //se usa para configurar el boton "fixture" en la pantalla de detalles de partido
    //torneoEncuentroState = true;
    myApp.initImagesLazyLoad(mainView.activePage.container);
    loadContentHomePage();

    /*$('#icon-settings-favourites-notifications').on('click', function(){
    	mainView.router.load({pageName: 'settings'});
    });*/

    $$('#tabHomeDetails1').on('show', function () {
        console.log(areContentTabSucesosHomeDetailsBuilder);
        if (areContentTabSucesosHomeDetailsBuilder == false) {
            console.log('inside tabhumedetails1');
            builderHomePage();
            areContentTabSucesosHomeDetailsBuilder = true;
        }
    });
    $$('#tabHomeDetails2').on('show', function () {
        console.log(areContentTab2HomeDetailsBuilder);
        if (areContentTab2HomeDetailsBuilder == false) {
            builderHomeDetails2();
            areContentTab2HomeDetailsBuilder = true;
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

    //used to fix the home grey screen on app init
    myApp.closeModal();

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

myApp.onPageBeforeAnimation('home', function (page) {
    if (areFavouritesChanged) {
        $('#iconHeaderFavouritesHome').show();
        reloadContentHomePage();
    }
    myApp.params.swipePanel = 'left';
    activateStateItemMenu(myApp.getCurrentView().activePage.name);

    trackPageGA("Home");
    myApp.initImagesLazyLoad(mainView.activePage.container);

    // Mostrar/ocultar boton de atajo de "Configuracion"
    if (window.localStorage.getItem("COUNTERACCESSSETTINGS" + idClub) == null ||
        window.localStorage.getItem("INSTALLATIONDATE" + idClub) == null) {
        window.localStorage.setItem("COUNTERACCESSSETTINGS" + idClub, 0);
        var now = getNowDate();
        window.localStorage.setItem("INSTALLATIONDATE" + idClub, now);
        $('#icon-settings-favourites-notifications').css('display', 'flex');
    } else {
        var days = dateSubtraction(getNowDate(), window.localStorage.getItem("INSTALLATIONDATE" + idClub));
        if (window.localStorage.getItem("COUNTERACCESSSETTINGS" + idClub) > 2) {
            $('#icon-settings-favourites-notifications').css('display', 'none');
        } else if (days > 7) {
            $('#icon-settings-favourites-notifications').css('display', 'none');
        } else {
            $('#icon-settings-favourites-notifications').css('display', 'flex');
        }
    }
});

/** 
 * 
 * html structures functions to insert inside de differents main builders and try to not duplicate code 
 * 
*/

//function to build the 'torneo-tabla-posicion' card
function htmlTournamentTableCard (item) {

    console.log(item);
    var strBuilderLastNewsContentHtml = [];
                console.log('torneo');

                $('#positionstable-list').html('');
                
                console.log(item.id);
                strBuilderLastNewsContentHtml.push('<div class="card tournament-matches"> <a onclick="loadPositionsTableDetails(' + item.id + ', ' + false + ')" href="#">');
                strBuilderLastNewsContentHtml.push('<div id="tournament-matches-header" class="card-header no-border">');

                strBuilderLastNewsContentHtml.push('<div class="tournament-header-titulo">' + item.torneo.nombre + '</div>');
                strBuilderLastNewsContentHtml.push('<div class="tournament-header-fecha">' + item.titulo + '</div>');

                strBuilderLastNewsContentHtml.push('</div>');
                strBuilderLastNewsContentHtml.push('<div class="card-content tournament-matches-content">');
                strBuilderLastNewsContentHtml.push('<div class="card-content-inner">');
                var verMasFecha = false;
                //console.log(item);
                //console.log(item.tablaGeneral.cabecera);
                strBuilderLastNewsContentHtml.push('<div class="row tournament-father no-gutter">');
                $.each(item.tablaGeneral.cabecera, function (i, item) {
                    //console.log(item.nombreCorto);
                    //console.log(item.columna);
                    if (item.columna == 'eq') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-team">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'pt') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'pg') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'pj') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'pe') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'pp') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'tf') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'tc') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    } else if (item.columna == 'td') {
                        if (item.columna != "" && item.columna != undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                        }
                    }


                    //}
                });
                strBuilderLastNewsContentHtml.push('</div>');
                var verMas = false;
                $.each(item.tablaGeneral.cuerpo, function (i, item) {
                    
                    var pos = i + 1;
                    var equipoTabla = i + 1;

                    console.log(item);
                    console.log(equipoTabla);
                    console.log(verMas);
                    if (equipoTabla < 5) {
                        strBuilderLastNewsContentHtml.push('<div class="row tournament-child no-gutter">');
                        if (item.eq.nombre !== "" && item.eq.nombre !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-team"><span class="td-span-team-pos">' + pos + '</span><span class="td-span-team-name">' + item.eq.nombre + '</span></div>');
                        }
                        if (item.pt !== "" && item.pt !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.pt + '</div>');
                        }
                        if (item.pg !== "" && item.pg !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.pt + '</div>');
                        }
                        if (item.pj !== "" && item.pj !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.pj + '</div>');
                        }
                        if (item.pe !== "" && item.pe !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.pe + '</div>');
                        }
                        if (item.pp !== "" && item.pp !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.pp + '</div>');
                        }
                        if (item.tf !== "" && item.tf !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.tf + '</div>');
                        }
                        if (item.tc !== "" && item.tc !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.tc + '</div>');
                        }
                        if (item.td !== "" && item.td !== undefined) {
                            strBuilderLastNewsContentHtml.push('<div class="col tournament-child-numbers">' + item.td + '</div>');
                        }
                        strBuilderLastNewsContentHtml.push('</div>');
                    } else {

                        if (verMas == false) {
                            strBuilderLastNewsContentHtml.push('<div class="col-50 tournament-child-dots"> ...</div>');
                            verMas = true;
                        }
                        //strBuilderLastNewsContentHtml.push('</div>');

                    }
                    //strBuilderLastNewsContentHtml.push('</div>');
                });

                strBuilderLastNewsContentHtml.push('</div></div>');
                strBuilderLastNewsContentHtml.push('<div class="card-footer tournament-matches-footer">Ver más...</div></div>');
                strBuilderLastNewsContentHtml.push('</a>');

        

        return strBuilderLastNewsContentHtml;

}
                
// function to build the 'evento' card
function htmlEventCard (item) { 
                   
    var noticiaTruncada = truncateNoticia(item.detalleTxt);
    var strBuilderLastNewsContent = [];
    console.log(noticiaTruncada);
    strBuilderLastNewsContent.push('<div class="card demo-card-header-pic">');

        // -----------> Header
        strBuilderLastNewsContent.push('<div class="card-header color-white no-border">');
            strBuilderLastNewsContent.push('<div style="width: 100%;/*height: 100%*/;overflow: hidden;">');
                strBuilderLastNewsContent.push('<img style="width:100%;" src=\'' + item.imagenPrincipal + '\' >');
            strBuilderLastNewsContent.push('</div>');
        strBuilderLastNewsContent.push('</div>');
        // <----------- Header

        strBuilderLastNewsContent.push('<div class="chipHomeContainer">');
            if (item.tags.publicador != "") {
                strBuilderLastNewsContent.push('<div class="chip chipHomeCategory">');
                    strBuilderLastNewsContent.push('<div class="media">');
                        strBuilderLastNewsContent.push('<i style="background-image: url(' + item.datosPublicacion.ente.imagenPrincipalMin + ');" class="icon icon-chiptag-categoria"></i>');
                    strBuilderLastNewsContent.push('</div>');
                    strBuilderLastNewsContent.push('<div class="chip-label chipHomeCategoryLabel">' + item.datosPublicacion.ente.nombre + '</div>');
                strBuilderLastNewsContent.push('</div>');
            }
                strBuilderLastNewsContent.push('<div class="chip chipHomeDate">');
                    strBuilderLastNewsContent.push('<div class="media">');
                        strBuilderLastNewsContent.push('<i class="icon icon-date-home"></i>');
                    strBuilderLastNewsContent.push('</div>');
                    strBuilderLastNewsContent.push('<div class="chip-label chipHomeDateLabel">' + formatDateSucesos(item.fecha.fecha) + '</div>');
                strBuilderLastNewsContent.push('</div>');

            strBuilderLastNewsContent.push('<div class="chip chipHomeTags">');
                strBuilderLastNewsContent.push('<div class="media">');
                    strBuilderLastNewsContent.push('<i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i>');
                strBuilderLastNewsContent.push('</div>');
                strBuilderLastNewsContent.push('<div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div>');
                strBuilderLastNewsContent.push('</div>');
            strBuilderLastNewsContent.push('</div>');
        //strBuilderLastNewsContent.push('<a onclick="loadEventDetails1(' + item.id + ',\'' + sucesoDetailFromHome + '\')" href="#" class="item-link item-content">');
        //strBuilderLastNewsContent.push('</a>');
strBuilderLastNewsContent.push('<a onclick="loadEventDetails1(' + item.id + ',\'' + sucesoDetailFromHome + '\')" href="#" class="item-link item-content">');
    // --------------> Content
        strBuilderLastNewsContent.push('<div class="card-content news-content">');
            strBuilderLastNewsContent.push('<div class="card-content-inner">');
            var urlImgNewsList = getDefaultImageNewsList();
            if (item.urlImgMin != "") {
                urlImgNewsList = item.urlImgMin;
            }
                strBuilderLastNewsContent.push('<div style="font-family:Montserrat-Regular; font-size: 16px; color: #585858;/*white-space: nowrap*/;text-overflow: ellipsis;overflow: hidden;">' + item.titulo + '</div>');
                strBuilderLastNewsContent.push('<div class="color-gray homeCardcontent">' + noticiaTruncada + '</div>');
                strBuilderLastNewsContent.push('</div>');
            strBuilderLastNewsContent.push('</div>');
        // strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div>');
    strBuilderLastNewsContent.push('</div>');
strBuilderLastNewsContent.push('</a>');
    // <-------------- Content
strBuilderLastNewsContent.push('</div>');

return strBuilderLastNewsContent;

}

//function to build the 'torneo-fechas' card
function htmlTournamentMatchesCard (item) {

console.log(item);
var strBuilderLastNewsContent = [];
            
            console.log(item.id);

            var encuentroFecha = 0;
                console.log(item.id);
                strBuilderLastNewsContent.push('<div class="card tournament-matches"> <a onclick="loadMatchDetailsFixture(' + item.id + ' ,\'' + sucesoDetailFromHome + '\')" href="#">');
                strBuilderLastNewsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
                //strBuilderLastNewsContent.push('<div class="tournament-matches-icon"><img data-src='+item.torneo.deporte.imagenPrincipalMin+' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
                strBuilderLastNewsContent.push('<div class="tournament-matches-name">' + item.nombre + '<span class="tournament-matches-matchday">' + item.nombre + '</span></div>');
                strBuilderLastNewsContent.push('<div class="tournament-matches-division">', item.nombre);
                strBuilderLastNewsContent.push('</div></div>');
                strBuilderLastNewsContent.push('<div class="card-content tournament-matches-content">');
                strBuilderLastNewsContent.push('<div class="card-content-inner">');
                var verMasFecha = false;

                $.each(item.encuentros, function (n, match) {
                    encuentroFecha = encuentroFecha + 1;
                    console.log(encuentroFecha);
                    if (encuentroFecha < 5) {
                        strBuilderLastNewsContent.push('<div class="row row-tournament-matches">');
                        strBuilderLastNewsContent.push('<div class="col-25">');
                            strBuilderLastNewsContent.push('<div style="text-align: right;font-family: Montserrat-Regular;font-size: 12px;color: #585858;">' + match.local.nombreCorto + '</div>');
                        strBuilderLastNewsContent.push('</div>');
                        strBuilderLastNewsContent.push('<div class="col-15">');
                        if (match.local.imagenPrincipalMin != "") {
                            strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="' + match.local.imagenPrincipalMin + '" class="lazy lazy-fadeIn img-shield-team"></div>');
                        } else {
                            strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-team"></div>');
                        }
                        strBuilderLastNewsContent.push('</div>');
                        // strBuilderLastNewsContent.push('<div class="col-40">');
                            // if (match.local.imagenPrincipalMin != "") {
                            //     strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="' + match.local.imagenPrincipalMin + '" class="lazy lazy-fadeIn img-shield-team"></div>');
                            // } else {
                            //     strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-team"></div>');
                            // }
                            // strBuilderLastNewsContent.push('<div style="text-align: center;font-family: Montserrat-Regular;font-size: 12px;color: #585858;margin-top: 5px">' + match.local.nombreCorto + '</div>');
                        // strBuilderLastNewsContent.push('</div>');

                        if (match.local.tantos != null || match.visitante.tantos != null) {
                            strBuilderLastNewsContent.push('<div class="col-20 match-scorer">' + match.local.tantos + ' - ' + match.visitante.tantos + '</div>');
                        } else {
                            strBuilderLastNewsContent.push('<div class="col-20 match-scorer">' + match.fechaOcurrencia.fecha + '</div>');
                        }

                        strBuilderLastNewsContent.push('<div class="col-15">');
                        strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="' + match.visitante.imagenPrincipalMin + '" class="lazy lazy-fadeIn img-shield-team"></div>');
                        strBuilderLastNewsContent.push('</div>');
                        strBuilderLastNewsContent.push('<div class="col-25">');
                        strBuilderLastNewsContent.push('<div style="text-align: left;font-family: Montserrat-Regular;font-size: 12px;color: #585858;">' + match.visitante.nombreCorto + '</div></div>');
                        strBuilderLastNewsContent.push('</div>');

                        // strBuilderLastNewsContent.push('<div class="col-40">');
                        //     strBuilderLastNewsContent.push('<div style="text-align: center;"><img data-src="' + match.visitante.imagenPrincipalMin + '" class="lazy lazy-fadeIn img-shield-team"></div>');
                        //     strBuilderLastNewsContent.push('<div style="text-align: center;font-family: Montserrat-Regular;font-size: 12px;color: #585858;margin-top: 5px">' + match.visitante.nombreCorto + '</div></div>');
                        // strBuilderLastNewsContent.push('</div>');
                    }
                });
                strBuilderLastNewsContent.push('</div></div></a>');
                strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></div>');

    

    return strBuilderLastNewsContent;

}

//function to build the 'noticia' card
function htmlNewCard (item) {

    console.log(item);
    var strBuilderLastNewsContent = [];

    var noticiaTruncada = truncateNoticia(item.detalleTxt);
        console.log(noticiaTruncada);
        console.log(strBuilderLastNewsContent);
        strBuilderLastNewsContent.push('<div class="card demo-card-header-pic">');

        strBuilderLastNewsContent.push('<a onclick="loadNewDetails(' + item.id + ',\'' + sucesoDetailFromHome + '\')" href="#"> ');

        strBuilderLastNewsContent.push('<div class="card-header color-white no-border">');
        strBuilderLastNewsContent.push('<div style="width: 100%;/*height: 250px*/;overflow: hidden;">');
        strBuilderLastNewsContent.push('<img style=\"width: 100%;\" src=\'' + item.imagenPrincipal + '\' >');
        strBuilderLastNewsContent.push('</div>');
        strBuilderLastNewsContent.push('</div>');

        strBuilderLastNewsContent.push('<div class="chipHomeContainer">');
        //strBuilderLastNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
        // strBuilderLastNewsContent.push('<div class="chip chipHomeDate"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeDateLabel">'+formatDateSucesos(item.fecha.fecha)+'</div></div>');
        if (item.tags.publicador != "") {
            strBuilderLastNewsContent.push('<div class="chip chipHomeCategory"><div class="media"><i style="background-image: url(' + item.datosPublicacion.ente.imagenPrincipalMin + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.datosPublicacion.ente.nombre + '</div></div>');
            strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div></div>');
            strBuilderLastNewsContent.push('</div>');
        } else {
            strBuilderLastNewsContent.push('<div class="chip chipHomeTagsLeft"><div class="media"><i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div></div>');
            strBuilderLastNewsContent.push('</div>');
        }
        //strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i class="icon icon-home-tiposuceso"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.categoria+'</div></div>');
        //strBuilderLastNewsContent.push('<div class="chip chipHomeTags"><div class="media"><i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div></div>');
        //strBuilderLastNewsContent.push('</div>');
        //strBuilderLastNewsContent.push('<a onclick="loadNewDetails(' + item.id + ',\'' + sucesoDetailFromHome + '\')" href="#" class="item-link item-content">');

        strBuilderLastNewsContent.push('<div class="card-content news-content">');

        strBuilderLastNewsContent.push('<div class="card-content-inner">');
        var urlImgNewsList = getDefaultImageNewsList();
        if (item.urlImgMin != "") {
            urlImgNewsList = item.urlImgMin;
        }
        strBuilderLastNewsContent.push('<div class="row"><div class="col-70"><div style="font-family:Montserrat-Regular; font-size: 16px; color: #585858;text-overflow: ellipsis;overflow: hidden;">' + item.titulo + '</div></div>');
        strBuilderLastNewsContent.push('<div class="col-30"><div class="dateTitleNew color-gray">' + item.fecha.fecha + '</div></div></div>');
        strBuilderLastNewsContent.push('<div class="row"><div class="col-100"><div class="color-gray homeCardcontent">' + noticiaTruncada + '</div></div></div>');

        strBuilderLastNewsContent.push('</div></div></a>');
        // strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div>');
        strBuilderLastNewsContent.push('</div>');
        //strBuilderLastNewsContent.push('</div>');

        //}

    return strBuilderLastNewsContent;
} 

//function to build the 'torneo-encuentro' card
function htmlTournamentMatchCard(item) {
    console.log(item);

    var strBuilderLastNewsContent = [];
    // var encuentroFecha = 0;
    console.log(item.id);
    strBuilderLastNewsContent.push('<div class="card tournament-matches"><a onclick="loadMatchDetails1(' + item.id + ', \'' + sucesoDetailFromHome + '\')" href="#">');
    strBuilderLastNewsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
    strBuilderLastNewsContent.push('<div class="tournament-matches-icon"><img data-src=' + item.torneo.deporte.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
    var tmpMatchname = '<div class="tournament-matches-name">' + item.torneo.nombre;
    if(item.vivo == "true") {
        tmpMatchname += '<span class="tournament-matches-matchday-live animated infinite pulse">PARTIDO EN VIVO</span>';
    }
    tmpMatchname += '</div>';
    // strBuilderLastNewsContent.push('<div class="tournament-matches-name">' + item.torneo.nombre + '</div>');
    strBuilderLastNewsContent.push(tmpMatchname);
    if (item.vivo == "false") {
        strBuilderLastNewsContent.push('<div class="tournament-matches-division">' + item.torneo.deporteCategoria.nombreCorto + '<span class="tournament-matches-matchday">' + item.fechaEncuentro.fecha + '</span>');
    }
    /*** revisar el funcionamiento cuando no hay partido en vivo ***/
    strBuilderLastNewsContent.push('</div>');
    if (item.vivo == "true") {
        //strBuilderLastNewsContent.push('<div></div></div></div>');
        //strBuilderLastNewsContent.push('<div></div></div></div>');
    } else {
        //strBuilderLastNewsContent.push('</div></div>');
    }
    strBuilderLastNewsContent.push('<div class="card-content tournament-matches-content">');
    strBuilderLastNewsContent.push('<div class="card-content-inner">');
    //var verMasFecha = false;

    //$.each( item.encuentros, function( n, match ){
    // encuentroFecha = encuentroFecha+1;
    //console.log(encuentroFecha);
    //if (encuentroFecha < 3){
    strBuilderLastNewsContent.push('<div class="row no-gutter row-tournament-matches">');
    strBuilderLastNewsContent.push('<div class="col-40">');
        strBuilderLastNewsContent.push('<div style="padding: 0 5px;">');
            strBuilderLastNewsContent.push('<div><img data-src=' + item.local.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
            strBuilderLastNewsContent.push('<div style="text-align: center;font-family: Montserrat-Regular;font-size: 12px;color: #585858;">' + item.local.nombreCorto + '</div>');
        strBuilderLastNewsContent.push('</div>');
    strBuilderLastNewsContent.push('</div>');
    //if (match.local.imagenPrincipalMin != ""){
    //strBuilderLastNewsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
    //} else {
    //}
    //if (match.local.tantos != "" || match.visit.tantos != ""){
    //strBuilderLastNewsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
    //}
    //else {
    strBuilderLastNewsContent.push('<div class="col-20 match-scorer-lastmatch">' + item.local.tantos + ' - ' + item.visitante.tantos + '</div>');
    //}

    strBuilderLastNewsContent.push('<div class="col-40">');
        strBuilderLastNewsContent.push('<div style="padding: 0 5px;">');
            strBuilderLastNewsContent.push('<div><img data-src=' + item.visitante.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
            strBuilderLastNewsContent.push('<div style="text-align: center;font-family: Montserrat-Regular;font-size: 12px;color: #585858;">' + item.visitante.nombreCorto + '</div></div>');
        strBuilderLastNewsContent.push('</div>');
    strBuilderLastNewsContent.push('</div>');

    // }
    // });
    strBuilderLastNewsContent.push('</div></div>');
    // strBuilderLastNewsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div>');
    strBuilderLastNewsContent.push('</a></div>');

   return strBuilderLastNewsContent; 
}


/** 
 * 
 * end of the html structures functions 
 * 
*/

function truncateNoticia(string) {
    console.log(string);
    console.log(string.length);
    if (string.length > 280) {
        console.log('string is biig');
        return string.substring(0, 280) + '...';
    } else {
        console.log('string is shoort');
        return string;
    }
};

function reloadPageHome() {
    if (existInternetConnection() == true) {
        loadContentHomePage();
    } else {
        showLoadSpinnerWS();
        setTimeout(function () {
            hideLoadSpinnerWS();
        }, 1500);
    }
}

function loadContentHomePage() {
    $('#divNoConnectionHome').hide();
    $('#divExistConnectionHome').hide();
    //$("#footer").hide();
    showLoadSpinnerWS();
    var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS" + idClub));
    if (currentFavouritesList == null) {
        setDefaultFavourites();
        currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS" + idClub));
    }
    var currentFavouritesSports = [];
    var currentFavouritesActivities = [];
    if (currentFavouritesList != null) {
        $.each(currentFavouritesList, function (i, item) {
            if (item.idCategory != null) {
                currentFavouritesSports.push(item.idCategory);
            } else {
                currentFavouritesActivities.push(item.id);
            }
        });
    }
    clientId = window.localStorage.getItem("CLIENTID" + idClub);
    console.log(deviceID);
    $.ajax({
        url: getPathWS() + 'getHome',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            console.log(response.menu.deportes);
            /*$.each(data, function (key, value) {
                console.log(key);
                console.log(value);
                if (value === "Update" ){
                    hideLoadSpinnerWS();
                    mainView.router.load({pageName: 'update'});
                    return;
                }
            });*/
            /* if(response.errorCode != 0)
               {
                   hideLoadSpinnerWS();
                   $('#divNoConnectionHome').show();
                   filterCodeErrorWS(response);
                   return;
               }*/
            console.log(platform);
            
                var allSports = response.menu.deportes;   
                if (allSports !== ""){
                    allSportsLength = allSports.length - 1;
                    for (i = 0; i <= allSportsLength; i++){
                        console.log(allSports[i]);
                        console.log(allSports[i].nombre);
                        if (allSports[i].nombre === "Update"){
                            hideLoadSpinnerWS();
                            mainView.router.load({pageName: 'update'});
                            return;
                        }
                    } 
                }

            /*if(isAppUpdate(response.menu.deportes) == false){
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
                    console.log(allSucesosEventsList);
                    console.log(allSucesosNewsList);
                    console.log(allSucesosFechaTorneoList);
                    console.log(allSucesosTorneoTablaPosicionList);
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
        error: function (data, status, error) {
            console.log(error);
            console.log(data);
            console.log(status);
            $('#divNoConnectionHome').show();
            hideLoadSpinnerWS();
            showMessageToast(messageConexionError);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        } //set tokenString before send
    });

}

function reloadContentHomePage() {

    $('#iconHeaderFavouritesHome .icon').addClass('animation-preloader');
    var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS" + idClub));
    if (currentFavouritesList == null) {
        setDefaultFavourites();
        currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS" + idClub));
    }
    var currentFavouritesSports = [];
    var currentFavouritesActivities = [];

    $.each(currentFavouritesList, function (i, item) {
        if (item.idCategory != null) {
            currentFavouritesSports.push(item.idCategory);
        } else {
            currentFavouritesActivities.push(item.id);
        }
    });

    $.ajax({
        // URL del Web Service
        url: getPathWS() + 'getHome',
        dataType: 'json',
        timeout: timeOut,
        success: function (response) {
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
        error: function (data, status, error) {
            showMessageToast(messageConexionError);
            $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        } //set tokenString before send
    });
}



function builderHomePage() {


    console.log(currentPageNumberHomeNews);
    console.log(currentTotalPageHomeNews);
    if (currentPageNumberHomeNews < currentTotalPageHomeNews) {
        console.log('totalpagemayorcurrent');
        myApp.attachInfiniteScroll('.infinite-scroll-homenews');
        $$('.infinite-scroll-homenews').on('infinite', function () {

            if (loadingInfiniteScrollHomeNews) {
                console.log('return loadinginfinitescroll');
                return;
            }
            loadingInfiniteScrollHomeNews = true;

            if (areAccessedServerHomeNews == false) {
                console.log('areaccesesloadhomesportdetails');
                loadNewsHomeSportDetails();
            } else {
                console.log('noconnection');
                $('#noConnection-content-block-homenews').show();
            }
        });
    } else {
        console.log('detachscroll');
        myApp.detachInfiniteScroll('.infinite-scroll');
    }

    if (newsListHome != "") {
        //areContentTabNewsSportDetailsBuilder = true;
        console.log('newlisthomefail');
        //builderNewsHomeDetails();
        builderNewsHomeDetails();
    }
    //$('#last-news-list-block').append(builderNewsHomeDetails());

    myApp.initImagesLazyLoad(mainView.activePage.container);
    $('#tabHomeDetails1').scroll(function () {
        if ($(this).scrollTop() < 30) {
            //$("#footer").slideDown();
        } else {
            //$("#footer").slideUp();
            $("#whiteSpaceHomePublicity").fadeOut(0);
        }
    });
    myApp.initImagesLazyLoad(mainView.activePage.container);
    $('#tabHomeDetails1').scroll(function () {
        if ($(this).scrollTop() < 30) {
            //$("#footer").slideDown();
        } else {
            //$("#footer").slideUp();
            $("#whiteSpaceHomePublicity").fadeOut(0);
        }
    });
}

function builderHomeBanner(banner) {
    var strHomeBanner = [];
    $('#footer').html('');
    if (banner.urlAdBanner != "") {
        strHomeBanner.push('<img data-src="' + banner.urlAdBanner + '" onclick="openBrowser(\'' + banner.linkAdBanner + '\')" class="lazy lazy-fadeIn"/>');
    } else {
        strHomeBanner.push('<img src="img\\banner-publicidad.png"/>');
    }
    $('#footer').html(strHomeBanner.join(""));
}

function loadNewsHomeSportDetails() {
    console.log('insideloadnews');
    console.log(currentPageNumberHomeNews);
    console.log(nextPageNumberHomeNews);
    //showLoadSpinnerWS();
    $.ajax({
        // URL del Web Service
        url: getPathWS() + 'getSucesos',
        dataType: 'json',
        data: {
            'paginaActual': nextPageNumberHomeNews,
            'itemsPorPagina': itemsPage
        },
        //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer Bearer dcce59676c43e1c54a342e5207dfce0dc00fd502' ); }, //set tokenString before send
        timeout: timeOut,
        success: function (response) {
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
            if (response.paginaActual == 1) {
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
                for (i = 0; i <= allSucesosPageListLength; i++) {
                    console.log(newsListHome[i]);
                    console.log(newsListHome[i].id);
                    console.log(newsListHome[i].tipoObjeto);
                    allSucesosPageList.push(newsListHome[i]);
                    if (newsListHome[i].tipoObjeto === 'evento') {
                        allSucesosEventsList.push(newsListHome[i]);
                    }
                    if (newsListHome[i].tipoObjeto === 'noticia') {
                        console.log('agrego noticia');
                        allSucesosNewsList.push(newsListHome[i]);
                    }
                    if (newsListHome[i].tipoObjeto === 'torneo-tabla-posicion') {
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

            if (response.paginasTotal < nextPageNumberHomeNews) {
                myApp.detachInfiniteScroll('.infinite-scroll-homenews');
            }
            loadingInfiniteScrollHomeNews = false;
            areAccessedServerHomeNews = false;

            areContentTabSucesosHomeDetailsBuilder = true;
            //$('#noConnection-content-block-sportdetails').hide();

        },
        error: function (data, status, error) {
            if (nextPageNumberHomeNews == 1) {
                builderErrorNewsSportDetails();
                hideLoadSpinnerWS();
            } else {
                hideLoadSpinnerWS();
                showMessageToast(messageCanNotRefresh);
                loadingInfiniteScrollHomeNewss = false;
                areAccessedServerHomeNews = true;
            }
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        } //set tokenString before send

    });
}



function setBadgeIconNotificationsHome() {
    if (unreadNotifications <= 0) {
        $('#icon-notifications-home').removeClass('icon-notifications-home');
    } else if (unreadNotifications < 100) {
        $('#icon-notifications-home').addClass('icon-notifications-home');
        $('.icon-notifications-home').attr('data-content', unreadNotifications);
    } else {
        $('#icon-notifications-home').addClass('icon-notifications-home');
        $('.icon-notifications-home').attr('data-content', '99');
    }
}

function builderFavouritesHome() {
    var currentFavouritesList = $.parseJSON(window.localStorage.getItem("FAVS" + idClub));
    if (arraySportsHomeWS != "") {
        $.each(arraySportsHomeWS, function (iWS, itemWS) {
            $.each(currentFavouritesList, function (iLocal, itemLocal) {
                if (itemWS.id == itemLocal.id && itemWS.idCategory == itemLocal.idCategory) {
                    $('#boxFavouriteHome' + itemLocal.order).attr("onclick", "loadSportDetails(" + itemWS.id + "," + itemWS.idCategory + ")");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("src", "");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("data-src", itemWS.urlImgContent);
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("alt", itemWS.altImg);
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-loaded");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-fadeIn");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').addClass("lazy lazy-fadeIn");
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').text(itemWS.name);
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').attr('width', $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').width()).addClass("ellipsis");
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-second').text(itemWS.shortCategoryName);
                    itemLocal.id = null;
                }
            });
        });
    }
    if (arrayActivitiesHomeWS != "") {
        $.each(arrayActivitiesHomeWS, function (iWS, itemWS) {
            $.each(currentFavouritesList, function (iLocal, itemLocal) {
                if (itemLocal.idCategory == null && itemLocal.id == itemWS.id) {
                    $('#boxFavouriteHome' + itemLocal.order).attr("onclick", "loadActivityDetails(" + itemWS.id + ")");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("src", "");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("data-src", itemWS.urlImgContent);
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("alt", itemWS.altImg);
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-loaded");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-fadeIn");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy");
                    $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').addClass("lazy lazy-fadeIn");
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').text(itemWS.shortName);
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').attr('width', $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').width()).addClass("ellipsis");
                    $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-second').text("");
                    itemLocal.id = null;
                }
            });
        });
    }
    $.each(currentFavouritesList, function (iLocal, itemLocal) {
        if (itemLocal.id != null) {
            $('#boxFavouriteHome' + itemLocal.order).attr("onclick", "showMessage(\'" + messageFavouriteNotExist + "\')");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("src", "");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("data-src", "img/template/home_icon_disabled.png");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').attr("alt", itemLocal.name);
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-loaded");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy-fadeIn");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').removeClass("lazy");
            $('#boxFavouriteHome' + itemLocal.order + ' .img-sport-fav').addClass("lazy lazy-fadeIn");
            $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').text(itemLocal.name);
            $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').attr('width', $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-first').width()).addClass("ellipsis");
            $('#boxFavouriteHome' + itemLocal.order + ' .p-sport-fav-second').text(lblFavouriteNotExists);
        }
    });
    myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderNewsHomeDetails() {
    console.log('arranca builder de los suceso');

    //we need to know if the builder of the cards are loaded by refresh/init the app or by the infinite scroll
    if (loadingInfiniteScrollHomeNews) {
       console.log('viene del scroll infinito');
    } else{
        console.log('no viene del scroll infinito');
        $('#last-news-list-block').html('');
    }
    var strBuilderLastNewsContent = [];
    console.log(strBuilderLastNewsContent);
    console.log(newsListHome);
    console.log(newsListHome.length);
    if (newsListHome.length == 0) {
        strBuilderLastNewsContent.push('<div class="divNotLastestNews">' + divNotLastestNews + '</div>');
    } else {

        strBuilderLastNewsContent.push('<div class="list-block list-block-home media-list">');
        //strBuilderLastNewsContent.push('<ul>');
        $.each(newsListHome, function (i, item) {
        console.log(strBuilderLastNewsContent);
            console.log(item.id);
            console.log(item);
            if (item.tipoObjeto == "banner") {
                strBuilderLastNewsContent.push('<div class="item-list-banner">');
                strBuilderLastNewsContent.push(builderBannerPublicityList(item.urlAdBanner, item.linkAdBanner));
                strBuilderLastNewsContent.push('</div>');
            } else if (item.tipoObjeto == "noticia") {

                var strBuilderLastNewsContentArray = htmlNewCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderLastNewsContent.push(strBuilderLastNewsContentArray.join(""));

            } else if (item.tipoObjeto == "torneo-encuentro") {

                var strBuilderLastNewsContentTournamentMatchArray = htmlTournamentMatchCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderLastNewsContent.push(strBuilderLastNewsContentTournamentMatchArray.join(""));

            } else if (item.tipoObjeto == "evento") {

                var strBuilderLastNewsContentEventArray = htmlEventCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderLastNewsContent.push(strBuilderLastNewsContentEventArray.join(""));

            } else if (item.tipoObjeto == "torneo-tabla-posicion") {

                var strBuilderLastNewsContentTournamentArray = htmlTournamentTableCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderLastNewsContent.push(strBuilderLastNewsContentTournamentArray.join(""));


            } else if (item.tipoObjeto == "torneo-fecha") {
                
                var strBuilderLastNewsContentTournamentMatchesArray = htmlTournamentMatchesCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderLastNewsContent.push(strBuilderLastNewsContentTournamentMatchesArray.join(""));
            } 
        });
        //strBuilderLastNewsContent.push('</ul>');
        strBuilderLastNewsContent.push('</div>');
    }
    //return(strBuilderLastNewsContent.join(""));
    $('#last-news-list-block').append(strBuilderLastNewsContent.join(""));
}

function showPageNews() {
    mainView.router.load({
        pageName: 'news'
    });
}

function showPageSettings() {
    mainView.router.load({
        pageName: 'settings'
    });
}

/**** builder de la 2da tab ****/

function convert(d) {
    console.log(d);
    var w = d.split("/");
    console.log(w[2], w[1] - 1, w[0]);
    return new Date(w[2], w[1] - 1, w[0]);
}

function builderHomeDetails2() {
    console.log('builderhomedetails222222222');
    //areContentTabSucesosHomeDetailsBuilder = true;


    var strBuilderTab2Content = [];
    //$('#tabHomeDetails2').html('');
    var events = [];
    // console.log(homeDetails2List.calendario);
    console.log(newsListHome);
    for (var k in homeDetails2List.calendario) {
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
    /*$('#timeLineView').show();
    $('#calendarView').hide();
    $('#selectTypeView').change(function () {
        if ($('#selectTypeView').val() == 'timeline') {
            $('#calendarView').hide();
            $('#timeLineView').show();
        } else {
            $('#calendarView').show();
            $('#timeLineView').hide();
        }
    });*/

    //funcion para esconder y mostrar el div con la vista que corresponda
    $('#timeLineView').hide();
    $('#calendarView').show();
    $('#selectTypeView').change(function () {
        if ($('#selectTypeView').val() == 'timeline') {
            $('#calendarView').hide();
            $('#timeLineView').show();
        } else {
            $('#calendarView').show();
            $('#timeLineView').hide();
        }
    });

    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    calendarInline = myApp.calendar({
        container: '#calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        events: events,
        toolbarTemplate: '<div class="toolbar calendar-custom-toolbar">' +
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
            //build the current day event in the calendar
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10)
            {
                dd='0'+dd;
            }

            if(mm<10)
            {
                mm='0'+mm;
            }
            today = dd+'/'+mm+'/'+yyyy;
            console.log(today);

            //mostrar eventos del dia
            builderDayEvents(today);


            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
        },
        onDayClick: function (p, dayContainer, year, month, day) {
            //construye la fecha seleccionada en el calendario
            console.log(year);
            console.log(month);
            console.log(day);
            console.log(p);
            console.log(dayContainer);

            var monthFinal = parseInt(month) + 1;
            if (month.length == 1) {
                monthFinal = '0' + monthFinal;
            }
            var dayFinal = parseInt(day);
            if (day.length == 1) {
                dayFinal = '0' + dayFinal;
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

    $.each(homeDetails2List.calendario, function (i, item) {


        //if (item.tipoObjeto == "noticia"){
        console.log(eventDay);
        //console.log(item.fecha.fecha);
        if (item.tipoObjeto == 'torneo-encuentro') {
            arrayEvents.push(item.fechaEncuentro.fecha);
        }
        if (item.tipoObjeto == 'evento') {
            arrayEvents.push(item.fechaOcurrencia.fecha);
        }
        if (item.fechaOcurrencia.fecha == eventDay) {
            console.log(item.id);
            //console.log(item.fecha.fecha);

            console.log('evento coincideee');
            if (item.tipoObjeto == "evento") {
                $('#calendarEventsView').html("");
                //poner aca el builder que esta mas abajo para construir
                strBuilderCalendarContent.push('<div class="timeline-item">');
                strBuilderCalendarContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');
                strBuilderCalendarContent.push('<div style="display:flex;padding-top: 10px;"><div style="flex:1;padding: 10px; margin-left: 10px;"><i class="icon icon-date-event"></i><span style="margin-left: 10px;color: #585858;">' + item.fecha.fecha + '</span></div><div style="flex:1;"><div style="margin-left: 30%;padding:10px;background-color: #F6F6F6;border-radius: 30px 0 0 30px;"><i class="icon icon-hour-event"></i><span style="margin-left: 10px;color: #585858;">' + item.hora.hora + '</span></div></div></div>');
                strBuilderCalendarContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1(' + item.id + ', \'' + sucesoDetailFromCalendar + '\')">');
                strBuilderCalendarContent.push('<div class="card card-event-home">');
                strBuilderCalendarContent.push('<div class="card-event-home-content">');
                strBuilderCalendarContent.push('<div class="card-content card-content-event">');
                strBuilderCalendarContent.push('<div class="content-block">');
                strBuilderCalendarContent.push('<div class="row row-events-page">');
                strBuilderCalendarContent.push('<div class="col-100">');
                strBuilderCalendarContent.push('<img src="' + item.imagenPrincipal + '" alt="' + item.titulo + '" class="imgCardEvent"/>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('<div class="card-header-home custom-calendar-event-card">' + item.titulo + '</div>');
                strBuilderCalendarContent.push('<div style="font-family:Montserrat-Light;color:#919191;text-overflow: ellipsis;height: 4em;overflow: hidden;padding:0 20px;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;margin-bottom: 10px;">' + item.detalleTxt + '</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</div>');
                strBuilderCalendarContent.push('</a>');
                strBuilderCalendarContent.push('</div>');
                $('#calendarEventsView').append(strBuilderCalendarContent.join(""));
            } else if (item.tipoObjeto == 'torneo-encuentro') {
                $('#calendarEventsView').html("");
                console.log(item);

                if (item == "") {
                    strBuilderCalendarContent.push('');
                } else {

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
                    // strBuilderCalendarContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 1)+'</small></div>');
                    // strBuilderCalendarContent.push('<div class="timeline-item-divider"></div>');
                    strBuilderCalendarContent.push('<div class="card card-event-home">');
                    strBuilderCalendarContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');

                    strBuilderCalendarContent.push('<div class="card-header card-header-center">' + item.torneo.nombre + '</div>');
                    //}

                    strBuilderCalendarContent.push('<div onclick="loadMatchDetails1(' + item.id + ', \'' + sucesoDetailFromCalendar + '\')" class="card-content">');
                    strBuilderCalendarContent.push('<div class="card-content-inner">');
                    strBuilderCalendarContent.push('<div class="list-block lastmatch-tournaments">');
                    strBuilderCalendarContent.push('<div class="item-content">');
                    strBuilderCalendarContent.push('<div class="row" id="row-lastmatch-tournament-calendar">');
                    strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament">');
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+ item.local.imagenPrincipalMin +'" class="lazy lazy-fadeIn img-shield-lastmatch"/></div>');
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-team">' + item.local.nombre + '</div>');
                    /*if(lastMatch.local.urlShield != ""){
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                    }
                    else{*/
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
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-nametournament" style="text-align: center;">' + item.torneo.deporteCategoria.nombreCorto + '</div>');
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-name">' + item.fechaEncuentro.hora + '</div>');
                    // strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');
                    // strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-date">' + item.fechaEncuentro.fecha + '</div>');
                    strBuilderCalendarContent.push('</div>');
                    //}

                    strBuilderCalendarContent.push('<div class="col-33 col-lastmatch-tournament">');
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+ item.visitante.imagenPrincipalMin +'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                    strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-team">' + item.visitante.nombre + '</div>');
                    /*if(lastMatch.visit.urlShield != ""){
                        strBuilderCalendarContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                    }
                    else{*/
                    //}
                    strBuilderCalendarContent.push('</div>');
                    strBuilderCalendarContent.push('</div>');
                    strBuilderCalendarContent.push('</div>');
                    strBuilderCalendarContent.push('<div class="description-lastmatch-tournament">');
                    strBuilderCalendarContent.push(item.detalle);
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
    if (!arrayEvents.includes(eventDay)) {
        $('#calendarEventsView').html("");
        console.log('no existen eventos');
        strBuilderCalendarContent.push('<div class="content-block content-block-information">');
        strBuilderCalendarContent.push('<div class="noEventsCalendarMsg"> No existen eventos para este dia </div>');
        strBuilderCalendarContent.push('</div>');
        $('#calendarEventsView').append(strBuilderCalendarContent.join(""));

    }



}

function dateTimeLineEventsSplitedFormat(date, n) {
    //funcion para recortar la fecha
    var dateTimeLineEvents = date;
    var dateTimeLineEventsSplited = dateTimeLineEvents.split("/");
    //console.log(dateTimeLineEventsSplited);
    //console.log(dateTimeLineEvents);
    return dateTimeLineEventsSplited[n];
}

function builderTimeLineEventsHome() {
    console.log(homeDetails2List);
    //console.log(newsListHome);

    var strBuilderTimeLineContent = [];
    strBuilderTimeLineContent.push('<div class="timeline">');

    $.each(homeDetails2List.calendario, function (i, item) {
        if (item.tipoObjeto == 'evento') {
            console.log(item);
            //console.log(item.fecha.fecha);

            strBuilderTimeLineContent.push('<div class="timeline-item">');
            // strBuilderTimeLineContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fecha.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fecha.fecha, 1)+'</small></div>');
            // strBuilderTimeLineContent.push('<div class="timeline-item-divider"></div>');
            strBuilderTimeLineContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1(' + item.id + ',\'' + sucesoDetailFromCalendar + '\')">');
            strBuilderTimeLineContent.push('<div class="card card-event-home">');
            strBuilderTimeLineContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');
            //strBuilderTimeLineContent.push('<div class="card card-event-home">');
            strBuilderTimeLineContent.push('<div style="display:flex;padding-top: 10px;"><div style="flex:1;padding: 10px; margin-left: 10px;"><i class="icon icon-date-event"></i><span style="margin-left: 10px;color: #585858;">' + item.fecha.fecha + '</span></div><div style="flex:1;"><div style="margin-left: 30%;padding:10px;background-color: #F6F6F6;border-radius: 30px 0 0 30px;"><i class="icon icon-hour-event"></i><span style="margin-left: 10px;color: #585858;">' + item.hora.hora + '</span></div></div></div>');
            strBuilderTimeLineContent.push('<div class="card-event-home-content">');
            strBuilderTimeLineContent.push('<div class="card-content card-content-event">');
            strBuilderTimeLineContent.push('<div class="content-block">');
            strBuilderTimeLineContent.push('<div class="row row-events-page">');
            strBuilderTimeLineContent.push('<div class="col-100">');
            strBuilderTimeLineContent.push('<img src="' + item.imagenPrincipal + '" alt="' + item.titulo + '" class="imgCardEvent"/>');
            strBuilderTimeLineContent.push('</div>');
            // strBuilderTimeLineContent.push('<div class="col-100">');
            // strBuilderTimeLineContent.push('<table class="table-events-page">');
            // strBuilderTimeLineContent.push('<tr><td><i class="icon icon-date-event"></i></td><td><span>' + item.fecha.fecha + '</span></td></tr>');
            // strBuilderTimeLineContent.push('<tr><td><i class="icon icon-hour-event"></i></td><td><span>' + item.hora.hora + '</span></td></tr>');
            // strBuilderTimeLineContent.push('</table>');
            // strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('<div class="card-header-home custom-calendar-event-card">' + item.titulo + '</div>');
            strBuilderTimeLineContent.push('<div style="font-family:Montserrat-Light;color:#919191;text-overflow: ellipsis;height: 4em;overflow: hidden;padding:0 20px;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;margin-bottom: 10px;">' + item.detalleTxt + '</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</div>');
            strBuilderTimeLineContent.push('</a>');
            strBuilderTimeLineContent.push('</div>');
            //strBuilderTimeLineContent.push('</div>');
        } else if (item.tipoObjeto == 'torneo-encuentro') {
            console.log(item);

            if (item == "") {
                strBuilderLastNewsContent.push('');
            } else {

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
                // strBuilderTimeLineContent.push('<div class="timeline-item-date">'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 0)+' <small>'+dateTimeLineEventsSplitedFormat(item.fechaEncuentro.fecha, 1)+'</small></div>');
                // strBuilderTimeLineContent.push('<div class="timeline-item-divider"></div>');
                strBuilderTimeLineContent.push('<div class="card card-event-home">');
                strBuilderTimeLineContent.push('<div class="timeline-item-content card" id="cardHomeTimeLine">');

                strBuilderTimeLineContent.push('<div class="custom-calendar-match-card"><div style="font-family: Montserrat-Regular;font-size: 16px;color: #585858;padding: 10px 10px 0 20px;">' + item.torneo.nombre + '</div><div style="font-family: Montserrat-Light;font-size: 11px;color: #919191;padding: 5px 0 10px 20px;">' + item.torneo.deporteCategoria.nombreCorto + '</div></div>');
                //}

                strBuilderTimeLineContent.push('<div onclick="loadMatchDetails1(' + item.id + ', \'' + sucesoDetailFromCalendar + '\')" class="card-content">');
                strBuilderTimeLineContent.push('<div class="card-content-inner">');
                strBuilderTimeLineContent.push('<div class="list-block lastmatch-tournaments">');
                strBuilderTimeLineContent.push('<div class="item-content">');
                strBuilderTimeLineContent.push('<div class="row" id="row-lastmatch-tournament-calendar">');
                strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament">');
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+ item.local.imagenPrincipalMin +'" class="lazy lazy-fadeIn img-shield-lastmatch"/></div>');
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-team">' + item.local.nombre + '</div>');
                /*if(lastMatch.local.urlShield != ""){
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                }
                else{*/
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
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-name">' + item.fechaEncuentro.hora + '</div>');
                // strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');
                // strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-date">' + item.fechaEncuentro.fecha + '</div>');
                strBuilderTimeLineContent.push('</div>');
                //}

                strBuilderTimeLineContent.push('<div class="col-33 col-lastmatch-tournament">');
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+ item.visitante.imagenPrincipalMin +'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-team">' + item.visitante.nombre + '</div>');
                /*if(lastMatch.visit.urlShield != ""){
                    strBuilderTimeLineContent.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
                }
                else{*/
                //}
                strBuilderTimeLineContent.push('</div>');
                strBuilderTimeLineContent.push('</div>');
                strBuilderTimeLineContent.push('</div>');
                strBuilderTimeLineContent.push('<div class="description-lastmatch-tournament">');
                strBuilderTimeLineContent.push(item.detalle);
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
		
    //en is language option, you may specify..
    return date.toLocaleDateString("es", options); 


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
  
    //en is language option, you may specify..
    var newdateFormated = date.toLocaleDateString("es", options); 
    console.log(newdateFormated);
    var newdateArray = dateEvent.split("/");
    var newdateEventFormated = datearray[1];
    console.log(newdateEventFormated);


}