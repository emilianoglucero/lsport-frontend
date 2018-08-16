var areFavouritesChanged = false;
myApp.onPageInit('settings', function (page)
{
	//$('#lblMenuItemSettingsFavourites').text(lblHeaderSettingsFavourites);
	//$('#lblMenuItemSettingsNotifications').text(lblHeaderSettingsNotifications);
	$('#buttonSaveFavouritesSettings').text(lblSaveFavouritesSettings);
	$('#buttonSaveFavouritesSettings').on('click', function(){
		goBack = false;
		saveNotificationsSettings();
	});

	$('#btnBackPageSettings').on('click', function(){
		confirmChangesFavouritesSettings();
	});
	$$('.panel-left').on('open', function () {
	    if(mainView.activePage.name == "settings"){
			confirmChangesFavouritesSettingsFromMenu();
	    }
	});

});

myApp.onPageBeforeAnimation('settings', function (page)
{

	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Configuraciones");

	if(page.fromPage.name == "initsettings")
	{
		loadSettingNotificationsList(true);
		myApp.params.swipePanel = false;
		$('#btnMenuPageSettings').css("display", "none");

		$('#btnBackPageSettings').css("display", "-webkit-box");
		$('#btnBackPageSettings').css("display", "-ms-flexbox");
		$('#btnBackPageSettings').css("display", "-webkit-flex");
		$('#btnBackPageSettings').css("display", "flex");
		$('#buttonSaveFavouritesSettings').css("display", "-webkit-box");
		$('#buttonSaveFavouritesSettings').css("display", "-ms-flexbox");
		$('#buttonSaveFavouritesSettings').css("display", "-webkit-flex");
		$('#buttonSaveFavouritesSettings').css("display", "flex");
		//$('#btnMenuPageSettings').css('display', 'none');
		//$('#btnBackPageSettings').css('display', 'block');
		//$('#buttonSaveFavouritesSettings').show();
	}
	else
	{
		loadSettingNotificationsList(false);
		myApp.params.swipePanel = 'left';
		$('#btnMenuPageSettings').css("display", "-webkit-box");
		$('#btnMenuPageSettings').css("display", "-ms-flexbox");
		$('#btnMenuPageSettings').css("display", "-webkit-flex");
		$('#btnMenuPageSettings').css("display", "flex");
		$('#btnBackPageSettings').css("display", "none");
		$('#buttonSaveFavouritesSettings').css("display", "none");
	}
	if(window.localStorage.getItem("COUNTERACCESSSETTINGS"+idClub) == null){
		window.localStorage.setItem("COUNTERACCESSSETTINGS"+idClub,0);
		var now = getNowDate();
		window.localStorage.setItem("INSTALLATIONDATE"+idClub,now);
	} else if(window.localStorage.getItem("COUNTERACCESSSETTINGS"+idClub) < 3)
	{
		var count = parseInt(window.localStorage.getItem("COUNTERACCESSSETTINGS"+idClub)) + 1;
		window.localStorage.setItem("COUNTERACCESSSETTINGS"+idClub,count);
	}

});

