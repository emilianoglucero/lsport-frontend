var matchDetailsHomeInfo;
var sportIDCategorie;



var idLiveMatchActivePage = null;
myApp.onPageInit('matchdetails', function (page)
{

$('#subnavbarMatchDetails1').text(lblTabInformation);
$('#subnavbarMatchDetails2').text(lblTabEventos);
$('#subnavbarMatchDetails3').text(lblTabMultimedia);

$('#lblHeaderGoToFixture').text(lblHeaderGoToFixture);

    $$('#tabMatchDetails1').on('show', function () {
    console.log('tab1');
    console.log(matchDetailsHomeInfo);
        //if(areContentTabInformationSportDetailsBuilder == false){
            builderDetailsMatchDetailsInfo(matchDetailsHomeInfo);
          //  areContentTabInformationSportDetailsBuilder = true;
        //}
	});
	$$('#tabMatchDetails2').on('show', function () {
	console.log('tab2');
        //if(areContentTabInformationSportDetailsBuilder == false){
        console.log(matchDetailsHomeInfo);
			builderDetailsMatchDetailsTimeLine(matchDetailsHomeInfo);
			//areContentTabInformationSportDetailsBuilder = true;
		//}
	});

	$('.buttonGoToFixture').on('click', function(){
	console.log(torneoEncuentroState);
        if (torneoEncuentroState == true) {
            loadSportDetails(sportIDCategorie);
            mainView.router.load({pageName: 'sportdetails'});
        } else {
            mainView.router.load({pageName: 'sportdetails'});
        }
    });
    
});

myApp.onPageBeforeAnimation('matchdetails', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-matchdetails .page-content').scrollTop(0);
	trackPageGA("Detalle Partido");
});

myApp.onPageBack('matchdetails', function (page){
	idLiveMatchActivePage=null;
});

/**** html structure function to insert inside the main builder function ****/

function htmlMatchDetailsCard (match) {

    console.log(match);

    var strBuilderMatchDetailInfo = [];

    strBuilderMatchDetailInfo.push('<div class="card">');

        strBuilderMatchDetailInfo.push('<div class="card-header card-header-center">'+match.torneo.nombre+'</div>');

        strBuilderMatchDetailInfo.push('<div class="card-content">');
            strBuilderMatchDetailInfo.push('<div class="card-content-inner">');
                strBuilderMatchDetailInfo.push('<div class="list-block lastmatch-tournaments">');
                    strBuilderMatchDetailInfo.push('<div class="item-content">');
                        strBuilderMatchDetailInfo.push('<div class="row" id="row-lastmatch-tournament">');
                            strBuilderMatchDetailInfo.push('<div class="col-33 col-lastmatch-tournament">');
                                if(match.local.imagenPrincipalMin != ""){
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-shield"><img src="'+match.local.imagenPrincipalMin+'" class="img-shield-lastmatch" ></div>');
                                }
                                else{
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-shield"><img src="img/icon-shield-default.png" class="img-shield-lastmatch" ></div>');
                                }
                                strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-team">'+match.local.nombreCorto+'</div>');
                            strBuilderMatchDetailInfo.push('</div>');
                            strBuilderMatchDetailInfo.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament.middle">');
                                //strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-nametournament">'+match.torneo.nombre+'</div>');
                                //strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-nametournament">match.torneo.deporteCategoria.nombreCorto</div>');
                                strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-name">'+match.fechaEncuentro.fecha+'</div>');
                                //strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-name">match.torneo.nombre</div>');
                                if (match.local.tantos != null || match.visitante.tantos != null){
                                    //strBuilderMatchDetailInfo.push('<td class="td-50-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-result"><p>'+match.local.tantos+' - '+match.visitante.tantos+'</p></div>');
                                    //strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-result"><p>'+match.visitante.tantos+'</p></div>');
                                    //strBuilderMatchDetailInfo.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+mainId+','+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                    //strBuilderMatchDetailInfo.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                } else {
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');

                                }

                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-date">'+match.fechaEncuentro.hora+'</div>');

                            strBuilderMatchDetailInfo.push('</div>');
                            strBuilderMatchDetailInfo.push('<div class="col-33 col-lastmatch-tournament">');
                                if(match.visitante.imagenPrincipalMin != ""){
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-shield"><img src="'+match.visitante.imagenPrincipalMin+'" class="img-shield-lastmatch" ></div>');
                                }
                                else{
                                    strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-shield"><img src="img/icon-shield-default.png" class="img-shield-lastmatch" ></div>');
                                }
                                strBuilderMatchDetailInfo.push('<div class="col-lastmatch-tournament-team">'+match.visitante.nombreCorto+'</div>');
                                strBuilderMatchDetailInfo.push('</div>');
                            strBuilderMatchDetailInfo.push('</div>');
                        strBuilderMatchDetailInfo.push('</div>');
                        strBuilderMatchDetailInfo.push('<div class="description-lastmatch-tournament">');
                            strBuilderMatchDetailInfo.push(match.visitante.nombre);
                        strBuilderMatchDetailInfo.push('</div>');
                strBuilderMatchDetailInfo.push('</div>');
            strBuilderMatchDetailInfo.push('</div>');
        strBuilderMatchDetailInfo.push('</div>');
        strBuilderMatchDetailInfo.push('</div>');

        console.log(strBuilderMatchDetailInfo);

        strBuilderMatchDetailInfo.join("");
        console.log(strBuilderMatchDetailInfo);

        return strBuilderMatchDetailInfo;

}
/**** final html structure ****/

