var recentNewsList = [];
var nextPageNumberNews = 1;
var loadingInfiniteScrollNews = false;
var areAccessedServerNews = false;

myApp.onPageInit('news', function (page)
{
    //$('#').text();
    $('.headerListEndNews').text(headerListEndNews);
    $('.contentListEndNews').text(contentListEndNews);
    $('#news-content-block').html('');
    
    nextPageNumberNews = 1;
    loadNews();
    
    $$('.infinite-scroll-news').on('infinite', function () {
		if (loadingInfiniteScrollNews){
			return;
		}
		
		loadingInfiniteScrollNews = true;
		
		if (areAccessedServerNews == false){
			
			loadNews();
		} else {
			
			$('#noConnection-content-block-news').show();
		}
	});
    
});

myApp.onPageBeforeAnimation('news', function (page)
{
	myApp.params.swipePanel = 'left';
	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Noticias");
	idLiveMatchActivePage=null;
	idLiveMatchSportDetails= null;
});

function loadNews(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getNews',
			dataType: 'jsonp',
			data: { 'idClub': idClub,
					'pageNumber': nextPageNumberNews
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
					mainView.router.load({pageName: 'update'});
					return;
				}
				nextPageNumberNews = parseInt(response.pageNumber) + 1;
				if( response.pageNumber == 1 ){
					$('#news-content-block').html('');
				}
				recentNewsList = [];
				recentNewsList = response.news;
				builderNewsList();
				hideLoadSpinnerWS();
				if( response.totalPage < nextPageNumberNews ){
					myApp.detachInfiniteScroll('.infinite-scroll-news');
				}
				loadingInfiniteScrollNews = false;
				areAccessedServerNews = false;
				$('#noConnection-content-block-news').hide();
			},
			error: function (data, status, error){
		          if( nextPageNumberNews == 1 ){
		          	builderErrorNews();
		          	hideLoadSpinnerWS();
		          } else {
		          	hideLoadSpinnerWS();
		          	showMessageToast(messageCanNotRefresh);
		          	loadingInfiniteScrollNews = false;
		          	areAccessedServerNews = true;
		          }
		   }
	});
}

function reloadNews(){
	if (existInternetConnection() == true){
		loadNews();
	} else{
		showMessageToast(messageCanNotRefresh);
	}
}

function builderNewsList(){
	var strBuilderNewsContent = [];
	if(recentNewsList.length == 0){
		strBuilderNewsContent.push('<div class="content-block">');
			strBuilderNewsContent.push('<div class="divNotLastestNews">'+divNotLastestNews+'</div>');
		strBuilderNewsContent.push('</div>');
	}else{
		$.each( recentNewsList, function( i, item ){
			if(item.type == "banner"){
				/*strBuilderNewsContent.push('<div class="item-list-banner">'); ERASE
					strBuilderNewsContent.push(builderBannerPublicityList(item.urlAdBanner,item.linkAdBanner));
				strBuilderNewsContent.push('</div>');*/
			} else{
				strBuilderNewsContent.push('<div class="card card-news"><div class="card-content"><div class="list-block list-block-about media-list">');
					strBuilderNewsContent.push('<ul><li class="item-content">');
						strBuilderNewsContent.push('<a onclick="loadNewDetails('+item.id+')" href="#" class="item-link item-content">');
						
							strBuilderNewsContent.push('<div class="item-media">');
							var urlImgNewsList = getDefaultImageNewsList();
							if(item.urlImgMin != ""){
								urlImgNewsList = item.urlImgMin; 
							}
							strBuilderNewsContent.push('<img class="lazy lazy-fadeIn imgCardNew" data-src="'+urlImgNewsList+'" alt="'+item.altImg+'" />');
							strBuilderNewsContent.push('</div>');
							
							strBuilderNewsContent.push('<div class="item-inner">');
							strBuilderNewsContent.push('<div class="item-title-row">');
							strBuilderNewsContent.push('<div class="item-title item-title-new">'+item.title+'</div>');
							strBuilderNewsContent.push('</div>');
								strBuilderNewsContent.push('<div class="item-subContent-news">');
									strBuilderNewsContent.push('<span class="item-date">'+item.publishDate+'</span>');
									strBuilderNewsContent.push('<span class="item-shortContent">'+item.shortContent+'</span>');
								strBuilderNewsContent.push('</div>');
							strBuilderNewsContent.push('</div>');
							
						strBuilderNewsContent.push('</a>');
					strBuilderNewsContent.push('</li></ul>');
				strBuilderNewsContent.push('</div></div></div>');
			}
		});
	}
	$('#news-content-block').append(strBuilderNewsContent.join(""));
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderErrorNews(){
	$('#news-content-block').html('');
	var strBuilderNewsContent = [];
	strBuilderNewsContent.push('<div class="content-block content-block-information">');
		strBuilderNewsContent.push('<div id="divNewsErrorHeader">'+divErrorConnectionHeader+'</div>');
		strBuilderNewsContent.push('<div id="divNewsErrorText">'+divErrorConnectionText+'</div>');
		strBuilderNewsContent.push('<div onclick="loadNews()" class="link" id="divImgNewsError">');
			strBuilderNewsContent.push('<img id="imgNewsUpload" src="img/template/icon-upload.png" />');
		strBuilderNewsContent.push('</div>');
	strBuilderNewsContent.push('</div>');
	$('#news-content-block').append(strBuilderNewsContent.join(""));
}