function loadSettingNotificationsList(checkFavourites)
{
	$('#page-content-settings').html('');
	showLoadSpinnerWS();
	if(window.localStorage.getItem("CLIENTID"+idClub) == null){
		registerNewClient();
	}
	$('#settingsnotifications-list').html('');
	/*$.ajax({
		// URL del Web Service
		//url: getPathWS() + 'getNotificationsPreferences',
		url: 'http://clubes.lenguajesport.com/webservice/getNotificationsPreferences',
		dataType: 'jsonp',
		data: {
			'idClub': idClub,
			'clientId': window.localStorage.getItem("CLIENTID"+idClub)
		},
		timeout: timeOut,
		success: function(response){
			if(response.errorCode != 0)
			{
			    hideLoadSpinnerWS();
			    builderSettingsNotificationsError(checkFavourites);
			    showMessageToast(messageConexionError);
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'update'});
				return;
			}

			initSettingsFavouritesList = response.notificationsPreferences;
			builderSettingsPage();
			checkedElementsSettingsList(checkFavourites);
			hideLoadSpinnerWS();
		},
		error: function (data, status, error){
	          builderSettingsNotificationsError(checkFavourites);
	          hideLoadSpinnerWS();
	          showMessageToast(messageConexionError);
	   }
	});*/
	$.ajax({
	// URL del Web Service, en este ws no hace falta enviar datos, con el bearer identifica el usuario
    		url: getPathWS() + 'setPreferenciasPrincipales',
    		dataType: 'json',
    		timeout: timeOut,
    		success: function(response){
    			/*if(response.errorCode != 0)
    			{
    				hideLoadSpinnerWS();
    			    filterCodeErrorWS(response);
    			    $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    			    return;
    			}
    			if(isAppUpdate(response.serverVersion) == false){
    				hideLoadSpinnerWS();
    				mainView.router.load({pageName: 'update'});
    				return;
    			}*/

    			initSettingsFavouritesList = response.notificationsPreferences;
                builderSettingsPage();
                checkedElementsSettingsList(checkFavourites);
                hideLoadSpinnerWS();

    		},
    		error: function (data, status, error){
    			showMessageToast(messageConexionError);
    			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    	   },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
	});
}

function builderSettingsPage()
{
	$('#page-content-settings').html('');
	var strBuilderLastList  = [];

	if(initSettingsFavouritesList.deportes == "" && initSettingsFavouritesList.actividades == ""){
		strBuilderLastList.push('<div>'+lblEmptySportsActivities+'</div>')
		$('#page-content-settings').html(strBuilderLastList.join(""));
	}
	else
	{
		strBuilderLastList.push('<div id="div-choosenot-initsettings">'+lblSettingsFavAndNot+'</div>');
			strBuilderLastList.push('<div class="disciplines-list" id="notifitacions-list-initsettings">');
				strBuilderLastList.push(builderSportsListNotificationsSettings(initSettingsFavouritesList.deportes));
				strBuilderLastList.push(builderActivitiesListNotificationsSettings(initSettingsFavouritesList.actividades));



				strBuilderLastList.push('<div class="list-block"><ul>');
					strBuilderLastList.push('<li class="item-content item-content-checkbox">');
						strBuilderLastList.push('<div class="item-inner">');
							strBuilderLastList.push('<div class="checkbox-sports-text item-title item-title-2">'+lblHeaderEvents+'</div>');
							strBuilderLastList.push('<div class="item-after item-after-1">');
								strBuilderLastList.push('<label class="label-checkbox">');
									var isChecked = "";
									if(initSettingsFavouritesList.events == true){
										isChecked = "checked=\"checked\"";
									}
									strBuilderLastList.push('<input type="checkbox" name="checkbox-sports-nots-notifications-initsettings" '+isChecked+' id="checkboxnotifications-events" class="checkbox-nots-notifications-initsettings" ><i class="icon icon-volume-cbx icon-cbx-left"></i>');
								strBuilderLastList.push('</label>');
							strBuilderLastList.push('</div>');
						strBuilderLastList.push('</div>');
					strBuilderLastList.push('</li>');
				strBuilderLastList.push('</ul></div>');


			$('#page-content-settings').html(strBuilderLastList.join(""));

			$(document).on('change' , '.checkbox-favs-notifications-initsettings' , function(){

				var favsChecked = ($("input[class='checkbox-favs-notifications-initsettings checkbox-notifications-settings']:checked").length);
				if (favsChecked == 4){
					areFavouritesChanged = true;
					$('#buttonSaveFavouritesSettings').css("display", "-webkit-box");
					$('#buttonSaveFavouritesSettings').css("display", "-ms-flexbox");
					$('#buttonSaveFavouritesSettings').css("display", "-webkit-flex");
					$('#buttonSaveFavouritesSettings').css("display", "flex");

					if($(this).prop('checked') == true){
						$("input[class='checkbox-nots-notifications-initsettings checkbox-notifications-settings'][value='"+$(this).val()+"']").prop('checked', true);
					}
					//$('#buttonSaveFavouritesSettings').css("display", "flex");
				} else if (favsChecked > 4){
					$(this).prop('checked', false);
					showCurrentSelectionFavsSettingsList();
				} else{
					areFavouritesChanged = true;
					$('#buttonSaveFavouritesSettings').css("display", "none");
					if($(this).prop('checked') == true){
						$("input[class='checkbox-nots-notifications-initsettings checkbox-notifications-settings'][value='"+$(this).val()+"']").prop('checked', true);
					}
				}
			});

			$(document).on('change' , '.checkbox-nots-notifications-initsettings' , function(){
				$('#buttonSaveFavouritesSettings').css("display", "-webkit-box");
				$('#buttonSaveFavouritesSettings').css("display", "-ms-flexbox");
				$('#buttonSaveFavouritesSettings').css("display", "-webkit-flex");
				$('#buttonSaveFavouritesSettings').css("display", "flex");
			});
	}
}