/**** html structure function of the event part to insert inside the main builder function ****/
function htmlMatchDetailsEvents (match) {

    console.log(match);

    var strBuilderLastMatch = [];

        if (match.tipoObjeto == "torneo-encuentro") {
		    var equipoLocal = match.local.nombre;
		    var equipoVisitante = match.visitante.nombre;

		    var timelineSide = true;
		    if (match.eventos.todos.length !== 0){

		    strBuilderLastMatch.push('<div class="timeline timeline-sides">');

                $.each( match.eventos.todos, function( i, item ){
                console.log(item);
                    if (item.tipoEvento == "anotacion") {

                    if (timelineSide == false) {
                     strBuilderLastMatch.push('<div class="timeline timeline-sides">');
                    }

                        if (item.equipo.localia == "local") {
                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-left">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        //strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        if (item.detallePrincipal == null) {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title"></div>');
                                        } else {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        }
                                            if (item.comentario !== "") {
                                                strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                            }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;

                        }
                        else if (item.equipo.localia == "visitante"){

                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-right">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        if (item.comentario.detalle == null) {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title"></div>');
                                            //strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        } else {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                            //strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title"></div>');
                                        }
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;

                        }
                    } else if (item.tipoEvento == "inicializar") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Comenzó el partido!</div>');
                        strBuilderLastMatch.push('</div>');
                        timelineSide = false;


                    }
                    else if (item.tipoEvento == "finalizar-etapa") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Terminó '+item.tiempo.etapa.nombre+'</div>');
                        strBuilderLastMatch.push('</div>');

                        timelineSide = false;

                    }
                    else if (item.tipoEvento == "inicializar-etapa") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Comienza '+item.tiempo.etapa.nombre+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelineSide = false;

                    }
                    else if (item.tipoEvento == "comentario") {

                        strBuilderLastMatch.push('</div>');

                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">'+item.tiempo.relojEtapa+'</div>');
                                strBuilderLastMatch.push('<div class="timeline-item-time"">'+item.comentario+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelineSide = false;

                    }
                    else if (item.tipoEvento == "finalizar") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Terminó el partido!</div>');
                            strBuilderLastMatch.push('<div class="timeline-item-time"">'+equipoLocal+' '+item.tanteadorLocal+' - '+item.tanteadorVisitante+' '+equipoVisitante+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelineSide = false;

                    }
                    else if (item.tipoEvento == "disciplinario") {

                    if (timelineSide == false) {
                        strBuilderLastMatch.push('<div class="timeline timeline-sides">');
                    }

                        if (item.equipo.localia == "local") {
                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-left">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        if (item.detallePrincipal == null) {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title"></div>');
                                        } else {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        }
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;

                        }
                        else if (item.equipo.localia == "visitante"){

                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-right">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        if (item.detallePrincipal == null) {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title"></div>');
                                        } else {
                                            strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        }
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;

                        }

                    }
                    else if (item.tipoEvento == "sustitucion") {

                        if (timelineSide == false) {
                            strBuilderLastMatch.push('<div class="timeline timeline-sides">');
                        }

                        if (item.equipo.localia == "local") {
                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-left">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.label+': '+item.detallePrincipal.detalle+'</div><div class="match-event-timeline-commentary"><br>'+item.detalleSecundario.label+': '+item.detalleSecundario.detalle+'</div>');
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;

                        }
                        else if (item.equipo.localia == "visitante"){

                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-right">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.label+': '+item.detallePrincipal.detalle+'</div><div class="match-event-timeline-commentary"><br>'+item.detalleSecundario.label+': '+item.detalleSecundario.detalle+'</div>');
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelineSide = true;
                        }

                    }

                });

            strBuilderLastMatch.push('</div>');

		    }

        }
    console.log(strBuilderLastMatch);
    return strBuilderLastMatch;
}

