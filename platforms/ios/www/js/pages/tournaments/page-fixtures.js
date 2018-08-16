var fixturesList = [];

myApp.onPageInit('fixtures', function (page)
{
    
});

myApp.onPageBeforeAnimation('fixtures', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-fixtures .page-content').scrollTop(0);
	trackPageGA("Fixtures");
});

function loadFixtures(idTournament,nameTournamentSelected){
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

function builderFixturesDetails(nameTournamentSelected,banner){
	//$('#lblHeaderFixtures').text(nameTournamentSelected);
	$('#fixtures-list').html('');
	var strBuilderListCards = [];
	if (fixturesList == ""){
		strBuilderListCards.push('');
	} else {
		$.each( fixturesList, function( i, item ){
			strBuilderListCards.push('<div class="card">');
			strBuilderListCards.push('<div class="card-header card-header-center card-header-fixtures">'+nameTournamentSelected+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+item.tableTitle+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block general-information">');
			strBuilderListCards.push('<ul>');
			if(item.dates != ""){
				$.each( item.dates, function( n, date ){
					if(date.matches != ""){
						strBuilderListCards.push('<li>');
						strBuilderListCards.push('<a href="#" onclick="builderDatesList('+date.idDate+',\''+date.dateName+'\')" class="item-link item-content">');
						strBuilderListCards.push('<div class="item-inner">');
						strBuilderListCards.push('<div class="item-title">'+date.dateName+'</div>');
						strBuilderListCards.push('</div>');
						strBuilderListCards.push('</a>');
						strBuilderListCards.push('</li>');
					}
				});
			}
			strBuilderListCards.push('</ul>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		});
			
	}

	
	$('#fixtures-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'fixtures'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
}