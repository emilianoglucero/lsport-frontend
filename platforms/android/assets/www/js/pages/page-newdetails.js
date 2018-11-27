var swiperPhotoGalleryNewDetails, swiperVideoGalleryNewDetails;

var listPhotosBrowserNewDetails = [];
var listVideoBrowserNewDetails = [];

var myPhotoBrowserPhotoGalleryNewDetails = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryNewDetails = myApp.photoBrowser();

myApp.onPageInit('newdetails', function (page)
{
    $('.lblShareNewWhatsapp').text(lblShareWhatsapp);
    $('.lblShareNewFacebook').text(lblShareFacebook);
    $('.lblShareNewTwitter').text(lblShareTwitter);
});

myApp.onPageBeforeAnimation('newdetails', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-newdetails .page-content').scrollTop(0);
	trackPageGA("Detalle Noticia");
});

function loadNewDetails(idNew, state){
	        showLoadSpinnerWS();
	        console.log(idNew);
	        console.log(allSucesosNewsList);
	        console.log(state);
            if (state){
	        	var newsDetails = allNewsPageList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                newsDetailsHome = newsDetails[0];
                console.log(newsDetailsHome);
            } else {
                var newsDetails = allSucesosNewsList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                newsDetailsHome = newsDetails[0];
            }
            newsDetailsHome.audiovisuales


			// averiguar como hacer esto builderNewBanner(response.banner);
			builderNewDetails(newsDetailsHome);
			hideLoadSpinnerWS();

}