// html structure function to show the images, videos an other data from the torneo-encuentro

var swiperPhotoGalleryMatchDetails, swiperVideoGalleryMatchDetails;

var listPhotosBrowserMatchDetails = [];
var listVideoBrowserMatchDetails = [];

var myPhotoBrowserPhotoGalleryMatchDetails = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryMatchDetails = myApp.photoBrowser();


function htmlMatchDetailsMultiMedia (match) {
    console.log(match);

    var strBuilderGalleryMatchDetails = [];

    //$('#divContentPhotoGalleryMatchDetails').html(builderPhotoGalleryNewDetails(match.imagenes));
	//$('#divContentVideoGalleryMatchDetails').html(builderVideoGalleryNewDetails(match.audiovisuales));
	
	//mainView.router.load({pageName: 'newdetails'});
//builderPhotoGalleryNewDetails
	strBuilderGalleryMatchDetails.push('');
	if(match.imagenes != ""){
		strBuilderGalleryMatchDetails.push('<div class="content-block-title content-block-title-custom lblPhotoGallery">'+lblPhotoGallery+'</div>');
		strBuilderGalleryMatchDetails.push('<div id="swiper-container-photogallery-matchdetails" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderGalleryMatchDetails.push('<div class="swiper-wrapper">');
				listPhotosBrowserMatchDetails = [];
				$.each(match.imagenes, function(index, item) {
                    listPhotosBrowserMatchDetails.push(item.imagenMin);
                    strBuilderGalleryMatchDetails.push('<div class="swiper-slide">');
                    strBuilderGalleryMatchDetails.push('<img onclick="openPhotoBrowserMatchDetails('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.imagenMin+'"/>');
                    strBuilderGalleryMatchDetails.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
                    strBuilderGalleryMatchDetails.push('</div>');
				});
			strBuilderGalleryMatchDetails.push('</div>');
			strBuilderGalleryMatchDetails.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
		strBuilderGalleryMatchDetails.push('</div>');
	}
	console.log(strBuilderGalleryMatchDetails);

	if(match.audiovisuales != ""){
        strBuilderGalleryMatchDetails.push('<div class="content-block-title content-block-title-custom lblVideoGallery">'+lblVideoGallery+'</div>');
        strBuilderGalleryMatchDetails.push('<div id="swiper-container-videogallery-matchdetails" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
            strBuilderGalleryMatchDetails.push('<div class="swiper-wrapper">');
                listVideoBrowserMatchDetails = [];
                $.each(match.audiovisuales, function(index, item) {
                console.log(item);
                    listVideoBrowserMatchDetails.push(item);
                    strBuilderGalleryMatchDetails.push('<div class="swiper-slide">');
                    strBuilderGalleryMatchDetails.push('<img onclick="openVideoBrowserMatchDetails('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.imagen+'"/>');
                    strBuilderGalleryMatchDetails.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
                    strBuilderGalleryMatchDetails.push('</div>');
                });
                console.log(listVideoBrowserMatchDetails);
            strBuilderGalleryMatchDetails.push('</div>');
            strBuilderGalleryMatchDetails.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
        strBuilderGalleryMatchDetails.push('</div>');
    }
	return strBuilderGalleryMatchDetails;
	console.log(strBuilderGalleryMatchDetails);
	//myApp.initImagesLazyLoad(mainView.activePage.container);
}

//presets to the photo and video gallery

function openPhotoBrowserMatchDetails(idPhoto){
console.log(idPhoto);
	myPhotoBrowserPhotoGalleryMatchDetails.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}


function openVideoBrowserMatchDetails(idVideo){
console.log(idVideo);
listVideoBrowserMatchDetails[idVideo].url
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserMatchDetails[idVideo].url+'" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryMatchDetails = myApp.photoBrowser({
	    photos : video,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarVideoBrowser,
	    toolbar: false,
	    onOpen: function (){screen.orientation.unlock(); },
        	    onClose: function (){screen.orientation.lock('portrait'); }
	    /*onOpen: function (){navigator.screenOrientation.set('user'); },
    	onClose: function (){navigator.screenOrientation.set('portrait'); }*/
	});
	myPhotoBrowserVideoGalleryMatchDetails.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	console.log(listVideoBrowserMatchDetails);
	console.log(listVideoBrowserMatchDetails[idVideo]);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserMatchDetails[idVideo].titulo);
}

