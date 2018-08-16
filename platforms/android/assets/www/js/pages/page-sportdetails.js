var areSportDetailsLoaded = false;
var idLiveMatchSportDetails = null;
var sportDetails = [];
var bannerSportDetails = [];
var currentLastMatch = [];
var currentTournaments = [];
var bannerTournaments = [];

var recentNewsListSporDetails = [];
var nextPageNumberSportDetails = 1;
var loadingInfiniteScrollSportDetails = false;
var currentPageNumberSportDetails, currentTotalPageSportDetails;
var builderSelectHeader = true;

var areAccessedServerNewsSportDetails = false;


myApp.onPageInit('sportdetails', function (page)
{
	$('#subnavbarSportDetails1').text(lblTabInformation);
	$('#subnavbarSportDetails2').text(lblTabNews);
	$('#subnavbarSportDetails3').text(lblTabTournaments);
	$('.headerListEndNews').text(headerListEndNews);
    $('.contentListEndNews').text(contentListEndNews);
    $$('#tabSportDetails1').on('show', function () {
		if(areContentTabInformationSportDetailsBuilder == false){
			builderInformationSportDetails();
			areContentTabInformationSportDetailsBuilder = true;
		}
	});
	$$('#tabSportDetails2').on('show', function () {
	    if (areContentTabNewsSportDetailsBuilder == false){
	    	builderNewsSportDetails();
	    	areContentTabNewsSportDetailsBuilder  = true;
	    }
	    myApp.initImagesLazyLoad(mainView.activePage.container);
	});
	$$('#tabSportDetails3').on('show', function () {
	    if (areContentTabTournamentsSportDetailsBuilder == false){
	    	builderTournamentsSportDetails();
	    } 
	});
});

myApp.onPageBeforeAnimation('sportdetails', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name != 'newdetails'){
		$$('#page-sportdetails .page-content').scrollTop(0);
	}
	$('#noConnection-content-block-sportdetails').hide();
	myApp.initImagesLazyLoad(mainView.activePage.container);
	trackPageGA("Detalle Deporte");
});

myApp.onPageBack('sportdetails', function (page){
	idLiveMatchSportDetails=null;
});

function loadSportDetails(idSport,idCat){
	idSportSelected = idSport;
	idCategorySelected = idCat;
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
		url: getPathWS() + 'getCategorySport',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idSport': idSportSelected,
				'idCategory': idCategorySelected
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
			sportDetails = response.categorySport;
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
	   }
		});
}

function loadSportDetailsFromSelect(idSport,idCat){
	showLoadSpinnerWS();
	idSportSelected = idSport;
	idCategorySelected = idCat;
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	$('#noConnection-content-block-sportdetails').hide();
	builderSelectHeader = false;
	areSportDetailsLoaded = false;
	areContentTabInformationSportDetailsBuilder = false;
	areContentTabNewsSportDetailsBuilder = false;
	areContentTabTournamentsSportDetailsBuilder = false;
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getCategorySport',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idSport': idSportSelected,
				'idCategory': idCategorySelected
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
			$('.lblHeaderTournaments').text(response.categorySport.shortCategoryName);
			sportDetails = response.categorySport;
			bannerSportDetails = response.banner;
			recentNewsListSporDetails = response.news;
			currentPageNumberSportDetails = response.pageNumber;
			nextPageNumberSportDetails = parseInt(response.pageNumber) + 1;
			currentTotalPageSportDetails = response.totalPage;
			currentLastMatch = response.lastMatch;
			currentTournaments = response.tournaments;
			bannerTournaments = response.banner;
			areSportDetailsLoaded = true;
			builderSportDetails();
			hideLoadSpinnerWS();

		},
		error: function (data, status, error){
			areSportDetailsLoaded = false;
			builderErrorConnectionSportDetails();
			hideLoadSpinnerWS();
	   }
	});
}

var tabsSportDetails = [];

var contentTabInformationSportDetails = [];
var areContentTabInformationSportDetailsBuilder = false;
var areContentTabNewsSportDetailsBuilder = false;
var areContentTabTournamentsSportDetailsBuilder = false;

var idSportSelected;
var idCategorySelected;

