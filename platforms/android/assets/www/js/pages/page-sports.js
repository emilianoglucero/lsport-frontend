//var sportsList = [];
//var areSportsLoaded = false;
var categoriesSportList = [];


myApp.onPageInit('sports', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	//if(areSportsLoaded == true){
    	builderSportsList();
   // }
    //else {
    //	loadSports();
    //}
});

myApp.onPageBeforeAnimation('sports', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Deportes");
});
/*
function loadSports(){
	showLoadSpinnerWS();
	$('#sports-list').html('');
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getSportList',
			dataType: 'jsonp',
			data: { 'idClub': idClub },
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
				sportsList = response.sports;
				areSportsLoaded = true;
				builderSportsList();
				hideLoadSpinnerWS();

			},
			error: function (data, status, error){
		          builderSportsList();
		          hideLoadSpinnerWS();
		   }
		});
}*/

function builderSportsList(){
	$('#sports-list').html('');
	var strBuilderSportsContent = [];
	console.log(sportsList);
	console.log(activitiesList);
	
	//if(areSportsLoaded == true){
		if(sportsList == ""){
				strBuilderSportsContent.push('<div class="divNotSports"></div>');
		}
		else {
			strBuilderSportsContent.push('<div class="list-block"><ul>');
			$.each( sportsList, function( i, item ){
			console.log('lista deportes');
			console.log(item);
			console.log(item.enac);

				//var enacsSportList = item.enac;
				//console.log(enacsSportList);
				//if(item.enac != ""){
					strBuilderSportsContent.push('<li class="accordion-item androidFix_4_1">');
						strBuilderSportsContent.push('<a href="#" class="item-content item-link">');
							strBuilderSportsContent.push('<div class="item-media">');
								strBuilderSportsContent.push('<i style="background-image: url('+item.imagenPrincipalMin+');" class="icon icon-list-header"></i>');
							strBuilderSportsContent.push('</div>');
							strBuilderSportsContent.push('<div class="item-inner">');
								strBuilderSportsContent.push('<div class="item-title">'+item.nombre+'</div>');
							strBuilderSportsContent.push('</div>');
						strBuilderSportsContent.push('</a>');
						strBuilderSportsContent.push('<div class="accordion-item-content accordion-item-content-sport">');
							strBuilderSportsContent.push('<div class="list-block">');
								strBuilderSportsContent.push('<ul>');
									$.each( item.enac, function( i, enac ){
									//var categoriesSportList = enac.categorias;
									//console.log(enac.categorias);
									//categoriesSportList = enac.categorias;
									strBuilderSportsContent.push('<li class="accordion-item androidFix_4_1">');
										strBuilderSportsContent.push('<a href="#" class="item-content item-link">');
                                            strBuilderSportsContent.push('<div class="item-media">');
                                                strBuilderSportsContent.push('<i style="background-image: url('+enac.imagenPrincipalMin+');" class="icon icon-list-header"></i>');
                                            strBuilderSportsContent.push('</div>');
                                            strBuilderSportsContent.push('<div class="item-inner">');
                                                strBuilderSportsContent.push('<div class="item-title">'+enac.nombreCorto+'</div>');
                                            strBuilderSportsContent.push('</div>');
                                        strBuilderSportsContent.push('</a>');
                                        strBuilderSportsContent.push('<div class="accordion-item-content accordion-item-content-sport">');
                                            strBuilderSportsContent.push('<div class="list-block">');
                                                strBuilderSportsContent.push('<ul>');
                                                    $.each( enac.categorias, function( i, cat ){
                                                    console.log(cat);
                                                        strBuilderSportsContent.push('<li class="item-content">');
                                                            strBuilderSportsContent.push('<a href="#" onclick="loadSportDetails('+cat.id+')" class="item-link item-content">');
                                                                strBuilderSportsContent.push('<div class="item-inner">');
                                                                    strBuilderSportsContent.push('<div class="item-title">'+cat.nombreCorto+'</div>');
                                                                strBuilderSportsContent.push('</div>');
                                                            strBuilderSportsContent.push('</a>');
                                                        strBuilderSportsContent.push('</li>');
                                                    });
                                                strBuilderSportsContent.push('</ul>');
                                            strBuilderSportsContent.push('</div>');
                                        strBuilderSportsContent.push('</div>');
										strBuilderSportsContent.push('</li>');
									});
								strBuilderSportsContent.push('</ul>');
							strBuilderSportsContent.push('</div>');
						strBuilderSportsContent.push('</div>');
					strBuilderSportsContent.push('</li>');
				//}
			});
		strBuilderSportsContent.push('</ul></div>');
			
		}
	
	/*} else {
		strBuilderSportsContent.push('<div class="content-block content-block-information">');
			strBuilderSportsContent.push('<div id="divSportsErrorHeader"></div>');
	
			strBuilderSportsContent.push('<div id="divSportsErrorText"></div>');
			
			strBuilderSportsContent.push('<div onclick="loadSports()" class="link" id="divImgSportsError">');
				strBuilderSportsContent.push('<img id="imgSportsUpload" src="img/template/icon-upload.png" alt="Imagen publicitaria"/>');
			strBuilderSportsContent.push('</div>');
		strBuilderSportsContent.push('</div>');
	}*/
	$('#sports-list').append(strBuilderSportsContent.join(""));
	$('#divSportsErrorHeader').text(divErrorConnectionHeader);
	$('#divSportsErrorText').text(divErrorConnectionText);
	$('.divNotSports').text(divNotSports);
	
}