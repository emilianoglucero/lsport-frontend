var swiperPhotoGalleryMilestone, swiperVideoGalleryMilestone;

var listPhotosBrowserMilestone = [];
var listVideoBrowserMilestone = [];

var myPhotoBrowserPhotoGalleryMilestone = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryMilestone = myApp.photoBrowser();

myApp.onPageInit('milestonedetails', function (page)
{
    myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('milestonedetails', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name == 'milestones'){
		$$('#page-milestonedetails .page-content').scrollTop(0);
	}
	trackPageGA("Detalle Historia");
});

function builderMilestoneDetails(idItem){
	var milestoneDetailsItem = [];
	var milestonesYearList;
	var centerSwiperVideos = false;
	var centerSwiperPhotos = false;
	$.each( milestonesList, function( i, item ){
		milestonesYearList = milestonesList[i].milestones;
		milestoneDetailsItem = $.grep(milestonesYearList, function(value, key) {
			return value.id == idItem;
		});
		
		if(milestoneDetailsItem.length != 0){

			$('#pNameMilestoneDetails').html(milestoneDetailsItem[0].title);
			$('#containerImgHeaderMilestoneDetail').html('<img data-src="'+milestoneDetailsItem[0].urlImg+'" alt="'+milestoneDetailsItem[0].altImg+'" class="lazy lazy-fadeIn" id="imgHeaderMilestoneDetails" />');
			$('#descriptionMilestoneDetails').html(milestoneDetailsItem[0].desc);
			
			$('#divContentPhotoGalleryMilestone').html('');
			
			if(milestoneDetailsItem[0].galleryImages != ""){
				if (milestoneDetailsItem[0].galleryImages.length == 1){
					centerSwiperPhotos = true;
				}
				var strBuilderPhotogallery = [];
				strBuilderPhotogallery.push('<div class="content-block-title content-block-title-custom lblPhotoGallery"></div>');
				strBuilderPhotogallery.push('<div id="swiper-container-photogallery-milestone" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
					strBuilderPhotogallery.push('<div class="swiper-wrapper">');
						listPhotosBrowserMilestone = [];
						$.each(milestoneDetailsItem[0].galleryImages, function(index, item) {
						    
						    listPhotosBrowserMilestone.push(item.urlImg);
							strBuilderPhotogallery.push('<div class="swiper-slide">');
							strBuilderPhotogallery.push('<img onclick="openPhotoBrowserMilestone('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.urlImg+'"/>');
							strBuilderPhotogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
							strBuilderPhotogallery.push('</div>');
						});
					strBuilderPhotogallery.push('</div>');
					strBuilderPhotogallery.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
				strBuilderPhotogallery.push('</div>');
				$('#divContentPhotoGalleryMilestone').append(strBuilderPhotogallery.join(""));
				$('.lblPhotoGallery').text(lblPhotoGallery);
			}
			$('#divContentVideoGalleryMilestone').html('');
			
			if(milestoneDetailsItem[0].galleryVideos != ""){
				if (milestoneDetailsItem[0].galleryVideos.length == 1){
					centerSwiperVideos = true;
				}
				var strBuilderVideogallery = [];
				strBuilderVideogallery.push('<div class="content-block-title content-block-title-custom lblVideoGallery"></div>');
				strBuilderVideogallery.push('<div id="swiper-container-videogallery-milestone" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
					strBuilderVideogallery.push('<div class="swiper-wrapper">');
						listVideoBrowserMilestone = [];
						$.each(milestoneDetailsItem[0].galleryVideos, function(index, item) {
						    listVideoBrowserMilestone.push(item);
							strBuilderVideogallery.push('<div class="swiper-slide">');
							strBuilderVideogallery.push('<img onclick="openVideoBrowserMilestone('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.thumbnail+'"/>');
							strBuilderVideogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
							strBuilderVideogallery.push('</div>');
						});
					strBuilderVideogallery.push('</div>');
					strBuilderVideogallery.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
				strBuilderVideogallery.push('</div>');
				$('#divContentVideoGalleryMilestone').append(strBuilderVideogallery.join(""));
				$('.lblVideoGallery').text(lblVideoGallery);
			}
		}
		
	});
	
	mainView.router.load({pageName: 'milestonedetails'});
	
	swiperPhotoGalleryMilestone = new Swiper('#swiper-container-photogallery-milestone', {
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
    
    swiperVideoGalleryMilestone = new Swiper('#swiper-container-videogallery-milestone', {
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
    
	myPhotoBrowserPhotoGalleryMilestone = myApp.photoBrowser({
	    photos : listPhotosBrowserMilestone,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarPhotoBrowser,
	    toolbar: false
	});
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function openPhotoBrowserMilestone(idPhoto){
	myPhotoBrowserPhotoGalleryMilestone.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}


function openVideoBrowserMilestone(idVideo){
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserMilestone[idVideo].urlVideo+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryMilestone = myApp.photoBrowser({
	    photos : video,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarVideoBrowser,
	    toolbar: false,
	    onOpen: function (){navigator.screenOrientation.set('user'); },
    	onClose: function (){navigator.screenOrientation.set('portrait'); }
	    
	});
	myPhotoBrowserVideoGalleryMilestone.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserMilestone[idVideo].caption);
}