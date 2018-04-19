myApp.onPageInit('positionstable', function (page)
{
    
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

function builderPositionsTableDetails(positionTables,banner,nameTournamentSelected){
	//$('#lblHeaderPositionsTables').text(nameTournamentSelected);
	$('#positionstable-list').html('');
	var strBuilderListCards = [];
	$.each(positionTables, function(n, table) {
		strBuilderListCards.push('<div class="card card-table-tournaments">');
		strBuilderListCards.push('<div class="card-header card-header-center card-header-positionstable">'+table.tournamentName+'</div>');
		strBuilderListCards.push('<div class="card-header card-header-center">'+table.tableTitle+'</div>');
		strBuilderListCards.push('<div class="card-content">');
		strBuilderListCards.push('<div class="card-content-inner">');
		strBuilderListCards.push('<div class="list-block">');
		strBuilderListCards.push('<div style="overflow-x:auto;">');
		strBuilderListCards.push('<table class="table-tournaments table-positionstable">');
		strBuilderListCards.push('<tr class="tr-header">');
			if(table.tableHeader.header1 != "" && table.tableHeader.header1 != undefined){
				strBuilderListCards.push('<th class="th-40-tournaments">'+table.tableHeader.header1+'</th>');
			}
			if(table.tableHeader.header2 != "" && table.tableHeader.header2 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header2+'</th>');
			}
			if(table.tableHeader.header3 != "" && table.tableHeader.header3 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header3+'</th>');
			}
			if(table.tableHeader.header4 != "" && table.tableHeader.header4 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header4+'</th>');
			}
			if(table.tableHeader.header5 != "" && table.tableHeader.header5 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header5+'</th>');
			}
			if(table.tableHeader.header6 != "" && table.tableHeader.header6 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header6+'</th>');
			}
			if(table.tableHeader.header7 != "" && table.tableHeader.header7 != undefined){
				strBuilderListCards.push('<th class="th-10-tournaments">'+table.tableHeader.header7+'</th>');
			}
		strBuilderListCards.push('</tr>');
		
			
		$.each(table.tableBody, function(i, item) {
			strBuilderListCards.push('<tr>');
			var pos = i+1;
			if(item.cellValue1 != "" && item.cellValue1 != undefined){
				strBuilderListCards.push('<td class="td-40-tournaments"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.cellValue1+'</span></th>');
			}
			if(item.cellValue2 != "" && item.cellValue2 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue2+'</th>');
			}
			if(item.cellValue3 != "" && item.cellValue3 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue3+'</th>');
			}
			if(item.cellValue4 != "" && item.cellValue4 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue4+'</th>');
			}
			if(item.cellValue5 != "" && item.cellValue5 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue5+'</th>');
			}
			if(item.cellValue6 != "" && item.cellValue6 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue6+'</th>');
			}
			if(item.cellValue7 != "" && item.cellValue7 != undefined){
				strBuilderListCards.push('<td class="td-10-tournaments">'+item.cellValue7+'</th>');
			}
			strBuilderListCards.push('</tr>');
		});
			
		strBuilderListCards.push('</table>');
		strBuilderListCards.push('</div>');
		if(table.tableNotes != "" || table.tableNotes != undefined){
			strBuilderListCards.push('<div class="description-table-tournament">'+table.tableNotes+'</div>');
		}
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
	});
	
	$('#positionstable-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'positionstable'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
}