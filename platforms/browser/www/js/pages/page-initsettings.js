var initSettingsFavouritesList = [];
var initsettingsNotificationsPreferences = [];


myApp.onPageInit('initsettings', function (page)
{
	loadInitSettignsList();
	
	//set lbls slide 1
	$('#div-wellcome-initsettings').text(lblWellcome);
	$('#div-official-initsettings').text(lblOfficial);
	//set lbls slide 2
	
	//set lbls slide 3
	$('#div-container-initsettings-slide2-text1').text(messageChooseNotifications1);
	$('#div-container-initsettings-slide2-text2').text(messageChooseNotifications2);
	$('#div-container-initsettings-slide2-text3').text(messageChooseNotifications3);
	$('#btn-yes-container-swiper-slide-2').text(lblYesConfirm);
	$('#btn-no-container-swiper-slide-2').text(lblNoConfirm);
	
	//set lbls slide 4
	
	var swiper = new Swiper('.swiper-container-initsettings', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        onSlideChangeStart: function (swiper) {
            switch (swiper.activeIndex) {
			case 0:
				slideSwiper0();
				break;
			case 1:
				slideSwiper1();
				break;
			case 2:
				saveFavouritesInitSettings();
				slideSwiper2();
				break;
			default:
				break;
			}
            //before Event use it for your purpose
        }
    });

	function slideSwiper0(){
		swiper.unlockSwipeToNext();
	}
	
	function slideSwiper1(){
		$('.swiper-button-next').show();
		$('.swiper-button-prev').show();
		
		var favsChecked = ($("input[class='checkbox-favs-initsettings']:checked").length);
		if (favsChecked != 4){
			swiper.lockSwipeToNext();
			$('.swiper-button-next').addClass('swiper-button-disabled');
		}
	}
	
	function slideSwiper2(){
		$('.swiper-button-next').hide();
		$('.swiper-button-prev').hide();
		//swiper.lockSwipeToPrev();
		//swiper.lockSwipeToNext();
	}
    
    $(document).on('change' , '.checkbox-favs-initsettings' , function(){
		var favsChecked = ($("input[class='checkbox-favs-initsettings']:checked").length);
		if (favsChecked == 4){
			swiper.unlockSwipeToNext();
			$('.swiper-button-next').removeClass('swiper-button-disabled');
			swiper.slideNext();
		} else if (favsChecked > 4){
			$(this).attr('checked', false);
			var strListCheckFavourites = [];
			strListCheckFavourites.push('<ul style="text-align:left">');
			$("input[class='checkbox-favs-initsettings']:checked").each( function ( i, item ) {
				strListCheckFavourites.push('<li>');
					strListCheckFavourites.push($(this).attr('textSportActivityCheck'));
				strListCheckFavourites.push('</li>');
			});
			
			strListCheckFavourites.push('</ul>');
			var message = '';
			message = '<b><i>' + messageSettingsNeedFour+'</b></i><br/>' + messageOneSettingsNeedFour + strListCheckFavourites.join("");
			showMessage(message);
		} else{
			swiper.lockSwipeToNext();
			$('.swiper-button-next').addClass('swiper-button-disabled');
		}
		setLblBlockTitleFavourites();
	});
	$('#btn-yes-container-swiper-slide-2').on('click', function (){
		mainView.router.load({pageName: 'settings'});
		window.localStorage.setItem("PAGEINITCONFIG"+idClub,true);

	});
	
	$('#btn-no-container-swiper-slide-2').on('click', function (){
		window.localStorage.setItem("PAGEINITCONFIG"+idClub,true);
		showLoadSpinnerWS();
		if(window.localStorage.getItem("TOKEN"+idClub) == null || window.localStorage.getItem("CLIENTID"+idClub) == null){
			//Si no se ha generado el TOKEN GCM
			if (window.localStorage.getItem("TOKEN"+idClub) == null)
			{
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'home'});
			}
			else
			{
				//Si se ha generado el TOKEN pero no se ha generado el ID de cliente en el BACKEND
				$.ajax({
					// URL del Web Service
					url: getPathMobile() + 'registrar',
					dataType: 'jsonp',
					type: 'GET',
					data: { 'deviceId': deviceID,
							'platform': platform,
							'token': window.localStorage.getItem("TOKEN"+idClub),
							'clubId': idClub
						 },
					timeout: timeOut,
					success: function(response)
					{
						if(response.errorCode != 0)
						{
							hideLoadSpinnerWS();
							mainView.router.load({pageName: 'home'});
						}
						else
						{
							window.localStorage.setItem("CLIENTID"+idClub, response.clientId);
							saveNotificationsInitsettings();
							
						}
					},
					error: function (data, status, error){
						hideLoadSpinnerWS();
						mainView.router.load({pageName: 'home'});
				   }
				});
			}
		}
		//Si se ha generado TOKEN e ID cliente
		else
		{
			saveNotificationsInitsettings();
		}
	});
	
});

