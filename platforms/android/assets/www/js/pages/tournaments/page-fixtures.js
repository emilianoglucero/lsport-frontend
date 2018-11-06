var fixturesList = [];
var datesTournaments = [];
var tournamentFixture;
var lblTournamentNameFixture;

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
        $('.lblHeaderTournaments').text(fixturesList.fechaActual.nombre);
    } else {
        $('#selectFixtureDetails').append('<option value="'+item.id+'">'+item.nombre+'</option>');
    }

});



	//$('#lblHeaderFixtures').text(nameTournamentSelected);
	console.log(fixturesList);
	datesTournaments = fixturesList.fechas;
	lblTournamentNameFixture = fixturesList.deporteCategoria.nombre;
	$('#fixtures-list').html('');
	var strBuilderListCards = [];
	if (fixturesList == ""){
		strBuilderListCards.push('');
	} else {
		//$.each( fixturesList, function( i, item ){
			strBuilderListCards.push('<div class="card">');
			strBuilderListCards.push('<div class="card-header card-header-center card-header-fixtures">'+fixturesList.deporteCategoria.nombreCorto+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+fixturesList.nombre+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block general-information">');
			strBuilderListCards.push('<ul>');
			if(fixturesList.fechaActual !== ""){
				$.each( fixturesList.fechaActual.encuentros, function( n, match ){
					console.log(match.id);
					//var strBuilderMatchDetailsDate = [];
                    /*if(match.interzonal == true){
                                        strBuilderMatchDetailsDate.push('<tr class="interzonal-datelist">');
                                        strBuilderMatchDetailsDate.push('<td class="td-35-tournaments">');
                                        strBuilderMatchDetailsDate.push('<div>'+match.local.name+'</div>');
                                        if (match.local.urlShield != ""){
                                            strBuilderMatchDetailsDate.push('<div><img data-src="'+match.local.urlShield+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        else{
                                            strBuilderMatchDetailsDate.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            }
                                            strBuilderMatchDetailsDate.push('</td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-30-tournaments">');
                                            strBuilderMatchDetailsDate.push('<table>');
                                        if (match.local.score != "" || match.visit.score != ""){
                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.score+'</td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-30-tournaments"><div class="interzonal-label-datelist">'+lblInterzonal+'</div><a onclick="loadMatchDetails('+match.idMatch+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visit.score+'</td>');
                                        } else {
                                            strBuilderMatchDetailsDate.push('<td><div class="interzonal-label-datelist">'+lblInterzonal+'</div><div>'+match.matchDate+'</div></td>');
                                        }

                     }else{*/
                                        strBuilderListCards.push('<tr>');
                                        strBuilderListCards.push('<td class="td-35-tournaments">');
                                        strBuilderListCards.push('<div>'+match.local.nombre+'</div>');
                                        if (match.local.imagenPrincipalMin != ""){
                                            strBuilderListCards.push('<div><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        else{
                                            strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('<td class="td-30-tournaments">');
                                        strBuilderListCards.push('<table>');
                                        if (match.local.tantos != "" || match.visit.tantos != ""){
                                            strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                            strBuilderListCards.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                            strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                        } else {
                                            strBuilderListCards.push('<td>'+match.getFechaOcurrencia.fecha+'</td>');

                                        }

                                    //}
                                        strBuilderListCards.push('</tr>');
                                        strBuilderListCards.push('</table>');
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('<td class="td-35-tournaments">');
                                            strBuilderListCards.push('<div>'+match.visitante.nombre+'</div>');
                                            //if (match.visit.urlShield != ""){
                                                strBuilderListCards.push('<div><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            //}
                                            //else{
                                                //strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            //}
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('</tr>');
				});
			}
			strBuilderListCards.push('</ul>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		//});
			
	}

	
	$('#fixtures-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'fixtures'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
}


function builderFixturesDetailsFromSelect(idDate){




	//$('#lblHeaderFixtures').text(nameTournamentSelected);
	console.log(tournamentFixture.fechas);
	var tournamentFixtureFechas = tournamentFixture.fechas;
	console.log(idDate);

	var matchFixture = tournamentFixtureFechas.filter(function( obj ) {
      return obj.id == idDate;
    });
    matchFixture = matchFixture[0];
    console.log(matchFixture);
	//datesTournaments = fixturesList.fechas;
	$('#fixtures-list').html('');
	var strBuilderListCards = [];
	//if (fixturesList == ""){
		strBuilderListCards.push('');
	//} else {
		//$.each( fixturesList, function( i, item ){
			strBuilderListCards.push('<div class="card">');
			strBuilderListCards.push('<div class="card-header card-header-center card-header-fixtures">'+lblTournamentNameFixture+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+matchFixture.nombre+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block general-information">');
			strBuilderListCards.push('<ul>');
			//if(fixturesList.fechaActual !== ""){
				$.each( matchFixture.encuentros, function( n, matchFixture ){
					console.log(matchFixture.id);
					//var strBuilderMatchDetailsDate = [];
                    /*if(match.interzonal == true){
                                        strBuilderMatchDetailsDate.push('<tr class="interzonal-datelist">');
                                        strBuilderMatchDetailsDate.push('<td class="td-35-tournaments">');
                                        strBuilderMatchDetailsDate.push('<div>'+match.local.name+'</div>');
                                        if (match.local.urlShield != ""){
                                            strBuilderMatchDetailsDate.push('<div><img data-src="'+match.local.urlShield+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        else{
                                            strBuilderMatchDetailsDate.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            }
                                            strBuilderMatchDetailsDate.push('</td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-30-tournaments">');
                                            strBuilderMatchDetailsDate.push('<table>');
                                        if (match.local.score != "" || match.visit.score != ""){
                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.score+'</td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-30-tournaments"><div class="interzonal-label-datelist">'+lblInterzonal+'</div><a onclick="loadMatchDetails('+match.idMatch+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visit.score+'</td>');
                                        } else {
                                            strBuilderMatchDetailsDate.push('<td><div class="interzonal-label-datelist">'+lblInterzonal+'</div><div>'+match.matchDate+'</div></td>');
                                        }

                     }else{*/
                                        strBuilderListCards.push('<tr>');
                                        strBuilderListCards.push('<td class="td-35-tournaments">');
                                        strBuilderListCards.push('<div>'+matchFixture.local.nombre+'</div>');
                                        if (matchFixture.local.imagenPrincipalMin != ""){
                                            strBuilderListCards.push('<div><img data-src="'+matchFixture.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        else{
                                            strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                        }
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('<td class="td-30-tournaments">');
                                        strBuilderListCards.push('<table>');
                                        if (matchFixture.local.tantos != "" || matchFixture.visit.tantos != ""){
                                            strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+matchFixture.local.tantos+'</td>');
                                            strBuilderListCards.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+matchFixture.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                            strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">'+matchFixture.visitante.tantos+'</td>');
                                        } else {
                                            strBuilderListCards.push('<td>'+matchFixture.getFechaOcurrencia.fecha+'</td>');

                                        }

                                    //}
                                        strBuilderListCards.push('</tr>');
                                        strBuilderListCards.push('</table>');
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('<td class="td-35-tournaments">');
                                            strBuilderListCards.push('<div>'+matchFixture.visitante.nombre+'</div>');
                                            //if (match.visit.urlShield != ""){
                                                strBuilderListCards.push('<div><img data-src="'+matchFixture.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            //}
                                            //else{
                                                //strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                            //}
                                        strBuilderListCards.push('</td>');
                                        strBuilderListCards.push('</tr>');
				});
			//}
			strBuilderListCards.push('</ul>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		//});

	//}


	$('#fixtures-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'fixtures'});
	myApp.initImagesLazyLoad(mainView.activePage.container);

}