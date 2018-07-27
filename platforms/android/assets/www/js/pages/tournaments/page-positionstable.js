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

function loadPositionsTableDetails(idTournament){
     showLoadSpinnerWS();
        console.log(idTournament);
        console.log(newsDetailsHome);

        var newsDetailsHome = allSucesosPageList.filter(function( obj ) {
          return obj.id == idTournament;
        });
        newsDetailsHome = newsDetailsHome[0];


        // averiguar como hacer esto builderNewBanner(response.banner);
        builderPositionsTableDetails(newsDetailsHome);
     hideLoadSpinnerWS();


}

function builderPositionsTableDetails(positionTables){
console.log(positionTables);
	//$('#lblHeaderPositionsTables').text(nameTournamentSelected);
	$('#positionstable-list').html('');
	var strBuilderListCards = [];
	//$.each(positionTables, function(n, table) {
	//console.log(table);
		strBuilderListCards.push('<div class="card card-table-tournaments">');
		strBuilderListCards.push('<div class="card-header card-header-center card-header-positionstable">'+positionTables.titulo+'</div>');
		strBuilderListCards.push('<div class="card-header card-header-center">'+positionTables.titulo+'</div>');
		strBuilderListCards.push('<div class="card-content">');
		strBuilderListCards.push('<div class="card-content-inner">');
		strBuilderListCards.push('<div class="list-block">');
		strBuilderListCards.push('<div style="overflow-x:auto;">');
		strBuilderListCards.push('<table class="table-tournaments table-positionstable">');
		strBuilderListCards.push('<tr class="tr-header">');
			$.each(positionTables.tablaGeneral.cabecera, function(i, item) {
            //console.log(item.nombreCorto);
            //console.log(item.columna);
                if (item.columna == 'eq'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-40-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'pt'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-10-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'pj'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-10-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'pe'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'pp'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'tf'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'tc'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'td'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                } else if (item.columna == 'pt'){
                    if(item.columna != "" && item.columna != undefined){
                        strBuilderListCards.push('<th class="th-8-tournaments">'+item.nombreCorto+'</th>');
                    }
                }


                //}
            });
		strBuilderListCards.push('</tr>');

		$.each(positionTables.tablaGeneral.cuerpo, function(i, item) {
			strBuilderListCards.push('<tr>');
			var pos = i+1;
			if(item.eq.nombre !== "" && item.eq.nombre !== undefined){
                strBuilderListCards.push('<td class="td-40-tournaments"><span class="td-span-team-pos">'+pos+'</span><span class="td-span-team-name">'+item.eq.nombre+'</span></th>');
            }
			if(item.pt !== "" && item.pt !== undefined){
                strBuilderListCards.push('<td class="td-10-tournaments">'+item.pt+'</th>');
            }
			if(item.pj !== "" && item.pj !== undefined){
                strBuilderListCards.push('<td class="td-10-tournaments">'+item.pj+'</th>');
            }
			if(item.pe !== "" && item.pe !== undefined){
                strBuilderListCards.push('<td class="td-8-tournaments">'+item.pe+'</th>');
            }
			if(item.pp !== "" && item.pp !== undefined){
                strBuilderListCards.push('<td class="td-8-tournaments">'+item.pp+'</th>');
            }
			if(item.tf !== "" && item.tf !== undefined){
                strBuilderListCards.push('<td class="td-8-tournaments">'+item.tf+'</th>');
            }
			if(item.tc !== "" && item.tc !== undefined){
                strBuilderListCards.push('<td class="td-8-tournaments">'+item.tc+'</th>');
            }
			strBuilderListCards.push('</tr>');
		});
			
		strBuilderListCards.push('</table>');
		strBuilderListCards.push('</div>');
		/*if(positionTables.tableNotes != "" || table.tableNotes != undefined){
			strBuilderListCards.push('<div class="description-table-tournament">'+table.tableNotes+'</div>');
		}*/
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
		strBuilderListCards.push('</div>');
	//});
	
	$('#positionstable-list').append(strBuilderListCards.join(""));
	mainView.router.load({pageName: 'positionstable'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
}