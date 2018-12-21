myApp.onPageInit('unsupported', function (page)
{
	$('#pFirstUnsupported').text(lblMessage1Unsupported);
});

myApp.onPageBeforeAnimation('unsupported', function (page)
{
	myApp.params.swipePanel = false;
});