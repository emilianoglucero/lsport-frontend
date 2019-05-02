var areSportDetailsLoaded = false;
var idLiveMatchSportDetails = null;
var sportDetails = [];
var bannerSportDetails = [];
var currentLastMatch = [];
var currentLastMatchVivo;
var currentTournaments = [];
var bannerTournaments = [];

var recentNewsListSporDetails = [];
var nextPageNumberSportDetails = 1;
var loadingInfiniteScrollSportDetails = false;
var currentPageNumberSportDetails, currentTotalPageSportDetails;
var builderSelectHeader = true;

var areAccessedServerNewsSportDetails = false;

var categoriesSportList = [];
var sportDetailsHome;

var positionTablesList = [];


myApp.onPageInit('sportdetails', function (page) {

	$('#subnavbarSportDetails1').text(lblTabInformation);
	$('#subnavbarSportDetails2').text(lblTabNews);
	$('#subnavbarSportDetails3').text(lblTabTournaments);
	$('.headerListEndNews').text(headerListEndNews);
	$('.contentListEndNews').text(contentListEndNews);
	$$('#tabSportDetails1').on('show', function () {
		if (areContentTabInformationSportDetailsBuilder == false) {
			builderInformationSportDetails();
			areContentTabInformationSportDetailsBuilder = true;
		}
	});
	$$('#tabSportDetails2').on('show', function () {
		if (areContentTabNewsSportDetailsBuilder == false) {
			builderNewsSportDetails();
			areContentTabNewsSportDetailsBuilder = true;
		}
		myApp.initImagesLazyLoad(mainView.activePage.container);
	});
	$$('#tabSportDetails3').on('show', function () {
		if (areContentTabTournamentsSportDetailsBuilder == false) {
			builderTournamentsSportDetails();
		}
	});
});

myApp.onPageBeforeAnimation('sportdetails', function (page) {
	myApp.params.swipePanel = false;

	if (page.fromPage.name != 'newdetails') {
		$$('#page-sportdetails .page-content').scrollTop(0);
	}
	$('#noConnection-content-block-sportdetails').hide();
	myApp.initImagesLazyLoad(mainView.activePage.container);
	trackPageGA("Detalle Deporte");
});

myApp.onPageBack('sportdetails', function (page) {
	idLiveMatchSportDetails = null;
});

