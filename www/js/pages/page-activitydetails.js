var arrayLastestNewsActivity = [];
var tabsActivityDetails = [];
var contentTabInformationActivityDetails = [];
var areContentTabNewsActivityDetailsBuilder = false;
var areContentTabInformationSportDetailsBuilder = false;
var currentPageNumberActivityDetails, currentTotalPageActivityDetails;
var activityDetails = [];
var bannerActivityDetails = [];
var areActivityDetailsLoaded = false;

var recentNewsListActivityDetails = [];

var nextPageNumberActivityDetails = 1;
var loadingInfiniteScrollActivityDetails = false;

var areAccessedServerNewsActivityDetails = false;

myApp.onPageInit('activitydetails', function (page) {
	$('#subnavbarActivityDetails1').text(lblTabInformation);
	$('#subnavbarActivityDetails2').text(lblTabNews);
	$('#spnDescriptionActivityDetails').text(lblDescription);
	$('#spnScheduleActivityDetails').text(lblSchedule);
	$('.headerListEndNews').text(headerListEndNews);
	$('.contentListEndNews').text(contentListEndNews);

	$$('#tabActivityDetails1').on('show', function () {
		if (areContentTabInformationSportDetailsBuilder == false) {
			builderInformationActivityDetails();
			areContentTabInformationSportDetailsBuilder = true;
		}
	});

	$$('#tabActivityDetails2').on('show', function () {
		if (areContentTabNewsActivityDetailsBuilder == false) {
			builderNewsActivityDetails();
			areContentTabNewsActivityDetailsBuilder = true;
		}
		myApp.initImagesLazyLoad(mainView.activePage.container);
	});

});

myApp.onPageBeforeAnimation('activitydetails', function (page) {
	myApp.params.swipePanel = false;
	if (page.fromPage.name != 'newdetails') {
		$$('#page-activitydetails .page-content').scrollTop(0);
	}
	myApp.initImagesLazyLoad(mainView.activePage.container);
	trackPageGA("Detalle Actividad");
});

function loadActivityDetails(idAct) {
	showLoadSpinnerWS();
	areActivityDetailsLoaded = false;
	areContentTabInformationSportDetailsBuilder = false;
	areContentTabNewsActivityDetailsBuilder = false;
	activityDetails = [];
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getActividadDetalle',
		dataType: 'json',
		data: {
			'actividadId': idAct
		},
		timeout: timeOut,
		success: function (response) {
			console.log(response);
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
			nextPageNumberActivityDetails = parseInt(response.sucesosPanel.paginaActual) + 1;
			currentPageNumberActivityDetails = parseInt(response.sucesosPanel.paginaActual);
			currentTotalPageActivityDetails = parseInt(response.sucesosPanel.paginasTotal);

			//$('#contentTabActivityDetails2').html('');
			recentNewsListActivityDetails = [];
			recentNewsListActivityDetails = response.sucesosPanel.sucesos;

			activityDetails = response.actividad;

			//vacio los acumuladores por si venian con info de la pantalla de deportes
			tournamentNewsList = [];
			tournamentEventList = [];
			tournamentPositionList = [];
			tournamentMatchList = [];
			tournamentEncuentroList = [];

			var tournamentSucesosLenght = recentNewsListActivityDetails.length - 1;
			console.log(tournamentSucesosLenght);
			//clasifico y almaceno los sucesos, para no tener inconvenientes con ids duplicados
			for (i = 0; i <= tournamentSucesosLenght; i++) {
				console.log(recentNewsListActivityDetails[i]);
				console.log(recentNewsListActivityDetails[i].id);
				console.log(recentNewsListActivityDetails[i].tipoObjeto);
				//allSucesosPageList.push(newsListHome[i]);
				if (recentNewsListActivityDetails[i].tipoObjeto === 'evento') {
					console.log('agrego evento');
					tournamentEventList.push(recentNewsListActivityDetails[i]);
				}
				if (recentNewsListActivityDetails[i].tipoObjeto === 'noticia') {
					console.log('agrego noticia');
					tournamentNewsList.push(recentNewsListActivityDetails[i]);
				}
				if (recentNewsListActivityDetails[i].tipoObjeto === 'torneo-tabla-posicion') {
					console.log('agrego tabla de pos');
					tournamentPositionList.push(recentNewsListActivityDetails[i]);
				}
				if (recentNewsListActivityDetails[i].tipoObjeto === 'torneo-fecha') {
					console.log('agrego torneo fecha');
					tournamentMatchList.push(recentNewsListActivityDetails[i]);
				}
				if (recentNewsListActivityDetails[i].tipoObjeto === 'torneo-encuentro') {
					console.log('agrego encuentro');
					tournamentEncuentroList.push(recentNewsListActivityDetails[i]);
				}
			}

			//bannerActivityDetails = response.banner;
			areActivityDetailsLoaded = true;
			areContentTabNewsActivityDetailsBuilder = true;
			builderActivityDetails(idAct);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error) {
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		},
		beforeSend: function (xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		} //set tokenString before send
	});
}

