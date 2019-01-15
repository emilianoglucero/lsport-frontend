var swiperPhotoGalleryInstallation, swiperVideoGalleryInstallation;

var navbarPhotoBrowser = '<div class="navbar theme-white"><div class="navbar-inner navbar-on-center"><div class="left sliding"><a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}"><i class="icon icon-close {{iconsColorClass}}">X</i><span class="lblHeaderClose"></span>{{/if}}</a></div><div class="center sliding"><span class="photo-browser-current"></span><span class="lblHeaderOfPhotoBrowser photo-browser-of"></span><span class="photo-browser-total"></span></div><div class="right"></div></div></div>';
var navbarVideoBrowser = '<div class="navbar theme-white"><div class="navbar-inner navbar-on-center"><div class="left sliding"><a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}"><i class="icon icon-close {{iconsColorClass}}">X</i><span class="lblHeaderClose"></span>{{/if}}</a></div><div class="center sliding"><span class="lblHeaderOfVideoBrowser"></span></div><div class="right"></div></div></div>';

var photoLazyBrowser = '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide"><div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderSvg}}{{/if}}</div><span class="photo-browser-zoom-container"><img data-src="{{js "this.url || this"}}" class="swiper-lazy"></span></div>';
var listPhotosBrowserInstallation = [];
var listVideoBrowserInstallation = [];

var myPhotoBrowserPhotoGalleryInstallation = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryInstallation = myApp.photoBrowser();

myApp.onPageInit('installationdetails', function (page)
{ 
    myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('installationdetails', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name == 'installations'){
		$$('#page-installationdetails .page-content').scrollTop(0);
	}
	trackPageGA("Detalle Instalacion");
});


function builderInstallationDetails(idItem){
    console.log (idItem);
	
	var installationDetailsItem;
	installationDetailsItem = $.grep(installationsList, function(item, i) {
		return item.id == idItem;
	});
	console.log(installationDetailsItem);
	
	$('#pNameInstallationDetails').html(installationDetailsItem[0].nombre);
    $('#containerImgHeaderInstallationDetail').html('<img data-src="'+installationDetailsItem[0].imagenPrincipalMin+'" alt="'+installationDetailsItem[0].nombre+'" class="lazy lazy-fadeIn" id="imgHeaderInstallationDetails" />');
    $('#descriptionInstallationDetails').html(installationDetailsItem[0].descripcion);
	
	$('#divContentPhotoGalleryInstallation').html('');
	var centerSwiperPhotos = false;
	if(installationDetailsItem[0].imagenes != ""){
		if(installationDetailsItem[0].imagenes.length == 1){
			centerSwiperPhotos = true;
		}
		var strBuilderPhotogallery = [];
		strBuilderPhotogallery.push('<div class="content-block-title content-block-title-custom lblPhotoGallery"></div>');
		strBuilderPhotogallery.push('<div id="swiper-container-photogallery-installation" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderPhotogallery.push('<div class="swiper-wrapper">');
				listPhotosBrowserInstallation = [];
				$.each(installationDetailsItem[0].imagenes, function(index, item) {
				    
				    listPhotosBrowserInstallation.push(item.imagenMin);
					strBuilderPhotogallery.push('<div class="swiper-slide">');
					strBuilderPhotogallery.push('<img onclick="openPhotoBrowserIntallation('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.imagenMin+'"/>');
					strBuilderPhotogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
					strBuilderPhotogallery.push('</div>');
				});
			strBuilderPhotogallery.push('</div>');
			strBuilderPhotogallery.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
		strBuilderPhotogallery.push('</div>');
		
		$('#divContentPhotoGalleryInstallation').append(strBuilderPhotogallery.join(""));
		$('.lblPhotoGallery').text(lblPhotoGallery);
		
	}
	$('#divContentVideoGalleryInstallation').html('');
	
	var centerSwiperVideos = false;
	if(installationDetailsItem[0].galleryVideos != ""){
		if(installationDetailsItem[0].imagenes.length == 1){
			centerSwiperVideos = true;
		}
		var strBuilderVideogallery = [];
		strBuilderVideogallery.push('<div class="content-block-title content-block-title-custom lblVideoGallery"></div>');
		strBuilderVideogallery.push('<div id="swiper-container-videogallery-installation" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
			strBuilderVideogallery.push('<div class="swiper-wrapper">');
				listVideoBrowserInstallation = [];
				$.each(installationDetailsItem[0].audiovisuales, function(index, item) {
				    listVideoBrowserInstallation.push(item);
					strBuilderVideogallery.push('<div class="swiper-slide">');
					strBuilderVideogallery.push('<img onclick="openVideoBrowserInstallation('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.thumbnail+'"/>');
					strBuilderVideogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
					strBuilderVideogallery.push('</div>');
				});
			strBuilderVideogallery.push('</div>');
			strBuilderVideogallery.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
		strBuilderVideogallery.push('</div>');
		
		$('#divContentVideoGalleryInstallation').append(strBuilderVideogallery.join(""));
		
		$('.lblVideoGallery').text(lblVideoGallery);
	}
	
	mainView.router.load({pageName: 'installationdetails'});
	
	swiperPhotoGalleryInstallation = new Swiper('#swiper-container-photogallery-installation', {
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
    
    swiperVideoGalleryInstallation = new Swiper('#swiper-container-videogallery-installation', {
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
    
	myPhotoBrowserPhotoGalleryInstallation = myApp.photoBrowser({
	    photos : listPhotosBrowserInstallation,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarPhotoBrowser,
	    toolbar: false
	});
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function openPhotoBrowserIntallation(idPhoto){
	myPhotoBrowserPhotoGalleryInstallation.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}

function openVideoBrowserInstallation(idVideo){
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserInstallation[idVideo].urlVideo+'" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryInstallation = myApp.photoBrowser({
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
	myPhotoBrowserVideoGalleryInstallation.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserInstallation[idVideo].titulo);
}