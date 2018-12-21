var activitiesList = [];
var areActivitiesLoaded = false;


myApp.onPageInit('activities', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	//loadActivities();
	builderActivitiesList();
	
});

myApp.onPageBeforeAnimation('activities', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Actividades");
});

/*function loadActivities(){
	showLoadSpinnerWS();
	$('#activities-list').html('');
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getActivityList',
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
				activitiesList = response.activitiesList;
				areActivitiesLoaded = true;
				builderActivitiesList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          builderActivitiesList();
		          hideLoadSpinnerWS();
		   }
		});
}*/

function builderActivitiesList(){
	$('#activities-list').html('');
	console.log(activitiesList);
	var strBuilderActivitiesContent = [];
	//if(areActivitiesLoaded == true){
		if(activitiesList.length == 0){
				strBuilderActivitiesContent.push('<div class="divNotActivities">'+divNotActivities+'</div>');
		}
		else{
			$.each( activitiesList, function( i, item ){
				strBuilderActivitiesContent.push('<div onclick="loadActivityDetails('+item.id+')" class="card card-activity">');
				strBuilderActivitiesContent.push('<div class="card-activity-content">');
					strBuilderActivitiesContent.push('<div valign="bottom" class="card-header card-header-photo color-white no-border">');
						strBuilderActivitiesContent.push('<img class="lazy lazy-fadeIn imgCardHeaderActivities" data-src="'+item.imagenPrincipalMin+'" alt="'+item.nombre+'" />');
					strBuilderActivitiesContent.push('</div>');
					strBuilderActivitiesContent.push('<div class="card-header card-header-title">'+item.nombre+'</div>');
					strBuilderActivitiesContent.push('<div class="card-content-inner">');
						strBuilderActivitiesContent.push('<p class="color-gray">'+item.descripcion+'</p>');
					strBuilderActivitiesContent.push('</div>');
				strBuilderActivitiesContent.push('</div>');
				strBuilderActivitiesContent.push('</div>');
			});
		}
	
	//} else {
		/*strBuilderActivitiesContent.push('<div class="content-block content-block-information">');
			strBuilderActivitiesContent.push('<div id="divActivitiesErrorHeader">'+divErrorConnectionHeader+'</div>');
	
			strBuilderActivitiesContent.push('<div id="divActivitiesErrorText">'+divErrorConnectionText+'</div>');
			
			strBuilderActivitiesContent.push('<div onclick="loadActivities()" class="link" id="divImgActivitiesError">');
				strBuilderActivitiesContent.push('<img id="imgActivitiesUpload" src="img/template/icon-upload.png" alt="Imagen publicitaria"/>');
			strBuilderActivitiesContent.push('</div>');
		strBuilderActivitiesContent.push('</div>');
	//}*/
	$('#activities-list').append(strBuilderActivitiesContent.join(""));
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
}
