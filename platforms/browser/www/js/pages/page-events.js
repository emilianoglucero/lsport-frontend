var recentEventsList = [];
var nextPageNumberEvents = 1;
var loadingInfiniteScrollEvents = false;
var areAccessedServerEvents = false;

myApp.onPageInit('events', function (page)
{
	$('.headerListEndNews').text(headerListEndNews);
    $('.contentListEndNews').text(contentListEndNews);
    
    
	loadEvents();
    
    
    $$('.infinite-scroll-events').on('infinite', function () {
		if (loadingInfiniteScrollEvents) {
			return;
		}
		loadingInfiniteScrollEvents = true;
		
		if (areAccessedServerEvents == false){
			loadEvents();
		} else {
			$('#noConnection-content-block-events').show();
		}
	});
	
});

myApp.onPageBeforeAnimation('events', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Eventos");
});


function loadEvents(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getEvents',
			dataType: 'jsonp',
			data: { 'idClub': idClub,
					'pageNumber': nextPageNumberEvents },
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
				nextPageNumberEvents = parseInt(response.pageNumber) + 1;
				
				if( response.pageNumber == 1 ){
					$('#events-content-block').html('');
					recentEventsList = [];
					recentEventsList = response.events;
					builderEventsList();
					hideLoadSpinnerWS();
				} else {
					recentEventsList = [];
					recentEventsList = response.events;
					builderEventsList();
					hideLoadSpinnerWS();
				}
				
				if( response.totalPage < nextPageNumberEvents ){
					myApp.detachInfiniteScroll('.infinite-scroll-events');
				}
				loadingInfiniteScrollEvents = false;
				areAccessedServerEvents = false;
				$('#noConnection-content-block-events').hide();
				
			},
			error: function (data, status, error){
		          loadingInfiniteScrollEvents = false;
		          if( nextPageNumberEvents == 1 ){
		          	builderErrorEvents();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	areAccessedServerEvents = true;
		          }
		   }
	});
}

function reloadEvents(){
	if (existInternetConnection() == true){
		loadEvents();
	} else{
		showMessageToast(messageCanNotRefresh);
	}
}


function builderEventsList(){
	
	var strBuilderEventsContent = [];
	
	if(recentEventsList.length == 0){
		strBuilderEventsContent.push('<div class="content-block">');
			strBuilderEventsContent.push('<div class="divNotEvents"></div>');
		strBuilderEventsContent.push('</div>');
	}else{
		$.each( recentEventsList, function( i, item ){
			if(item.type == "banner"){
				/*strBuilderEventsContent.push('<div class="item-list-banner">'); ERASE
					strBuilderEventsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
				strBuilderEventsContent.push('</div>');*/
			} else{
				strBuilderEventsContent.push('<a href="#" class="aEventDetails" onclick="loadEventDetails('+item.id+')">');
					strBuilderEventsContent.push('<div class="card card-event">');
					strBuilderEventsContent.push('<div class="card-event-content">');
						strBuilderEventsContent.push('<div class="card-content card-content-event">');
							strBuilderEventsContent.push('<div class="content-block">');
								strBuilderEventsContent.push('<div class="row row-events-page">');
									strBuilderEventsContent.push('<div class="col-50">');
										strBuilderEventsContent.push('<img data-src="'+item.urlImgMin+'" alt="'+item.altImg+'" class="lazy lazy-fadeIn imgCardEvent"/>');
									strBuilderEventsContent.push('</div>');
									strBuilderEventsContent.push('<div class="col-50">');
										strBuilderEventsContent.push('<table class="table-events-page">');
											strBuilderEventsContent.push('<tr><td><i class="icon icon-date-event"></i></td><td><span>'+item.eventDate+'</span></td></tr>');
											strBuilderEventsContent.push('<tr><td><i class="icon icon-hour-event"></i></td><td><span>'+item.eventHour+'</span></td></tr>');
										strBuilderEventsContent.push('</table>');
									strBuilderEventsContent.push('</div>');
								strBuilderEventsContent.push('</div>');
							strBuilderEventsContent.push('</div>');
						strBuilderEventsContent.push('</div>');
						strBuilderEventsContent.push('<div class="card-footer card-footer-event">'+item.title+'</div>');
					strBuilderEventsContent.push('</div>');
				strBuilderEventsContent.push('</div>');
			}
		});
	}
	$('#events-content-block').append(strBuilderEventsContent.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
	$('.divNotEvents').text(divNotEvents);
}

function builderErrorEvents(){
	$('#events-content-block').html('');
	var strBuilderEventsContent = [];
	strBuilderEventsContent.push('<div class="content-block content-block-information">');
		strBuilderEventsContent.push('<div id="divEventsErrorHeader"></div>');
		strBuilderEventsContent.push('<div id="divEventsErrorText"></div>');
		strBuilderEventsContent.push('<div onclick="loadEvents()" class="link" id="divImgEventsError">');
			strBuilderEventsContent.push('<img id="imgEventsUpload" src="img/template/icon-upload.png" />');
		strBuilderEventsContent.push('</div>');
	strBuilderEventsContent.push('</div>');
	$('#events-content-block').append(strBuilderEventsContent.join(""));
	$('#divEventsErrorHeader').text(divErrorConnectionHeader);
	$('#divEventsErrorText').text(divErrorConnectionText);
}