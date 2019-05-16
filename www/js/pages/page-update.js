myApp.onPageInit('update', function (page)
{
	$('#pFirstUpdate').text(lblMessage1Update);
	$('#spnButtonUpdate').text(lblUpdate);
   
	$("#button-update-page").on( "click", function() 
	{
		console.log(platform);
		if (platform == "Android") {
			window.open('https://play.google.com/store/apps/details?id='+compilationNameClub, '_system');
		} else {
			window.open('https://itunes.apple.com/ar/app/'+compilationNameClub, '_system');
		}
	});
   
});

myApp.onPageBeforeAnimation('update', function (page)
{
	myApp.params.swipePanel = false;
});