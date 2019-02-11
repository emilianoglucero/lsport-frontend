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

/*function loadInstallations(){
	showLoadSpinnerWS();
    //bannerInstallations = response.banner;
    //installationsList = response;
    console.log(installationsList);
    //if (installationsList){
    //console.log('areInstallationsLoaded set to true');
    //    areInstallationsLoaded = true;
    //}
    builderInstallationsList();
    hideLoadSpinnerWS();
}*/

function builderInstallationsList(response){
	installationsList = response;
	console.log(installationsList);
	console.log(installationsList.length)
	console.log(areInstallationsLoaded);
	console.log(arePageInstallationsBuild);
	var strBuilderInstallationsContent = [];
	//if(areInstallationsLoaded == true){
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
								strBuilderInstallationsContent.push('<img class="lazy lazy-fadeIn imgCardInstallation" data-src="'+item.imagenPrincipalMin+'" alt="'+item.imagenPrincipalMin+'" />');
								strBuilderInstallationsContent.push('</div>');
								
								strBuilderInstallationsContent.push('<div class="item-inner">');
								strBuilderInstallationsContent.push('<div class="item-title-row">');
								strBuilderInstallationsContent.push('<div class="item-title">'+item.nombre+'</div>');
								strBuilderInstallationsContent.push('</div>');
								strBuilderInstallationsContent.push('<div class="item-text">'+item.descripcion+'</div>');
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
	/*} else {
		loadInstallations();
	}*/
}