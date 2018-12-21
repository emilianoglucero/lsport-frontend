var swiperPhotoGalleryAchievement, swiperVideoGalleryAchievement;

var listPhotosBrowserAchievement = [];
var listVideoBrowserAchievement = [];

var myPhotoBrowserPhotoGalleryAchievement = myApp.photoBrowser();
var myPhotoBrowserVideoGalleryAchievement = myApp.photoBrowser();



myApp.onPageInit('achievementdetails', function (page)
{
    myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('achievementdetails', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name == 'achievements'){
		$$('#page-achievementdetails .page-content').scrollTop(0);
	}
	trackPageGA("Detalle Titulo");
	
});

function loadAchievementdetails(idNew){
	        showLoadSpinnerWS();
	        console.log(idNew);

	        	var achievementDetailsItem = achievementsList.filter(function( obj ) {
                  return obj.id == idNew;
                });
                achievementDetailsItem = achievementDetailsItem[0];
                console.log(achievementDetailsItem);


			// averiguar como hacer esto builderNewBanner(response.banner);
			builderAchievementDetails(achievementDetailsItem);
			hideLoadSpinnerWS();

}

function builderAchievementDetails(achievementDetailsItem){

	//var achievementDetailsItem = [];
console.log(achievementDetailsItem);
	var achievementsYearList;
	var centerSwiperPhotos = false;
	var centerSwiperVideos = false;
	//console.log(idItem);
	//$.each( achievementsList, function( i, item ){
	//console.log(item);
		//achievementsYearList = achievementsList[i].achievements;
		//achievementsYearList = achievementsList[i];
		/*achievementDetailsItem = $.grep(achievementsYearList, function(value, key) {
			return value.id == idItem;
		});*/
		/*var achievementDetailsItem = achievementsYearList.filter(function( obj ) {
          return obj.id == idItem;
        });*/

		//console.log(achievementDetailsItem);
		//if(achievementDetailsItem.length != 0){

			$('#pNameAchievementDetails').html(achievementDetailsItem.nombre);
			$('#containerImgHeaderAchievementDetail').html('<img data-src="'+achievementDetailsItem.imagenPrincipalMin+'" alt="'+achievementDetailsItem.descripcion+'" class="lazy lazy-fadeIn" id="imgHeaderAchievementDetails" />');
			$('#descriptionAchievementDetails').html(achievementDetailsItem.detalle);
			
			$('#divContentPhotoGalleryAchievement').html('');
			
			if(achievementDetailsItem.imagenes != ""){
				if(achievementDetailsItem.imagenes.length == 1){
					centerSwiperPhotos = true;
				}
				var strBuilderPhotogallery = [];
				strBuilderPhotogallery.push('<div class="content-block-title content-block-title-custom lblPhotoGallery"></div>');
				strBuilderPhotogallery.push('<div id="swiper-container-photogallery-achievement" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
					strBuilderPhotogallery.push('<div class="swiper-wrapper">');
						listPhotosBrowserAchievement = [];
						$.each(achievementDetailsItem.imagenes, function(index, item) {
						    
						    listPhotosBrowserAchievement.push(item.imagenMin);
							strBuilderPhotogallery.push('<div class="swiper-slide">');
							strBuilderPhotogallery.push('<img onclick="openPhotoBrowserAchievement('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.imagenMin+'"/>');
							strBuilderPhotogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
							strBuilderPhotogallery.push('</div>');
						});
					strBuilderPhotogallery.push('</div>');
					strBuilderPhotogallery.push('<div class="swiper-pagination swiper-pagination-photogallery"></div>');
				strBuilderPhotogallery.push('</div>');
				
				$('#divContentPhotoGalleryAchievement').append(strBuilderPhotogallery.join(""));
				$('.lblPhotoGallery').text(lblPhotoGallery);
			}
			$('#divContentVideoGalleryAchievement').html('');
			
			if(achievementDetailsItem.audiovisuales != ""){
				if(achievementDetailsItem.audiovisuales.length == 1){
					centerSwiperVideos = true;
				}
				var strBuilderVideogallery = [];
				strBuilderVideogallery.push('<div class="content-block-title content-block-title-custom lblVideoGallery"></div>');
				strBuilderVideogallery.push('<div id="swiper-container-videogallery-achievement" class="swiper-container swiper-container-gallery-min swiper-container-horizontal">');
					strBuilderVideogallery.push('<div class="swiper-wrapper">');
						listVideoBrowserAchievement = [];
						$.each(achievementDetailsItem.audiovisuales, function(index, item) {
						    listVideoBrowserAchievement.push(item);
							strBuilderVideogallery.push('<div class="swiper-slide">');
							strBuilderVideogallery.push('<img onclick="openVideoBrowserAchievement('+index+')" class="swiper-lazy swiperGalleryPhotosImg" data-src="'+item.url+'"/>');
							strBuilderVideogallery.push('<div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>');
							strBuilderVideogallery.push('</div>');
						});
					strBuilderVideogallery.push('</div>');
					strBuilderVideogallery.push('<div class="swiper-pagination swiper-pagination-videogallery"></div>');
				strBuilderVideogallery.push('</div>');
				
				$('#divContentVideoGalleryAchievement').append(strBuilderVideogallery.join(""));
				$('.lblVideoGallery').text(lblVideoGallery);
			}
		//}
	//});

	mainView.router.load({pageName: 'achievementdetails'});
	
	swiperPhotoGalleryAchievement = new Swiper('#swiper-container-photogallery-achievement', {
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
    
    swiperVideoGalleryAchievement = new Swiper('#swiper-container-videogallery-achievement', {
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
    
	myPhotoBrowserPhotoGalleryAchievement = myApp.photoBrowser({
	    photos : listPhotosBrowserAchievement,
	    photoLazyTemplate: photoLazyBrowser,
	    theme: 'dark',
	    swipeToClose: false,
	    lazyLoading: true,
	    navbarTemplate: navbarPhotoBrowser,
	    toolbar: false
	});
	
	myApp.initImagesLazyLoad(mainView.activePage.container);
}

function openPhotoBrowserAchievement(idPhoto){
	myPhotoBrowserPhotoGalleryAchievement.open(idPhoto);
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfPhotoBrowser').text(lblHeaderOfPhotoBrowser);
}


function openVideoBrowserAchievement(idVideo){
	var video = [
		{
			html: '<iframe src="'+listVideoBrowserAchievement[idVideo].urlVideo+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'
	    }
	];

	myPhotoBrowserVideoGalleryAchievement = myApp.photoBrowser({
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
	myPhotoBrowserVideoGalleryAchievement.open();
	$('.lblHeaderClose').text(lblHeaderClose);
	$('.lblHeaderOfVideoBrowser').text(listVideoBrowserAchievement[idVideo].titulo);
}