var idBookingService;

function serviceRerservation(id){
    console.log('service reservarion');
    console.log('id');
    idBookingService = id;
    mainView.router.load({ pageName: "date" });
}


