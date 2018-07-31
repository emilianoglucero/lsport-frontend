var swiperPhotoGalleryEvent, swiperVideoGalleryEvent;

var listPhotosBrowserEvent = [];
var listVideoBrowserEvent = [];

var myPhotoBrowserPhotoGalleryEvent = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryEvent = myApp.photoBrowser();

myApp.onPageInit('eventdetails', function (page)
{  
	$('.lblShareEventWhatsapp').text(lblShareWhatsapp);
    $('.lblShareEventFacebook').text(lblShareFacebook);
    $('.lblShareEventTwitter').text(lblShareTwitter);
});

myApp.onPageBeforeAnimation('eventdetails', function (page)
{
	myApp.params.swipePanel = false;
	$$('#page-eventdetails .page-content').scrollTop(0);
	trackPageGA("Detalle Evento");
});

function loadEventDetails(idEvent){
	showLoadSpinnerWS();
	$.ajax({
		// URL del Web Service
		url: getPathWS() + 'getEventDetails',
		dataType: 'jsonp',
		data: { 'idClub': idClub,
				'id': idEvent,
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
			builderEventDetails(response.eventDetails);
			hideLoadSpinnerWS();

		},
		error: function (data, status, error){
	          hideLoadSpinnerWS();
	          showMessage(messageConexionError);
	   }
		});
}

function loadEventDetails1(idNew, state){
            console.log(idNew);
	        showLoadSpinnerWS();
	        if (state) { //significa que el usuario llega por el calendario
	            var itemsArrayEvents = homeDetails2List.calendario;
	            console.log(itemsArrayEvents);

	        	var eventDetails = itemsArrayEvents.filter(function( obj ) {
                  return obj.id == idNew;
                });
                eventDetails = eventDetails[0];
            } else {

                var eventDetails = allSucesosEventsList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                eventDetails = eventDetails[0];

            }

			// averiguar como hacer esto builderNewBanner(response.banner);
			builderEventDetails(eventDetails);
			hideLoadSpinnerWS();

}


function builderEventDetails(eventDetailsItem){
console.log(eventDetailsItem);

	$('#pNameEventDetails').html(eventDetailsItem.titulo);


	$('#containerImgHeaderEventDetail').html('<img data-src="'+eventDetailsItem.urlImg+'" alt="'+eventDetailsItem.altImg+'" class="lazy lazy-fadeIn" id="imgHeaderEventDetails" />');
	
	$('#dateEventDetails').html(eventDetailsItem.fecha.fecha);
	$('#hourEventDetails').html(eventDetailsItem.fecha.hora);
	$('#placeTextEventDetails').html(eventDetailsItem.lugarDesarrollo);
	
	$('#descriptionEventDetails').html(eventDetailsItem.bajada);
	
	
	$('#divContentPhotoGalleryEvent').html('');
	var centerSwiperPhotos = false;
	if(eventDetailsItem.imagenes != ""){
		if(eventDetailsItem.imagenes.length == 1){
			centerSwiperPhotos = true;
		}
		var strBuilderPhotogallery = [];
		strBuilderPhotogallery.push('<div class="content-block-title content-block-title-custom lblPhotoGallery">'+lblPhotoGallery+'</div>');
		strBuilderPhotogallery.push('<div id="swiper-container-photogallery-event" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderPhotogallery.push('<div class="swiper-wrapper">');
				listPhotosBrowserEvent = [];
				$.each(eventDetailsItem.imagenes, function(index, item) {
				    
				    listPhotosBrowserEvent.push(item.urlImg);
					strBuilderPhotogallery.push('<div class="swiper-slide">');
					strBuilderPhotogallery.push('<img onclick="openPhotoBrowserEvent('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.urlImg+'"/>');
					strBuilderPhotogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
					strBuilderPhotogallery.push('</div>');
				});
			strBuilderPhotogallery.push('</div>');
			strBuilderPhotogallery.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
		strBuilderPhotogallery.push('</div>');
		
		$('#divContentPhotoGalleryEvent').append(strBuilderPhotogallery.join(""));
		
	}
	$('#divContentVideoGalleryEvent').html('');
	var centerSwiperVideos = false;
	if(eventDetailsItem.audiovisuales != ""){
		if (eventDetailsItem.audiovisuales.length == 1){
			centerSwiperVideos = true;
		}
		var strBuilderVideogallery = [];
		strBuilderVideogallery.push('<div class="content-block-title content-block-title-custom lblVideoGallery">'+lblVideoGallery+'</div>');
		strBuilderVideogallery.push('<div id="swiper-container-videogallery-event" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderVideogallery.push('<div class="swiper-wrapper">');
				listVideoBrowserEvent = [];
				$.each(eventDetailsItem.galleryVideos, function(index, item) {
				    listVideoBrowserEvent.push(item);
					strBuilderVideogallery.push('<div class="swiper-slide">');
					strBuilderVideogallery.push('<img onclick="openVideoBrowserEvent('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.thumbnail+'"/>');
					strBuilderVideogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
					strBuilderVideogallery.push('</div>');
				});
			strBuilderVideogallery.push('</div>');
			strBuilderVideogallery.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
		strBuilderVideogallery.push('</div>');
		
		$('#divContentVideoGalleryEvent').append(strBuilderVideogallery.join(""));
	}

		
	
	mainView.router.load({pageName: 'eventdetails'});
	
	swiperPhotoGalleryEvent = new Swiper('#swiper-container-photogallery-event', {
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
    
    swiperVideoGalleryEvent = new Swiper('#swiper-container-videogallery-event', {
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
    
	myPhotoBrowserPhotoGalleryEvent = myApp.photoBrowser({
	    photos : listPhotosBrowserEvent,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarPhotoBrowser,
	    toolbar: false
	});
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
	
	$('#shareEventWhatsapp').attr("onclick","shareEventWhatsapp('"+eventDetailsItem.titulo+"','"+eventDetailsItem.fecha.fecha+"','"+eventDetailsItem.fecha.hora+"','"+eventDetailsItem.lugarDesarrollo+"','"+eventDetailsItem.imagenPrincipal+"','"+eventDetailsItem.imagenPrincipalMin+"')");
	$('#shareEventFacebook').attr("onclick","shareEventFacebook('"+eventDetailsItem.titulo+"','"+eventDetailsItem.imagenPrincipal+"','"+eventDetailsItem.imagenPrincipalMin+"')");
	$('#shareEventTwitter').attr("onclick","shareEventTwitter('"+eventDetailsItem.titulo+"','"+eventDetailsItem.fecha.fecha+"','"+eventDetailsItem.fecha.hora+"','"+eventDetailsItem.lugarDesarrollo+"','"+eventDetailsItem.imagenPrincipalMin+"')");
}

function openPhotoBrowserEvent(idPhoto){
	myPhotoBrowserPhotoGalleryEvent.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}


function openVideoBrowserEvent(idVideo){
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserEvent[idVideo].urlVideo+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryEvent = myApp.photoBrowser({
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
	myPhotoBrowserVideoGalleryEvent.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserEvent[idVideo].caption);
}