myApp.onPageBeforeAnimation('initsettings', function (page)
{
	myApp.params.swipePanel = false;
});


function loadInitSettignsList()
{
	$('#swiper-slide-vertical1').height('auto');
	$('#swiper-slide-vertical1').html('');
	$('#swiper-slide-vertical1').append('<div id="container-preloader-initsettings"><span style="width:42px; height:42px" class="preloader"></span></div>');
	
	//showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		//url: getPathWS() + 'getSettingList',
		url: 'http://clubes.lenguajesport.com/webservice/getSettingList',
		dataType: 'jsonp',
		data: { 'idClub': idClub },
		timeout: timeOut,
		success: function(response){
			if(response.errorCode != 0)
			{
			    builderErrorInitSettings();
			    filterCodeErrorWS(response);
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'update'});
				return;
			}
			initSettingsFavouritesList = response.listSportsActivities;
			builderFavouritesInitSettings();
			
		},
		error: function (data, status, error){
	          builderErrorInitSettings();
	          showMessageToast(messageConexionError);
		}
	});
}

function getNotificationsPreferencesInitsettings()
{
console.log(idClub);
console.log(window.localStorage.getItem("CLIENTID"+idClub));
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getNotificationsPreferences',
		dataType: 'jsonp',
		data: {
			'idClub': idClub,
			'clientId': window.localStorage.getItem("CLIENTID"+idClub)
		},
		timeout: timeOut,
		success: function(response){
			if(response.errorCode != 0)
			{
			    //hideLoadSpinnerWS();
			    //builderSettingsNotificationsError();
			    hideLoadSpinnerWS();
				mainView.router.load({pageName: 'home'});
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'update'});
				return;
			}
			
			initsettingsNotificationsPreferences = response.notificationsPreferences;
			setNotificationsPreferencesInitSettings();
		},
		error: function (data, status, error){
			hideLoadSpinnerWS();
			mainView.router.load({pageName: 'home'});
	   }
	});
}

function setNotificationsPreferencesInitSettings()
{
	var notificationsSelectedSports = [];
	var notificationsSelectedActivities = [];
	var notificationsSelectedEvents = 0;

	
	$("input[name='checkbox-sports-initsettings-favs']:checked").each( function ( i, item ) {
    	var recentValue = ($(this).val());
		var value = recentValue.split(',');
		notificationsSelectedSports.push(value[1]);
	});
	
	$("input[name='checkbox-activities-initsettings-favs']:checked").each( function ( i, item) {
    	notificationsSelectedActivities.push($(this).val());
	});
	
	if(initsettingsNotificationsPreferences != [])
	{
		$.each( initsettingsNotificationsPreferences.sports, function( i, item ){
			var categoriesSportList = item.categories;
			
			if(categoriesSportList != ""){	
				$.each( categoriesSportList, function( i, cat ){
					
					if(cat.value == true){
						if(!($.inArray( cat.idCategory, notificationsSelectedSports )))
						{
							notificationsSelectedSports.push(cat.idCategory);
						}
						
					}
				});
			}
		});
		
		$.each( initsettingsNotificationsPreferences.activitiesList, function( i, item ){
				if(item.value == true){
					if(!($.inArray( item.id, notificationsSelectedActivities )))
					{
						notificationsSelectedActivities.push(item.id);
					}
					
				}
		});
		
		notificationsSelectedEvents = initsettingsNotificationsPreferences.events;
		
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
				mainView.router.load({pageName: 'home'});
			    return;
			}
			if(isAppUpdate(response.serverVersion) == false){
				hideLoadSpinnerWS();
				mainView.router.load({pageName: 'update'});
				return;
			}
			//$('#bottonSaveNotificationsSettings').hide();
			hideLoadSpinnerWS();
			showMessageToast(messageSettingsNotificationsSuccessfullySaved);
			mainView.router.load({pageName: 'home'});
			
		},
		error: function (data, status, error){
			hideLoadSpinnerWS();
			mainView.router.load({pageName: 'home'});
	   }
	});
}

