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

/*function loadPositionsTable(idTournament, nameTournamentSelected){
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
}*/

function loadPositionsTableDetails(idTournament, state){
console.log(state);
     showLoadSpinnerWS();
     //call to the tournament details
     // URL del Web Service
     $.ajax({
        url: getPathWS() + 'getTorneo',
        dataType: 'json',
        data: { 
            'id': idTournament
        },
        timeout: timeOut,
        success: function(response){
            console.log(response);
            hideLoadSpinnerWS();

            //si es false viene de la home
            if (state == false) {
            console.log(idTournament);
            //console.log(allSucesosTorneoTablaPosicionList);

            /*var newsDetailsHome = allSucesosTorneoTablaPosicionList.filter(function( obj ) {
                return obj.id == idTournament;
            });
            newsDetailsHome = newsDetailsHome[0];*/
            newsDetailsHome = response.torneo.tablasPosicion;
            torneoEncuentroState = true;

            sportIDCategorie = response.torneo.deporteCategoria.id;

            } else {
                console.log(idTournament);
                //console.log(positionTablesList);

                /*var newsDetailsHome = positionTablesList.filter(function( obj ) {
                return obj.id == idTournament;
                });
                newsDetailsHome = newsDetailsHome[0];*/
                newsDetailsHome = response.torneo.tablasPosicion;
                torneoEncuentroState = false;

                sportIDCategorie = response.torneo.deporteCategoria.id;

            }
            console.log(newsDetailsHome);
            //sportIDCategorie = newsDetailsHome.torneo.deporteCategoria.id;
            // averiguar como hacer esto builderNewBanner(response.banner);
            builderPositionsTableDetails(newsDetailsHome);
            hideLoadSpinnerWS();  

        },
        error: function (data, status, error) {
            console.log(data);
            console.log(status);
            console.log(error);
            hideLoadSpinnerWS();
            showMessage(messageConexionError);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        } //set tokenString before send
	});
}
// function that builds the full position table detail
function builderPositionsTableDetails(item){
console.log(item);
var item = item[0];
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
        console.log(item.columna);

            if (item.columna == 'eq') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-team">' + item.nombreCorto + '</div>');
                }
            } /*else if (item.columna == 'pt') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            }/* else if (item.columna == 'pg') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            } else if (item.columna == 'pj') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            } else if (item.columna == 'pe') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            } else if (item.columna == 'pp') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            }*/ else if (item.columna == 'tf') {
                if (item.columna != "" && item.columna != undefined) {
                    //strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                    strBuilderListCards.push('<div class="col tournament-father-numbers">Pts</div>');
                }
            }/* else if (item.columna == 'tc') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            } else if (item.columna == 'td') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-numbers">' + item.nombreCorto + '</div>');
                }
            }*/


            //}
        });
        strBuilderListCards.push('</div>');
        //var verMas = false;
        console.log(item.tablaGeneral.cuerpo);
        var cuerpoArrayOrdenado = item.tablaGeneral.cuerpo;
        cuerpoArrayOrdenado.sort((a, b) => (a.tf > b.tf) ? -1 : 1);
        //list.sort((a, b) => (a.tf > b.tf) ? 1 : (a.tf === b.tf) ? ((a.size > b.size) ? 1 : -1) : -1 )
        console.log(cuerpoArrayOrdenado);
        $.each(item.tablaGeneral.cuerpo, function(i, item) {
            strBuilderListCards.push('<div class="row tournament-child no-gutter">');
            var pos = i+1;
            var equipoTabla = i+1;

            console.log(item);
            console.log(equipoTabla);
            //console.log(verMas);
            //if (equipoTabla < 5){
                if (item.eq.nombre !== "" && item.eq.nombre !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-team"><span class="td-span-team-pos">' + pos + '<img data-src="'+item.eq.imagenPrincipalMin+'" class="lazy-fadeIn img-shield-tournament lazy-loaded" src="'+item.eq.imagenPrincipalMin+'"> <span class="td-span-team-name">' + item.eq.nombre + '</span></div>');
                }
                /*if (item.pt !== "" && item.pt !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.pt + '</div>');
                }*/
                if (item.tf !== "" && item.tf !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.tf + '</div>');
                }/*
                if (item.tc !== "" && item.tc !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.tc + '</div>');
                }
                if (item.pj !== "" && item.pj !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.pj + '</div>');
                }
                if (item.pg !== "" && item.pg !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.pg + '</div>');
                }
                if (item.pe !== "" && item.pe !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.pe + '</div>');
                }
                if (item.pp !== "" && item.pp !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.pp + '</div>');
                }
                if (item.td !== "" && item.td !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.td + '</div>');
                }*/
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