var idActivitySelected;

function builderActivityDetails(idAct) {

	if (areActivityDetailsLoaded == true) {
		if (activityDetails == "") {
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		} else {
			$('.icon-activityDetails').css('background-image', 'url("' + activityDetails.imagenPrincipal + '")');
			$('#lblHeaderActivityDetails').text(activityDetails.nombreCorto);

			$('#contentTabActivityDetails2').html('');
			$$('#contentTabActivityDetails2').scrollTop(0);

			idActivitySelected = idAct;

			if (currentPageNumberActivityDetails < currentTotalPageActivityDetails) {
				myApp.attachInfiniteScroll('.infinite-scroll-activitydetails');
				$$('.infinite-scroll-activitydetails').on('infinite', function () {
					if (loadingInfiniteScrollActivityDetails) {
						return;
					}
					loadingInfiniteScrollActivityDetails = true;
					if (areAccessedServerNewsActivityDetails == false) {
						loadNewsActivityDetails(idActivitySelected);
					} else {
						$('#noConnection-content-block-activitydetails').show();
					}
				});
			} else {
				myApp.detachInfiniteScroll('.infinite-scroll-activitydetails');
			}

			if (recentNewsListActivityDetails != "") {
				myApp.showTab("#tabActivityDetails2");
				if ($('#tabActivityDetails2').hasClass('active') == true) {
					builderNewsActivityDetails();
					areContentTabNewsActivityDetailsBuilder = true;
				}
			} else {
				myApp.showTab("#tabActivityDetails1");
				if ($('#tabSportDetails1').hasClass('active') == true) {
					builderInformationActivityDetails();
					areContentTabInformationSportDetailsBuilder = true;
				}

			}

			mainView.router.load({
				pageName: 'activitydetails'
			});

		}
	}
}

