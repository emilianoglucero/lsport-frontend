myApp.onPageInit('dateslist', function (page) {

});

myApp.onPageBeforeAnimation('datelist', function (page) {
	myApp.params.swipePanel = false;
	$$('#page-dateslist .page-content').scrollTop(0);
	trackPageGA("Detalle Fecha");
});

function loadDatesList(idTournament) {
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getPositionTables',
		dataType: 'jsonp',
		data: {
			'idClub': idClub,
			'idTournament': idTournament
		},
		timeout: timeOut,
		success: function (response) {
			if (response.errorCode != 0) {
				hideLoadSpinnerWS();
				filterCodeErrorWS(response);
				return;
			}
			if (isAppUpdate(response.serverVersion) == false) {
				hideLoadSpinnerWS();
				mainView.router.load({ pageName: 'update' });
				return;
			}
			if (response.positionTables == "" || response.positionTables == undefined) {
				hideLoadSpinnerWS();
				showMessage(messageConexionError);
				return;
			}
			builderPositionsTableDetails(response.positionTables, response.banner);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error) {
			hideLoadSpinnerWS();
			showMessage(messageConexionError);
		}
	});
}

function builderDatesList(idDateSelected, nameDateSelected) {
	$('#datelist-list').html('');
	var strBuilderListCards = [];
	$.each(fixturesList, function (i, item) {
		$.each(item.dates, function (n, date) {
			if (date.idDate == idDateSelected) {
				//$('#lblHeaderDatesList').text(item.tableTitle);
				strBuilderListCards.push('<div class="card card-table-tournaments">');
				strBuilderListCards.push('<div class="card-header card-header-center card-header-datelist">' + date.tournamentName + '</div>');
				strBuilderListCards.push('<div class="card-header card-header-center card-header-datelist">' + item.tableTitle + '</div>');
				strBuilderListCards.push('<div class="card-header card-header-center">' + nameDateSelected + '</div>');
				strBuilderListCards.push('<div class="card-content">');
				strBuilderListCards.push('<div class="card-content-inner">');
				strBuilderListCards.push('<div class="list-block lastmatch-tournaments">');
				strBuilderListCards.push('<div class="item-content" style="overflow-x:auto;">');
				strBuilderListCards.push('<table class="table-tournaments table-datelist">');

				$.each(date.matches, function (n, match) {
					if (match.interzonal == true) {
						strBuilderListCards.push('<tr class="interzonal-datelist">');
						strBuilderListCards.push('<td class="td-35-tournaments">');
						strBuilderListCards.push('<div>' + match.local.name + '</div>');
						if (match.local.urlShield != "") {
							strBuilderListCards.push('<div><img data-src="' + match.local.urlShield + '" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
						}
						else {
							strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
						}
						strBuilderListCards.push('</td>');
						strBuilderListCards.push('<td class="td-30-tournaments">');
						strBuilderListCards.push('<table>');
						if (match.local.score != "" || match.visit.score != "") {
							strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">' + match.local.score + '</td>');
							strBuilderListCards.push('<td class="td-30-tournaments"><div class="interzonal-label-datelist">' + lblInterzonal + '</div><a onclick="loadMatchDetails(' + match.idMatch + ')" href="#" class="button">' + lblSeeMoreDatesList + '</a></td>');
							strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">' + match.visit.score + '</td>');
						} else {
							strBuilderListCards.push('<td><div class="interzonal-label-datelist">' + lblInterzonal + '</div><div>' + match.matchDate + '</div></td>');
						}

					} else {
						strBuilderListCards.push('<tr>');
						strBuilderListCards.push('<td class="td-35-tournaments">');
						strBuilderListCards.push('<div>' + match.local.name + '</div>');
						if (match.local.urlShield != "") {
							strBuilderListCards.push('<div><img data-src="' + match.local.urlShield + '" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
						}
						else {
							strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
						}
						strBuilderListCards.push('</td>');
						strBuilderListCards.push('<td class="td-30-tournaments">');
						strBuilderListCards.push('<table>');
						if (match.local.score != "" || match.visit.score != "") {
							strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">' + match.local.score + '</td>');
							strBuilderListCards.push('<td class="td-30-tournaments"><a onclick="loadMatchDetails(' + match.idMatch + ')" href="#" class="button">' + lblSeeMoreDatesList + '</a></td>');
							strBuilderListCards.push('<td class="td-35-tournaments td-scrore-datelist">' + match.visit.score + '</td>');
						} else {
							strBuilderListCards.push('<td>' + match.matchDate + '</td>');

						}

					}
					strBuilderListCards.push('</tr>');
					strBuilderListCards.push('</table>');
					strBuilderListCards.push('</td>');
					strBuilderListCards.push('<td class="td-35-tournaments">');
					strBuilderListCards.push('<div>' + match.visit.name + '</div>');
					if (match.visit.urlShield != "") {
						strBuilderListCards.push('<div><img data-src="' + match.visit.urlShield + '" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
					}
					else {
						strBuilderListCards.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
					}
					strBuilderListCards.push('</td>');
					strBuilderListCards.push('</tr>');
				});

				strBuilderListCards.push('</table>');
				strBuilderListCards.push('</div>');
				if (date.freeTeam != "") {
					strBuilderListCards.push('<div class="description-lastmatch-tournament">' + lblFreeTeam + ' ' + date.freeTeam + '</div>');
				}
				strBuilderListCards.push('</div>');
				strBuilderListCards.push('</div>');
				strBuilderListCards.push('</div>');
				strBuilderListCards.push('</div>');
			}
		});
	});

	$('#datelist-list').append(strBuilderListCards.join(""));
	mainView.router.load({ pageName: 'dateslist' });
	myApp.initImagesLazyLoad(mainView.activePage.container);
}