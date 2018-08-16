//Share in Whatsapp
function shareWhatsapp(message) 
{
	//window.plugins.socialsharing.shareViaWhatsApp(null, 'www/images/iconShareApp.png', message + ' - https://play.google.com/store/apps/details?id=com.ls', null, null);
	window.plugins.socialsharing.shareViaWhatsApp(message + ' - https://play.google.com/store/apps/details?id=com.ls', 'www/images/iconShareApp.png' /* img */, null /* url */, null, null);
}

//Share in Facebook
function shareFacebook() 
{
	//window.plugins.socialsharing.shareViaFacebook(lblSightseeingRosario, null, 'https://play.google.com/store/apps/details?id=com.ls', null, null);
	window.plugins.socialsharing.shareViaFacebook(lblSightseeingRosario /* text */, null /* img */, 'https://play.google.com/store/apps/details?id=com.ls' /* url */, null, null);
}

//Share in Twitter
function shareTwitter(message) 
{
  window.open('http://twitter.com/share?text=' + message + ' - https://play.google.com/store/apps/details?id=com.ls', '_system');
}

function shareNewWhatsapp(title,shortContent,image,urlShare){
	//window.plugins.socialsharing.shareViaWhatsApp(null, image, text +'\n'+ urlShare, null, null);
	var message = title + ' - ' + shortContent + '\n'
		+ messageReadMoreShare;
	window.plugins.socialsharing.shareViaWhatsApp(message, image /* img */, urlShare /* url */, null, null);
}

function shareNewFacebook(text,image,urlShare) 
{
	//window.plugins.socialsharing.shareViaFacebook(text, image, urlShare, null, null);
	window.plugins.socialsharing.shareViaFacebook(null /* text */, null /* img */, urlShare /* url */, null, null);
}

function shareNewTwitter(text,urlShare) 
{
	var message = text +' - '+ urlShare;
	window.open('http://twitter.com/share?text=' + message, '_system');
}

function shareEventWhatsapp(title,date,hour,place,image,urlShare){
	//window.plugins.socialsharing.shareViaWhatsApp(null, image, text +'\n'+ urlShare, null, null);
	var message = title + '\n' +
			messageDayShare + ' ' + date + '\n' +
			messageHourShare + ' ' + hour + '\n' +
			messagePlaceShare + ' ' + place + '\n' + 
			messageReadMoreShare;
	window.plugins.socialsharing.shareViaWhatsApp(message, image /* img */, urlShare /* url */, null, null);
}

function shareEventFacebook(title,image,urlShare){
	//window.plugins.socialsharing.shareViaFacebook(text, image, urlShare, null, null);
	window.plugins.socialsharing.shareViaFacebook(null /* text */, null /* img */, urlShare /* url */, null, null);
}

function shareEventTwitter(title,date,hour,place,urlShare) 
{
	//var message = title +' - '+ urlShare;
	var message = title + ' - ' +
			messageDayShare + ' ' + date + ' - ' +
			messageHourShare + ' ' + hour + ' - ' +
			messagePlaceShare + ' ' + place + ' - ' + urlShare;
	window.open('http://twitter.com/share?text=' + message, '_system');
}