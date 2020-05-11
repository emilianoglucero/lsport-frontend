var servicesAvailables;
var dateFinal;
var hourFinal;
var dateToShow;

myApp.onPageInit('date', function (page)
{
    console.log('date page init');
});


  
$$(document).on('DOMContentLoaded', function() {

  var today = new Date();
  var yesterday = new Date().setDate(today.getDate() - 1);
  
  var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
   
  var calendarDisabled = myApp.calendar({
      input: '#calendar-date-booking',
      dateFormat: 'dd-mm-yyyy',
      disabled: {
        from: new Date(1900, 1, 1),
        to: yesterday
      }
  });


 
  var pickerDescribe = myApp.picker({
    input: '#picker-hour',
    rotateEffect: true,
    cols: [
        {
            textAlign: 'left',
            values: ('00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23').split(' ')
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        {
            values: ('00 30').split(' ')
        },
    ]
  });                                




});

function serviceAvailable() {
    var date = document.getElementById('calendar-date-booking').value.split('-');
    var hour = document.getElementById('picker-hour').value;
    console.log(date);

   
    hourFinal = hour.split(" ").join(":");

    dateFinal = date[2] + '-' + date[1] + '-' + date[0];
    dateToShow = date[0] + '-' + date[1] + '-' + date[2];
    console.log(dateToShow);

    //var services = [8,56];
    console.log(idBookingServices);

    console.log(date);
    console.log(hour);
    console.log(hourFinal);
    console.log(dateFinal);
    console.log(tokenBooking);
    console.log(idBookingServices);

    $.ajax({
        // URL del Web Service
            url: "http://172.105.156.64/?rest_route=/salon/api/v1/availability/services/primary",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "date": dateFinal,
                "time": hourFinal,
                "primary_services": idBookingServices 

            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                servicesAvailables = response.services;
                if (response.status == "OK"){

                    mainView.router.load({ pageName: "services" });
                    //builderServicesAvailables();


                    /*
                    * I need to add intelligence to full my matrix
                    */

                    /*var matrixTest = {
                        cancha: {
                            singles: true,
                            dobles: false,
                            service_id: ""
                        },
                        cancha2: {
                            singles: false,
                            dobles: false,
                            service_id: ""
                        }
                    }*/

                    var availables = {};

                   $.each( servicesAvailables, function( i, item ){


                        // Example of an object property added with defineProperty with a data property descriptor
                        Object.defineProperty(availables, serviceAvailable.item.service_name, {
                            singles_available : serviceAvailable.item.available,
                            dobles_available : false,
                            enumerable : serviceAvailable.item.service_id
                        });
                        // 'property3' property exists on object obj and its value is 37


                   });
                   console.log(availables);
                

                } else {
                    alert('Hubo un problema, por favor intente nuevamente');
                }

            },
            error: function (data, status, error){

        }
    });

}
  