function builderSettingsNotificationsError(checkFavourites)
{
	$('#buttonSaveFavouritesSettings').css("display", "none");
	$('#page-content-settings').html('');
	var strBuilderSettingsContent  = [];

	strBuilderSettingsContent.push('<div class="content-block content-block-information">');
		strBuilderSettingsContent.push('<div id="divSettingsErrorHeader">'+divErrorConnectionHeader+'</div>');
		strBuilderSettingsContent.push('<div id="divSettingsErrorText">'+divErrorConnectionText+'</div>');
		strBuilderSettingsContent.push('<div onclick="loadSettingNotificationsList('+checkFavourites+')" id="divImgSettingsError" class="link">');
			strBuilderSettingsContent.push('<img id="imgSettingsUpload" src="img/template/icon-upload.png" alt="Reload Page Settings"/>');
		strBuilderSettingsContent.push('</div>');
	strBuilderSettingsContent.push('</div>');

	$('#page-content-settings').html(strBuilderSettingsContent.join(""));
}


// funcion que construye la lista de deportes con iconos de configuracion de
// favoritos y notificaciones
function builderSportsListNotificationsSettings(sportsList)
{
	var strBuilderSportsList = [];
	if (sportsList == "") {
		strBuilderSportsList.push('');
	}
	else {
		strBuilderSportsList.push('<div class="content-block-title" >');
			strBuilderSportsList.push('<div class="content-block-title-70" >');
			strBuilderSportsList.push(lblHeaderSportDetails);
			strBuilderSportsList.push('</div>');
			strBuilderSportsList.push('<div class="content-block-title-15" >');
			strBuilderSportsList.push(lblFav);
			strBuilderSportsList.push('</div>');
			strBuilderSportsList.push('<div class="content-block-title-15" >');
			strBuilderSportsList.push(lblNot);
			strBuilderSportsList.push('</div>');
		strBuilderSportsList.push('</div>');

		strBuilderSportsList.push('<div class="list-block"><ul>');

			$.each( sportsList, function( i, item ){
				var categoriesSportList = item.categorias;

				if(categoriesSportList != ""){
					strBuilderSportsList.push('<li>');
							strBuilderSportsList.push('<div class="item-content">');
								strBuilderSportsList.push('<div class="item-media">');
									strBuilderSportsList.push('<i style="background-image: url('+item.urlImgContent+');" class="icon icon-list-header"></i>');
								strBuilderSportsList.push('</div>');
								strBuilderSportsList.push('<div class="item-inner">');
									strBuilderSportsList.push('<div class="item-title item-title-sport">'+item.nombre+'</div>');
								strBuilderSportsList.push('</div>');
							strBuilderSportsList.push('</div>');

										$.each( categoriesSportList, function( i, cat ){
											strBuilderSportsList.push('<li class="item-content item-content-checkbox">');

												strBuilderSportsList.push('<div class="item-inner">');
													strBuilderSportsList.push('<div class="checkbox-sports-text item-title item-title-2">'+cat.nombre+'</div>');

													strBuilderSportsList.push('<div class="item-after item-after-2">');
														strBuilderSportsList.push('<label class="label-checkbox label-checkbox-star label-ckeckbox-half">');
															strBuilderSportsList.push('<input type="checkbox" name="checkbox-sports-favs-notifications-initsettings" class="checkbox-favs-notifications-initsettings checkbox-notifications-settings" textSportActivityCheck="'+item.name+' - '+cat.categoryName+'" nameSportActivityCheck="'+item.name+'" value="'+item.idSport+','+cat.idCategory+'"><i class="icon icon-star-cbx icon-cbx-left"></i>');
														strBuilderSportsList.push('</label>');
														strBuilderSportsList.push('<label class="label-checkbox label-checkbox-volume label-ckeckbox-half">');
															var isChecked = '';
															//if(cat.value == true){
															//	isChecked = "checked=\"checked\"";
															//}
															strBuilderSportsList.push('<input type="checkbox" name="checkbox-sports-nots-notifications-initsettings" '+isChecked+' class="checkbox-nots-notifications-initsettings checkbox-notifications-settings" textSportActivityCheck="'+item.name+' - '+cat.categoryName+'" nameSportActivityCheck="'+item.name+'" value="'+item.idSport+','+cat.idCategory+'"><i class="icon icon-volume-cbx icon-cbx-left"></i>');
														strBuilderSportsList.push('</label>');
													strBuilderSportsList.push('</div>');
												strBuilderSportsList.push('</div>');

											strBuilderSportsList.push('</li>');
										});

					strBuilderSportsList.push('</li>');
				}
			});
		strBuilderSportsList.push('</ul></div>');
	}
	return (strBuilderSportsList.join(""));
}