function builderInformationActivityDetails() {

	$('#textDescriptionActivityDetails').html(activityDetails.detalle);
	$('#cardScheduleActivityDetails').html(builderScheduleActivityDetails(activityDetails.horarioTexto));

	$('#cardPriceActivityDetails').html(builderPriceDetails(activityDetails.precio));

	$('#coordinatorsListActivity').html(builderCoordinatorsActivity(activityDetails.coordinadores));

	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderCoordinatorsActivity(coordActivity) {
	console.log(coordActivity);
	var strBuilderCoordinatorsContent = [];
	if (coordActivity.length == 0) {
		strBuilderCoordinatorsContent.push('');
	} else {
		strBuilderCoordinatorsContent.push('<div class="card">');
		strBuilderCoordinatorsContent.push('<div id="divCoordinatorsActivity" class="card-header card-header-center">' + divCoordinatorsSport + '</div>');
		strBuilderCoordinatorsContent.push('<div class="card-content">');
		strBuilderCoordinatorsContent.push('<div class="list-block media-list">');
		strBuilderCoordinatorsContent.push('<ul>');
		$.each(coordActivity, function (i, coord) {
			strBuilderCoordinatorsContent.push('<li class="item-content">');
			strBuilderCoordinatorsContent.push('<div class="item-media">');
			var urlImgProfile = getDefaultImageProfile();
			if (coord.imgProfile != "") {
				urlImgProfile = coord.imgProfile;
			}
			strBuilderCoordinatorsContent.push('<img class="lazy lazy-fadeIn imgProfileCoordinator" alt="' + coord.altImg + '" data-src="' + urlImgProfile + '">');
			strBuilderCoordinatorsContent.push('</div>');
			strBuilderCoordinatorsContent.push('<div class="item-inner">');
			strBuilderCoordinatorsContent.push('<div class="item-title-row">');
			strBuilderCoordinatorsContent.push('<div class="item-title item-title-coord">' + coord.role + '</div>');
			strBuilderCoordinatorsContent.push('</div>');
			strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-name">' + coord.name + '</div>');
			strBuilderCoordinatorsContent.push('<a onclick="openPhoneCaller(\'' + coord.phone + '\')" herf="#">');
			strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-link-phone">' + coord.phone + '</div>');
			strBuilderCoordinatorsContent.push('</a>');
			strBuilderCoordinatorsContent.push('<a onclick="openMailer(\'' + lblSubjectEmail + '\',\'' + coord.email + '\')" herf="#">');
			strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-link-email">' + coord.email + '</div>');
			strBuilderCoordinatorsContent.push('</a>');
			strBuilderCoordinatorsContent.push('</div>');
			strBuilderCoordinatorsContent.push('</li>');
		});
		strBuilderCoordinatorsContent.push('</ul>');
		strBuilderCoordinatorsContent.push('</div>');
		strBuilderCoordinatorsContent.push('</div>');
	}
	return (strBuilderCoordinatorsContent.join(""));
}

function loadNewsActivityDetails(idAct) {
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getSucesosPorActividad',
		dataType: 'json',
		data: {
			'id': idAct,
			'pageNumber': nextPageNumberActivityDetails
		},
		timeout: timeOut,
		success: function (response) {
			console.log(response);
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
			nextPageNumberActivityDetails = parseInt(response.paginaActual) + 1;

			if (response.pageNumber == 1) {
				$('#contentTabActivityDetails2').html('');
				recentNewsListActivityDetails = [];
				recentNewsListActivityDetails = response.sucesos;
				builderNewsActivityDetails();
				hideLoadSpinnerWS();
			} else {
				recentNewsListActivityDetails = [];
				recentNewsListActivityDetails = response.sucesos;
				builderNewsActivityDetails();
				hideLoadSpinnerWS();
			}

			if (response.totalPage < nextPageNumberActivityDetails) {
				myApp.detachInfiniteScroll('.infinite-scroll-activitydetails');
			}
			loadingInfiniteScrollActivityDetails = false;
			areAccessedServerNewsActivityDetails = false;
			$('#noConnection-content-block-activitydetails').hide();


		},
		error: function (data, status, error) {
			if (nextPageNumberActivityDetails == 1) {
				builderErrorNewsActivityDetails(idAct);
				hideLoadSpinnerWS();
			} else {
				hideLoadSpinnerWS();
				showMessageToast(messageCanNotRefresh);
				loadingInfiniteScrollActivityDetails = false;
				areAccessedServerNewsActivityDetails = true;
			}
		},
		beforeSend: function (xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		} //set tokenString before send
	});
}

function reloadNewsActivityDetails() {
	if (existInternetConnection() == true) {
		loadNewsActivityDetails(idActivitySelected);
	} else {
		showMessageToast(messageCanNotRefresh);
	}
}

function builderErrorNewsActivityDetails(idAct) {
	$('#contentTabActivityDetails2').html('');
	var srBuilderNewsActivityDetailsContent = [];
	srBuilderNewsActivityDetailsContent.push('<div onclick="loadNewsActivityDetails(\'' + idAct + '\')" class="content-block content-block-information">');
	srBuilderNewsActivityDetailsContent.push('<div id="divNewsActivityDetailsErrorHeader"></div>');

	srBuilderNewsActivityDetailsContent.push('<div id="divNewsActivityDetailsErrorText"></div>');

	srBuilderNewsActivityDetailsContent.push('<div class="link" id="divImgNewsActivityDetailsError">');
	srBuilderNewsActivityDetailsContent.push('<img id="imgNewsActivityDetailsUpload" src="img/template/icon-upload.png" />');
	srBuilderNewsActivityDetailsContent.push('</div>');
	srBuilderNewsActivityDetailsContent.push('</div>');
	$('#contentTabActivityDetails2').append(srBuilderNewsActivityDetailsContent.join(""));
	$('#divNewsActivityDetailsErrorHeader').text(divErrorConnectionHeader);
	$('#divNewsActivityDetailsErrorText').text(divNewsActivityDetailsErrorText);
}