function loadSportDetails(idCategorySelectedFromLoad) {
	//idSportSelected = idSport;
	//idCategorySelected = idCat;
	console.log(idCategorySelectedFromLoad);
	idCategorySelected = idCategorySelectedFromLoad;
	showLoadSpinnerWS();
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	$('#noConnection-content-block-sportdetails').hide();
	builderSelectHeader = true;
	areSportDetailsLoaded = false;
	areContentTabInformationSportDetailsBuilder = false;
	areContentTabNewsSportDetailsBuilder = false;
	areContentTabTournamentsSportDetailsBuilder = false;
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getDeporteCategoriaDetalle',
		dataType: 'json',
		data: {
			'deporteCategoriaId': idCategorySelected,
			'sucesosItemsPorPagina': 20
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
			sportDetails = response.deporteCategoria;
			//bannerSportDetails = response.banner;
			recentNewsListSporDetails = response.sucesosPanel.sucesos;
			currentLastMatch = response.encuentroCercano;
			console.log(currentLastMatch)
			currentTournaments = response.torneosPanel;
			console.log(currentTournaments);
			//bannerTournaments = response.banner;
			categoriesSportList = response.categoriasHermanas;

			currentPageNumberSportDetails = parseInt(response.sucesosPanel.paginaActual);
			currentTotalPageSportDetails = parseInt(response.sucesosPanel.paginasTotal);
			nextPageNumberSportDetails = parseInt(response.sucesosPanel.paginaActual) + 1;

			//vacio los acumuladores por si venian con info de la pantalla de deportes
			tournamentNewsList = [];
			tournamentEventList = [];
			tournamentPositionList = [];
			tournamentMatchList = [];
			tournamentEncuentroList = [];

			var tournamentSucesosLenght = recentNewsListSporDetails.length - 1;
			console.log(tournamentSucesosLenght);
			//clasifico y almaceno los sucesos, para no tener inconvenientes con ids duplicados
			for (i = 0; i <= tournamentSucesosLenght; i++) {
				console.log(recentNewsListSporDetails[i]);
				console.log(recentNewsListSporDetails[i].id);
				console.log(recentNewsListSporDetails[i].tipoObjeto);
				//allSucesosPageList.push(newsListHome[i]);
				if (recentNewsListSporDetails[i].tipoObjeto === 'evento') {
					console.log('agrego evento');
					tournamentEventList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'noticia') {
					console.log('agrego noticia');
					tournamentNewsList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-tabla-posicion') {
					console.log('agrego tabla de pos');
					tournamentPositionList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-fecha') {
					console.log('agrego torneo fecha');
					tournamentMatchList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-encuentro') {
					console.log('agrego encuentro');
					tournamentEncuentroList.push(recentNewsListSporDetails[i]);
				}


			}

			areSportDetailsLoaded = true;
			builderSportDetails1();
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



	/*$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getDeporteCategoriaDetalle',
		dataType: 'jsonp',
		data: {
				'deporteCategoriaId': idCategorySelected
		 },
		timeout: timeOut,
		success: function(response){
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
	/*sportDetails = response.categorySport;
			bannerSportDetails = response.banner;
			recentNewsListSporDetails = response.news;
			currentLastMatch = response.lastMatch;
			currentTournaments = response.tournaments;
			bannerTournaments = response.banner;
			
			currentPageNumberSportDetails = parseInt(response.pageNumber);
			currentTotalPageSportDetails = parseInt(response.totalPage);
			nextPageNumberSportDetails = parseInt(response.pageNumber) + 1;
			
			areSportDetailsLoaded = true;
			builderSportDetails();
			hideLoadSpinnerWS();
		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
	   },
              beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
		});*/
}

function loadSportDetails1(idSport, idEnac, idCat) {
	/*idSportSelected = idSport;
	idCategorySelected = idCat;
	idEnacSelected = idEnac;

	console.log(idSportSelected);
	console.log(idCategorySelected);
	console.log(sportsList);
	showLoadSpinnerWS();
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	$('#noConnection-content-block-sportdetails').hide();
	builderSelectHeader = true;
	areSportDetailsLoaded = false;
	areContentTabInformationSportDetailsBuilder = false;
	areContentTabNewsSportDetailsBuilder = false;
	areContentTabTournamentsSportDetailsBuilder = false;

            sportDetailsHome = sportsList.filter(function( obj ) {
              return obj.id == idSportSelected;
            });
            sportDetailsHome = sportDetailsHome[0];
            console.log(sportDetailsHome);


            var enacDetailsHome = sportDetailsHome.enac.filter(function( obj ) {
              return obj.id == idEnacSelected;
            });
            enacDetailsHome = enacDetailsHome[0];
            console.log(enacDetailsHome);

            categoriesSportList = enacDetailsHome.categorias;

            var categorieDetailsHome = enacDetailsHome.categorias.filter(function( obj ) {
              return obj.id == idCategorySelected;
            });
            categorieDetailsHome = categorieDetailsHome[0];
            console.log(categorieDetailsHome);

			/*sportDetails = response.categorySport;
			bannerSportDetails = response.banner;
			recentNewsListSporDetails = response.news;
			currentLastMatch = response.lastMatch;
			currentTournaments = response.tournaments;
			bannerTournaments = response.banner;*/

	/*currentPageNumberSportDetails = parseInt(response.pageNumber);
	currentTotalPageSportDetails = parseInt(response.totalPage);
	nextPageNumberSportDetails = parseInt(response.pageNumber) + 1;
	console.lgog(nextPageNumberSportDetails);

	areSportDetailsLoaded = true;
	builderSportDetails();
	hideLoadSpinnerWS();*/

}

function loadSportDetailsFromSelect(idCat) {
	console.log(idCat);
	showLoadSpinnerWS();
	//idSportSelected = idSport;
	idCategorySelected = parseInt(idCat);
	console.log(idCategorySelected);
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	$('#noConnection-content-block-sportdetails').hide();
	builderSelectHeader = false;
	areSportDetailsLoaded = false;
	areContentTabInformationSportDetailsBuilder = false;
	areContentTabNewsSportDetailsBuilder = false;
	areContentTabTournamentsSportDetailsBuilder = false;
	console.log('loadfromdetails');
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getDeporteCategoriaDetalle',
		dataType: 'json',
		data: {
			'deporteCategoriaId': idCategorySelected,
			'sucesosItemsPorPagina': 20
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
			$('.lblHeaderTournaments').text(response.deporteCategoria.nombreCorto);
			sportDetails = response.deporteCategoria;
			//bannerSportDetails = response.banner;
			recentNewsListSporDetails = response.sucesosPanel.sucesos;
			currentPageNumberSportDetails = response.sucesosPanel.paginaActual;
			nextPageNumberSportDetails = parseInt(response.sucesosPanel.paginaActual) + 1;
			currentTotalPageSportDetails = response.sucesosPanel.paginasTotal;
			currentLastMatch = response.encuentroCercano;
			if (currentLastMatch == null) {
				currentLastMatchVivo = false;
			} else {
				currentLastMatchVivo = currentLastMatch.vivo;
			}
			currentTournaments = response.torneosPanel;
			//bannerTournaments = response.banner;

			var tournamentSucesosLenght = recentNewsListSporDetails.length - 1;
			console.log(tournamentSucesosLenght);
			//clasifico y almaceno los sucesos, para no tener inconvenientes con ids duplicados
			for (i = 0; i <= tournamentSucesosLenght; i++) {
				console.log(recentNewsListSporDetails[i]);
				console.log(recentNewsListSporDetails[i].id);
				console.log(recentNewsListSporDetails[i].tipoObjeto);
				//allSucesosPageList.push(newsListHome[i]);
				if (recentNewsListSporDetails[i].tipoObjeto === 'evento') {
					console.log('agrego evento');
					tournamentEventList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'noticia') {
					console.log('agrego noticia');
					tournamentNewsList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-tabla-posicion') {
					console.log('agrego tabla de pos');
					tournamentPositionList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-fecha') {
					console.log('agrego torneo fecha');
					tournamentMatchList.push(recentNewsListSporDetails[i]);
				}
				if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-encuentro') {
					console.log('agrego encuentro ');
					tournamentEncuentroList.push(recentNewsListSporDetails[i]);
				}



			}

			areSportDetailsLoaded = true;
			builderSportDetails1();
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

var tabsSportDetails = [];

var contentTabInformationSportDetails = [];
var areContentTabInformationSportDetailsBuilder = false;
var areContentTabNewsSportDetailsBuilder = false;
var areContentTabTournamentsSportDetailsBuilder = false;

var idSportSelected;
var idCategorySelected;

/*function builderSportDetails(){
	if(areSportDetailsLoaded == true){
		if (sportDetails == ""){
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		}
		else{
			if(builderSelectHeader == true){
				/*## INIT Build Header SportDetails##*/
/*var categoriesSportList = sportDetails.categories;
				
$('#selectSportDetails').empty();
$('#selectSportDetails').attr("onchange","loadSportDetailsFromSelect("+idSportSelected+",this.value)");
$.each(categoriesSportList , function( key, item ) {
	if(item.idCategory == idCategorySelected){
		$('#selectSportDetails').append('<option selected value="'+item.idCategory+'">'+item.shortCategoryName+'</option>');
		$('.lblHeaderTournaments').text(item.shortCategoryName);
	} else {
		$('#selectSportDetails').append('<option value="'+item.idCategory+'">'+item.shortCategoryName+'</option>');
	}
	
});
				
$('.icon-sportDetails').css('background-image','url("'+sportDetails.urlImgHeader+'")');
/*## END Build Header SportDetails##*/
/*}
			$$('#contentTabSportDetails2').scrollTop(0);
			$('#tabSportDetails1').html("");
			$('#contentTabSportDetails2').html("");
			$('#tabSportDetails3').html("");
			
			if(currentPageNumberSportDetails < currentTotalPageSportDetails){
				myApp.attachInfiniteScroll('.infinite-scroll-sportdetails');
				$$('.infinite-scroll-sportdetails').on('infinite', function () {
					
					if (loadingInfiniteScrollSportDetails){
						return;
					}
					loadingInfiniteScrollSportDetails = true;
					
					if (areAccessedServerNewsSportDetails == false){
						loadNewsSportDetails(idSportSelected,idCategorySelected);
					} else {
						$('#noConnection-content-block-sportdetails').show();
					}
				});
			}
			else{
				myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
			}
			
			if(currentLastMatch.liveMatch == true){
				areContentTabTournamentsSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails3");
				builderTournamentsSportDetails();
			}else if(recentNewsListSporDetails != "")
			{
				areContentTabNewsSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails2");
				builderNewsSportDetails();
			} 
			else{
				areContentTabInformationSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails1");
				builderInformationSportDetails();
			}
			
			mainView.router.load({pageName: 'sportdetails'});
		}
		} else {
	}
}*/

function builderSportDetails1() {
	//console.log(categoriesSportList);
	if (areSportDetailsLoaded == true) {
		console.log('aresportdetalsloaded');
		if (sportDetails == "") {
			console.log('error');
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		} else {
			console.log('elsenoerror');
			if (builderSelectHeader == true) {
				/*## INIT Build Header SportDetails##*/
				//console.log(sportDetails);
				//categoriesSportList = sportDetails.categoriasHermanas;

				$('#selectSportDetails').empty();
				$('#selectSportDetails').attr("onchange", "loadSportDetailsFromSelect(this.value)");
				console.log(categoriesSportList);
				$.each(categoriesSportList, function (key, item) {
					console.log(item);
					console.log(idCategorySelected);
					console.log(item.idCategory);
					if (item.id == idCategorySelected) {
						$('#selectSportDetails').append('<option selected value="' + item.id + '">' + item.nombreCorto + '</option>');
						$('.lblHeaderTournaments').text(item.nombreCorto);
					} else {
						$('#selectSportDetails').append('<option value="' + item.id + '">' + item.nombreCorto + '</option>');
					}

				});

				$('.icon-sportDetails').css('background-image', 'url("' + sportDetails.deporte.imagenPrincipalMin + '")');
				/*## END Build Header SportDetails##*/
			}
			$$('#contentTabSportDetails2').scrollTop(0);
			$('#tabSportDetails1').html("");
			$('#contentTabSportDetails2').html("");
			$('#tabSportDetails3').html("");

			console.log(currentPageNumberSportDetails);
			console.log(currentTotalPageSportDetails);
			if (currentPageNumberSportDetails < currentTotalPageSportDetails) {
				myApp.attachInfiniteScroll('.infinite-scroll-sportdetails');
				$$('.infinite-scroll-sportdetails').on('infinite', function () {
					console.log('infinitesc');
					console.log(loadingInfiniteScrollSportDetails);

					if (loadingInfiniteScrollSportDetails) {
						console.log('loadinginfinite');
						return;
					}
					loadingInfiniteScrollSportDetails = true;

					if (areAccessedServerNewsSportDetails == false) {
						console.log('arreacced');
						loadNewsSportDetails(idCategorySelected);
					} else {
						console.log('elseareacced');
						$('#noConnection-content-block-sportdetails').show();
					}
				});
			} else {
				myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
			}

			if (currentLastMatchVivo == true) {
				areContentTabTournamentsSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails3");
				builderTournamentsSportDetails();
			} else if (recentNewsListSporDetails != "") {
				areContentTabNewsSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails2");
				builderNewsSportDetails();
			} else {
				areContentTabInformationSportDetailsBuilder = true;
				myApp.showTab("#tabSportDetails1");
				builderInformationSportDetails();
			}

			mainView.router.load({
				pageName: 'sportdetails'
			});
		}
	} else {}
}

function builderInformationSportDetails() {
	console.log(sportDetails);
	var strBuildetTabSportDetails1 = [];
	strBuildetTabSportDetails1.push(builderCoordinatorsSport(sportDetails.coordinadores));

	strBuildetTabSportDetails1.push(builderGeneralInformationSport(sportDetails.horarioTexto, sportDetails.lugar, sportDetails.correoContacto));
	strBuildetTabSportDetails1.push(builderPriceDetails(sportDetails.precio));

	$('#tabSportDetails1').html(strBuildetTabSportDetails1.join(""));

	$('#spnDescriptionSportDetails').text(lblDescription);
	$('#spnScheduleSportDetails').text(lblSchedule);


	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorConnectionSportDetails() {
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	areContentTabTournamentsSportDetailsBuilder = true;
	areContentTabNewsSportDetailsBuilder = true;
	areContentTabInformationSportDetailsBuilder = true;

	var strBuildetTabSportDetails1 = [];
	strBuildetTabSportDetails1.push('<div onclick="loadSportDetailsFromSelect(' + idSportSelected + ',' + idCategorySelected + ')" class="content-block content-block-information">');
	strBuildetTabSportDetails1.push('<div class="divConnectionErrorHeader">' + divErrorConnectionHeader + '</div>');

	strBuildetTabSportDetails1.push('<div class="divConnectionErrorText">' + divErrorConnectionText + '</div>');

	strBuildetTabSportDetails1.push('<div class="link divImgConnectionError">');
	strBuildetTabSportDetails1.push('<img class="imgUploadConnectionError" src="img/template/icon-upload.png" />');
	strBuildetTabSportDetails1.push('</div>');
	strBuildetTabSportDetails1.push('</div>');

	$('#tabSportDetails1').html(strBuildetTabSportDetails1.join(""));
	$('#contentTabSportDetails2').html(strBuildetTabSportDetails1.join(""));
	$('#tabSportDetails3').html(strBuildetTabSportDetails1.join(""));

	mainView.router.load({
		pageName: 'sportdetails'
	});
	myApp.initImagesLazyLoad(mainView.activePage.container);

	myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
}

function loadNewsSportDetails(idCat) {
	console.log(idCat);
	showLoadSpinnerWS();
	console.log(nextPageNumberSportDetails);
	/*$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getSucesosPorDeporteCategoria',
			dataType: 'jsonp',
			data: { 'deporteCategoriaId': idCat,
					'paginaActual': nextPageNumberSportDetails
				 },
			timeout: timeOut,
			success: function(response){
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

	/*nextPageNumberSportDetails = parseInt(response.paginaActual) + 1;
				
				if( response.paginaActual == 1 ){
				console.log('pagina 1');
					$('#contentTabSportDetails2').html("");
					recentNewsListSporDetails = [];
					recentNewsListSporDetails = response.sucesos;
					builderNewsSportDetails();
					hideLoadSpinnerWS();
				} else {
				console.log('pagina 1787887');
					recentNewsListSporDetails = [];
					recentNewsListSporDetails = response.sucesos;
					builderNewsSportDetails();
					hideLoadSpinnerWS();
				}
				console.log(response.sucesosPanel.paginasTotal);
				console.log(nextPageNumberSportDetails);
				if( response.paginasTotal < nextPageNumberSportDetails ){
				console.log('detach');
					myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
				}
				
				loadingInfiniteScrollSportDetails = false;
				areAccessedServerNewsSportDetails = false;
				$('#noConnection-content-block-sportdetails').hide();
				
			},
			error: function (data, status, error){
			console.log(error);
			console.log(status);
			console.log(data);
		          if( nextPageNumberSportDetails == 1 ){
		          	builderErrorNewsSportDetails();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	loadingInfiniteScrollSportDetails = false;
		          	areAccessedServerNewsSportDetails = true;
		          }
		   },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
    });*/


	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getSucesosPorDeporteCategoria',
		dataType: 'json',
		data: {
			'deporteCategoriaId': idCategorySelected,
			'paginaActual': nextPageNumberSportDetails
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

			nextPageNumberSportDetails = parseInt(response.paginaActual) + 1;

			if (response.paginaActual == 1) {
				console.log('pagina 1');
				$('#contentTabSportDetails2').html("");
				//recentNewsListSporDetails = [];
				recentNewsListSporDetails = response.sucesos;
				var tournamentSucesosLenght = recentNewsListSporDetails.length - 1;
				console.log(tournamentSucesosLenght);
				//clasifico y almaceno los sucesos, para no tener inconvenientes con ids duplicados
				for (i = 0; i <= tournamentSucesosLenght; i++) {
					console.log(allSucesosPageList[i]);
					console.log(allSucesosPageList[i].id);
					console.log(allSucesosPageList[i].tipoObjeto);
					//allSucesosPageList.push(newsListHome[i]);
					if (recentNewsListSporDetails[i].tipoObjeto === 'evento') {
						console.log('agrego evento');
						tournamentEventList.push(allSucesosPageList[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'noticia') {
						console.log('agrego noticia');
						tournamentNewsList.push(allSucesosPageList[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-tabla-posicion') {
						console.log('agrego tabla de pos');
						tournamentPositionList.push(allSucesosPageList[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-fecha') {
						console.log('agrego torneo fecha');

						tournamentMatchList.push(allSucesosPageList[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-encuentro') {
						console.log('agrego encuentro');
						tournamentEncuentroList.push(allSucesosPageList[i]);
					}


				}
				builderNewsSportDetails();
				hideLoadSpinnerWS();
			} else {
				console.log('pagina 1787887');
				//console.log(recentNewsListSporDetails);
				//console.log(response.sucesos);
				//recentNewsListSporDetails = [];
				recentNewsListSporDetails.push(response.sucesos);
				var tournamentSucesosLenght = recentNewsListSporDetails.length - 1;
				//clasifico y almaceno los sucesos, para no tener inconvenientes con ids duplicados
				for (i = 0; i <= tournamentSucesosLenght; i++) {
					console.log(recentNewsListSporDetails[i]);
					console.log(recentNewsListSporDetails[i].id);
					console.log(recentNewsListSporDetails[i].tipoObjeto);
					//allSucesosPageList.push(newsListHome[i]);
					if (recentNewsListSporDetails[i].tipoObjeto === 'evento') {
						console.log('agrego evento');
						tournamentEventList.push(recentNewsListSporDetails[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'noticia') {
						console.log('agrego noticia');
						tournamentNewsList.push(recentNewsListSporDetails[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-tabla-posicion') {
						console.log('agrego evento');
						tournamentPositionList.push(recentNewsListSporDetails[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-fecha') {
						console.log('agrego torneo fecha');
						tournamentMatchList.push(recentNewsListSporDetails[i]);
					}
					if (recentNewsListSporDetails[i].tipoObjeto === 'torneo-encuentro') {
						console.log('agrego encuentro ');
						tournamentEncuentroList.push(recentNewsListSporDetails[i]);
					}
				}

				//recentNewsListSporDetails = [];
				//recentNewsListSporDetails = response.sucesos;
				builderNewsSportDetails();
				hideLoadSpinnerWS();
			}
			console.log(response.paginasTotal);
			console.log(nextPageNumberSportDetails);
			if (response.paginasTotal < nextPageNumberSportDetails) {
				console.log('detach');
				myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
			}

			loadingInfiniteScrollSportDetails = false;
			areAccessedServerNewsSportDetails = false;
			$('#noConnection-content-block-sportdetails').hide();

		},
		error: function (data, status, error) {
			console.log(error);
			console.log(status);
			console.log(data);
			if (nextPageNumberSportDetails == 1) {
				builderErrorNewsSportDetails();
				hideLoadSpinnerWS();
			} else {
				hideLoadSpinnerWS();
				showMessageToast(messageCanNotRefresh);
				loadingInfiniteScrollSportDetails = false;
				areAccessedServerNewsSportDetails = true;
			}
		},
		beforeSend: function (xhr, settings) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		} //set tokenString before send
	});
}

function reloadNewsSportDetails() {
	if (existInternetConnection() == true) {
		loadNewsSportDetails(idSportSelected, idCategorySelected);
	} else {
		showMessageToast(messageCanNotRefresh);
	}
}

function builderNewsSportDetails() {
	console.log(recentNewsListSporDetails);
	var strBuilderNewsSportDetailsContent = [];
	if (recentNewsListSporDetails.length == 0) {
		strBuilderNewsSportDetailsContent.push('<div class="content-block">');
		strBuilderNewsSportDetailsContent.push('<div class="divNotLastestNews">' + divNotLastestNews + '</div>');
		strBuilderNewsSportDetailsContent.push('</div>');
	} else {
		$.each(recentNewsListSporDetails, function (i, item) {

			//if(item.type == "banner"){
			/*strBuilderNewsSportDetailsContent.push('<div class="item-list-banner">'); ERASE
				strBuilderNewsSportDetailsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
			strBuilderNewsSportDetailsContent.push('</div>');*/
			//} else{
			/*strBuilderNewsSportDetailsContent.push('<div class="card card-news"><div class="card-content"><div class="list-block list-block-about media-list">');
				strBuilderNewsSportDetailsContent.push('<ul><li class="item-content">');
					strBuilderNewsSportDetailsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
					
						strBuilderNewsSportDetailsContent.push('<div class="item-media">');
						var urlImgNewsList = getDefaultImageNewsList();
						if(item.imagenPrincipalMin != ""){
							urlImgNewsList = item.imagenPrincipalMin;
						}
						strBuilderNewsSportDetailsContent.push('<img class="lazy lazy-fadeIn imgCardNew" data-src="'+urlImgNewsList+'" alt="'+item.titulo+'" />');
						strBuilderNewsSportDetailsContent.push('</div>');
						
						strBuilderNewsSportDetailsContent.push('<div class="item-inner">');
						strBuilderNewsSportDetailsContent.push('<div class="item-title-row">');
						strBuilderNewsSportDetailsContent.push('<div class="item-title item-title-new">'+item.titulo+'</div>');
						strBuilderNewsSportDetailsContent.push('</div>');
						strBuilderNewsSportDetailsContent.push('<div class="item-subContent-news">');
							strBuilderNewsSportDetailsContent.push('<span class="item-date">'+item.fecha.fecha+'</span>');
							strBuilderNewsSportDetailsContent.push('<span class="item-shortContent">'+item.bajada+'</span>');
						strBuilderNewsSportDetailsContent.push('</div>');
						strBuilderNewsSportDetailsContent.push('</div>');
						
					strBuilderNewsSportDetailsContent.push('</a>');
				strBuilderNewsSportDetailsContent.push('</li></ul>');
			strBuilderNewsSportDetailsContent.push('</div></div></div>');*/
			//}



			if (item.tipoObjeto == "noticia") {
				var noticiaTruncada = truncateNoticia(item.detalleTxt);

				strBuilderNewsSportDetailsContent.push('<div class="card demo-card-header-pic">');
				strBuilderNewsSportDetailsContent.push('<div style="height: 250px;overflow: hidden;position: relative;">');
				strBuilderNewsSportDetailsContent.push('<img style="width: 100%;top: 50%;position: absolute;left: 50%;transform: translate(-50%, -50%);" src="' + item.imagenPrincipal + '" />');
				strBuilderNewsSportDetailsContent.push('</div>');
				strBuilderNewsSportDetailsContent.push('<div class="card-header color-white no-border">');
				strBuilderNewsSportDetailsContent.push('<a onclick="loadNewDetails(' + item.id + ',\'' + sucesoDetailFromSports + '\')" href="#" class="item-link item-content">');
				// **************** ChipHomeContainer ****************** //

				strBuilderNewsSportDetailsContent.push('<div class="chipHomeContainer">');
				//strBuilderNewsSportDetailsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
				//strBuilderNewsSportDetailsContent.push('<div class="chip chipHomeDate"><div class="media"><i class="icon icon-date-home"></i></div><div class="chip-label chipHomeDateLabel">'+formatDateSucesos(item.fecha.fecha)+'</div></div>');
				if (item.tags.publicador != "") {
					strBuilderNewsSportDetailsContent.push('<div class="chip chipHomeCategory"><div class="media"><i style="background-image: url(' + item.datosPublicacion.ente.imagenPrincipalMin + ');" class="icon icon-chiptag-categoria"></i></div><div class="chip-label chipHomeCategoryLabel">' + item.datosPublicacion.ente.nombre + '</div></div>');
				}
				//strBuilderNewsSportDetailsContent.push('<div class="chip chipHomeTags"><div class="media"><i class="icon icon-home-tiposuceso"></i></div><div class="chip-label chipHomeCategoryLabel">'+item.tags.categoria+'</div></div>');

				// ***************** ChipHomeTags ******************** //

				strBuilderNewsSportDetailsContent.push('<div class="chip chipHomeTags" style="float: left;margin-left: 15px;">');
					strBuilderNewsSportDetailsContent.push('<div class="media">');
						strBuilderNewsSportDetailsContent.push('<i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i>');
					strBuilderNewsSportDetailsContent.push('</div>');
					strBuilderNewsSportDetailsContent.push('<div class="chip-label chipHomeCategoryLabel">' + item.tags.categoria + '</div>');
				strBuilderNewsSportDetailsContent.push('</div>');

				//strBuilderNewsSportDetailsContent.push('<i style="background-image: url(' + item.tags.icono + ');" class="icon icon-chiptag-categoria"></i>');

				strBuilderNewsSportDetailsContent.push('</div>');
				strBuilderNewsSportDetailsContent.push('</div>');
				strBuilderNewsSportDetailsContent.push('<div class="card-content news-content">');

				strBuilderNewsSportDetailsContent.push('<div class="card-content-inner">');
				var urlImgNewsList = getDefaultImageNewsList();
				if (item.urlImgMin != "") {
					urlImgNewsList = item.urlImgMin;
				}
				strBuilderNewsSportDetailsContent.push('<div class="row"><div class="col-70"><div class="" style="font-weight: 700">' + item.titulo + '</div></div>');
				strBuilderNewsSportDetailsContent.push('<div class="col-30"><div class="dateTitleNew color-gray">15/09/2018</div></div></div>');
				strBuilderNewsSportDetailsContent.push('<div class="row"><div class="col-100"><div class="color-gray homeCardcontent">' + noticiaTruncada + '</div></div></div>');

				strBuilderNewsSportDetailsContent.push('</div></div>');
				strBuilderNewsSportDetailsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a>');
				strBuilderNewsSportDetailsContent.push('</div>');

				//}
			} else if (item.tipoObjeto == "torneo-encuentro") {

			console.log(item.id);


			// var encuentroFecha = 0;
			console.log(item.id);
			strBuilderNewsSportDetailsContent.push('<div class="card tournament-matches"><a onclick="loadMatchDetails1(' + item.id + ',\'' + sucesoDetailFromSports + '\')" href="#">');
			strBuilderNewsSportDetailsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
			strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-icon"><img data-src=' + item.torneo.deporte.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
			strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-name">' + item.torneo.nombre + '<div style="font-size: 12px;color: #919191;font-family: Montserrat-Light;">' + item.torneo.deporteCategoria.nombreCorto + '</div></div>');
			strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-division">');
			if (item.vivo == "true") {
				strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-matchday-live animated infinite pulse">PARTIDO EN VIVO</div></div></div>');
			} else {
				strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-matchday">' + item.fechaEncuentro.fecha + '</div></div></div>');
			}
			strBuilderNewsSportDetailsContent.push('<div class="card-content tournament-matches-content">');
			strBuilderNewsSportDetailsContent.push('<div class="card-content-inner">');
			//var verMasFecha = false;

			//$.each( item.encuentros, function( n, match ){
			// encuentroFecha = encuentroFecha+1;
			//console.log(encuentroFecha);
			//if (encuentroFecha < 3){
			strBuilderNewsSportDetailsContent.push('<div class="row no-gutter row-tournament-matches">');
			strBuilderNewsSportDetailsContent.push('<div class="col-25 team-lastmatch-left">' + item.local.nombreCorto + '</div>');
			//if (match.local.imagenPrincipalMin != ""){
			//strBuilderNewsSportDetailsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
			//} else {
			strBuilderNewsSportDetailsContent.push('<div class="col-15" img-lastmatch><img data-src=' + item.local.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
			//}
			//if (match.local.tantos != "" || match.visit.tantos != ""){
			//strBuilderNewsSportDetailsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
			//}
			//else {
			strBuilderNewsSportDetailsContent.push('<div class="col-20 match-scorer-lastmatch" style="text-align: center;">' + item.local.tantos + ' - ' + item.visitante.tantos + '</div>');
			//}
			strBuilderNewsSportDetailsContent.push('<div class="col-15 img-lastmatch"><img data-src=' + item.visitante.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
			strBuilderNewsSportDetailsContent.push('<div class="col-25 team-lastmatch-right">' + item.visitante.nombreCorto + '</div></div>');
			// }
			// });
			strBuilderNewsSportDetailsContent.push('</div></div>');
			strBuilderNewsSportDetailsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a></div>');


		/*} else if (item.tipoObjeto == "torneo-encuentro") {

				console.log(item.id);


				// var encuentroFecha = 0;
				console.log(item.id);
				strBuilderNewsSportDetailsContent.push('<div class="card tournament-matches"><a onclick="loadMatchDetails1(' + item.id + ',\'' + sucesoDetailFromSports + '\')" href="#">');
				strBuilderNewsSportDetailsContent.push('<div id="tournament-matches-header" class="card-header no-border">');
				strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-icon"><img data-src=' + item.torneo.deporte.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-tournament" ></div>');
				strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-name">' + item.torneo.nombre + '<div style="font-size: 12px;color: #919191;font-family: Montserrat-Light;">' + item.torneo.deporteCategoria.nombreCorto + '</div></div>');
				strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-division">');
				if (item.vivo == "true") {
					strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-matchday-live animated infinite pulse">PARTIDO EN VIVO</div></div></div>');
				} else {
					strBuilderNewsSportDetailsContent.push('<div class="tournament-matches-matchday">' + item.fechaEncuentro.fecha + '</div></div></div>');
				}
				strBuilderNewsSportDetailsContent.push('<div class="card-content tournament-matches-content">');
				strBuilderNewsSportDetailsContent.push('<div class="card-content-inner">');
				//var verMasFecha = false;

				//$.each( item.encuentros, function( n, match ){
				// encuentroFecha = encuentroFecha+1;
				console.log(encuentroFecha);
				//if (encuentroFecha < 3){
				strBuilderNewsSportDetailsContent.push('<div class="row no-gutter row-tournament-matches">');
				strBuilderNewsSportDetailsContent.push('<div class="col-25 team-lastmatch-left">' + item.local.nombreCorto + '</div>');
				//if (match.local.imagenPrincipalMin != ""){
				//strBuilderNewsSportDetailsContent.push('<div class="col-10"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-team"></div>');
				//} else {
				strBuilderNewsSportDetailsContent.push('<div class="col-15" img-lastmatch><img data-src=' + item.local.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
				//}
				//if (match.local.tantos != "" || match.visit.tantos != ""){
				//strBuilderNewsSportDetailsContent.push('<div class="col-20 match-scorer">'+match.local.tantos+' - '+match.visitante.tantos+'</div>');
				//}
				//else {
				strBuilderNewsSportDetailsContent.push('<div class="col-20 match-scorer-lastmatch" style="text-align: center;">' + item.local.tantos + ' - ' + item.visitante.tantos + '</div>');
				//}
				strBuilderNewsSportDetailsContent.push('<div class="col-15 img-lastmatch"><img data-src=' + item.visitante.imagenPrincipalMin + ' class="lazy lazy-fadeIn img-shield-lastmatch"></div>');
				strBuilderNewsSportDetailsContent.push('<div class="col-25 team-lastmatch-right">' + item.visitante.nombreCorto + '</div></div>');
				// }
				// });
				strBuilderNewsSportDetailsContent.push('</div></div>');
				strBuilderNewsSportDetailsContent.push('<div class="card-footer tournament-matches-footer">Ver más...</div></a></div>');
*/

			} else if (item.tipoObjeto == "evento") {

				var strBuilderLastNewsContentEventArray = htmlEventCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderNewsSportDetailsContent.push(strBuilderLastNewsContentEventArray.join(""));

			} else if (item.tipoObjeto == "torneo-tabla-posicion") {

				var strBuilderLastNewsContentTournamentArray = htmlTournamentTableCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderNewsSportDetailsContent.push(strBuilderLastNewsContentTournamentArray.join(""));

			} else if (item.tipoObjeto == "torneo-fecha") {
				
				var strBuilderLastNewsContentTournamentMatchesArray = htmlTournamentMatchesCard(item);
                //strBuilderLastNewsContent.append(strBuilderLastNewsContentTournamentArray.join(""));
                strBuilderNewsSportDetailsContent.push(strBuilderLastNewsContentTournamentMatchesArray.join(""));
			}





		});
	}
	$('#contentTabSportDetails2').append(strBuilderNewsSportDetailsContent.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorNewsSportDetails() {
	$('#contentTabSportDetails2').html("");
	var srBuilderNewsSportDetailsContent = [];
	srBuilderNewsSportDetailsContent.push('<div onclick="loadNewsSportDetails(' + idSportSelected + ',' + idCategorySelected + ')" class="content-block content-block-information">');
	srBuilderNewsSportDetailsContent.push('<div class="divConnectionErrorHeader"></div>');
	srBuilderNewsSportDetailsContent.push('<div class="divConnectionErrorText"></div>');
	srBuilderNewsSportDetailsContent.push('<div class="link divImgConnectionError">');
	srBuilderNewsSportDetailsContent.push('<img class="imgUploadConnectionError" src="img/template/icon-upload.png" />');
	srBuilderNewsSportDetailsContent.push('</div>');
	srBuilderNewsSportDetailsContent.push('</div>');
	$('#contentTabSportDetails2').append(srBuilderNewsSportDetailsContent.join(""));
	$('.divConnectionErrorHeader').text(divErrorConnectionHeader);
	$('.divConnectionErrorText').text(divErrorConnectionText);

}

function builderCoordinatorsSport(coordSportItem) {
	var strBuilderCoordinatorsContent = [];
	if (coordSportItem.length == 0) {
		strBuilderCoordinatorsContent.push('');
	} else {
		strBuilderCoordinatorsContent.push('<div id="divCoordinatorsSport">' + divCoordinatorsSport + '</div>');
		strBuilderCoordinatorsContent.push('<div class="card">');
		strBuilderCoordinatorsContent.push('<div class="card-content">');
		strBuilderCoordinatorsContent.push('<div class="list-block media-list">');
		strBuilderCoordinatorsContent.push('<ul>');
		$.each(coordSportItem, function (i, coord) {
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
		strBuilderCoordinatorsContent.push('</div>');
	}
	return (strBuilderCoordinatorsContent.join(""));
}

function builderPriceDetails(price) {
	var strBuilderPriceContent = [];
	if (price == "") {
		strBuilderPriceContent.push('');
	} else {
		strBuilderPriceContent.push('<div class="custom-sportdetails-price-card">');
		strBuilderPriceContent.push('<div class="custom-sportdetails-price-card-header">' + lblPrice + '</div>');
		strBuilderPriceContent.push('<div class="custom-sportdetails-price-card-content">');
		strBuilderPriceContent.push('<div class="custom-sportdetails-price-card-inner">');
		strBuilderPriceContent.push('<div class="list-block general-information">');
		strBuilderPriceContent.push('<ul>');
		strBuilderPriceContent.push('<li>');
		strBuilderPriceContent.push('<div class="item-content">');
		strBuilderPriceContent.push('<div class="item-inner">');
		strBuilderPriceContent.push('<div class="item-title label color-gray" style="text-align: right">');
		strBuilderPriceContent.push(price);
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('<div class="item-media"><i class="icon icon-form-price"></i></div>');
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</li>');
		strBuilderPriceContent.push('</ul>');
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</div>');
	}

	return (strBuilderPriceContent.join(""));
}

function builderGeneralInformationSport(schedule, location, emailContact) {
	var strBuilderInfoContent = [];
	strBuilderInfoContent.push('<div id="spnScheduleSportDetails"></div>');
	strBuilderInfoContent.push('<div class="card">');
	strBuilderInfoContent.push('<div class="card-content">');
	strBuilderInfoContent.push('<div class="card-content-inner">');
	strBuilderInfoContent.push('<div class="list-block general-information">');
	strBuilderInfoContent.push('<ul>');
	strBuilderInfoContent.push('');
	if (schedule != "") {
		strBuilderInfoContent.push('<li>');
		strBuilderInfoContent.push('<div class="item-content">');
		strBuilderInfoContent.push('<div class="item-media"><i class="icon icon-form-calendar"></i></div>');
		strBuilderInfoContent.push('<div class="item-inner">');
		strBuilderInfoContent.push('<div class="item-title label">');
		strBuilderInfoContent.push(schedule);
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</li>');
	}
	if (location != "") {
		strBuilderInfoContent.push('<li>');
		strBuilderInfoContent.push('<div class="item-content">');
		strBuilderInfoContent.push('<div class="item-media"><i class="icon icon-form-location"></i></div>');
		strBuilderInfoContent.push('<div class="item-inner">');
		strBuilderInfoContent.push('<div class="item-title label">');
		strBuilderInfoContent.push(location);
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</li>');
	}
	if (emailContact != "") {
		strBuilderInfoContent.push('<li>');
		strBuilderInfoContent.push('<a href="#" onclick="openMailer(\'' + lblSubjectEmail + '\',\'' + emailContact + '\')" class="item-content">');
		strBuilderInfoContent.push('<div class="item-media"><i class="icon icon-form-email2"></i></div>');
		strBuilderInfoContent.push('<div class="item-inner">');
		strBuilderInfoContent.push('<div class="item-title label">');
		strBuilderInfoContent.push(emailContact);
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</div>');
		strBuilderInfoContent.push('</a>');
		strBuilderInfoContent.push('</li>');
	}
	strBuilderInfoContent.push('</ul>');
	strBuilderInfoContent.push('</div>');
	strBuilderInfoContent.push('</div>');
	strBuilderInfoContent.push('</div>');
	strBuilderInfoContent.push('</div>');
	strBuilderInfoContent.push('</div>');
	return (strBuilderInfoContent.join(""));
}

function builderTournamentsSportDetails() {
	console.log('buildertournamentesportde');
	console.log(currentLastMatch);
	console.log(currentTournaments);
	areContentTabTournamentsSportDetailsBuilder = true;
	var strBuilderTournamentsSportDetails = [];

	if (currentLastMatch == "" && currentTournaments == "") {
		strBuilderTournamentsSportDetails.push(builderTournamentsEmptySportDetails());
	} else {
		if (currentLastMatchVivo == true) {
			strBuilderTournamentsSportDetails.push('<div id="card-livematch-sportdetails">');
		}
		strBuilderTournamentsSportDetails.push(builderLastMatchTournamentsSportDetails(currentLastMatchVivo));
		if (currentLastMatch == true) {
			strBuilderTournamentsSportDetails.push('</div>');
		}
		strBuilderTournamentsSportDetails.push(builderTournamentsTournamentsSportDetails(currentTournaments));
	}

	$('#tabSportDetails3').append(strBuilderTournamentsSportDetails.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderLastMatchTournamentsSportDetails(lastMatch) {
	/*var strBuilderLastMatch = [];
	if (lastMatch == "")
	{
		strBuilderLastMatch.push('');
	}
	else 
	{
			
			if(lastMatch.vivo == true)
			{
				strBuilderLastMatch.push('<div class="card">');
					idLiveMatchSportDetails = lastMatch.idMatch;
					strBuilderLastMatch.push('<div class="card-header card-header-center animated infinite pulse">');
					strBuilderLastMatch.push(lblLiveMatchTournaments);
					strBuilderLastMatch.push('</div>');
			}
			else
			{
				idLiveMatchSportDetails = null;
				strBuilderLastMatch.push('<div class="card">');
					strBuilderLastMatch.push('<div class="card-header card-header-center">');
					strBuilderLastMatch.push(lblLastMatchTournaments);
					strBuilderLastMatch.push('</div>');
			}
			
			strBuilderLastMatch.push('<div onclick="loadMatchDetails('+lastMatch.idMatch+')" class="card-content">');
				strBuilderLastMatch.push('<div class="card-content-inner">');
					strBuilderLastMatch.push('<div class="list-block lastmatch-tournaments">');
						strBuilderLastMatch.push('<div class="item-content">');
							strBuilderLastMatch.push('<div class="row" id="row-lastmatch-tournament">');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+lastMatch.local.name+'</div>');
									if(lastMatch.local.urlShield != ""){
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
								strBuilderLastMatch.push('</div>');
								if(lastMatch.vivo == true){
									strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+lastMatch.date.dateName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+lastMatch.local.score+' - '+lastMatch.visit.score+'</p></div>');
										if(lastMatch.actualClock != "")
										{
											strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+lastMatch.actualClock+'</div>');
										}
										
									strBuilderLastMatch.push('</div>');
								} else{
									strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+lastMatch.date.dateName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+lastMatch.local.score+' - '+lastMatch.visit.score+'</p></div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+lastMatch.matchDate+'</div>');
									strBuilderLastMatch.push('</div>');
								}
								
							strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
								strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+lastMatch.visit.name+'</div>');
								if(lastMatch.visit.urlShield != ""){
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
								}
								else{
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
								}
							strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('<div class="description-lastmatch-tournament">');
							strBuilderLastMatch.push(lastMatch.matchDetail);
						strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		strBuilderLastMatch.push('</div>');
	}
	return(strBuilderLastMatch.join(""));
	*/
}

function refreshLiveMatchSportDetails(idMatch) {
	//$('#icon-refresh-matchdetails').hide();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getMatchDetail',
		dataType: 'jsonp',
		data: {
			'idClub': idClub,
			'idMatch': idMatch
		},
		timeout: timeOut,
		success: function (response) {
			if (isAppUpdate(response.serverVersion) == false) {
				mainView.router.load({
					pageName: 'update'
				});
				return;
			}
			if (response.matchDetail == "" || response.matchDetail == undefined) {
				return;
			}

			if (idLiveMatchSportDetails == idMatch && $('#card-livematch-sportdetails').length != 0) {
				$('#card-livematch-sportdetails').html(builderLastMatchTournamentsSportDetails(response.matchDetail));
				myApp.initImagesLazyLoad(mainView.activePage.container);
			}
		},
		error: function (data, status, error) {}
	});

}

/*function builderLastMatchTournamentsSportDetails(lastMatch){
	var strBuilderLastMatch = [];
	if (lastMatch == ""){
		strBuilderLastMatch.push('');
	} else {
		strBuilderLastMatch.push('<div class="card">');
			
				if(lastMatch.liveMatch == true){
					strBuilderLastMatch.push('<div class="card-header card-header-center animated infinite pulse">');
					strBuilderLastMatch.push(lblLiveMatchTournaments);
					strBuilderLastMatch.push('</div>');
				}
				else{
					strBuilderLastMatch.push('<div class="card-header card-header-center">');
					strBuilderLastMatch.push(lblLastMatchTournaments);
					strBuilderLastMatch.push('</div>');
				}
			
			strBuilderLastMatch.push('<div onclick="loadMatchDetails('+lastMatch.idMatch+')" class="card-content">');
				strBuilderLastMatch.push('<div class="card-content-inner">');
					strBuilderLastMatch.push('<div class="list-block lastmatch-tournaments">');
						strBuilderLastMatch.push('<div class="item-content">');
							strBuilderLastMatch.push('<div class="row" id="row-lastmatch-tournament">');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+lastMatch.local.name+'</div>');
									if(lastMatch.local.urlShield != ""){
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
								strBuilderLastMatch.push('</div>');
								if(lastMatch.liveMatch == true){
									strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+lastMatch.date.dateName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+lastMatch.local.score+' - '+lastMatch.visit.score+'</p></div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+lastMatch.actualClock+'</div>');
									strBuilderLastMatch.push('</div>');
								} else{
									strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament-middle">');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+lastMatch.date.tournamentName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+lastMatch.date.dateName+'</div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+lastMatch.local.score+' - '+lastMatch.visit.score+'</p></div>');
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+lastMatch.matchDate+'</div>');
									strBuilderLastMatch.push('</div>');
								}
								
							strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
								strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+lastMatch.visit.name+'</div>');
								if(lastMatch.visit.urlShield != ""){
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+lastMatch.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
								}
								else{
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
								}
							strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('<div class="description-lastmatch-tournament">');
							strBuilderLastMatch.push(lastMatch.matchDetail);
						strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		strBuilderLastMatch.push('</div>');
	}
	return(strBuilderLastMatch.join(""));
}*/

function builderTournamentsTournamentsSportDetails(tournaments) {
	console.log(tournaments);
	positionTablesList = [];
	var strBuilderTournaments = [];
	if (tournaments == "") {
		strBuilderTournaments.push('');
	} else {
		$.each(tournaments, function (i, item) {
			//positionTablesList.push(item);
			//console.log(positionTablesList);
			strBuilderTournaments.push('<div class="card">');
			strBuilderTournaments.push('<div class="card-header custom-sportsdetails-card-header">' + item.nombre + '</div>');
			strBuilderTournaments.push('<div class="card-content">');
			strBuilderTournaments.push('<div class="card-content-inner">');
			strBuilderTournaments.push('<div class="list-block general-information">');
			strBuilderTournaments.push('<ul>');
			if (item.tablasPosicion !== "") {
				$.each(item.tablasPosicion, function (i, position) {
					positionTablesList.push(position);
					console.log(positionTablesList);
					strBuilderTournaments.push('<li>');
					strBuilderTournaments.push('<a href="#" onclick="loadPositionsTableDetails(' + position.id + ', ' + true + ')" class="item-link item-content">');
					strBuilderTournaments.push('<div class="item-media"><i class="icon icon-positionstable"></i></div>');
					strBuilderTournaments.push('<div class="item-inner">');
					strBuilderTournaments.push('<div class="item-title">' + position.titulo + '</div>');
					strBuilderTournaments.push('</div>');
					strBuilderTournaments.push('</a>');
					strBuilderTournaments.push('</li>');
				});
			}
			strBuilderTournaments.push('<li>');
			strBuilderTournaments.push('<a href="#" onclick="loadFixtures(' + item.id + ')" class="item-link item-content">');
			strBuilderTournaments.push('<div class="item-media"><i class="icon icon-fixture"></i></div>');
			strBuilderTournaments.push('<div class="item-inner">');
			strBuilderTournaments.push('<div class="item-title">' + lblFixtures + '</div>');
			strBuilderTournaments.push('</div>');
			strBuilderTournaments.push('</a>');
			strBuilderTournaments.push('</li>');
			if (item.hasScorersTables == true) {
				strBuilderTournaments.push('<li>');
				strBuilderTournaments.push('<a href="#" onclick="loadShootersTable(' + item.id + ',\'' + item.nombre + '\')" class="item-link item-content">');
				strBuilderTournaments.push('<div class="item-media"><i class="icon icon-shooters"></i></div>');
				strBuilderTournaments.push('<div class="item-inner">');
				strBuilderTournaments.push('<div class="item-title">' + lblTableShooters + '</div>');
				strBuilderTournaments.push('</div>');
				strBuilderTournaments.push('</a>');
				strBuilderTournaments.push('</li>');
			}
			strBuilderTournaments.push('</ul>');
			strBuilderTournaments.push('</div>');
			strBuilderTournaments.push('</div>');
			strBuilderTournaments.push('</div>');
			strBuilderTournaments.push('</div>');
		});
	}
	return (strBuilderTournaments.join(""));
}

function builderTournamentsEmptySportDetails() {
	var strBuilderTournamentsSportDetails = [];
	strBuilderTournamentsSportDetails.push('<div class="content-block">');
	strBuilderTournamentsSportDetails.push('<div class="divFuntionUndeveloped">' + messageFuntionUndeveloped + '</div>');
	strBuilderTournamentsSportDetails.push('</div>');
	return (strBuilderTournamentsSportDetails.join(""));
}
