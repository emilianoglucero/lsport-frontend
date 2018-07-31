//var idLiveMatchActivePage = null;
myApp.onPageInit('matchdetailsfixture', function (page)
{
    $('#lblHeaderMatchDetailsFixture').text(lblHeaderMatchDetailsFixture);
});

myApp.onPageBeforeAnimation('matchdetailsfixture', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-matchdetailsfixture .page-content').scrollTop(0);
	//trackPageGA("Detalle Partido");
});

myApp.onPageBack('matchdetailsfixture', function (page){
	//idLiveMatchActivePage=null;
});

function loadMatchDetailsFixture(idNew){
	        showLoadSpinnerWS();
	        console.log(idNew);
	        console.log(allSucesosFechaTorneoList);
	        //var homeDetails2ListCalendario = newsListHome;

	        	var matchDetailsHomeDate = allSucesosFechaTorneoList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                matchDetailsHomeDate = matchDetailsHomeDate[0];
                console.log(matchDetailsHomeDate);


            builderDetailsMatchDetailsFixture(matchDetailsHomeDate);
            mainView.router.load({pageName: 'matchdetailsfixture'});
            myApp.initImagesLazyLoad(mainView.activePage.container);
			hideLoadSpinnerWS();

}


/*function refreshMatchDetails(idMatch){
	$('#icon-refresh-matchdetails').hide();
	//showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getMatchDetail',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'idMatch': idMatch
		 },
		timeout: timeOut,
		success: function(response){
			if(response.errorCode != 0)
			{
			    filterCodeErrorWS(response);
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				mainView.router.load({pageName: 'update'});
				return;
			}
			if (response.matchDetail == "" || response.matchDetail == undefined){
			    showMessage(messageConexionError);
			    return;
			}
			
			if(idLiveMatchActivePage != idMatch){
				$('#lblHeaderMatchDetails').text(response.matchDetail.shortCategoryName);
				$('.icon-sportDetails').css('background-image','url("'+response.matchDetail.urlImgHeader+'")');
				idLiveMatchActivePage = idMatch;
			}
			builderMatchDetails(response.matchDetail,response.banner);
			//hideLoadSpinnerWS();
		},
		error: function (data, status, error){
	          //hideLoadSpinnerWS();
	          showMessage(messageConexionError);
	          $("#icon-refresh-matchdetails").off("click");
	          $('#icon-refresh-matchdetails').show();
	          $('#icon-refresh-matchdetails').click(function (){
	          	refreshMatchDetails(idMatch);
	          });
		}
	});

}*/


/*function builderMatchDetails(match){
	
	$('#matchdetails-list').html('');
	var strBuilderMatchDetails = [];
	
	strBuilderMatchDetails.push(builderDetailsMatchDetails(match));
	
	$('#matchdetails-list').append(strBuilderMatchDetails.join(""));
	mainView.router.load({pageName: 'matchdetails'});
	myApp.initImagesLazyLoad(mainView.activePage.container);
	if(idLiveMatchSportDetails == match.idMatch && $('#card-livematch-sportdetails').length != 0){
		$('#card-livematch-sportdetails').html(builderLastMatchTournamentsSportDetails(match));
	}
}*/

