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

function loadMatchDetails1(idNew, state){
	        showLoadSpinnerWS();
	        console.log(idNew);
	        console.log(homeDetails2List);
	        console.log(newsListHome);
	        console.log(state);
	        if (state) { //significa que viene desde la home o cualquier pantalla que no sea calendario

	        	var matchDetailsHome = allSucesosPageList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];
                console.log(matchDetailsHome);
            } else { //significa que viene desde el calendario
                var homeDetails2ListCalendario = homeDetails2List;

                var matchDetailsHome = homeDetails2ListCalendario.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHome = matchDetailsHome[0];
                console.log(matchDetailsHome);

            }

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

function loadMatchDetailsFromFixture(id, idPartido){
	        showLoadSpinnerWS();
	        console.log(id);
	        console.log(idPartido);
	        console.log(newsListHome);
	        console.log(allSucesosNewsList);

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

            builderMatchDetails(matchDetailsHomeMatch);
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
console.log(match);
	var strBuilderLastMatch = [];
	//$.each(match.encuentros, function(i, match) {
	//console.log(match);
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
								
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+match.local.nombre+'</div>');
									if(match.local.imagenPrincipalMin != ""){
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament.middle">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-nametournament">'+match.torneo.deporteCategoria.nombreCorto+'</div>');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-name">'+match.torneo.nombre+'</div>');
									if (match.local.tantos != "" || match.visitante.tantos != ""){
                                        //strBuilderLastMatch.push('<td class="td-50-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                        strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+match.local.tantos+' - '+match.visitante.tantos+'</p></div>');
                                        //strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>'+match.visitante.tantos+'</p></div>');
                                        //strBuilderLastMatch.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+mainId+','+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                        //strBuilderLastMatch.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                    } else {
                                        strBuilderLastMatch.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');

                                    }

									/*if(match.liveMatch == true){
										if(match.actualClock != "")
										{
											strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+match.actualClock+'</div>');
										}
									} else{*/
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-date">'+match.fechaEncuentro.fecha+'</div>');
									//}
									
								strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('<div class="col-33 col-lastmatch-tournament">');
									strBuilderLastMatch.push('<div class="col-lastmatch-tournament-team">'+match.visitante.nombre+'</div>');
									if(match.visitante.imagenPrincipalMin != ""){
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									else{
										strBuilderLastMatch.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch" /></div>');
									}
									strBuilderLastMatch.push('</div>');
								strBuilderLastMatch.push('</div>');
							strBuilderLastMatch.push('</div>');
							strBuilderLastMatch.push('<div class="description-lastmatch-tournament">');
								strBuilderLastMatch.push(match.visitante.nombre);
							strBuilderLastMatch.push('</div>');
					strBuilderLastMatch.push('</div>');
				strBuilderLastMatch.push('</div>');
			strBuilderLastMatch.push('</div>');
		strBuilderLastMatch.push('</div>');
		if (match.tipoObjeto == "torneo-encuentro") {

		var timelieSide = true;
		    if (match.eventos.todos.length !== 0){

		    strBuilderLastMatch.push('<div class="timeline timeline-sides">');

                $.each( match.eventos.todos, function( i, item ){
                console.log(item);
                    if (item.tipoEvento == "anotacion") {

                    if (timelieSide == false) {
                     strBuilderLastMatch.push('<div class="timeline timeline-sides">');
                    }

                        if (item.equipo.localia == "local") {
                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-left">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                            if (item.comentario !== "") {
                                                strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                            }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelieSide = true;

                        }
                        else if (item.equipo.localia == "visitante"){

                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-right">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelieSide = true;

                        }
                    } else if (item.tipoEvento == "inicializar") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Comenzó el partido!</div>');
                        strBuilderLastMatch.push('</div>');
                        timelieSide = false;


                    }
                    else if (item.tipoEvento == "finalizar-etapa") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Terminó '+item.tiempo.etapa.nombre+'</div>');
                        strBuilderLastMatch.push('</div>');

                        timelieSide = false;

                    }
                    else if (item.tipoEvento == "inicializar-etapa") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Comienza '+item.tiempo.etapa.nombre+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelieSide = false;

                    }
                    else if (item.tipoEvento == "comentario") {

                        strBuilderLastMatch.push('</div>');

                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">'+item.tiempo.relojEtapa+'</div>');
                                strBuilderLastMatch.push('<div class="timeline-item-time"">'+item.comentario+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelieSide = false;

                    }
                    else if (item.tipoEvento == "finalizar") {

                        strBuilderLastMatch.push('</div>');
                        strBuilderLastMatch.push('<div class="matchdetails-events-comments">');
                            strBuilderLastMatch.push('<div class="content-block-title">Terminó el partido!</div>');
                            strBuilderLastMatch.push('<div class="timeline-item-time"">'+item.tanteadorLocal+' - '+item.tanteadorVisitante+'</div>');
                        strBuilderLastMatch.push('</div>');
                        timelieSide = false;

                    }
                    else if (item.tipoEvento == "disciplinario") {

                    if (timelieSide == false) {
                        strBuilderLastMatch.push('<div class="timeline timeline-sides">');
                    }

                        if (item.equipo.localia == "local") {
                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-left">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelieSide = true;

                        }
                        else if (item.equipo.localia == "visitante"){

                            strBuilderLastMatch.push('<div class="timeline-item timeline-item-right">');
                                strBuilderLastMatch.push('<div class="timeline-item-date">'+item.tiempo.relojEtapa+'<small><img data-src='+item.tipoIncidencia.icono+' class="match-img-events lazy lazy-fadeIn"/></small></div>');
                                strBuilderLastMatch.push('<div class="timeline-item-divider"></div>');
                                //strBuilderLastMatch.push('<a href="#" class="aEventDetails" onclick="loadEventDetails1('+item.id+')">');
                                    strBuilderLastMatch.push('<div class="timeline-item-content">');
                                        strBuilderLastMatch.push('<div class="timeline-item-inner"><div class="match-event-title">'+item.detallePrincipal.detalle+'</div>');
                                        if (item.comentario !== "") {
                                            strBuilderLastMatch.push('<div class="match-event-timeline-commentary"><br>'+item.comentario+'</div>');
                                        }
                                        strBuilderLastMatch.push('</div>');
                                    strBuilderLastMatch.push('</div>');
                            strBuilderLastMatch.push('</div>');

                            timelieSide = true;

                        }

                    }
                    else if (item.tipoEvento == "sustitucion") {

                    if (timelieSide == false) {
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

                            timelieSide = true;

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

                            timelieSide = true;
                        }

                    }

                });

            strBuilderLastMatch.push('</div>');

		    }

		}
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
	//});
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