var sportsList = [];
var areSportsLoaded = false;


myApp.onPageInit('sports', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	if(areSportsLoaded == true){
    	builderSportsList();
    }
    else {
    	loadSports();
    }
});

myApp.onPageBeforeAnimation('sports', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Deportes");
});

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
}

function builderSportsList(){
	$('#sports-list').html('');
	var strBuilderSportsContent = [];
	
	if(areSportsLoaded == true){
		if(sportsList == ""){
				strBuilderSportsContent.push('<div class="divNotSports"></div>');
		}
		else {
			strBuilderSportsContent.push('<div class="list-block"><ul>');
			$.each( sportsList, function( i, item ){
				var categoriesSportList = item.categories;
				if(categoriesSportList != ""){
					strBuilderSportsContent.push('<li class="accordion-item androidFix_4_1">');
						strBuilderSportsContent.push('<a href="#" class="item-content item-link">');
							strBuilderSportsContent.push('<div class="item-media">');
								strBuilderSportsContent.push('<i style="background-image: url('+item.urlImgContent+');" class="icon icon-list-header"></i>');
							strBuilderSportsContent.push('</div>');
							strBuilderSportsContent.push('<div class="item-inner">');
								strBuilderSportsContent.push('<div class="item-title">'+item.name+'</div>');
							strBuilderSportsContent.push('</div>');
						strBuilderSportsContent.push('</a>');
						strBuilderSportsContent.push('<div class="accordion-item-content accordion-item-content-sport">');
							strBuilderSportsContent.push('<div class="list-block">');
								strBuilderSportsContent.push('<ul>');
									$.each( categoriesSportList, function( i, cat ){
										strBuilderSportsContent.push('<li class="item-content">');
											strBuilderSportsContent.push('<a href="#" onclick="loadSportDetails('+item.idSport+','+cat.idCategory+')" class="item-link item-content">');
												strBuilderSportsContent.push('<div class="item-inner">');
													strBuilderSportsContent.push('<div class="item-title">'+cat.categoryName+'</div>');
												strBuilderSportsContent.push('</div>');
											strBuilderSportsContent.push('</a>');
										strBuilderSportsContent.push('</li>');
									});
								strBuilderSportsContent.push('<ul>');
							strBuilderSportsContent.push('</div>');
						strBuilderSportsContent.push('</div>');
					strBuilderSportsContent.push('</li>');
				}
			});
		strBuilderSportsContent.push('</ul></div>');
			
		}
	
	} else {
		strBuilderSportsContent.push('<div class="content-block content-block-information">');
			strBuilderSportsContent.push('<div id="divSportsErrorHeader"></div>');
	
			strBuilderSportsContent.push('<div id="divSportsErrorText"></div>');
			
			strBuilderSportsContent.push('<div onclick="loadSports()" class="link" id="divImgSportsError">');
				strBuilderSportsContent.push('<img id="imgSportsUpload" src="img/template/icon-upload.png" alt="Imagen publicitaria"/>');
			strBuilderSportsContent.push('</div>');
		strBuilderSportsContent.push('</div>');
	}
	$('#sports-list').append(strBuilderSportsContent.join(""));
	$('#divSportsErrorHeader').text(divErrorConnectionHeader);
	$('#divSportsErrorText').text(divErrorConnectionText);
	$('.divNotSports').text(divNotSports);
	
}