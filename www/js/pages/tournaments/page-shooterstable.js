myApp.onPageInit('shooterstable', function (page)
{
    
});

myApp.onPageBeforeAnimation('shooterstable', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-shooterstable .page-content').scrollTop(0);
	trackPageGA("Tabla de Anotaciones");
});

function loadShootersTable(idTournament, nameTournamentSelected){
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getScorersTables',
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
			if(response.scorersTables == "" || response.scorersTables == undefined )
			{
			    hideLoadSpinnerWS();
			    showMessage(messageConexionError);
			    return;
			}
			builderShootersTableDetails(response.scorersTables,response.banner,nameTournamentSelected);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
		}
	});
}


function builderShootersTableDetails(scorersTables,banner,nameTournamentSelected){
	//$('#lblHeaderShootersTables').text(nameTournamentSelected);
	$('#shooterstable-list').html('');
	var strBuilderListCards = [];
	$.each(scorersTables, function(n, table) {
		if(table.tableTitle != "" && table.tableHeader != "" && table.tableBody != "" ){
			strBuilderListCards.push('<div class="card card-table-tournaments">');
			strBuilderListCards.push('<div class="card-header card-header-center card-header-shooterstable">'+table.tournamentName+'</div>');
			strBuilderListCards.push('<div class="card-header card-header-center">'+table.tableTitle+'</div>');
			strBuilderListCards.push('<div class="card-content">');
			strBuilderListCards.push('<div class="card-content-inner">');
			strBuilderListCards.push('<div class="list-block">');
			strBuilderListCards.push('<div style="overflow-x:auto;">');
			strBuilderListCards.push('<table class="table-tournaments table-shooterstable">');
			strBuilderListCards.push('<tr class="tr-header">');
				if(table.tableHeader.header1 != "" && table.tableHeader.header1 != undefined){
					strBuilderListCards.push('<th class="th-40-tournaments th-tournaments-first">'+table.tableHeader.header1+'</th>');
				}
				if(table.tableHeader.header2 != "" && table.tableHeader.header2 != undefined){
					strBuilderListCards.push('<th class="th-40-tournaments">'+table.tableHeader.header2+'</th>');
				}
				if(table.tableHeader.header3 != "" && table.tableHeader.header3 != undefined){
					strBuilderListCards.push('<th class="th-20-tournaments">'+table.tableHeader.header3+'</th>');
				}
			strBuilderListCards.push('</tr>');
			
				
			$.each(table.tableBody, function(i, item) {
				var pos = i+1;
				strBuilderListCards.push('<tr>');
				if(item.cellValue1 != "" && item.cellValue1 != undefined){
					strBuilderListCards.push('<td class="td-40-tournaments td-40-tournaments-first"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.cellValue1+'</span></td>');
				}
				if(item.cellValue2 != "" && item.cellValue2 != undefined){
					strBuilderListCards.push('<td class="td-40-tournaments">'+item.cellValue2+'</td>');
				}
				if(item.cellValue3 != "" && item.cellValue3 != undefined){
					strBuilderListCards.push('<td class="td-20-tournaments">'+item.cellValue3+'</td>');
				}
				strBuilderListCards.push('</tr>');
			});
				
			strBuilderListCards.push('</table>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
			strBuilderListCards.push('</div>');
		}
			
	});
	
	$('#shooterstable-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'shooterstable'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
}