function builderFavouritesInitSettings()
{
	$('#swiper-slide-vertical1').html('');
	
	var strBuilderSettingsContent = [];
	
	$('#div-choosefavs-initsettings-1').text(lblChooseFavs1);
	$('#div-choosefavs-initsettings-2').text(lblChooseFavs2);
	$('#div-choosefavs-initsettings-3').text(lblChooseFavs3);
	$('#div-choosefavs-initsettings-4').text(lblChooseFavs4);
	strBuilderSettingsContent.push('<div class="disciplines-list" id="favourites-list-initsettings">');
	
	if(initSettingsFavouritesList.sports == "" && initSettingsFavouritesList.activitiesList == ""){
		strBuilderSettingsContent.push('<div>'+lblEmptySportsActivities+'</div>');
	}
	else {
		//strBuilderSettingsContent.push('<p id="title-settings-favourites">'+lblSelectFourFavourites+'</p>')
		strBuilderSettingsContent.push(builderSportsListFavouritesInitSettings(initSettingsFavouritesList.sports));
		strBuilderSettingsContent.push(builderActivitiesListFavouritesInitSettings(initSettingsFavouritesList.activitiesList));
	}
	
	strBuilderSettingsContent.push('</div>');
	$('#swiper-slide-vertical1').append(strBuilderSettingsContent.join(""));
	//Si el usuario tiene favoritos guardados, checkeo la lista que acabo de construir con sus favoritos
	if(window.localStorage.getItem("FAVS"+idClub) != null)
	{
		checkedFavouritesInitsettings();
	}
	
	var swiperV1 = new Swiper('#swiper-container-vertical1', {
        scrollbar: '.swiper-scrollbar-vertical1',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        resistanceRatio: 0
    });
    
    var heightHeader = $('#div-header-fixed-initsettings').height();
    var heightPage = $('#page-initsettings').height();
	var heightSwiperVertical = heightPage - heightHeader - 30;
	
	$('#swiper-container-vertical1').height(heightSwiperVertical+'px');
    $('#swiper-slide-vertical1').height(heightSwiperVertical+'px');
    $('.swiper-wrapper.swiper-wrapper-vertical1').height(heightSwiperVertical+'px');
}

function builderErrorInitSettings()
{
	$('#swiper-slide-vertical1').height('auto');
	$('#swiper-slide-vertical1').html('');
	
	var strBuilderSettingsContent = [];
	strBuilderSettingsContent.push('<div class="content-block" id="content-block-initsettings">');
		strBuilderSettingsContent.push('<div id="div-text-container-slide-initsettings-1">'+divErrorConnectionHeader+'</div>');
		strBuilderSettingsContent.push('<div id="div-text-container-slide-initsettings-2">'+divErrorConnectionText+'</div>');
		strBuilderSettingsContent.push('<div onclick="loadInitSettignsList()" class="link" id="divImgInitSettingsError">');
			strBuilderSettingsContent.push('<img id="imgInitSettingsUpload" src="img/template/icon-upload.png" />');
		strBuilderSettingsContent.push('</div>');
	strBuilderSettingsContent.push('</div>');
		
	$('#swiper-slide-vertical1').append(strBuilderSettingsContent.join(""));
		
}

