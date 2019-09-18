//var milestonesList = [];
var bannerMilestones = [];
var areMilestonesLoaded = false;
var arePageMilestonesBuild = false;

myApp.onPageInit('milestones', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('milestones', function (page)
{
	myApp.params.swipePanel = false;
	if(page.fromPage.name == 'about'){
		$$('#page-milestones .page-content').scrollTop(0);
	}
	trackPageGA("Historia");
});

function loadMilestones(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getHistory',
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
				milestonesList = response.history;
				bannerMilestones = response.banner;
				areMilestonesLoaded = true;
				builderMilestonesList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          hideLoadSpinnerWS();
		          showMessage(messageConexionError);
		   }
		});
}

function builderMilestonesList(milestonesList){
	//console.log(milestonesList);
	//console.log(milestonesList[0]);
	//milestonesList = milestonesList[0];
	console.log(milestonesList);
	var strBuilderMilestonesContent = [];
	//if(areMilestonesLoaded == true){
		if(milestonesList.length == 0){
			showMessage(messageNotMilestones);
		}
		else if(arePageMilestonesBuild == false){
			$('#milestones-list').html('');
			$.each( milestonesList, function( i, item ){
			console.log(item);
				
				strBuilderMilestonesContent.push('<div class="content-block-title content-block-title-milestones">'+item.fecha.fecha+'</div>');
					//$.each(item.milestones, function(index, achiev) {
						strBuilderMilestonesContent.push('<div class="card card-milestones"><div class="card-content"><div class="list-block list-block-about media-list">');
							strBuilderMilestonesContent.push('<ul><li class="item-content">');
									strBuilderMilestonesContent.push('<a onclick="loadMilestoneDetails('+item.id+')" href="#" class="item-link item-content">');
									
										strBuilderMilestonesContent.push('<div class="item-media">');
										strBuilderMilestonesContent.push('<img class="lazy lazy-fadeIn imgCardMilestone" data-src="'+item.imagenPrincipalMin+'" alt="'+item.descripcion+'" />');
										strBuilderMilestonesContent.push('</div>');
										
										strBuilderMilestonesContent.push('<div class="item-inner">');
										strBuilderMilestonesContent.push('<div class="item-title-row">');
										strBuilderMilestonesContent.push('<div class="item-title">'+item.nombre+'</div>');
										strBuilderMilestonesContent.push('</div>');
										strBuilderMilestonesContent.push('<div class="item-text">'+item.detalle+'</div>');
										strBuilderMilestonesContent.push('</div>');
										
									strBuilderMilestonesContent.push('</a>');
							strBuilderMilestonesContent.push('</li></ul>');
						strBuilderMilestonesContent.push('</div></div></div>');
					//});
			});
			
			$('#milestones-list').append(strBuilderMilestonesContent.join(""));
			mainView.router.load({pageName: 'milestones'});
			myApp.initImagesLazyLoad(mainView.activePage.container);
			
			arePageMilestonesBuild = true;
			
		} else {
			mainView.router.load({pageName: 'milestones'});
		}
	
	/*} else {
		loadMilestones();
	}*/
}