function builderNewsActivityDetails() {

	var strBuilderNewsActivityDetailsContent = [];
	if (recentNewsListActivityDetails.length == 0) {
		strBuilderNewsActivityDetailsContent.push('<div class="content-block">');
		strBuilderNewsActivityDetailsContent.push('<div class="divNotLastestNews"></div>');
		strBuilderNewsActivityDetailsContent.push('</div>');
	} else {
		$.each(recentNewsListActivityDetails, function (i, item) {
			/*if(item.type == "banner"){
				/*strBuilderNewsActivityDetailsContent.push('<div class="item-list-banner">'); ERASE
					strBuilderNewsActivityDetailsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
				strBuilderNewsActivityDetailsContent.push('</div>');
			} else{*
				strBuilderNewsActivityDetailsContent.push('<div class="card card-news"><div class="card-content"><div class="list-block list-block-about media-list">');
					strBuilderNewsActivityDetailsContent.push('<ul><li class="item-content">');
						strBuilderNewsActivityDetailsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');

						*/
			if (item.tipoObjeto == "noticia") {

				strBuilderNewsActivityDetailsContent.push('<div class="card demo-card-header-pic"><div style="background-image:url(' + item.imagenPrincipalMin + '); height:150px;" valign="bottom" class="card-header color-white no-border">');
				strBuilderNewsActivityDetailsContent.push('<div class="chipHomeContainer">');
				//strBuilderNewsActivityDetailsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
				//strBuilderNewsActivityDetailsContent.push('<div class="chip chipHomeDate"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeDateLabel">'+formatDateSucesos(item.fecha.fecha)+'</div></div>');
				if (item.tags.publicador != "") {
					strBuilderNewsSportDetailsContent.push('<div class="chip chipHomeCategory"><div class="media"><i style="background-image: url(' + item.datosPublicacion.ente.imagenPrincipalMin + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.datosPublicacion.ente.nombre + '</div></div>');
				}
				strBuilderNewsActivityDetailsContent.push('<div class="chip chipHomeTags"><div class="media"><i class="icon icon-home-tiposuceso"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div></div>');
				strBuilderNewsActivityDetailsContent.push('</div>');
				strBuilderNewsActivityDetailsContent.push('<a onclick="loadNewDetails(' + item.id + ',\'' + sucesoDetailFromSports + '\')" href="#" class="item-link item-content">');
				strBuilderNewsActivityDetailsContent.push('</div>');
				strBuilderNewsActivityDetailsContent.push('<div class="card-content news-content">');

				strBuilderNewsActivityDetailsContent.push('<div class="card-content-inner">');
				var urlImgNewsList = getDefaultImageNewsList();
				if (item.urlImgMin != "") {
					urlImgNewsList = item.urlImgMin;
				}
				strBuilderNewsActivityDetailsContent.push('<div class="row"><div class="col-70"><div class="">' + item.titulo + '</div></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="col-30"><div class="dateTitleNew color-gray">' + item.fecha.fecha + '</div></div></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="row"><div class="col-100"><div class="color-gray homeCardcontent">' + item.detalle + '</div></div></div>');

				strBuilderNewsActivityDetailsContent.push('</div></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a>');
				strBuilderNewsActivityDetailsContent.push('</div>');

				//}
			} else if (item.tipoObjeto == "torneo-encuentro") {

				console.log(item.id);


				// var encuentroFecha = 0;
				console.log(item.id);
				strBuilderNewsActivityDetailsContent.push('<div class="card tournament-matches"><a onclick="loadMatchDetails1(' + item.id + ',\'' + sucesoDetailFromSports + '\')" href="#">');
				strBuilderNewsActivityDetailsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
				strBuilderNewsActivityDetailsContent.push('<div class="tournament-matches-icon"><img data-src=' + item.torneo.deporte.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="tournament-matches-name">' + item.torneo.nombre + '</div>');
				strBuilderNewsActivityDetailsContent.push('<div class="tournament-matches-division">' + item.torneo.deporteCategoria.nombreCorto + '');
				if (item.vivo == "true") {
					strBuilderNewsActivityDetailsContent.push('<div class="tournament-matches-matchday-live animated infinite pulse">PARTIDO EN VIVO</div></div></div>');
				} else {
					strBuilderNewsActivityDetailsContent.push('<div class="tournament-matches-matchday">' + item.fechaEncuentro.fecha + '</div></div></div>');
				}
				strBuilderNewsActivityDetailsContent.push('<div class="card-content tournament-matches-content">');
				strBuilderNewsActivityDetailsContent.push('<div class="card-content-inner">');
				//var verMasFecha = false;

				//$.each( item.encuentros, function( n, match ){
				// encuentroFecha = encuentroFecha+1;
				console.log(encuentroFecha);
				//if (encuentroFecha < 3){
				strBuilderNewsActivityDetailsContent.push('<div class="row no-gutter row-tournament-matches">');
				strBuilderNewsActivityDetailsContent.push('<div class="col-25 team-lastmatch-left">' + item.local.nombre + '</div>');
				//if (match.local.imagenPrincipalMin != ""){
				//strBuilderNewsActivityDetailsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
				//} else {
				strBuilderNewsActivityDetailsContent.push('<div class="col-15" img-lastmatch><img data-src=' + item.local.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
				//}
				//if (match.local.tantos != "" || match.visit.tantos != ""){
				//strBuilderNewsActivityDetailsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
				//}
				//else {
				strBuilderNewsActivityDetailsContent.push('<div class="col-20 match-scorer-lastmatch">' + item.local.tantos + ' - ' + item.visitante.tantos + '</div>');
				//}
				strBuilderNewsActivityDetailsContent.push('<div class="col-15 img-lastmatch"><img data-src=' + item.visitante.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="col-25 team-lastmatch-right">' + item.visitante.nombre + '</div></div>');
				// }
				// });
				strBuilderNewsActivityDetailsContent.push('</div></div>');
				strBuilderNewsActivityDetailsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a></div>');


			} else if (item.tipoObjeto == "evento") {
				
				var strBuilderLastNewsContentEventArray = htmlEventCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderNewsActivityDetailsContent.push(strBuilderLastNewsContentEventArray.join(""));

			} else if (item.tipoObjeto == "torneo-tabla-posicion") {
				
				var strBuilderLastNewsContentTournamentArray = htmlTournamentTableCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderNewsActivityDetailsContent.push(strBuilderLastNewsContentTournamentArray.join(""));


			} else if (item.tipoObjeto == "torneo-fecha") {
				var strBuilderLastNewsContentTournamentMatchesArray = htmlTournamentMatchesCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
				strBuilderLastNewsContent.push(strBuilderLastNewsContentTournamentMatchesArray.join(""));
				
			}

			/*strBuilderNewsActivityDetailsContent.push('<div class="item-media">');
								var urlImgNewsList = getDefaultImageNewsList();
								if(item.urlImgMin != ""){
									urlImgNewsList = item.urlImgMin; 
								}
								strBuilderNewsActivityDetailsContent.push('<img class="lazy lazy-fadeIn imgCardNew" data-src="'+urlImgNewsList+'" alt="'+item.altImg+'" />');
								strBuilderNewsActivityDetailsContent.push('</div>');
								
								strBuilderNewsActivityDetailsContent.push('<div class="item-inner">');
								strBuilderNewsActivityDetailsContent.push('<div class="item-title-row">');
								strBuilderNewsActivityDetailsContent.push('<div class="item-title item-title-new">'+item.title+'</div>');
								strBuilderNewsActivityDetailsContent.push('</div>');
								strBuilderNewsActivityDetailsContent.push('<div class="item-subContent-news">');
									strBuilderNewsActivityDetailsContent.push('<span class="item-date">'+item.publishDate+'</span>');
									strBuilderNewsActivityDetailsContent.push('<span class="item-shortContent">'+item.shortContent+'</span>');
								strBuilderNewsActivityDetailsContent.push('</div>');
								strBuilderNewsActivityDetailsContent.push('</div>');
							strBuilderNewsActivityDetailsContent.push('</a>');
						strBuilderNewsActivityDetailsContent.push('</li></ul>');
					strBuilderNewsActivityDetailsContent.push('</div></div></div>');*/
			//}
		});
	}
	$('#contentTabActivityDetails2').append(strBuilderNewsActivityDetailsContent.join(""));
	$('.divNotLastestNews').text(divNotLastestNews);
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderScheduleActivityDetails(schedule) {
	var strBuilderScheduleContent = [];
	if (schedule == "") {
		strBuilderScheduleContent.push('');
	} else {
		strBuilderScheduleContent.push('<div class="card">');
		strBuilderScheduleContent.push('<div class="card-header">' + lblSchedule + '</div>');
		strBuilderScheduleContent.push('<div class="card-content">');
		strBuilderScheduleContent.push('<div class="card-content-inner">');
		strBuilderScheduleContent.push('<div class="list-block general-information">');
		strBuilderScheduleContent.push('<ul>');
		strBuilderScheduleContent.push('<li>');
		strBuilderScheduleContent.push('<div class="item-content">');
		strBuilderScheduleContent.push('<div class="item-media"><i class="icon icon-form-calendar"></i></div>');
		strBuilderScheduleContent.push('<div class="item-inner">');
		strBuilderScheduleContent.push('<div class="item-title label color-gray">');
		strBuilderScheduleContent.push(schedule);
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</li>');
		strBuilderScheduleContent.push('</ul>');
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</div>');
		strBuilderScheduleContent.push('</div>');
	}

	return (strBuilderScheduleContent.join(""));
}