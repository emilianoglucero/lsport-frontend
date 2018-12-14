var recentNotificationsList = [];
var nextPageNumberNotifications = 1;
var loadingInfiniteScrollNotifications = false;
var areAccessedServerNotifications = false;

myApp.onPageInit('notifications', function (page)
{
    $('.headerListEndNotifications').text(headerListEndNews);
    $('.contentListEndNotifications').text(contentListEndNews);
    $('#notifications-content-block').html('');
    nextPageNumberNotifications = 1;
    loadNotifications();
    
    $$('.infinite-scroll-notifications').on('infinite', function () {
		if (loadingInfiniteScrollNotifications){
			return;
		}
		
		loadingInfiniteScrollNotifications = true;
		
		if (areAccessedServerNotifications == false){
			
			loadNotifications();
		} else {
			
			$('#noConnection-content-block-notifications').show();
		}
	});
    
});

myApp.onPageBeforeAnimation('notifications', function (page)
{
	myApp.params.swipePanel = false;
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Notificaciones");
});

function loadNotifications(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getNotifications',
			dataType: 'jsonp',
			data: { 'idClub': idClub,
					'clientId': window.localStorage.getItem("CLIENTID"+idClub),
					'pageNumber': nextPageNumberNotifications
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
				nextPageNumberNotifications = parseInt(response.pageNumber) + 1;
				if( response.pageNumber == 1 ){
					$('#notifications-content-block').html('');
					recentNotificationsList = [];
					recentNotificationsList = response.notifications;
					builderNotificationsList();
					hideLoadSpinnerWS();
				} else {
					recentNotificationsList = [];
					recentNotificationsList = response.notifications;
					builderNotificationsList();
					hideLoadSpinnerWS();
				}
				
				if( response.totalPage < nextPageNumberNotifications ){
					myApp.detachInfiniteScroll('.infinite-scroll-notifications');
				}
				loadingInfiniteScrollNotifications = false;
				areAccessedServerNotifications = false;
				$('#noConnection-content-block-notifications').hide();
			},
			error: function (data, status, error){
		          if( nextPageNumberNotifications == 1 ){
		          	builderErrorNotifications();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	loadingInfiniteScrollNotifications = false;
		          	areAccessedServerNotifications = true;
		          }
		   }
	});
}

function reloadNotifications(){
	if (existInternetConnection() == true){
		loadNotifications();
	} else{
		showMessageToast(messageCanNotRefresh);
	}
}

function builderNotificationsList(){
	var strBuilderNotificationsContent = [];
	if(recentNotificationsList.length == 0){
		strBuilderNotificationsContent.push('<div class="content-block">');
			strBuilderNotificationsContent.push('<div class="divNotLastestNotifications">'+divNotNotifications+'</div>');
		strBuilderNotificationsContent.push('</div>');
	}else{
		strBuilderNotificationsContent.push('<div class="list-block media-list" id="list-block-notifications">');
		strBuilderNotificationsContent.push('<ul>');
		$.each( recentNotificationsList, function( i, item ){
			if(item.wsParams == "" || item.wsParams == undefined){
			
			}
			else{
				var itemClass = "";
				if(item.read == false){
					itemClass = "notificationNoRead";
				}
				var params = JSON.parse(item.wsParams);
				var paramsItem = JSON.parse(params.params);
				strBuilderNotificationsContent.push('<li id="list-block-notifications-id'+item.notId+'" class="'+itemClass+'">');
				strBuilderNotificationsContent.push('<a href="#" onclick="loadNewDetailsNotifications('+paramsItem.id+','+item.notId+','+item.read+')" class="item-link item-content">');
				strBuilderNotificationsContent.push('<div class="item-inner">');
				strBuilderNotificationsContent.push('<div class="item-title-row">');
				strBuilderNotificationsContent.push('<div class="item-title">'+item.title+'</div>');
				strBuilderNotificationsContent.push('<div class="item-after">'+item.date+'</div>');
				strBuilderNotificationsContent.push('</div>');
				strBuilderNotificationsContent.push('<div class="item-text">'+item.message+'</div>');
				strBuilderNotificationsContent.push('</div>');
				strBuilderNotificationsContent.push('</a>');
				strBuilderNotificationsContent.push('</li>');
			}
			
		});
		strBuilderNotificationsContent.push('</ul>');
		strBuilderNotificationsContent.push('</div>');
	}
	$('#notifications-content-block').append(strBuilderNotificationsContent.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorNotifications(){
	$('#notifications-content-block').html('');
	var strBuilderNotificationsContent = [];
	strBuilderNotificationsContent.push('<div class="content-block content-block-information">');
		strBuilderNotificationsContent.push('<div id="divNotificationsErrorHeader"></div>');
		strBuilderNotificationsContent.push('<div id="divNotificationsErrorText"></div>');
		strBuilderNotificationsContent.push('<div onclick="loadNotifications()" class="link" id="divImgNotificationsError">');
			strBuilderNotificationsContent.push('<img id="imgNotificationsUpload" src="img/template/icon-upload.png" />');
		strBuilderNotificationsContent.push('</div>');
	strBuilderNotificationsContent.push('</div>');
	$('#notifications-content-block').append(strBuilderNotificationsContent.join(""));
	$('#divNotificationsErrorHeader').text(divErrorConnectionHeader);
	$('#divNotificationsErrorText').text(divErrorConnectionText);
}

function loadNewDetailsNotifications(idNew,idNotification,isRead){
console.log(idNew);
console.log(idNotification);
console.log(isRead);
	showLoadSpinnerWS();
	$.ajax({
    // URL del Web Service
            url: getPathWS() + 'getNoticiaDetalle',
            dataType: 'json',
            data: { 'id': idNew
            },
            timeout: timeOut,
            success: function(response){
            console.log(response);

                builderNewDetails(response.noticia);
                hideLoadSpinnerWS();
                //setNotificationRead(idNotification);
                if((isRead == false && $('#list-block-notifications-id'+idNotification).hasClass("notificationNoRead") == true)||isRead == null){
                    unreadNotifications--;
                    setBadgeIconNotificationsHome();
                }
                $('#list-block-notifications-id'+idNotification).removeClass("notificationNoRead");

            },
            error: function (data, status, error){
                hideLoadSpinnerWS();
                showMessage(messageConexionError);
           },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
    });

}

function loadNewDetailsNotifications1(idNew,idNotification,isRead){
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getNewDetails',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'id': idNew,
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
			builderNewDetails(response.newDetails);
			hideLoadSpinnerWS();
			setNotificationRead(idNotification);
			if((isRead == false && $('#list-block-notifications-id'+idNotification).hasClass("notificationNoRead") == true)||isRead == null){
				unreadNotifications--;
				setBadgeIconNotificationsHome();
			}
			$('#list-block-notifications-id'+idNotification).removeClass("notificationNoRead");

		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
	   }
	});
}

function setNotificationRead(idNotification){
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'setNotificationRead',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'clientId': window.localStorage.getItem("CLIENTID"+idClub),
				'notificationId': idNotification,
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
			
		},
		error: function (data, status, error){
	   }
	});
}