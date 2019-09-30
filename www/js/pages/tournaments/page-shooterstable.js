
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

function loadShootersTable(idTournament){
//onsole.log(state);
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

                console.log(idTournament);
                //console.log(positionTablesList);

                /*var newsDetailsHome = positionTablesList.filter(function( obj ) {
                return obj.id == idTournament;
                });
                newsDetailsHome = newsDetailsHome[0];*/
                newsDetailsHome = response.torneo.tablaAnotadores;
                torneoEncuentroState = false;

                sportIDCategorie = response.torneo.deporteCategoria.id;

            console.log(newsDetailsHome);
            //sportIDCategorie = newsDetailsHome.torneo.deporteCategoria.id;
            // averiguar como hacer esto builderNewBanner(response.banner);
            builderShootersTableDetails(newsDetailsHome);
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
function builderShootersTableDetails(item){
console.log(item);
//var item = item[0];
//console.log()
	//$('#lblHeaderPositionsTables').text(nameTournamentSelected);
	$('#shooterstable-list').html('');
	var strBuilderListCards = [];
	//$.each(positionTables, function(n, table) {
	//console.log(table);
	        strBuilderListCards.push('<div class="card tournament-matches">');
                strBuilderListCards.push('<div id="tournament-matches-header" class="card-header no-border">');

                strBuilderListCards.push('<div class="tournament-header-titulo">'+item.titulo+'</div>');
                //strBuilderListCards.push('<div class="tournament-header-fecha">'+item.titulo+'</div>');

                strBuilderListCards.push('</div>');
                strBuilderListCards.push('<div class="card-content tournament-matches-content">');
                strBuilderListCards.push('<div class="card-content-inner">');
                //var verMasFecha = false;
        //console.log(item);
        //console.log(item.tablaGeneral.cabecera);
        strBuilderListCards.push('<div class="row tournament-father no-gutter">');
        $.each(item.cabecera, function(i, item) {
        //console.log(item.nombreCorto);
        console.log(item.columna);

            if (item.columna == 'ju') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-fantasy">Jugador/a</div>');
                }

            } else if (item.columna == 'an') {
                if (item.columna != "" && item.columna != undefined) {
                    strBuilderListCards.push('<div class="col tournament-father-fantasy">Puntos</div>');
                }
            }


            //}
        });
        strBuilderListCards.push('</div>');
        //var verMas = false;
        $.each(item.cuerpo, function(i, item) {
            strBuilderListCards.push('<div class="row tournament-child no-gutter">');
            var pos = i+1;
            var equipoTabla = i+1;

            console.log(item);
            console.log(equipoTabla);
            //console.log(verMas);
            //if (equipoTabla < 5){
                if (item.ju.nombreCompleto !== "" && item.ju.nombreCompleto !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-team"><span class="td-span-team-pos">' + pos + '</span><span class="td-span-team-name">' + item.ju.nombre + '</span></div>');
                }
                if (item.an !== "" && item.an !== undefined) {
                    strBuilderListCards.push('<div class="col tournament-child-numbers">' + item.an + '</div>');
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

	
	$('#shooterstable-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'shooterstable'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
}