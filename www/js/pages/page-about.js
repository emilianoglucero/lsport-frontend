var aboutPage;
var installationPage;
var achievementsList;
var managersList;
var milestonesList;

myApp.onPageInit('about', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('#lblMenuItemAboutContact').text(lblHeaderContact);
	$('#lblMenuItemAboutManagers').text(lblHeaderManagers);
	$('#lblMenuItemAboutAchievements').text(lblHeaderAchievements);
	$('#lblMenuItemAboutMilestones').text(lblHeaderMilestones);
	$('#lblMenuItemAboutInstallations').text(lblHeaderInstallations);

	loadPageAbout();


});

myApp.onPageBeforeAnimation('about', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Sobre el club ...");
});

function loadPageAbout(){
    showLoadSpinnerWS();
	//se inicia la llamada a la seccion de Acerca del Club y se traen todos los datos de las demas pags y secciones
	$.ajax({
        // URL del Web Service
            url: getPathWS() + 'getInstitucional',
            dataType: 'json',
            timeout: timeOut,
            success: function(response){
            console.log(response);

                /*if(response.errorCode != 0)
                {
                    hideLoadSpinnerWS();
                    filterCodeErrorWS(response);
                    return;
                }
                if(isAppUpdate(response.serverVersion) == false){
                    mainView.router.load({pageName: 'update'});
                    return;
                }*/

                aboutPage = [];
                aboutPage = response;
                console.log(aboutPage);
                installationPage = response.instalalciones;
                achievementsList = response.titulos;
                console.log(installationPage);
                managersList = response.directivos;
                milestonesList = response.hitos;

                $('#lblClubSlogan').text(aboutPage.eslogan);


            },
            error: function (data, status, error){
                console.log(data, status, error);
           },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
    });
    hideLoadSpinnerWS();
}