// funcion que construye la lista de ACTIVIDADES con los iconos de configuracion de
// favoritos y notificaciones
function builderActivitiesListNotificationsSettings(activitiesList)
{
	var strBuilderActivitiesList = [];
	if (activitiesList == "") {
		strBuilderActivitiesList.push('');
	}
	else {
		strBuilderActivitiesList.push('<div class="content-block-title" >');
			strBuilderActivitiesList.push('<div class="content-block-title-70" >');
			strBuilderActivitiesList.push(lblHeaderActivities);
			strBuilderActivitiesList.push('</div>');
			strBuilderActivitiesList.push('<div class="content-block-title-15" >');
			strBuilderActivitiesList.push(lblFav);
			strBuilderActivitiesList.push('</div>');
			strBuilderActivitiesList.push('<div class="content-block-title-15" >');
			strBuilderActivitiesList.push(lblNot);
			strBuilderActivitiesList.push('</div>');
		strBuilderActivitiesList.push('</div>');
			strBuilderActivitiesList.push('<div class="list-block">');
				strBuilderActivitiesList.push('<ul>');
					$.each( activitiesList, function( i, act ){
						strBuilderActivitiesList.push('<li class="item-content">');
							strBuilderActivitiesList.push('<div class="item-media">');
									strBuilderActivitiesList.push('<i style="background-image: url('+act.urlImgContent+');" class="icon icon-list-header"></i>');
								strBuilderActivitiesList.push('</div>');
							strBuilderActivitiesList.push('<div class="item-inner">');
								strBuilderActivitiesList.push('<div class="checkbox-sports-text item-title item-title-2">'+act.nombre+'</div>');

								strBuilderActivitiesList.push('<div class="item-after item-after-2">');
									strBuilderActivitiesList.push('<label class="label-checkbox label-checkbox-star label-ckeckbox-half">');
										strBuilderActivitiesList.push('<input type="checkbox" name="checkbox-activities-favs-notifications-initsettings" class="checkbox-favs-notifications-initsettings checkbox-notifications-settings" textSportActivityCheck="'+act.name+' - '+act.categoryName+'" nameSportActivityCheck="'+act.name+'" value="'+act.id+'"><i class="icon icon-star-cbx icon-cbx-left"></i>');
									strBuilderActivitiesList.push('</label>');
									strBuilderActivitiesList.push('<label class="label-checkbox label-checkbox-volume label-ckeckbox-half">');
										var isChecked = '';
										if(act.value == true){
											isChecked = "checked=\"checked\"";
										}
										strBuilderActivitiesList.push('<input type="checkbox" name="checkbox-activities-nots-notifications-initsettings" '+isChecked+' class="checkbox-nots-notifications-initsettings checkbox-notifications-settings" textSportActivityCheck="'+act.name+' - '+act.categoryName+'" nameSportActivityCheck="'+act.name+'" value="'+act.id+'"><i class="icon icon-volume-cbx icon-cbx-left"></i>');
									strBuilderActivitiesList.push('</label>');
								strBuilderActivitiesList.push('</div>');
							strBuilderActivitiesList.push('</div>');

						strBuilderActivitiesList.push('</li>');
					});
				strBuilderActivitiesList.push('<ul>');
			strBuilderActivitiesList.push('</div>');
	}
	return (strBuilderActivitiesList.join(""));
}


