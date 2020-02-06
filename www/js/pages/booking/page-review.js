var hourFinalTill;

myApp.onPageInit('review', function (page)
{
    console.log('review init');
    //function to sum time https://stackoverflow.com/questions/26056434/sum-of-time-using-javascript
    function timestrToSec(timestr) {
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



    builderReviewServices();

    
});

function serviceConfirm(){

    $.ajax({
        // URL del Web Service
            url: "http://45.33.71.239/?rest_route=/salon/api/v1/bookings",
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
                "customer_id": 1,
                "customer_first_name": "Rodrigo",
                "customer_last_name": "Ulloa",
                "customer_email": "ulloa@rodrigo.com",
                "customer_phone": "",
                "customer_address": "abc 527",
                "services": [
                    {
                    "service_id": idServiceSelected
                    }
                ],
                "note": "a ver si suma"
            }),
            timeout: timeOut,
            success: function(response){
                console.log(response);
                alert('Tu reserva ha sido confirmada!');
                mainView.router.load({ pageName: "home" });
            

            },
            error: function (data, status, error){

        }
    });
}

function builderReviewServices() {
    
    var strBuilderReviewServicesContent = [];

	if(servicesAvailables.length == 0){
		strBuilderReviewServicesContent.push('<div class="content-block">');
        strBuilderReviewServicesContent.push('<div class="divNotLastestNews">No hay reservas disponibles</div>');
        strBuilderReviewServicesContent.push('</div>');
        
	} else{
        strBuilderReviewServicesContent.push('<div class="content-block-title">Revisá Tu Reserva</div>');
        strBuilderReviewServicesContent.push('<div class="list-block media-list">');
        strBuilderReviewServicesContent.push('<ul>');
        $.each( servicesAvailables, function( i, item ){
            console.log(item);
            console.log(idServiceSelected);
            if(item.service_id == idServiceSelected){

                //alert(item.service_name);
                strBuilderReviewServicesContent.push('<li><a href="#" class="item-link item-content">');
                //strBuilderReviewServicesContent.push('<div class="item-media"></div>');
                strBuilderReviewServicesContent.push('<div class="item-inner"><div class="item-title-row">');
                strBuilderReviewServicesContent.push('<div class="item-title">'+item.service_name+'</div><div class="item-after">Precio Final: $40</div></div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle">'+dateToShow+'</div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle">Desde: '+hourFinal+'hs</div>');
                strBuilderReviewServicesContent.push('<div class="item-subtitle">Hasta: '+hourFinalEnd+'hs</div>');
                strBuilderReviewServicesContent.push('</div></a></li>');
            }
        }); 
        strBuilderReviewServicesContent.push('</ul></div></div>');   

    } 
    $('#services-review').append(strBuilderReviewServicesContent.join(""));   




}