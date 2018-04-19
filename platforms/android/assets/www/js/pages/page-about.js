myApp.onPageInit('about', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#lblClubSlogan').text(lblClubSlogan);
	$('#lblMenuItemAboutContact').text(lblHeaderContact);
	$('#lblMenuItemAboutManagers').text(lblHeaderManagers);
	$('#lblMenuItemAboutAchievements').text(lblHeaderAchievements);
	$('#lblMenuItemAboutMilestones').text(lblHeaderMilestones);
	$('#lblMenuItemAboutInstallations').text(lblHeaderInstallations);
});

myApp.onPageBeforeAnimation('about', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Sobre el club ...");
});