var achievementsList = [];
var bannerAchievements = [];
var areAchievementsLoaded = false;
var arePageAchievementsBuild = false;


myApp.onPageInit('achievements', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('achievements', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name == 'about'){
		$$('#page-achievements .page-content').scrollTop(0);
	}
	trackPageGA("Titulos");
});

function loadAchievements(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getAchievements',
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
				achievementsList = response.achievements;
				bannerAchievements = response.banner;
				areAchievementsLoaded = true;
				builderAchievementsList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          hideLoadSpinnerWS();
		          showMessage(messageConexionError);
		   }
		});
}

function builderAchievementsList(){
	
	var strBuilderAchievementsContent = [];
	if(areAchievementsLoaded == true){
		if(achievementsList.length == 0){
				showMessage(messageNotTitles);
		}
		else if(arePageAchievementsBuild == false){
			$('#achievements-list').html('');
			$.each( achievementsList, function( i, item ){
				
				strBuilderAchievementsContent.push('<div class="content-block-title content-block-title-achievements">'+item.year+'</div>');
					$.each(item.achievements, function(index, achiev) {
						strBuilderAchievementsContent.push('<div class="card card-achievements"><div class="card-content"><div class="list-block list-block-about media-list">');
							strBuilderAchievementsContent.push('<ul><li class="item-content">');
									strBuilderAchievementsContent.push('<a onclick="builderAchievementDetails('+achiev.id+')" href="#" class="item-link item-content">');
									
										strBuilderAchievementsContent.push('<div class="item-media">');
										strBuilderAchievementsContent.push('<img class="lazy lazy-fadeIn imgCardAchievement" data-src="'+achiev.urlImgMin+'" alt="'+item.altImg+'" />');
										strBuilderAchievementsContent.push('</div>');
										
										strBuilderAchievementsContent.push('<div class="item-inner">');
										strBuilderAchievementsContent.push('<div class="item-title-row">');
										strBuilderAchievementsContent.push('<div class="item-title">'+achiev.title+'</div>');
										strBuilderAchievementsContent.push('</div>');
										strBuilderAchievementsContent.push('<div class="item-text">'+achiev.shortDesc+'</div>');
										strBuilderAchievementsContent.push('</div>');
										
									strBuilderAchievementsContent.push('</a>');
							strBuilderAchievementsContent.push('</li></ul>');
						strBuilderAchievementsContent.push('</div></div></div>');
					});
				
			});
			
			$('#achievements-list').append(strBuilderAchievementsContent.join(""));
			mainView.router.load({pageName: 'achievements'});
			myApp.initImagesLazyLoad(mainView.activePage.container);
			
			arePageAchievementsBuild = true;
			
		} else {
			mainView.router.load({pageName: 'achievements'});
		}
	
	} else {
		loadAchievements();
	}
}