var idBookingServices;

/*services ids from categories*/
var tenisIDs = [8,56];
var botesIDs = [10,37,39,41,20];


function serviceRerservation(id){
    console.log(id);
    idBookingServices = id;
    mainView.router.load({ pageName: "date" });

}