function builderNewDetails(newDetailsItem){
console.log(newDetailsItem);
	
	$('#backgroundHeaderNewDetails').html('');
	var strBuilderImgHeaderNew = [];
	var urlImgNewDetails = getDefaultImageNewDetails();
	var pathImgShare = "www/" + getDefaultImageNewDetails();
	if(newDetailsItem.imagenPrincipal != ""){
		urlImgNewDetails = newDetailsItem.imagenPrincipal;
		pathImgShare = newDetailsItem.imagenPrincipal;
	}
	
	strBuilderImgHeaderNew.push('<img class="lazy lazy-fadeIn imgHeaderNewDetails" data-src="'+urlImgNewDetails+'" alt="'+newDetailsItem.altImg+'"/>');
	
	$('#backgroundHeaderNewDetails').append(strBuilderImgHeaderNew.join(""));
	
	$('#titleNewDetails').html(newDetailsItem.titulo);
	$('#shortContentNewDetails').html(newDetailsItem.bajada);
	//$('#publisherNewDetails').html(lblPublisherBy +' '+ newDetailsItem.publisher);
	
	$('#contentNewDetails').html(newDetailsItem.detalle);
	$('#dateNewDetails').html(lblPublicDateNew+' ' +newDetailsItem.fecha.fecha + ' '+lblPublicDateHour+' ' +newDetailsItem.fecha.hora);
	
	$('#shareNewWhatsapp').attr("onclick","shareNewWhatsapp('"+newDetailsItem.titulo+"','"+newDetailsItem.bajada+"','"+pathImgShare+"','"+newDetailsItem.imagenPrincipal+"')");
	$('#shareNewFacebook').attr("onclick","shareNewFacebook('"+newDetailsItem.titulo+"','"+pathImgShare+"','"+newDetailsItem.imagenPrincipal+"')");
	$('#shareNewTwitter').attr("onclick","shareNewTwitter('"+newDetailsItem.titulo+"','"+newDetailsItem.imagenPrincipal+"')");
	
	$('#divContentPhotoGalleryNewDetails').html(builderPhotoGalleryNewDetails(newDetailsItem.audiovisuales));
	$('#divContentVideoGalleryNewDetails').html(builderVideoGalleryNewDetails(newDetailsItem.audiovisuales));
	
	mainView.router.load({pageName: 'newdetails'});
	
	var centerSwiperPhotos = false;
	if (newDetailsItem.imagenes.length == 1){
		centerSwiperPhotos = true;
	}
	
	swiperPhotoGalleryNewDetails = new Swiper('#swiper-container-photogallery-newdetails', {
        pagination: '.swiper-pagination-photogallery',
        slidesPerView: 2,
        centeredSlides: centerSwiperPhotos,
        paginationClickable: true,
        spaceBetween: 15,
        preloadImages: true,
        updateOnImagesReady: true,
        lazyLoadingInPrevNext: true,
        lazyLoading: true
    });
    
    var centerSwiperVideos = false;
	if (newDetailsItem.audiovisuales.length == 1){
		centerSwiperVideos = true;
	}
    
    swiperVideoGalleryNewDetails = new Swiper('#swiper-container-videogallery-newdetails', {
        pagination: '.swiper-pagination-videogallery',
        slidesPerView: 2,
        centeredSlides: centerSwiperVideos,
        paginationClickable: true,
        spaceBetween: 15,
        preloadImages: true,
        updateOnImagesReady: true,
        lazyLoadingInPrevNext: true,
        lazyLoading: true
    });
    
	myPhotoBrowserPhotoGalleryNewDetails = myApp.photoBrowser({
	    photos : listPhotosBrowserNewDetails,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarPhotoBrowser,
	    toolbar: false
	});
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function builderPhotoGalleryNewDetails(imagesGallery){
console.log(imagesGallery);
console.log(imagesGallery.tipo);
	var strBuilderPhotogallery = [];
	strBuilderPhotogallery.push('');
	if(imagesGallery != ""){
		strBuilderPhotogallery.push('<div class="content-block-title content-block-title-custom lblPhotoGallery">'+lblPhotoGallery+'</div>');
		strBuilderPhotogallery.push('<div id="swiper-container-photogallery-newdetails" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderPhotogallery.push('<div class="swiper-wrapper">');
				listPhotosBrowserNewDetails = [];
				$.each(imagesGallery, function(index, item) {
				console.log(item);
                    if(item.tipo == "imagen"){
                        listPhotosBrowserNewDetails.push(item.urlImg);
                        strBuilderPhotogallery.push('<div class="swiper-slide">');
                        strBuilderPhotogallery.push('<img onclick="openPhotoBrowserNewDetails('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.url+'"/>');
                        strBuilderPhotogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
                        strBuilderPhotogallery.push('</div>');
                    }
				});
			strBuilderPhotogallery.push('</div>');
			strBuilderPhotogallery.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
		strBuilderPhotogallery.push('</div>');
	}
	return(strBuilderPhotogallery.join(""));
}

function builderVideoGalleryNewDetails(videosGallery){
console.log(videosGallery);
console.log(videosGallery.tipo);
	var strBuilderVideoGallery = [];
	strBuilderVideoGallery.push('');
	if(videosGallery != ""){
		strBuilderVideoGallery.push('<div class="content-block-title content-block-title-custom lblVideoGallery">'+lblVideoGallery+'</div>');
		strBuilderVideoGallery.push('<div id="swiper-container-videogallery-newdetails" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderVideoGallery.push('<div class="swiper-wrapper">');
				listVideoBrowserNewDetails = [];
				$.each(videosGallery, function(index, item) {
				console.log(item);
                    if(item.tipo == "youtube"){
                        listVideoBrowserNewDetails.push(item);
                        strBuilderVideoGallery.push('<div class="swiper-slide">');
                        strBuilderVideoGallery.push('<img onclick="openVideoBrowserNewDetails('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.imagen+'"/>');
                        strBuilderVideoGallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
                        strBuilderVideoGallery.push('</div>');
                    }
				});
				console.log(listVideoBrowserNewDetails);
			strBuilderVideoGallery.push('</div>');
			strBuilderVideoGallery.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
		strBuilderVideoGallery.push('</div>');
	}
	return(strBuilderVideoGallery.join(""));
}

function openPhotoBrowserNewDetails(idPhoto){
	myPhotoBrowserPhotoGalleryNewDetails.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}


function openVideoBrowserNewDetails(idVideo){
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserNewDetails[idVideo].url+'" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryNewDetails = myApp.photoBrowser({
	    photos : video,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarVideoBrowser,
	    toolbar: false,
	    onOpen: function (){screen.orientation.unlock(); },
        	    onClose: function (){screen.orientation.lock('portrait'); }
	    /*onOpen: function (){navigator.screenOrientation.set('user'); },
    	onClose: function (){navigator.screenOrientation.set('portrait'); }*/
	});
	myPhotoBrowserVideoGalleryNewDetails.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	console.log(listVideoBrowserNewDetails);
	console.log(listVideoBrowserNewDetails[idVideo]);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserNewDetails[idVideo].titulo);
}


function builderNewBanner(banner){
	$('#urlAdBannerNewDetails').html(builderBannerPublicityDetail(banner));
}



