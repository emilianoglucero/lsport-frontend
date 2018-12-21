var managersList = [];
var bannerManagers = [];
var areManagersLoaded = false;
var arePageManagersBuild = false;

myApp.onPageInit('managers', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('managers', function (page)
{
	myApp.params.swipePanel = false;
	if(page.fromPage.name == 'about'){
		$$('#page-managers .page-content').scrollTop(0);
	}
	trackPageGA("Comision Directiva");
});

function loadManagers(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getManagers',
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
				managersList = response.managersRole;
				bannerManagers = response.banner;
				areManagersLoaded = true;
				builderManagersList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          hideLoadSpinnerWS();
		          showMessage(messageConexionError);
		   }
		});
}

function builderManagersList(managersList){
	console.log(managersList);
	var strBuilderManagersContent = [];
	//if(areManagersLoaded == true){
		if(managersList.length == 0){
				showMessage(messageNotManagers);
		}
		else if(arePageManagersBuild == false){
			$('#managers-list').html('');
			$.each( managersList, function( i, item ){
				
				strBuilderManagersContent.push('<div class="card card-managers">');
					strBuilderManagersContent.push('<div class="card-managers-content">');
					strBuilderManagersContent.push('<div class="card-header">'+item.cargo.nombre+'</div>');

					//$.each(item.managers, function(index, value) {
						strBuilderManagersContent.push('<div class="card-content">');
							strBuilderManagersContent.push('<div class="card-content-inner">');
								strBuilderManagersContent.push('<div class="manager-avatar">');
									var urlImgProfile = getDefaultImageProfile();
									if(item.imgProfile != ""){
										urlImgProfile = item.persona.imagenPrincipalMin;
									}
									strBuilderManagersContent.push('<img data-src="'+urlImgProfile+'" alt="'+item.persona.imagenPrincipalMin+'" class="lazy lazy-fedeIn" />');
								strBuilderManagersContent.push('</div>');
							strBuilderManagersContent.push('<div class="manager-name">'+item.persona.nombre+'</div>');
							strBuilderManagersContent.push('<div class="manager-date">'+item.fechaDesde+'</div>');
							strBuilderManagersContent.push('<div class="manager-date"><a href="#" onclick="openPhoneCaller(\''+item.phone+'\')">'+item.phone+'</a></div>');
							strBuilderManagersContent.push('<div class="manager-date"><a href="#" onclick="openMailer(\''+lblSubjectEmail+'\',\''+item.persona.correo+'\')">'+item.persona.correo+'</a></div>');
							strBuilderManagersContent.push('<p>'+item.observaciones+'</p>');
						strBuilderManagersContent.push('</div>');
						strBuilderManagersContent.push('</div>');
					//});
				strBuilderManagersContent.push('</div>');
				strBuilderManagersContent.push('</div>');
			});
			
			$('#managers-list').append(strBuilderManagersContent.join(""));
			mainView.router.load({pageName: 'managers'});
			myApp.initImagesLazyLoad(mainView.activePage.container);
			
			arePageManagersBuild = true;
			
		}  else {
			mainView.router.load({pageName: 'managers'});
		}
	/*} else {
		loadManagers();
	}*/
}