/**** final html structure ****/



function loadMatchDetails1(idNew, state){

            $('#tabMatchDetails1').html("");
            $('#tabMatchDetails2').html("");

	        showLoadSpinnerWS();
	        console.log(idNew);
	        console.log(homeDetails2List);
	        console.log(newsListHome);
	        console.log(allSucesosPageList);
	        console.log(tournamentFixtureFechas);
	        console.log(state);
	        if (state == "home") { //significa que viene desde la home

	        	var matchDetailsHome = allSucesosPageList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];
                console.log(matchDetailsHome);
                torneoEncuentroState = true;

            } else if (state == "calendar")  { //significa que viene desde el calendario
                var homeDetails2ListCalendario = homeDetails2List.calendario;

                var matchDetailsHome = homeDetails2ListCalendario.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];
                console.log(matchDetailsHome);
                torneoEncuentroState = true;

            } else if (state == "sports")  { //significa que viene desde la pantalla de torneo y deportes
                //var allSucesosPageList = homeDetails2List;
                console.log(recentNewsListSporDetails);

                var matchDetailsHome = recentNewsListSporDetails.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];
                console.log(matchDetailsHome);
                torneoEncuentroState = false;

            torneoEncuentroState = false;

            }

            if(idLiveMatchActivePage != idNew){
            console.log('idnew no es igual a idlivematch');
                $('#lblHeaderMatchDetails').text(matchDetailsHome.torneo.deporteCategoria.nombreCorto);
                $('.icon-sportDetails').css('background-image','url("'+matchDetailsHome.torneo.deporte.imagenPrincipalMin+'")');
                idLiveMatchActivePage = idNew;
                console.log(idLiveMatchActivePage);
            }

            sportIDCategorie = matchDetailsHome.torneo.deporteCategoria.id;
            console.log(sportIDCategorie);
            matchDetailsHomeInfo = matchDetailsHome;

            //builderDetailsMatchDetailsInfo(matchDetailsHome);
            builderDetailsMatchDetails(matchDetailsHome);
			hideLoadSpinnerWS();

}

function loadMatchDetailsFromFechas(idFechas, idPartido){
	        showLoadSpinnerWS();
            console.log(idFechas);
            console.log(idPartido);
            console.log(newsListHome);
            console.log(allSucesosNewsList);
            console.log(datesTournaments);

                var matchDetailsHome = datesTournaments.filter(function( obj ) {
                  return obj.id == idFechas;
                });
                matchDetailsHome = matchDetailsHome[0];
                matchDetailsHome = matchDetailsHome.encuentros;
                console.log(matchDetailsHome);

                var matchDetailsHomeMatch = matchDetailsHome.filter(function( obj ) {
                  return obj.id == idPartido;
                });
                //matchDetailsHomeMatch = matchDetailsHomeMatch[0];
                matchDetailsHomeInfo = matchDetailsHomeMatch[0];
                console.log(matchDetailsHomeInfo);


            torneoEncuentroState = false;
            builderDetailsMatchDetails(matchDetailsHomeInfo);
            hideLoadSpinnerWS();


}

