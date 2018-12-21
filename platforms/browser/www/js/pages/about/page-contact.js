var contactList = [];
var bannerContact = [];
var areContactLoaded = false;
var arePageContactBuild = false;


myApp.onPageInit('contact', function (page)
{
	myApp.initImagesLazyLoad(mainView.activePage.container);
});

myApp.onPageBeforeAnimation('contact', function (page)
{
	myApp.params.swipePanel = false;
	
	if(page.fromPage.name == 'about'){
		$$('#page-contact .page-content').scrollTop(0);
	}
	trackPageGA("Contacto");
});

function loadContact(){
	showLoadSpinnerWS();
	$.ajax({
			// URL del Web Service
			url: getPathWS() + 'getContact',
			dataType: 'jsonp',
			data: { 'idClub': idClub },
			timeout: timeOut,
			success: function(response){
				// Response:
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
				contactList = response.contact;
				bannerContact = response.banner;
				areContactLoaded = true;
				builderContactList();
				hideLoadSpinnerWS();
			},
			error: function (data, status, error){
		          hideLoadSpinnerWS();
		          showMessage(messageConexionError);
		   }
		});
}

function builderContactList(){
	
	var strBuilderContactContent = [];
	//if(areContactLoaded == true){
	
		if(contactList.length == 0){
			showMessage(messageNotContact);
		}
		else if(arePageContactBuild == false){
			
				
				$('#containerStaticMapLocationClub').html('');
				var strBuilderStaticMap = [];
				strBuilderStaticMap.push('<img onclick="openMap('+contactList.latitude+','+contactList.longitude+')" class="lazy lazy-fadeIn" id="imgMapContact" data-src="https://maps.googleapis.com/maps/api/staticmap?&zoom=15&size=600x300&maptype=roadmap&markers=color:blue|'+contactList.latitude+','+contactList.longitude+'" alt="'+contactList.address+'" />');
				
				$('#containerStaticMapLocationClub').append(strBuilderStaticMap.join(""));
				
				if(contactList.phones == ""){
					$('#listPhonesContact').hide();
				} else{
					var phonesContact = contactList.phones;
					var strBuilderListPhones = [];
					$.each(phonesContact, function( index, value ) {
						strBuilderListPhones.push('<a href="#" onclick="openPhoneCaller(\''+value.number+'\')" class="link item-content"><div class="item-media"><i class="icon icon-form-phone"></i></div><div class="item-inner"><div class="item-title label">'+value.number+' - '+value.label+'</div></div></a>');
					});
					$('#listPhonesContact').append(strBuilderListPhones.join(""));
				}
				
				if(contactList.social == ""){
					$('#listSocialContact').hide();
				} else{
					var socialList = contactList.social;
					var strBuilderListSocial = [];
					$.each(socialList, function( index, value ) {
						
						switch (value.name) {
							case "facebook":
								strBuilderListSocial.push('<a href="#" onclick="openBrowser(\'fb://facewebmodal/f?href='+value.url+'\')" class="link item-content"><div class="item-media"><i class="icon icon-form-fb"></i></div><div class="item-inner"><div class="item-title label">'+value.lbl+'</div></div></a>');
								break;
							case "twitter":
								strBuilderListSocial.push('<a href="#" onclick="openBrowser(\''+value.url+'\')" class="link item-content"><div class="item-media"><i class="icon icon-form-twitter"></i></div><div class="item-inner"><div class="item-title label">'+value.lbl+'</div></div></a>');
								break;
							case "youtube":
								strBuilderListSocial.push('<a href="#" onclick="openYoutube(\''+value.url+'\')" class="link item-content"><div class="item-media"><i class="icon icon-form-youtube"></i></div><div class="item-inner"><div class="item-title label">'+value.lbl+'</div></div></a>');
								break;
							case "instagram":
					                            	strBuilderListSocial.push('<a href="#" onclick="openBrowser(\''+value.url+'\')" class="link item-content"><div class="item-media"><i class="icon icon-form-instagram"></i></div><div class="item-inner"><div class="item-title label">'+value.lbl+'</div></div></a>');
					                            	break;	
						
							default:
								break;
						}
					});
					$('#listSocialContact').append(strBuilderListSocial.join(""));
				}
				
				$('#aEmailContact').attr("onclick","openMailer('"+lblSubjectEmail+"','"+contactList.email+"')");
				$('#txtEmailContact').text(contactList.email);
				$('#aWebContact').attr("onclick","openBrowser('"+contactList.web+"')");
				$('#txtWebContact').text(contactList.web);
				
				
				
				/* BANNER PUBLICITARIO
				$('#containerPublicityBannerContact').html('');
				var strBuilderPublicityBannerContact = [];
				strBuilderPublicityBannerContact.push('<img class="lazy lazy-fadeIn publicityBanner" data-src="'+contactList.urlPublicityBanner+'" alt="'+contactList.altPublicityBanner+'"/>');
				
				$('#containerPublicityBannerContact').append(strBuilderPublicityBannerContact.join(""));
				*/
				mainView.router.load({pageName: 'contact'});
				myApp.initImagesLazyLoad(mainView.activePage.container);
				
				arePageContactBuild = true;
			
		} else {
			mainView.router.load({pageName: 'contact'});
		}
	
	/*} else {
		loadContact();
	}*/
	
}