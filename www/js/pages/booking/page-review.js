var hourFinalTill;
var idConfirmation;
var serviceName;

myApp.onPageInit('review', function (page)
{
    //erase later
    //dateFinal = "2020-06-13";
    //hourFinal = "14:00";
    console.log('review init');
    //function to sum time https://stackoverflow.com/questions/26056434/sum-of-time-using-javascript
   /* function timestrToSec(timestr) {
        var parts = timestr.split(":");
        return (parts[0] * 3600) +
               (parts[1] * 60); 
               //(+parts[2]);
    }
      
      function pad(num) {
        if(num < 10) {
          return "0" + num;
        } else {
          return "" + num;
        }
      }
      
      function formatTime(seconds) {
        hourFinalEnd = [pad(Math.floor(seconds/3600)),
                pad(Math.floor(seconds/60)%60)
                //pad(seconds%60),
                ].join(":");

      }

      //time1 = "02:32:12";
      console.log(hourFinal);
      time2 = "01:00";
      formatTime(timestrToSec(hourFinal) + timestrToSec(time2));
      console.log(hourFinalEnd);

*/

    builderReviewServices();
    getUserBasicInfo();

    
});

myApp.onPageReinit('review', function (page)
{
    //radioValueHasCode = "";
    //radioValueId = "";
    console.log("page review re init");
    builderReviewServices();
    //getUserBasicInfo();
    //radioValue = undefined;


});

function serviceConfirm(){

    myApp.confirm('¿Seguro desea reservar?', function () {
        showLoadSpinnerWS();
        console.log('reserva yes');
        //myApp.alert('You clicked Ok button');
        //mainView.router.load({ pageName: "confirmation" });
        console.log(dateFinal);
        console.log(hourFinal);
        console.log(userID);
        console.log(userFirstName);
        console.log(userLastName);
        console.log(email);
        console.log(radioValueId);
        

        $.ajax({
            // URL del Web Service
                url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/bookings",
                method: 'POST',
                dataType: "json",
                contentType: "application/json",
                headers: {
                    "Access-Token": tokenBooking
                },
                data:JSON.stringify({
                    "date": dateFinal,
                    "time": hourFinal,
                    "status": "sln-b-confirmed",
                    "customer_id": userID,
                    "customer_first_name": userFirstName,
                    "customer_last_name": userLastName,
                    "customer_email": email,
                    "customer_phone": "",
                    "customer_address": "",
                    "services": [
                        {
                        "service_id": radioValueId
                        }
                    ],
                    "note": "a ver si suma"
                }),
                timeout: 10000000,
                success: function(response){
                    console.log(response);
                    if (response.status == "OK") {
                        idConfirmation = response.id;
                        console.log(idConfirmation);
                        mainView.router.load({ pageName: "confirmation" });
                        hideLoadSpinnerWS();

                        //$$('.confirm-title-ok').on('click', function () {
                            /*myApp.confirm('Seguro desea reservar?', function () {
                                //myApp.alert('You clicked Ok button');
                                mainView.router.load({ pageName: "confirmation" });
                            });*/
                        //});
                        
                        //alert('Tu reserva ha sido confirmada!');
                        /*myApp.alert(
                            "Tu reserva ha sido confirmada!", // message
                            toHome, // callback
                            "", // title
                            "Ok" // buttonName
                        );
                    
                        function toHome() {
                            mainView.router.load({ pageName: "confirmation" });
                        }*/

                    } else {
                        console.log('response is not OK');
                    }
                    
                

                },
                error: function (data, status, error){
                    console.log(data, status, error);

                }
        });

    });
}

function builderReviewServices() {
    
    $('#services-review').html('');

                console.log(radioValueId);
                console.log(radioValueHasCode);
                console.log(radioValueDuration);
                console.log(radioValuePrice);
                console.log(radioValueName);
                console.log(radioValueType);
                console.log(dateFinal);
                console.log(hourFinal);
                var dateFinalArg = formatDateFromUsToArg(dateFinal);
                var dayOfTheWeek = getDayOfWeek(dateFinal);
    
    var strBuilderReviewServicesContent = [];

        strBuilderReviewServicesContent.push('<div class="content-block-title">Revisá Tu Reserva</div>');
        strBuilderReviewServicesContent.push('<div class="list-block media-list">');
        strBuilderReviewServicesContent.push('<ul>');
        //$.each( servicesAvailables, function( i, item ){
            //console.log(item);
            //console.log(idServiceSelected);
            //if(item.service_id == idServiceSelected){
                //serviceName = item.service_name;

                //alert(item.service_name);
                strBuilderReviewServicesContent.push('<li>');
                //strBuilderReviewServicesContent.push('<div class="item-media"></div>');
                strBuilderReviewServicesContent.push('<div class="item-inner" style="padding: 15px;><div class="item-title-row">');
                    strBuilderReviewServicesContent.push('<div class="item-title">'+radioValueName+'</div></div>');
                strBuilderReviewServicesContent.push('</div>');
                strBuilderReviewServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                strBuilderReviewServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Precio Final: $'+radioValuePrice+'</div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Fecha: '+dayOfTheWeek+' '+dateFinalArg+'</div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Hora: '+hourFinal+'hs</div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Duración: '+radioValueDuration+'hs</div>');
                strBuilderReviewServicesContent.push('</div></a></li>');
            //}
        //}); 
        strBuilderReviewServicesContent.push('</ul></div></div>');   

    $('#services-review').append(strBuilderReviewServicesContent.join(""));   




}