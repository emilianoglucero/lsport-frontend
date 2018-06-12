var idLiveMatchActivePage = null;
myApp.onPageInit('matchdetails', function (page)
{
    
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

function loadMatchDetails1(idNew){
	        showLoadSpinnerWS();
	        console.log(idNew);

	        	var matchDetailsHome = newsListHome.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];


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
            }
            if (response.matchDetail == "" || response.matchDetail == undefined){
                hideLoadSpinnerWS();
                showMessage(messageConexionError);
                return;
            }*/

            /*if(idLiveMatchActivePage != idMatch){
                $('#lblHeaderMatchDetails').text(response.matchDetail.shortCategoryName);
                $('.icon-sportDetails').css('background-image','url("'+response.matchDetail.urlImgHeader+'")');
                idLiveMatchActivePage = idMatch;
            }*/
            builderMatchDetails(matchDetailsHome);
			hideLoadSpinnerWS();

}

function loadMatchDetails(idMatch){
	$('#matchdetails-list').html('');
	$('#icon-refresh-matchdetails').hide();
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getMatchDetail',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idMatch': idMatch
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
			if (response.matchDetail == "" || response.matchDetail == undefined){
				hideLoadSpinnerWS();
			    showMessage(messageConexionError);
			    return;
			}
			
			if(idLiveMatchActivePage != idMatch){
				$('#lblHeaderMatchDetails').text(response.matchDetail.shortCategoryName);
				$('.icon-sportDetails').css('background-image','url("'+response.matchDetail.urlImgHeader+'")');
				idLiveMatchActivePage = idMatch;
			}
			builderMatchDetails(response.matchDetail,response.banner);
			hideLoadSpinnerWS();
		},
		error: function (data, status, error){
	          builderErrorMatchDetails(idMatch);
	          hideLoadSpinnerWS();
		}
	});

}

function refreshMatchDetails(idMatch){
	$('#icon-refresh-matchdetails').hide();
	//showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getMatchDetail',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idMatch': idMatch
		 },
		timeout: timeOut,
		success: function(response){
			if(response.errorCode != 0)
			{
			    filterCodeErrorWS(response);
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				mainView.router.load({pageName: 'update'});
				return;
			}
			if (response.matchDetail == "" || response.matchDetail == undefined){
			    showMessage(messageConexionError);
			    return;
			}
			
			if(idLiveMatchActivePage != idMatch){
				$('#lblHeaderMatchDetails').text(response.matchDetail.shortCategoryName);
				$('.icon-sportDetails').css('background-image','url("'+response.matchDetail.urlImgHeader+'")');
				idLiveMatchActivePage = idMatch;
			}
			builderMatchDetails(response.matchDetail,response.banner);
			//hideLoadSpinnerWS();
		},
		error: function (data, status, error){
	          //hideLoadSpinnerWS();
	          showMessage(messageConexionError);
	          $("#icon-refresh-matchdetails").off("click");
	          $('#icon-refresh-matchdetails').show();
	          $('#icon-refresh-matchdetails').click(function (){
	          	refreshMatchDetails(idMatch);
	          });
		}
	});

}


function builderMatchDetails(match){
	
	$('#matchdetails-list').html('');
	var strBuilderMatchDetails = [];
	
	strBuilderMatchDetails.push(builderDetailsMatchDetails(match));
	
	$('#matchdetails-list').append(strBuilderMatchDetails.join(""));
	mainView.router.load({pageName: 'matchdetails'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	if(idLiveMatchSportDetails == match.idMatch && $('#card-livematch-sportdetails').length != 0){
		$('#card-livematch-sportdetails').html(builderLastMatchTournamentsSportDetails(match));
	}
}

function builderDetailsMatchDetails(match){
	var strBuilderLastMatch = [];
		strBuilderLastMatch.push('<div class="card">');
			
				/*if(match.liveMatch == true){
					strBuilderLastMatch.push('<div class="card-header card-header-center animated infinite pulse">');
					strBuilderLastMatch.push(lblLiveMatchTournaments);
					strBuilderLastMatch.push('</div>');
					
				}
				else{*/
					strBuilderLastMatch.push('<div class="card-header card-header-center">');
					strBuilderLastMatch.push(lblScoreboardMatchDetails);
					strBuilderLastMatch.push('</div>');
				//}
			
			strBuilderLastMatch.push('<div class="card-content">');
				strBuilderLastMatch.push('<div class="card-content-inner">');
					strBuilderLastMatch.push('<div class="list-block lastmatch-tournaments">');
						strBuilderLastMatch.push('<div class="item-content">');
							strBuilderLastMatch.push('<div class="row" id="row-lastmatch-tournament">');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
								
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+match.titulo+'</div>');
									/*if(match.local.urlShield != ""){
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.local.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{*/
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									//}
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament.middle">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+match.titulo+'</div>');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+match.fecha.fecha+'</div>');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>1 - 2</p></div>');
									/*if(match.liveMatch == true){
										if(match.actualClock != "")
										{
											strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+match.actualClock+'</div>');
										}
									} else{*/
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+match.fecha.fecha+'</div>');
									//}
									
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+match.titulo+'</div>');
									/*if(match.visit.urlShield != ""){
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.visit.urlShield+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{*/
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									//}
									strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('</div>');
							strBuilderLastMatch.push('</div>');
							strBuilderLastMatch.push('<div class="description-lastmatch-tournament">');
								strBuilderLastMatch.push(match.bajada);
							strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		strBuilderLastMatch.push('</div>');
		/*if(match.matchCourse != ""){
			strBuilderLastMatch.push('<div class="card">');
				strBuilderLastMatch.push('<div class="card-header card-header-center">');
					strBuilderLastMatch.push(lblDevelopmentMatchDetails);
				strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('<div class="card-content">');
					strBuilderLastMatch.push('<div class="card-content-inner">');
						strBuilderLastMatch.push('<div class="list-block lastmatch-tournaments">');
							strBuilderLastMatch.push('<div class="description-lastmatch-tournament">');
								strBuilderLastMatch.push(match.detalle);
							strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		}
		if(match.liveDetail != ""){
			strBuilderLastMatch.push('<div class="card">');
				strBuilderLastMatch.push('<div class="card-header card-header-center">');
					strBuilderLastMatch.push(lblLiveMatchEvents);
				strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('<div class="card-content">');
					strBuilderLastMatch.push('<div class="card-content-inner">');
						strBuilderLastMatch.push('<div class="list-block lastmatch-tournaments">');
						strBuilderLastMatch.push('<div class="list-block">');
						strBuilderLastMatch.push('<ul>');
							$.each(match.liveDetail, function (i, event){
								strBuilderLastMatch.push('<li class="accordion-item androidFix_4_1 accordion-item-event-livematch">');
								strBuilderLastMatch.push('<a href="#" class="item-content item-link">');
								strBuilderLastMatch.push('<div class="item-inner">');
								strBuilderLastMatch.push('<div class="item-title"><span class="spn-event-livematch-minute">'+event.minute+'</span><span>'+event.name+'</span></div>');
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('</a>');
								strBuilderLastMatch.push('<div class="accordion-item-content">');
								strBuilderLastMatch.push('<div class="content-block">');
								strBuilderLastMatch.push('<p>'+event.detail+'</p>');
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('</li>');
							});
							strBuilderLastMatch.push('</ul>');
							strBuilderLastMatch.push('</div>');
						strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		}*/
	return(strBuilderLastMatch.join(""));
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