function loadMatchDetailsFromFixture(id, idPartido){
            console.log(torneoEncuentroState);
	        showLoadSpinnerWS();
	        console.log(id);
	        console.log(idPartido);
	        console.log(newsListHome);
	        console.log(allSucesosFechaTorneoList);
            console.log(allSucesosEncuentroList);
            //si es true viene de la home
            if (torneoEncuentroState == true) {
                var matchDetailsHome = allSucesosFechaTorneoList.filter(function( obj ) {
                  return obj.id == id;
                });
                matchDetailsHome = matchDetailsHome[0];
                matchDetailsHome = matchDetailsHome.encuentros;
                console.log(matchDetailsHome);

                var matchDetailsHomeMatch = matchDetailsHome.filter(function( obj ) {
                  return obj.id == idPartido;
                });
                matchDetailsHomeMatch = matchDetailsHomeMatch[0];
                console.log(matchDetailsHomeMatch);
            }
            if (torneoEncuentroState == false) {
                var matchDetailsHome = tournamentMatchList.filter(function( obj ) {
                  return obj.id == id;
                });
                matchDetailsHome = matchDetailsHome[0];
                matchDetailsHome = matchDetailsHome.encuentros;
                console.log(matchDetailsHome);
                 var matchDetailsHomeMatch = matchDetailsHome.filter(function( obj ) {
                      return obj.id == idPartido;
                    });
                    matchDetailsHomeMatch = matchDetailsHomeMatch[0];
                    console.log(matchDetailsHomeMatch);
            }

                sportIDCategorie = matchDetailsHomeMatch.torneo.deporteCategoria.id;
                matchDetailsHomeInfo = matchDetailsHomeMatch;
                console.log(sportIDCategorie);
                //torneoEncuentroState = true;
            builderDetailsMatchDetails(matchDetailsHomeMatch);
			hideLoadSpinnerWS();

}

function refreshMatchDetails1(idMatch){
	$('#icon-refresh-matchdetails').hide();
	showLoadSpinnerWS();
		$.ajax({
    	// URL del Web Service
        		url: getPathWS() + 'getHome',
        		dataType: 'json',
        		timeout: timeOut,
        		success: function(response){
        		console.log(response);
        		allSucesosPageList = response.sucesosPanel.sucesos;
                    var matchDetailsHome = allSucesosPageList.filter(function( obj ) {
                      return obj.id == idMatch;
                    });
                    matchDetailsHomeInfo = matchDetailsHome[0];
                    console.log(matchDetailsHomeInfo);
                    if(idLiveMatchActivePage != idMatch){
                        //$('#lblHeaderMatchDetails').text(matchDetailsHome.torneo.deporteCategoria.nombreCorto);
                        //$('.icon-sportDetails').css('background-image','url("'+matchDetailsHome.torneo.deporte.imagenPrincipalMin+'")');
                        idLiveMatchActivePage = idMatch;
                    }
                    hideLoadSpinnerWS();
        			//builderDetailsMatchDetails(matchDetailsHome);
        			builderDetailsMatchDetails(matchDetailsHomeInfo);

        		},
        		error: function (data, status, error){
        			  hideLoadSpinnerWS();
                      showMessage(messageConexionError);
                      $("#icon-refresh-matchdetails").off("click");
                      $('#icon-refresh-matchdetails').show();
                      $('#icon-refresh-matchdetails').click(function (){
                        refreshMatchDetails(idMatch);
                      });
        	   },
               beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
    	});

}

/**** buscar en el futuro la forma de sacar esta funcion, donde la unica diferencia que existe entre
builderDetailsMatchDetails y builderDetailsMatchDetailsTimeLine es el mainView.router.load({pageName: 'matchdetails'});****/
function builderDetailsMatchDetails(match){
    console.log(match);

    mainView.router.load({pageName: 'matchdetails'});
    myApp.showTab("#tabMatchDetails2");
        $('#tabMatchDetails2').html('');
        var finalInfoStructureMatchDetails = htmlMatchDetailsCard(match);
    	console.log(finalInfoStructureMatchDetails);
    	var finalInfoStructureMatchDetailsEvents = htmlMatchDetailsEvents(match);
    	console.log(finalInfoStructureMatchDetailsEvents);

    	$('#tabMatchDetails2').append(finalInfoStructureMatchDetails.join(""));
    	$('#tabMatchDetails2').append(finalInfoStructureMatchDetailsEvents.join(""));

        myApp.initImagesLazyLoad(mainView.activePage.container);
	//mainView.router.load({pageName: 'matchdetails'});
}


