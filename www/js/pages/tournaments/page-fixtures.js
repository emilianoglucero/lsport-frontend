var fixturesList = [];
var datesTournaments = [];
var tournamentFixture;
var lblTournamentNameFixture;
var lblTournamentCategorieFixture;
var tournamentFixtureFechas = [];

myApp.onPageInit('fixtures', function (page)
{

});

myApp.onPageBeforeAnimation('fixtures', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-fixtures .page-content').scrollTop(0);
	trackPageGA("Fixtures");
});

function loadFixturesOld(idTournament,nameTournamentSelected){
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getFixtures',
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
			if (response.fixtures == ""){
				hideLoadSpinnerWS();
			    showMessage(messageNotDates);
			    return;
			}
			fixturesList = response.fixtures;
			builderFixturesDetails(nameTournamentSelected,response.banner);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
		}
	});
}

function loadFixtures(idTournament){
	showLoadSpinnerWS();

			//if (state){
			console.log(currentTournaments);
                tournamentFixture = currentTournaments.filter(function( obj ) {
                  return obj.id == idTournament;
                });
                tournamentFixture = tournamentFixture[0];
                console.log(tournamentFixture.fechas);
           /* } else {
                var newsDetails = allSucesosNewsList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                newsDetailsHome = newsDetails[0];
            }*/


			if (tournamentFixture.fechas == ""){
				hideLoadSpinnerWS();
			    showMessage(messageNotDates);
			    return;
			}



			//fixturesList = response.fixtures;
			builderFixturesDetails(tournamentFixture);
			hideLoadSpinnerWS();



}