//construye la lista de DEPORTES con seleccion de favoritos
function builderSportsListFavouritesInitSettings(sportsList)
{
	var strBuilderSportsList = [];
	if (sportsList == "") {
		strBuilderSportsList.push('');
	}
	else {
		$('#content-block-title-disciplines-initsettings').html(lblDisciplines);
		setLblBlockTitleFavourites();
		strBuilderSportsList.push('<div class="list-block"><ul>');

			$.each( sportsList, function( i, item ){
				var categoriesSportList = item.categories;
				
				if(categoriesSportList != ""){
					strBuilderSportsList.push('<li>');
							strBuilderSportsList.push('<div class="item-content">');
								strBuilderSportsList.push('<div class="item-media">');
									strBuilderSportsList.push('<i style="background-image: url('+item.urlImgContent+');" class="icon icon-list-header"></i>');
								strBuilderSportsList.push('</div>');
								strBuilderSportsList.push('<div class="item-inner">');
									strBuilderSportsList.push('<div class="item-title item-title-sport">'+item.name+'</div>');
								strBuilderSportsList.push('</div>');
							strBuilderSportsList.push('</div>');
							
										$.each( categoriesSportList, function( i, cat ){
											strBuilderSportsList.push('<li class="item-content item-content-checkbox">');
													
												strBuilderSportsList.push('<div class="item-inner">');
													strBuilderSportsList.push('<div class="checkbox-sports-text item-title item-title-1">'+cat.categoryName+'</div>');
													
													strBuilderSportsList.push('<div class="item-after item-after-1">');
														strBuilderSportsList.push('<label class="label-checkbox">');
															strBuilderSportsList.push('<input type="checkbox" name="checkbox-sports-initsettings-favs" class="checkbox-favs-initsettings" textSportActivityCheck="'+item.name+' - '+cat.categoryName+'" nameSportActivityCheck="'+item.name+'" value="'+item.idSport+','+cat.idCategory+'"><i class="icon icon-star-cbx"></i>');
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

//construye la lista de ACTIVIDADES con seleccion de favoritos
function builderActivitiesListFavouritesInitSettings(activitiesList)
{
	var strBuilderActivitiesList = [];
	if (activitiesList == "") {
		strBuilderActivitiesList.push('');
	}
	else {
		strBuilderActivitiesList.push('<div id="list-block-activities-initsettings" class="list-block">');
			strBuilderActivitiesList.push('<ul>');
				$.each( activitiesList, function( i, act ){
					strBuilderActivitiesList.push('<li class="item-content">');
						strBuilderActivitiesList.push('<div class="item-media">');
								strBuilderActivitiesList.push('<i style="background-image: url('+act.urlImgContent+');" class="icon icon-list-header"></i>');
							strBuilderActivitiesList.push('</div>');
						strBuilderActivitiesList.push('<div class="item-inner">');
							strBuilderActivitiesList.push('<div class="checkbox-sports-text item-title item-title-1">'+act.name+'</div>');
							
							strBuilderActivitiesList.push('<div class="item-after item-after-1">');
								strBuilderActivitiesList.push('<label class="label-checkbox">');
									strBuilderActivitiesList.push('<input type="checkbox" name="checkbox-activities-initsettings-favs" class="checkbox-favs-initsettings" textSportActivityCheck="'+act.name+'" nameSportActivityCheck="'+act.name+'" value="'+act.id+'"><i class="icon icon-star-cbx"></i>');
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

function setLblBlockTitleFavourites()
{

	var favsChecked = ($("input[class='checkbox-favs-initsettings']:checked").length);
	if (favsChecked == 4)
	{
		$('#content-block-title-favourites-initsettings').html(lblCheckListOK);
		$('#content-block-title-favourites-initsettings').removeClass('animated infinite pulse');
	}
	else
	{
		var favsWillCheck = 4-favsChecked;
		$('#content-block-title-favourites-initsettings').html(lblChoose+' <b>'+favsWillCheck+'</b> '+lblChooseMore);
		$('#content-block-title-favourites-initsettings').addClass('animated infinite pulse');
	}
	
}

function saveFavouritesInitSettings(){
	var favouritesSelectedList = [];
	var message = '';
	var currentOrder = 0;
	
	$("input[name='checkbox-sports-initsettings-favs']:checked").each( function ( i, item ) {
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
	$("input[name='checkbox-activities-initsettings-favs']:checked").each( function ( i, item) {
		var favSelected = new Object();
		favSelected.id = $(this).val();
    	favSelected.idCategory = null;
    	favSelected.order = currentOrder;
    	currentOrder++;
    	favSelected.name = $(this).attr('nameSportActivityCheck');
    	favouritesSelectedList.push(favSelected);
	});
	window.localStorage.setItem("FAVS"+idClub, JSON.stringify(favouritesSelectedList));
	//showMessageToast(messageSettingsFavouritesSuccessfullySaved);
}

function saveNotificationsInitsettings(){
	//showLoadSpinnerWS();
	if(isNewUser == false){
		getNotificationsPreferencesInitsettings();
	}
	else
	{
		setNotificationsPreferencesInitSettings()
	}
}

function checkedFavouritesInitsettings()
{
	var currentFavouritesList = jQuery.parseJSON(window.localStorage.getItem("FAVS"+idClub));
	
	$("input[class='checkbox-notifications-settings']").each( function () {
		$(this).prop('checked', false);
	});
	var isCheckboxChecked = false;
	
	if(currentFavouritesList != null){
		$("input[name='checkbox-sports-initsettings-favs']").each( function () {
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
		$("input[name='checkbox-activities-initsettings-favs']").each( function () {
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
	setLblBlockTitleFavourites();
}