//var activitiesList = [];
var areActivitiesLoaded = false;


myApp.onPageInit('activities', function (page)
{
	
	//var user = firebase.auth().currentUser;
    //if (user) {
		$("#notLoggedActivities").hide();
		myApp.initImagesLazyLoad(mainView.activePage.container);
		//loadActivities();
		builderActivitiesList();
	//} else {
	//	$("#notLoggedActivities").show();
	//}
	
});

myApp.onPageReinit('activities', function (page)
{
	/*var user = firebase.auth().currentUser;
    if (user) {
		$("#notLoggedActivities").hide();
		myApp.initImagesLazyLoad(mainView.activePage.container);
		//loadActivities();
		builderActivitiesList();
	} else {
		$("#notLoggedActivities").show();
	}*/

});

myApp.onPageBeforeAnimation('activities', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Actividades");
});

$(document).ready(function () {
	$('.lblNotLogged').text(lblNotLogged);
});


function builderActivitiesList(){
	$('#activities-list').html('');
	console.log(clubList);
	var strBuilderActivitiesContent = [];
	//if(areActivitiesLoaded == true){
		if(clubList.length == 0){
				strBuilderActivitiesContent.push('<div class="divNotActivities">'+divNotActivities+'</div>');
		}
		else{
			$.each( clubList, function( i, item ){
				strBuilderActivitiesContent.push('<div class="card card-activity">');
				strBuilderActivitiesContent.push('<div class="card-activity-content">');
					strBuilderActivitiesContent.push('<div valign="bottom" class="card-header card-header-photo color-white no-border">');
						strBuilderActivitiesContent.push('<img class="lazy lazy-fadeIn imgCardHeaderActivities" data-src="'+item.imagenPrincipalMin+'" alt="'+item.nombre+'" />');
					strBuilderActivitiesContent.push('</div>');
					strBuilderActivitiesContent.push('<div class="card-header card-header-title">'+item.nombre+'</div>');
					strBuilderActivitiesContent.push('<div class="card-content-inner">');
						strBuilderActivitiesContent.push('<p class="color-gray">'+item.direccion+'</p>');
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
