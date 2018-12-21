function setDefaultFavourites(){
	currentFavouritesList = [];
	for(i = 0; i < 4; i++){
		var currentFav = new Object();
		switch (i) {
			case 0:
				currentFav.id = -1;
				currentFav.idCategory = null;
				currentFav.order = i;
				currentFav.name = favStandarName;
				currentFavouritesList.push(currentFav);
				break;
			case 1:
				currentFav.id = -1;
				currentFav.idCategory = null;
				currentFav.order = i;
				currentFav.name = favStandarName;
				currentFavouritesList.push(currentFav);
				break;
			case 2:
				currentFav.id = -1;
				currentFav.idCategory = null;
				currentFav.order = i;
				currentFav.name = favStandarName;
				currentFavouritesList.push(currentFav);
				break;
			case 3:
				currentFav.id = -1;
				currentFav.idCategory = null;
				currentFav.order = i;
				currentFav.name = favStandarName;
				currentFavouritesList.push(currentFav);
				break;
			default:
				break;
		}
	}
	window.localStorage.setItem("FAVS"+idClub, JSON.stringify(currentFavouritesList));
}

var myApp = new Framework7({
    modalTitle: lblNameClub,
    fastClicks: true,
    reloadPages: false,
    init: false,
    swipeBackPage: false,
    swipePanel: 'left'
});