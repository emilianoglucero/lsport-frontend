function filterCodeErrorWS(response){
	
	switch (response.errorCode) {
		case 1001:
			mainView.router.load({pageName: 'unsupported'});
			break;
		case 1100:
			mainView.router.load({pageName: 'unsupported'});
		case 1005:
			showMessage(messageErrorNewNotFound);
			break;
		case 1002:
			showMessage(messageErrorSportNotFound);
			break;
		case 1006:
			showMessage(messageErrorEventNotFound);
			break;
		case 1020:
			showMessage(messageErrorTournamentNotFound);
			break;
		case 1003:
			showMessage(messageErrorCategorySportNotFound);
			break;
		case 1004:
			showMessage(messageErrorActivityNotFound);
			break;
		case 1021:
			showMessage(messageErrorMatchNotFound);
			break;
		default:
			showMessage(messageErrorGeneric);
			break;
	}
}