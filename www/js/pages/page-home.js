var idBookingService;

function serviceRerservation(id){
    console.log('service reservarion');
    console.log('id');
    idBookingService = id;
    mainView.router.load({ pageName: "date" });
}


var calendarDateFormat = myApp.calendar({
    input: '#calendar-date-format',
    dateFormat: 'DD, MM dd, yyyy'
});

var calendarDefault = myApp.calendar({
    input: '#calendar-default',
});     

$$('.popup-about').on('popup:opened', function () {
    console.log('About Popup opened')
  });
  $$('.popup-about').on('popup:close', function () {
    console.log('About Popup is closing')
  });
  $$('.popup-services').on('popup:open', function () {
    console.log('Services Popup is opening')
  });
  $$('.popup-services').on('popup:closed', function () {
    console.log('Services Popup is closed')
  });
