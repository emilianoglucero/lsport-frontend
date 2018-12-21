function openPopupMessageAttractive()
{
	//Seteo el check en FALSE
	$('#chkDisabledPopup').prop('checked', false);
	myApp.popup('#popup-settingsfavourites');
	$('#closeButton').click(function()
	{
		// Si el check está tildado es porque el usuario ya no quiere recibir el mensaje
		if($('#chkDisabledPopup').is(":checked"))
		{
			window.localStorage.setItem("disabledPopUpSettingsFavourites"+idClub, true);
		}
		myApp.closeModal('#popup-settingsfavourites');
		return false;
	});
	
	
	$(".switchwrap").hammer().bind("panleft panright", function (ev) 
	{
	    var cbinput = $(ev.target).find(":input")[0];
	    
	    if (ev.type === "panleft") 
	    {
	        $(cbinput).prop("checked", false);
	    }
	    
	    if (ev.type === "panright") 
	    {
	        $(cbinput).prop("checked", true);
	    }
	});
	
}