function builderDetailsMatchDetailsInfo(match) {

    myApp.showTab("#tabMatchDetails1");

    $('#tabMatchDetails1').html('');
    console.log(match);

        //myApp.initImagesLazyLoad(mainView.activePage.container);

	var finalInfoStructureMatchDetails = htmlMatchDetailsCard(match);
	console.log(finalInfoStructureMatchDetails);
	var finalInfoStructureMatchDetailsMultiMedia = htmlMatchDetailsMultiMedia(match);
	console.log(finalInfoStructureMatchDetailsMultiMedia);

	$('#tabMatchDetails1').append(finalInfoStructureMatchDetails.join(""));
	//myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#tabMatchDetails1').append(finalInfoStructureMatchDetailsMultiMedia.join(""));

	var centerSwiperPhotos = false;
        if (match.imagenes.length == 1){
            centerSwiperPhotos = true;
        }
        console.log(centerSwiperPhotos);

            swiperPhotoGalleryMatchDetails = new Swiper('#swiper-container-photogallery-matchdetails', {
                pagination: '.swiper-pagination-photogallery',
                slidesPerView: 2,
                centeredSlides: centerSwiperPhotos,
                paginationClickable: true,
                spaceBetween: 15,
                preloadImages: true,
                updateOnImagesReady: true,
                lazyLoadingInPrevNext: true,
                lazyLoading: true
            });

            var centerSwiperVideos = false;
            if (match.audiovisuales.length == 1){
                centerSwiperVideos = true;
            }

            swiperVideoGalleryMatchDetails = new Swiper('#swiper-container-videogallery-matchdetails', {
                pagination: '.swiper-pagination-videogallery',
                slidesPerView: 2,
                centeredSlides: centerSwiperVideos,
                paginationClickable: true,
                spaceBetween: 15,
                preloadImages: true,
                updateOnImagesReady: true,
                lazyLoadingInPrevNext: true,
                lazyLoading: true
            });

            myPhotoBrowserPhotoGalleryMatchDetails = myApp.photoBrowser({
                photos : listPhotosBrowserMatchDetails,
                photoLazyTemplate: photoLazyBrowser,
                theme: 'dark',
                swipeToClose: false,
                lazyLoading: true,
                navbarTemplate: navbarPhotoBrowser,
                toolbar: false
            });

    //mainView.router.load({pageName: 'newdetails'});
    myApp.initImagesLazyLoad(mainView.activePage.container);



}

function builderDetailsMatchDetailsTimeLine(match) {
    console.log(match);
    //mainView.router.load({pageName: 'matchdetails'});
    myApp.showTab("#tabMatchDetails2");
    $('#tabMatchDetails2').html('');
    var finalInfoStructureMatchDetails = htmlMatchDetailsCard(match);
	console.log(finalInfoStructureMatchDetails);
	var finalInfoStructureMatchDetailsEvents = htmlMatchDetailsEvents(match);
	console.log(finalInfoStructureMatchDetailsEvents);

	$('#tabMatchDetails2').append(finalInfoStructureMatchDetails.join(""));
    $('#tabMatchDetails2').append(finalInfoStructureMatchDetailsEvents.join(""));
    

    myApp.initImagesLazyLoad(mainView.activePage.container);


}


function builderErrorMatchDetails(idMatch){
	$('#matchdetails-list').html('');
	$('#lblHeaderMatchDetails').text(lblDetailsMatchDetails);
	$('.icon-sportDetails').css('background-image','url("img/template/icon-sports.png")');
	var strBuilderMatchDetailsContent = [];
	strBuilderMatchDetailsContent.push('<div class="content-block content-block-information">');
		strBuilderMatchDetailsContent.push('<div id="divMatchDetailsErrorHeader">'+divErrorConnectionHeader+'</div>');
		strBuilderMatchDetailsContent.push('<div id="divMatchDetailsErrorText">'+divErrorConnectionText+'</div>');
		strBuilderMatchDetailsContent.push('<div onclick="loadMatchDetails('+idMatch+')" class="link" id="divImgMatchDetailsError">');
			strBuilderMatchDetailsContent.push('<img id="imgMatchDetailsUpload" src="img/template/icon-upload.png" />');
		strBuilderMatchDetailsContent.push('</div>');
	strBuilderMatchDetailsContent.push('</div>');
	$('#matchdetails-list').append(strBuilderMatchDetailsContent.join(""));
	mainView.router.load({pageName: 'matchdetails'});
}