function builderSportDetails(){
	if(areSportDetailsLoaded == true){
		if (sportDetails == ""){
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		}
		else{
			if(builderSelectHeader == true){
				/*## INIT Build Header SportDetails##*/
				var categoriesSportList = sportDetails.categories;
				
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
			}
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
}

function builderInformationSportDetails(){
	
	var strBuildetTabSportDetails1 = [];
	strBuildetTabSportDetails1.push(builderCoordinatorsSport(sportDetails.arrayCoordinators));
	
	strBuildetTabSportDetails1.push(builderGeneralInformationSport(sportDetails.schedule, sportDetails.location, sportDetails.mailContact));
	strBuildetTabSportDetails1.push(builderPriceDetails(sportDetails.price));
	
	$('#tabSportDetails1').html(strBuildetTabSportDetails1.join(""));
	
	$('#spnDescriptionSportDetails').text(lblDescription);
	$('#spnScheduleSportDetails').text(lblSchedule);
	
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorConnectionSportDetails(){
	$('#tabSportDetails1').html("");
	$('#contentTabSportDetails2').html("");
	$('#tabSportDetails3').html("");
	areContentTabTournamentsSportDetailsBuilder = true;
	areContentTabNewsSportDetailsBuilder = true;
	areContentTabInformationSportDetailsBuilder = true;
	
	var strBuildetTabSportDetails1 = [];
	strBuildetTabSportDetails1.push('<div onclick="loadSportDetailsFromSelect('+idSportSelected+','+idCategorySelected+')" class="content-block content-block-information">');
		strBuildetTabSportDetails1.push('<div class="divConnectionErrorHeader">'+divErrorConnectionHeader+'</div>');

		strBuildetTabSportDetails1.push('<div class="divConnectionErrorText">'+divErrorConnectionText+'</div>');
		
		strBuildetTabSportDetails1.push('<div class="link divImgConnectionError">');
			strBuildetTabSportDetails1.push('<img class="imgUploadConnectionError" src="img/template/icon-upload.png" />');
		strBuildetTabSportDetails1.push('</div>');
	strBuildetTabSportDetails1.push('</div>');
	
	$('#tabSportDetails1').html(strBuildetTabSportDetails1.join(""));
	$('#contentTabSportDetails2').html(strBuildetTabSportDetails1.join(""));
	$('#tabSportDetails3').html(strBuildetTabSportDetails1.join(""));
	
	mainView.router.load({pageName: 'sportdetails'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
	myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
}

function loadNewsSportDetails(idSport,idCat){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getCategorySportNews',
			dataType: 'jsonp',
			data: { 'idClub': idClub,
					'idSport' : idSport,
					'idCategory' : idCat,
					'pageNumber': nextPageNumberSportDetails
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
				
				nextPageNumberSportDetails = parseInt(response.pageNumber) + 1;
				
				if( response.pageNumber == 1 ){
					$('#contentTabSportDetails2').html("");
					recentNewsListSporDetails = [];
					recentNewsListSporDetails = response.news;
					builderNewsSportDetails();
					hideLoadSpinnerWS();
				} else {
					recentNewsListSporDetails = [];
					recentNewsListSporDetails = response.news;
					builderNewsSportDetails();
					hideLoadSpinnerWS();
				}
				
				if( response.totalPage < nextPageNumberSportDetails ){
					myApp.detachInfiniteScroll('.infinite-scroll-sportdetails');
				}
				
				loadingInfiniteScrollSportDetails = false;
				areAccessedServerNewsSportDetails = false;
				$('#noConnection-content-block-sportdetails').hide();
				
			},
			error: function (data, status, error){		          
		          if( nextPageNumberSportDetails == 1 ){
		          	builderErrorNewsSportDetails();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	loadingInfiniteScrollSportDetails = false;
		          	areAccessedServerNewsSportDetails = true;
		          }
		   }
	});
}

function reloadNewsSportDetails(){
	if (existInternetConnection() == true){
		loadNewsSportDetails(idSportSelected,idCategorySelected);
	} else{
		showMessageToast(messageCanNotRefresh);
	}
}

function builderNewsSportDetails(){	
	var strBuilderNewsSportDetailsContent = [];
		if(recentNewsListSporDetails.length == 0){
			strBuilderNewsSportDetailsContent.push('<div class="content-block">');
				strBuilderNewsSportDetailsContent.push('<div class="divNotLastestNews">'+divNotLastestNews+'</div>');
			strBuilderNewsSportDetailsContent.push('</div>');
		}else{
			$.each( recentNewsListSporDetails, function( i, item ){
			
				if(item.type == "banner"){
					/*strBuilderNewsSportDetailsContent.push('<div class="item-list-banner">'); ERASE
						strBuilderNewsSportDetailsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
					strBuilderNewsSportDetailsContent.push('</div>');*/
				} else{
					strBuilderNewsSportDetailsContent.push('<div class="card card-news"><div class="card-content"><div class="list-block list-block-about media-list">');
						strBuilderNewsSportDetailsContent.push('<ul><li class="item-content">');
							strBuilderNewsSportDetailsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
							
								strBuilderNewsSportDetailsContent.push('<div class="item-media">');
								var urlImgNewsList = getDefaultImageNewsList();
								if(item.urlImgMin != ""){
									urlImgNewsList = item.urlImgMin; 
								}
								strBuilderNewsSportDetailsContent.push('<img class="lazy lazy-fadeIn imgCardNew" data-src="'+urlImgNewsList+'" alt="'+item.altImg+'" />');
								strBuilderNewsSportDetailsContent.push('</div>');
								
								strBuilderNewsSportDetailsContent.push('<div class="item-inner">');
								strBuilderNewsSportDetailsContent.push('<div class="item-title-row">');
								strBuilderNewsSportDetailsContent.push('<div class="item-title item-title-new">'+item.title+'</div>');
								strBuilderNewsSportDetailsContent.push('</div>');
								strBuilderNewsSportDetailsContent.push('<div class="item-subContent-news">');
									strBuilderNewsSportDetailsContent.push('<span class="item-date">'+item.publishDate+'</span>');
									strBuilderNewsSportDetailsContent.push('<span class="item-shortContent">'+item.shortContent+'</span>');
								strBuilderNewsSportDetailsContent.push('</div>');
								strBuilderNewsSportDetailsContent.push('</div>');
								
							strBuilderNewsSportDetailsContent.push('</a>');
						strBuilderNewsSportDetailsContent.push('</li></ul>');
					strBuilderNewsSportDetailsContent.push('</div></div></div>');
				}
			});
		}
		$('#contentTabSportDetails2').append(strBuilderNewsSportDetailsContent.join(""));
		myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorNewsSportDetails(){
	$('#contentTabSportDetails2').html("");
	var srBuilderNewsSportDetailsContent = [];
	srBuilderNewsSportDetailsContent.push('<div onclick="loadNewsSportDetails('+idSportSelected+','+idCategorySelected+')" class="content-block content-block-information">');
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

function builderCoordinatorsSport(coordSportItem){
	var strBuilderCoordinatorsContent = [];
	if(coordSportItem.length == 0){
		strBuilderCoordinatorsContent.push('');
	}
	else{
		strBuilderCoordinatorsContent.push('<div class="card">');
		strBuilderCoordinatorsContent.push('<div id="divCoordinatorsSport" class="card-header card-header-center">'+divCoordinatorsSport+'</div>');
		strBuilderCoordinatorsContent.push('<div class="card-content">');
		strBuilderCoordinatorsContent.push('<div class="list-block media-list">');
		strBuilderCoordinatorsContent.push('<ul>');
		$.each(coordSportItem, function(i, coord){
			strBuilderCoordinatorsContent.push('<li class="item-content">');
				strBuilderCoordinatorsContent.push('<div class="item-media">');
					var urlImgProfile = getDefaultImageProfile();
					if(coord.imgProfile != ""){
						urlImgProfile = coord.imgProfile; 
					}
					strBuilderCoordinatorsContent.push('<img class="lazy lazy-fadeIn imgProfileCoordinator" alt="'+coord.altImg+'" data-src="'+urlImgProfile+'">');
				strBuilderCoordinatorsContent.push('</div>');
				strBuilderCoordinatorsContent.push('<div class="item-inner">');
					strBuilderCoordinatorsContent.push('<div class="item-title-row">');
						strBuilderCoordinatorsContent.push('<div class="item-title item-title-coord">'+coord.role+'</div>');
					strBuilderCoordinatorsContent.push('</div>');
					strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-name">'+coord.name+'</div>');
					strBuilderCoordinatorsContent.push('<a onclick="openPhoneCaller(\''+coord.phone+'\')" herf="#">');
						strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-link-phone">'+coord.phone+'</div>');
					strBuilderCoordinatorsContent.push('</a>');
					strBuilderCoordinatorsContent.push('<a onclick="openMailer(\''+lblSubjectEmail+'\',\''+coord.email+'\')" herf="#">');
						strBuilderCoordinatorsContent.push('<div class="item-subtitle item-subtitle-link-email">'+coord.email+'</div>');
					strBuilderCoordinatorsContent.push('</a>');
				strBuilderCoordinatorsContent.push('</div>');
			strBuilderCoordinatorsContent.push('</li>');
		});
		strBuilderCoordinatorsContent.push('</ul>');
		strBuilderCoordinatorsContent.push('</div>');
		strBuilderCoordinatorsContent.push('</div>');
		strBuilderCoordinatorsContent.push('</div>');
	}
	return(strBuilderCoordinatorsContent.join(""));
}

function builderPriceDetails(price){
	var strBuilderPriceContent = [];
	if (price == ""){
		strBuilderPriceContent.push('');
	}
	else{
		strBuilderPriceContent.push('<div class="card">');
			strBuilderPriceContent.push('<div class="card-header card-header-center">'+lblPrice+'</div>');
			strBuilderPriceContent.push('<div class="card-content">');
				strBuilderPriceContent.push('<div class="card-content-inner">');
					strBuilderPriceContent.push('<div class="list-block general-information">');
					strBuilderPriceContent.push('<ul>');
					strBuilderPriceContent.push('<li>');
					strBuilderPriceContent.push('<div class="item-content">');
					strBuilderPriceContent.push('<div class="item-media"><i class="icon icon-form-price"></i></div>');
					strBuilderPriceContent.push('<div class="item-inner">');
					strBuilderPriceContent.push('<div class="item-title label color-gray">');
					strBuilderPriceContent.push(price);
					strBuilderPriceContent.push('</div>');
					strBuilderPriceContent.push('</div>');
					strBuilderPriceContent.push('</div>');
					strBuilderPriceContent.push('</li>');
					strBuilderPriceContent.push('</ul>');
					strBuilderPriceContent.push('</div>');
				strBuilderPriceContent.push('</div>');
			strBuilderPriceContent.push('</div>');
		strBuilderPriceContent.push('</div>');
	}
	
	return(strBuilderPriceContent.join(""));
}

function builderGeneralInformationSport(schedule ,location , emailContact){
	var strBuilderInfoContent = [];
	strBuilderInfoContent.push('<div class="card">');
	strBuilderInfoContent.push('<div id="spnScheduleSportDetails" class="card-header card-header-center"></div>');
	strBuilderInfoContent.push('<div class="card-content">');
	strBuilderInfoContent.push('<div class="card-content-inner">');
	strBuilderInfoContent.push('<div class="list-block general-information">');
	strBuilderInfoContent.push('<ul>');
	strBuilderInfoContent.push('');
	if(schedule != ""){
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
	if(location != ""){
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
	if(emailContact != ""){
		strBuilderInfoContent.push('<li>');
		strBuilderInfoContent.push('<a href="#" onclick="openMailer(\''+lblSubjectEmail+'\',\''+emailContact+'\')" class="item-content">');
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
	return(strBuilderInfoContent.join(""));
}

function builderTournamentsSportDetails(){
	areContentTabTournamentsSportDetailsBuilder = true;
	var strBuilderTournamentsSportDetails = [];

	if (currentLastMatch == "" && currentTournaments == ""){
		strBuilderTournamentsSportDetails.push(builderTournamentsEmptySportDetails());
	} else{
		if(currentLastMatch.liveMatch == true)
		{
			strBuilderTournamentsSportDetails.push('<div id="card-livematch-sportdetails">');
		}
			strBuilderTournamentsSportDetails.push(builderLastMatchTournamentsSportDetails(currentLastMatch));
		if(currentLastMatch.liveMatch == true)
		{
			strBuilderTournamentsSportDetails.push('</div>');
		}
		strBuilderTournamentsSportDetails.push(builderTournamentsTournamentsSportDetails(currentTournaments));
	}

	$('#tabSportDetails3').append(strBuilderTournamentsSportDetails.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderLastMatchTournamentsSportDetails(lastMatch){
	var strBuilderLastMatch = [];
	if (lastMatch == "")
	{
		strBuilderLastMatch.push('');
	}
	else 
	{
			
			if(lastMatch.liveMatch == true)
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
								if(lastMatch.liveMatch == true){
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
}

function refreshLiveMatchSportDetails(idMatch)
{
	//$('#icon-refresh-matchdetails').hide();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getMatchDetail',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idMatch': idMatch
		 },
		timeout: timeOut,
		success: function(response){
			if(isAppUpdate(response.serverVersion) == false){
				mainView.router.load({pageName: 'update'});
				return;
			}
			if (response.matchDetail == "" || response.matchDetail == undefined){
			    return;
			}
			
			if(idLiveMatchSportDetails == idMatch && $('#card-livematch-sportdetails').length != 0){
				$('#card-livematch-sportdetails').html(builderLastMatchTournamentsSportDetails(response.matchDetail));
				myApp.initImagesLazyLoad(mainView.activePage.container);
			}
		},
		error: function (data, status, error){
		}
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

function builderTournamentsTournamentsSportDetails(tournaments){
	var strBuilderTournaments = [];
	if (tournaments == ""){
		strBuilderTournaments.push('');
	} else {
		$.each( tournaments, function( i, item ){
			strBuilderTournaments.push('<div class="card">');
			strBuilderTournaments.push('<div class="card-header card-header-center">'+item.tournametName+'</div>');
			strBuilderTournaments.push('<div class="card-content">');
			strBuilderTournaments.push('<div class="card-content-inner">');
			strBuilderTournaments.push('<div class="list-block general-information">');
			strBuilderTournaments.push('<ul>');
			if(item.hasPositionTables == true){
				strBuilderTournaments.push('<li>');
				strBuilderTournaments.push('<a href="#" onclick="loadPositionsTable('+item.idTournament+',\''+item.tournametName+'\')" class="item-link item-content">');
				strBuilderTournaments.push('<div class="item-media"><i class="icon icon-positionstable"></i></div>');
				strBuilderTournaments.push('<div class="item-inner">');
				strBuilderTournaments.push('<div class="item-title">'+lblTablePositions+'</div>');
				strBuilderTournaments.push('</div>');
				strBuilderTournaments.push('</a>');
				strBuilderTournaments.push('</li>');
			}
				strBuilderTournaments.push('<li>');
				strBuilderTournaments.push('<a href="#" onclick="loadFixtures('+item.idTournament+',\''+item.tournametName+'\')" class="item-link item-content">');
				strBuilderTournaments.push('<div class="item-media"><i class="icon icon-fixture"></i></div>');
				strBuilderTournaments.push('<div class="item-inner">');
				strBuilderTournaments.push('<div class="item-title">'+lblFixtures+'</div>');
				strBuilderTournaments.push('</div>');
				strBuilderTournaments.push('</a>');
				strBuilderTournaments.push('</li>');
			if(item.hasScorersTables == true){
				strBuilderTournaments.push('<li>');
				strBuilderTournaments.push('<a href="#" onclick="loadShootersTable('+item.idTournament+',\''+item.tournametName+'\')" class="item-link item-content">');
				strBuilderTournaments.push('<div class="item-media"><i class="icon icon-shooters"></i></div>');
				strBuilderTournaments.push('<div class="item-inner">');
				strBuilderTournaments.push('<div class="item-title">'+lblTableShooters+'</div>');
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
	return(strBuilderTournaments.join(""));
}

function builderTournamentsEmptySportDetails(){
	var strBuilderTournamentsSportDetails = [];
	strBuilderTournamentsSportDetails.push('<div class="content-block">');
		strBuilderTournamentsSportDetails.push('<div class="divFuntionUndeveloped">'+messageFuntionUndeveloped+'</div>');
	strBuilderTournamentsSportDetails.push('</div>');
	return(strBuilderTournamentsSportDetails.join(""));
}
