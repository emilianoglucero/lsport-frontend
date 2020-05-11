var idBookingServices;

/*services ids from categories*/
var tenisIDs = [15,17, 19, 21];
var botesIDs = [10,37,39,41,20];


function serviceRerservation(tenisIDs){
    console.log(tenisIDs);
    idBookingServices = tenisIDs;
    mainView.router.load({ pageName: "date" });

}