function builderFixturesDetails(fixturesList){



$('#selectFixtureDetails').empty();
$('#selectFixtureDetails').attr("onchange","builderFixturesDetailsFromSelect(this.value)");
console.log(fixturesList);
$.each(fixturesList.fechas , function( key, item ) {
console.log(item);
    if(item.id == fixturesList.fechaActual.id){
        $('#selectFixtureDetails').append('<option selected value="'+fixturesList.fechaActual.id+'">'+fixturesList.fechaActual.nombre+'</option>');
        $('.lblHeaderTournaments').text(lblHeaderMatchDetailsFixture);
    } else {
        $('#selectFixtureDetails').append('<option value="'+item.id+'">'+item.nombre+'</option>');
    }

});



	//$('#lblHeaderFixtures').text(nameTournamentSelected);
	console.log(fixturesList);
	datesTournaments = fixturesList.fechas;
	lblTournamentCategorieFixture = fixturesList.deporteCategoria.nombre;
	lblTournamentNameFixture = fixturesList.nombre;
	//$('#fixtures-content').html('');
	var strBuilderListCards = [];
	$('#fixture-content').html('');
	if (fixturesList == ""){
		strBuilderListCards.push('');
	} else {
		//$.each( fixturesList, function( i, item ){
            var idFechaActual = fixturesList.fechaActual.id;
			strBuilderListCards.push('<div class="card">');
			//strBuilderListCards.push('<div class="card-header card-header-center card-header-fixtures">'+fixturesList.deporteCategoria.nombreCorto+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+lblTournamentCategorieFixture+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block general-information">');
			strBuilderListCards.push('<ul>');
			if(fixturesList.fechaActual !== ""){
				$.each( fixturesList.fechaActual.encuentros, function( n, match ){
					console.log(match.id);
                    console.log(match);
                    strBuilderListCards.push('<a onclick="loadMatchDetailsFromFechas('+idFechaActual+', '+match.id+')" href="#">');
					//strBuilderListCards.push('<div class="card-content">');
                            //strBuilderListCards.push('<div class="card-content-inner">');
                                //strBuilderListCards.push('<div class="list-block lastmatch-tournaments">');
                                    strBuilderListCards.push('<div class="item-content">');
                                        strBuilderListCards.push('<div class="row" id="row-lastmatch-tournament">');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament">');

                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-team">'+match.local.nombre+'</div>');
                                                if(match.local.imagenPrincipalMin != ""){
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                else{
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                            strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament.middle">');
                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-date"><p>18/10/18</p></div>');
                                                //strBuilderListCards.push('<div class="col-lastmatch-tournament-nametournament">'+match.torneo.deporteCategoria.nombreCorto+'</div>');
                                                //strBuilderListCards.push('<div class="col-lastmatch-tournament-name">'+match.torneo.nombre+'</div>');
                                                if (match.local.tantos != "" || match.visitante.tantos != ""){
                                                    //strBuilderListCards.push('<td class="td-50-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>'+match.local.tantos+' - '+match.visitante.tantos+'</p></div>');
                                                    //strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>'+match.visitante.tantos+'</p></div>');
                                                    //strBuilderListCards.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+mainId+','+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                                    //strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                                } else {
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');

                                                }

                                                /*if(match.liveMatch == true){
                                                    if(match.actualClock != "")
                                                    {
                                                        strBuilderListCards.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+match.actualClock+'</div>');
                                                    }
                                                } else{*/
                                                    //strBuilderListCards.push('<div class="col-lastmatch-tournament-date">'+match.fechaEncuentro.fecha+'</div>');
                                                //}

                                            strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament">');
                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-team">'+match.visitante.nombre+'</div>');
                                                if(match.visitante.imagenPrincipalMin != ""){
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                else{
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                //strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('</div>');
                                        strBuilderListCards.push('</div>');
                                        /*strBuilderListCards.push('<div class="description-lastmatch-tournament">');
                                            strBuilderListCards.push(match.visitante.nombre);
                                        strBuilderListCards.push('</div>');*/
                                    strBuilderListCards.push('</div>');
                            //strBuilderListCards.push('</div>');
                        //strBuilderListCards.push('</div>');
                    //strBuilderListCards.push('</div>');

				});
			}
			strBuilderListCards.push('</ul>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		//});
			
	}

	
	$('#fixture-content').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'fixtures'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
}


function builderFixturesDetailsFromSelect(idDate){




	//$('#lblHeaderFixtures').text(nameTournamentSelected);
	console.log(tournamentFixture.fechas);
	tournamentFixtureFechas = tournamentFixture.fechas;
	console.log(tournamentFixtureFechas);
	console.log(idDate);

	var matchFixture = tournamentFixtureFechas.filter(function( obj ) {
      return obj.id == idDate;
    });
    matchFixture = matchFixture[0];
    console.log(matchFixture);
    console.log(matchFixture.id);
	//datesTournaments = fixturesList.fechas;
	$('#fixture-content').html('');
	var strBuilderListCards = [];
	//if (fixturesList == ""){
		strBuilderListCards.push('');
	//} else {
		//$.each( fixturesList, function( i, item ){
			strBuilderListCards.push('<div class="card">');
			//strBuilderListCards.push('<div class="card-header card-header-center card-header-fixtures">'+lblTournamentNameFixture+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+lblTournamentNameFixture+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block lastmatch-tournaments">');
			strBuilderListCards.push('<ul>');
			//if(fixturesList.fechaActual !== ""){
				$.each( matchFixture.encuentros, function( n, match ){
					console.log(match);
					strBuilderListCards.push('<a onclick="loadMatchDetailsFromFechas('+matchFixture.id+', '+match.id+')" href="#">');
					//strBuilderListCards.push('<div class="card-content">');
                            //strBuilderListCards.push('<div class="card-content-inner">');
                                //strBuilderListCards.push('<div class="list-block lastmatch-tournaments">');
                                    strBuilderListCards.push('<div class="item-content">');
                                        strBuilderListCards.push('<div class="row" id="row-lastmatch-tournament">');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament">');

                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-team">'+match.local.nombre+'</div>');
                                                if(match.local.imagenPrincipalMin != ""){
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                else{
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                            strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament col-lastmatch-tournament.middle">');
                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-date"><p>18/10/18</p></div>');
                                                //strBuilderListCards.push('<div class="col-lastmatch-tournament-nametournament">'+match.torneo.deporteCategoria.nombreCorto+'</div>');
                                                //strBuilderListCards.push('<div class="col-lastmatch-tournament-name">'+match.torneo.nombre+'</div>');
                                                if (match.local.tantos != "" || match.visitante.tantos != ""){
                                                    //strBuilderListCards.push('<td class="td-50-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>'+match.local.tantos+' - '+match.visitante.tantos+'</p></div>');
                                                    //strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>'+match.visitante.tantos+'</p></div>');
                                                    //strBuilderListCards.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+mainId+','+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                                    //strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                                } else {
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-result"><p>VS</p></div>');

                                                }

                                                /*if(match.liveMatch == true){
                                                    if(match.actualClock != "")
                                                    {
                                                        strBuilderListCards.push('<div class="col-lastmatch-tournament-date">'+messageLastEvent+' '+match.actualClock+'</div>');
                                                    }
                                                } else{*/
                                                    //strBuilderListCards.push('<div class="col-lastmatch-tournament-date">'+match.fechaEncuentro.fecha+'</div>');
                                                //}

                                            strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('<div class="col-33 col-lastmatch-tournament">');
                                                strBuilderListCards.push('<div class="col-lastmatch-tournament-team">'+match.visitante.nombre+'</div>');
                                                if(match.visitante.imagenPrincipalMin != ""){
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                else{
                                                    strBuilderListCards.push('<div class="col-lastmatch-tournament-shield"><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-lastmatch-fixtures" /></div>');
                                                }
                                                //strBuilderListCards.push('</div>');
                                            strBuilderListCards.push('</div>');
                                        strBuilderListCards.push('</div>');
                                        /*strBuilderListCards.push('<div class="description-lastmatch-tournament">');
                                            strBuilderListCards.push(match.visitante.nombre);
                                        strBuilderListCards.push('</div>');*/
                                    strBuilderListCards.push('</div>');
                            //strBuilderListCards.push('</div>');
                        //strBuilderListCards.push('</div>');
                    //strBuilderListCards.push('</div>');


				});
			//}
			strBuilderListCards.push('</ul>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		//});

	//}


	$('#fixture-content').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'fixtures'});
	myApp.initImagesLazyLoad(mainView.activePage.container);

}