var installationsList = [];
var bannerInstallations = [];
var areInstallationsLoaded = false;
var arePageInstallationsBuild = false;


myApp.onPageInit('installations', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
	if(page.fromPage.name == 'about'){
		$$('#page-installations .page-content').scrollTop(0);
	}
});

myApp.onPageBeforeAnimation('installations', function (page)
{
	myApp.params.swipePanel = false;
	trackPageGA("Instalaciones");
});

function loadInstallations(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getInstallations',
			dataType: 'jsonp',
			data: { 'idClub': idClub },
			timeout: timeOut,
			success: function(response){
				// Response:
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
				installationsList = response.installations;
				
				bannerInstallations = response.banner;
				areInstallationsLoaded = true;
				builderInstallationsList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          hideLoadSpinnerWS();
		          showMessage(messageConexionError);
		   }
		});
}

function builderInstallationsList(){
	
	var strBuilderInstallationsContent = [];
	if(areInstallationsLoaded == true){
		if(installationsList.length == 0){
				showMessage(messageNotInstallations);
		}
		else if(arePageInstallationsBuild == false){
			$('#installations-list').html('');
			$.each( installationsList, function( i, item ){
				strBuilderInstallationsContent.push('<div class="card card-installations"><div class="card-content"><div class="list-block list-block-about media-list">');
					strBuilderInstallationsContent.push('<ul><li class="item-content">');
							strBuilderInstallationsContent.push('<a onclick="builderInstallationDetails('+item.id+')" href="#" class="item-link item-content">');
							
								strBuilderInstallationsContent.push('<div class="item-media">');
								strBuilderInstallationsContent.push('<img class="lazy lazy-fadeIn imgCardInstallation" data-src="'+item.urlImg+'" alt="'+item.altImg+'" />');
								strBuilderInstallationsContent.push('</div>');
								
								strBuilderInstallationsContent.push('<div class="item-inner">');
								strBuilderInstallationsContent.push('<div class="item-title-row">');
								strBuilderInstallationsContent.push('<div class="item-title">'+item.name+'</div>');
								strBuilderInstallationsContent.push('</div>');
								strBuilderInstallationsContent.push('<div class="item-text">'+item.shortDesc+'</div>');
								strBuilderInstallationsContent.push('</div>');
								
							strBuilderInstallationsContent.push('</a>');
					strBuilderInstallationsContent.push('</li></ul>');
				strBuilderInstallationsContent.push('</div></div></div>');
			});
			
			$('#installations-list').append(strBuilderInstallationsContent.join(""));
			mainView.router.load({pageName: 'installations'});
			myApp.initImagesLazyLoad(mainView.activePage.container);
			
			arePageInstallationsBuild = true;
			
		} else {
			mainView.router.load({pageName: 'installations'});
		}
	} else {
		loadInstallations();
	}
}