function saveFavouritesSettings(){
	if(areFavouritesChanged){
		var favouritesSelectedList = [];
		var message = '';
		var currentOrder = 0;

		$("input[name='checkbox-sports-favs-notifications-initsettings']:checked").each( function ( i, item ) {
			var recentValue = ($(this).val());
			var value = recentValue.split(',');
			var favSelected = new Object();
			favSelected.id = value[0];
	    	favSelected.idCategory = value[1];
	    	favSelected.order = currentOrder;
	    	currentOrder++;
	    	favSelected.name = $(this).attr('nameSportActivityCheck');
	    	favouritesSelectedList.push(favSelected);
		});
		$("input[name='checkbox-activities-favs-notifications-initsettings']:checked").each( function ( i, item) {
			var favSelected = new Object();
			favSelected.id = $(this).val();
	    	favSelected.idCategory = null;
	    	favSelected.order = currentOrder;
	    	currentOrder++;
	    	favSelected.name = $(this).attr('nameSportActivityCheck');
	    	favouritesSelectedList.push(favSelected);
		});
		window.localStorage.setItem("FAVS"+idClub, JSON.stringify(favouritesSelectedList));
	}
}

function saveNotificationsSettings()
{
	saveFavouritesSettings();
	showLoadSpinnerWS();
	var notificationsSelectedSports = [];
	var notificationsSelectedActivities = [];
	var notificationsSelectedEvents = 0;


	$("input[name='checkbox-sports-nots-notifications-initsettings']:checked").each( function ( i, item ) {
    	if($(this).attr('nameSportActivityCheck')!= undefined)
    	{
    		var recentValue = ($(this).val());
			var value = recentValue.split(',');
    		notificationsSelectedSports.push(value[1]);
    	}

	});
	$("input[name='checkbox-activities-nots-notifications-initsettings']:checked").each( function ( i, item) {
		if($(this).attr('nameSportActivityCheck')!= undefined)
		{
    		notificationsSelectedActivities.push($(this).val());
    	}
	});
	if($("input#checkboxnotifications-events").is(':checked') == true)
	{
		notificationsSelectedEvents = 1;
	}

	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'setNotificationsPreferences',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'clientId': window.localStorage.getItem("CLIENTID"+idClub),
				'arrayIdSports' : notificationsSelectedSports.toString(),
				'arrayIdActivities': notificationsSelectedActivities.toString(),
				'events': notificationsSelectedEvents
			 },
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
			$('#buttonSaveFavouritesSettings').css('display','none');
			hideLoadSpinnerWS();
			showMessageToast(messageSettingsNotificationsSuccessfullySaved);
			if( goBack == true){
				mainView.router.back({
	    				pageName: 'home',
	    				force: true
	    		});
			}
		},
		error: function (data, status, error){
			hideLoadSpinnerWS();
			showMessage(divErrorConnectionText);
	   }
	});
}