function builderDetailsMatchDetailsFixture(item){
console.log(item);
console.log(item.id);
var mainId = item.id;
	var strBuilderMatchDetailsDate = [];
	$('#matchdetailsfixture-list').html('');
	//$.each( fixturesList, function( i, item ){
                    //$.each( item.dates, function( n, date ){
                            //if (date.idDate == idDateSelected){
                                //$('#lblHeaderDatesList').text(item.tableTitle);
                                strBuilderMatchDetailsDate.push('<div class="card card-table-tournaments">');
                                //strBuilderMatchDetailsDate.push('<div class="card-header card-header-center card-header-datelist">'+item.nombre'</div>');
                                //strBuilderMatchDetailsDate.push('<div class="card-header card-header-center card-header-datelist">primera division</div>');
                                strBuilderMatchDetailsDate.push('<div class="card-header card-header-center">'+item.nombre+'</div>');
                                strBuilderMatchDetailsDate.push('<div class="card-content">');
                                strBuilderMatchDetailsDate.push('<div class="card-content-inner">');
                                strBuilderMatchDetailsDate.push('<div class="list-block lastmatch-tournaments">');
                                strBuilderMatchDetailsDate.push('<div class="item-content" style="overflow-x:auto;">');
                                strBuilderMatchDetailsDate.push('<table class="table-tournaments table-datelist">');

                                $.each( item.encuentros, function( n, match ){
                                console.log(match.id);
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
                                                        strBuilderMatchDetailsDate.push('<tr>');
                                                        strBuilderMatchDetailsDate.push('<td class="td-35-tournaments">');
                                                        strBuilderMatchDetailsDate.push('<div>'+match.local.nombre+'</div>');
                                                        if (match.local.imagenPrincipalMin != ""){
                                                            strBuilderMatchDetailsDate.push('<div><img data-src="'+match.local.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                        }
                                                        else{
                                                            strBuilderMatchDetailsDate.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                        }
                                                        strBuilderMatchDetailsDate.push('</td>');
                                                        strBuilderMatchDetailsDate.push('<td class="td-30-tournaments">');
                                                        strBuilderMatchDetailsDate.push('<table>');
                                                        if (match.local.tantos != "" || match.visit.tantos != ""){
                                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.local.tantos+'</td>');
                                                            strBuilderMatchDetailsDate.push('<td class="td-30-tournaments"><a onclick="loadMatchDetailsFromFixture('+mainId+','+match.id+')" href="#" class="button">'+lblSeeMoreDatesList+'</a></td>');
                                                            strBuilderMatchDetailsDate.push('<td class="td-35-tournaments td-scrore-datelist">'+match.visitante.tantos+'</td>');
                                                        } else {
                                                            strBuilderMatchDetailsDate.push('<td>'+match.getFechaOcurrencia.fecha+'</td>');

                                                        }

                                                    //}
                                                        strBuilderMatchDetailsDate.push('</tr>');
                                                        strBuilderMatchDetailsDate.push('</table>');
                                                        strBuilderMatchDetailsDate.push('</td>');
                                                        strBuilderMatchDetailsDate.push('<td class="td-35-tournaments">');
                                                            strBuilderMatchDetailsDate.push('<div>'+match.visitante.nombre+'</div>');
                                                            //if (match.visit.urlShield != ""){
                                                                strBuilderMatchDetailsDate.push('<div><img data-src="'+match.visitante.imagenPrincipalMin+'" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                            //}
                                                            //else{
                                                                //strBuilderMatchDetailsDate.push('<div><img data-src="img/icon-shield-default.png" class="lazy lazy-fadeIn img-shield-datelist" ></div>');
                                                            //}
                                                        strBuilderMatchDetailsDate.push('</td>');
                                                        strBuilderMatchDetailsDate.push('</tr>');
                                });

                                strBuilderMatchDetailsDate.push('</table>');
                                strBuilderMatchDetailsDate.push('</div>');
                                //if(date.freeTeam != ""){
                                    //strBuilderMatchDetailsDate.push('<div class="description-lastmatch-tournament">'+lblFreeTeam++match.fecha.freeTeam+'</div>');
                                //}
                                strBuilderMatchDetailsDate.push('</div>');
                                strBuilderMatchDetailsDate.push('</div>');
                                strBuilderMatchDetailsDate.push('</div>');
                                strBuilderMatchDetailsDate.push('</div>');
                                $('#matchdetailsfixture-list').append(strBuilderMatchDetailsDate.join(""));
                                //mainView.router.load({pageName: 'matchdetailsfixture'});
                                //myApp.initImagesLazyLoad(mainView.activePage.container);
}

/*function builderErrorMatchDetails(idMatch){
	$('#matchdetails-list').html('');
	$('#lblHeaderMatchDetails').text(lblDetailsMatchDetails);
	$('.icon-sportDetails').css('background-image','url("img/template/icon-sports.png")');
	var strBuilderMatchDetailsContent = [];
	strBuilderMatchDetailsContent.push('<div class="content-block content-block-information">');
		strBuilderMatchDetailsContent.push('<div id="divMatchDetailsErrorHeader">'+divErrorConnectionHeader+'</div>');
		strBuilderMatchDetailsContent.push('<div id="divMatchDetailsErrorText">'+divErrorConnectionText+'</div>');
		strBuilderMatchDetailsContent.push('<div onclick="loadMatchDetails('+idMatch+')" class="link" id="divImgMatchDetailsError">');
			strBuilderMatchDetailsContent.push('<img id="imgMatchDetailsUpload" src="img/template/icon-upload.png" />');
		strBuilderMatchDetailsContent.push('</div>');
	strBuilderMatchDetailsContent.push('</div>');
	$('#matchdetails-list').append(strBuilderMatchDetailsContent.join(""));
	mainView.router.load({pageName: 'matchdetails'});
}*/