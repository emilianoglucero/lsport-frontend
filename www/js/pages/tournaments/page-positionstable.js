myApp.onPageInit('positionstable', function (page)
{
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

myApp.onPageBeforeAnimation('positionstable', function (page)
{
	myApp.params.swipePanel = false;
	trackPageGA("Tabla de Posiciones");
});

function loadPositionsTable(idTournament, nameTournamentSelected){
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getPositionTables',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idTournament': idTournament
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
			if(response.positionTables == "" || response.positionTables == undefined )
			{
			    hideLoadSpinnerWS();
			    showMessage(messageConexionError);
			    return;
			}
			builderPositionsTableDetails(response.positionTables,response.banner,nameTournamentSelected);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
		}
	});
}

function loadPositionsTableDetails(idTournament, state){
console.log(state);
     showLoadSpinnerWS();
     //si es false viene de la home
     if (state == false) {
        console.log(idTournament);
        console.log(allSucesosTorneoTablaPosicionList);

        var newsDetailsHome = allSucesosTorneoTablaPosicionList.filter(function( obj ) {
          return obj.id == idTournament;
        });
        newsDetailsHome = newsDetailsHome[0];
        torneoEncuentroState = true;
     } else {
         console.log(idTournament);
         console.log(positionTablesList);

         var newsDetailsHome = positionTablesList.filter(function( obj ) {
           return obj.id == idTournament;
         });
         newsDetailsHome = newsDetailsHome[0];
         torneoEncuentroState = false;

     }


        // averiguar como hacer esto builderNewBanner(response.banner);
        builderPositionsTableDetails(newsDetailsHome);
        hideLoadSpinnerWS();


}

function builderPositionsTableDetails(item){
console.log(item);
	//$('#lblHeaderPositionsTables').text(nameTournamentSelected);
	$('#positionstable-list').html('');
	var strBuilderListCards = [];
	//$.each(positionTables, function(n, table) {
	//console.log(table);
	strBuilderListCards.push('<div class="card tournament-matches">');
                          strBuilderListCards.push('<div id="tournament-matches-header" class="card-header no-border">');

                          strBuilderListCards.push('<div class="tournament-header-titulo">'+item.torneo.nombre+'</div>');
                          strBuilderListCards.push('<div class="tournament-header-fecha">'+item.titulo+'</div>');

                          strBuilderListCards.push('</div>');
                          strBuilderListCards.push('<div class="card-content tournament-matches-content">');
                          strBuilderListCards.push('<div class="card-content-inner">');
                          //var verMasFecha = false;
                    //console.log(item);
                    //console.log(item.tablaGeneral.cabecera);
                    strBuilderListCards.push('<div class="row tournament-father no-gutter">');
                    $.each(item.tablaGeneral.cabecera, function(i, item) {
                    //console.log(item.nombreCorto);
                    //console.log(item.columna);
                        if (item.columna == 'eq'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-40 tournament-father-team">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'pt'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-10 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'pj'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'pe'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'pp'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'tf'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'tc'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        } else if (item.columna == 'td'){
                            if(item.columna != "" && item.columna != undefined){
                                strBuilderListCards.push('<div class="col-10 tournament-father-numbers">'+item.nombreCorto+'</div>');
                            }
                        }


                        //}
                    });
                    strBuilderListCards.push('</div>');
                    //var verMas = false;
                    $.each(item.tablaGeneral.cuerpo, function(i, item) {
                        strBuilderListCards.push('<div class="row tournament-child no-gutter">');
                        var pos = i+1;
                        var equipoTabla = i+1;

                        console.log(item);
                        console.log(equipoTabla);
                        //console.log(verMas);
                        //if (equipoTabla < 5){
                            if(item.eq.nombre !== "" && item.eq.nombre !== undefined){
                                strBuilderListCards.push('<div class="col-40 tournament-child-team"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.eq.nombre+'</span></div>');
                            }
                            if(item.pt !== "" && item.pt !== undefined){
                                strBuilderListCards.push('<div class="col-10 tournament-child-numbers">'+item.pt+'</div>');
                            }
                            if(item.pj !== "" && item.pj !== undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-child-numbers">'+item.pj+'</div>');
                            }
                            if(item.pe !== "" && item.pe !== undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-child-numbers">'+item.pe+'</div>');
                            }
                            if(item.pp !== "" && item.pp !== undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-child-numbers">'+item.pp+'</div>');
                            }
                            if(item.tf !== "" && item.tf !== undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-child-numbers">'+item.tf+'</div>');
                            }
                            if(item.tc !== "" && item.tc !== undefined){
                                strBuilderListCards.push('<div class="col-8 tournament-child-numbers">'+item.tc+'</div>');
                            }
                            if(item.td  !== "" && item.td !== undefined){
                                strBuilderListCards.push('<div class="col-10 tournament-child-numbers">'+item.td+'</div>');
                            }
                       /* } else{

                            if (verMas == false){
                            strBuilderListCards.push('<div class="col-50"> ...</div>');
                            verMas = true;
                            }

                        }*/
                        strBuilderListCards.push('</div>');
                    });

                    strBuilderListCards.push('</div></div>');

	
	$('#positionstable-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'positionstable'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
}