function checkedElementsSettingsList(checkNotifications)
{
	var currentFavouritesList = jQuery.parseJSON(window.localStorage.getItem("FAVS"+idClub));

	$("input[class='checkbox-notifications-settings']").each( function () {
		$(this).prop('checked', false);
	});
	var isCheckboxChecked = false;

	if(currentFavouritesList != null){
		$("input[name='checkbox-sports-favs-notifications-initsettings']").each( function () {
			var recentValue = ($(this).val());
			var value = recentValue.split(',');
			isCheckboxChecked = false
			$.each( currentFavouritesList, function( i, item ){
				if(value[0] == item.id && value[1] == item.idCategory){
					isCheckboxChecked = true;
				}
			});
			if(isCheckboxChecked == true){
				$(this).prop('checked', true);

			}
		});
		$("input[name='checkbox-activities-favs-notifications-initsettings']").each( function () {
			var recentValue = ($(this).val());
			var value = recentValue.split(',');
			isCheckboxChecked = false;
			$.each( currentFavouritesList, function( i, item ){
				if(value[0] == item.id && item.idCategory == null){
					isCheckboxChecked = true;
				}
			});
			if(isCheckboxChecked == true){
				$(this).prop('checked', true);

			}
		});

		if(checkNotifications == true)
		{
			$("input[name='checkbox-sports-nots-notifications-initsettings']").each( function () {
				var recentValue = ($(this).val());
				var value = recentValue.split(',');
				isCheckboxChecked = false
				$.each( currentFavouritesList, function( i, item ){
					if(value[0] == item.id && value[1] == item.idCategory){
						isCheckboxChecked = true;
					}
				});
				if(isCheckboxChecked == true){
					$(this).prop('checked', true);

				}
			});
			$("input[name='checkbox-activities-nots-notifications-initsettings']").each( function () {
				var recentValue = ($(this).val());
				var value = recentValue.split(',');
				isCheckboxChecked = false;
				$.each( currentFavouritesList, function( i, item ){
					if(value[0] == item.id && item.idCategory == null){
						isCheckboxChecked = true;
					}
				});
				if(isCheckboxChecked == true){
					$(this).prop('checked', true);

				}
			});
		}

	}
}

function showCurrentSelectionFavsSettingsList(){
	var strListCheckFavourites = [];
	strListCheckFavourites.push('<ul style="text-align:left">');
	$("input[class='checkbox-favs-notifications-initsettings checkbox-notifications-settings']:checked").each( function ( i, item ) {
		strListCheckFavourites.push('<li>');
			strListCheckFavourites.push($(this).attr('textSportActivityCheck'));
		strListCheckFavourites.push('</li>');
	});

	strListCheckFavourites.push('</ul>');
	var message = '';
	message = '<b><i>' + messageSettingsNeedFour+'</b></i><br/>' + messageOneSettingsNeedFour + strListCheckFavourites.join("");
	showMessage(message);
}

var goBack = false;
function confirmChangesFavouritesSettings()
{
	goBack = false;
	if($('#buttonSaveFavouritesSettings').is(':visible') == true){
		myApp.modal({
			title:  lblNameClub,
			text: messageConfirmChangesNotifications,
			buttons: [{
				text: lblButtonCancel,
				onClick: function() {
					mainView.router.back({
	    				pageName: 'home',
	    				force: true
	    			});
				}
				},{
				text: lblButtonOk,
				onClick: function() {
					goBack = true;
					saveNotificationsSettings();
				}}]});
	}
	else{
		mainView.router.back({
	    				pageName: 'home',
	    				force: true
	    		});
	}
}

function confirmChangesFavouritesSettingsFromMenu()
{
	if($('#buttonSaveFavouritesSettings').is(':visible') == true){
		myApp.modal({
			title:  lblNameClub,
			text: messageConfirmChangesNotifications,
			buttons: [{
				text: lblButtonCancel,
				onClick: function() {
					myApp.openPanel("left");
				}
				},{
				text: lblButtonOk,
				onClick: function() {
					goBack = false;
					saveNotificationsSettings();
					myApp.openPanel("left");
				}}]});
	}
	else{
		myApp.openPanel("left");
	}
}