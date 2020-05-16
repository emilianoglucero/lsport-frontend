var servicesAvailables;
var dateFinal;
var hourFinal;
var dateToShow;
var availables = {};

var allBookingsDay = {};
var filteredBookingsDay = {};

//declaramos un array donde almacenar los servicios validados x matrixServicex
var idBookingServicesAvailables = [];

//matriz donde voy a almacenar la logica de mis servicios
var matrixServices = {};

/* function to built-in vivificate objects literal notations / json
* var x = {};
* insertNode(x, 'foo.bar.baz', 'hello world');
* alert(x.foo.bar.baz); // "hello world"
*/
var insertNode = function(obj, node, value) {
    var segments = node.split('.');
    var key = segments.pop();
    var ref = obj;
    
    while (segments.length > 0) {
        var segment = segments.shift();
        if (typeof ref[segment] != 'object') {
            ref[segment] = {};
        }
        ref = ref[segment];
    }
    
    ref[key] = value;
};

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
            url: "https://regatasreservas.lenguajesport.com/?rest_route=/salon/api/v1/availability/services/primary",
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
                allServicesAvailables = response.services;
                if (response.status == "OK"){

                
                   $.each( allServicesAvailables, function( i, item ){
                    
                        console.log(item);
                        var serviceNameFinal;
                        //variable float para saber si es un servicio extendido
                        var isExtended;
                        var serviceName = item.service_name;

                        //formateo el nombre final para insertar en mi matriz

                        if(serviceName.includes("_DOUBLE_")) {
                            //tengo que borrar _DOUBLE_
                            serviceNameFinal = serviceName.substring(0, serviceName.length-8);
                            isExtended = true;
                        } else {
                            serviceNameFinal = serviceName;
                            isExtended = false;
                        }
                        console.log(serviceNameFinal);

                        //tengo el nombre final
                        //quizas este nombre ya está escrito en matrixServices

                        //si no esta escrito lo inserto
                        //si esta escrito solo escribo los valores id y available para dobles
                        
                        //recorro la matriz y busco si ya se escribió
                        //$.each( matrixServices, function( i, item ){
                        //console.log(item);
                        if (matrixServices.hasOwnProperty(serviceNameFinal)) { 
                            console.log("is in the matrix");
                            if (isExtended == true){
                                insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                insertNode(matrixServices, serviceNameFinal + '.longer_service_id', item.service_id);
                                insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);

                            } else {
                                insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.service_id);
                                insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);
                            }


                        } else { 

                            console.log("is NOT in the matrix");
                            //si no esta en la matriz lo agregamos por primera vez
                            insertNode(matrixServices, serviceNameFinal,);
                            //si es extendido agregamo solo el id y el availables del dobles
                            if (isExtended == true){
                                insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                insertNode(matrixServices, serviceNameFinal + '.longer_service_id', item.service_id);
                                insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);
                            //si es el single agregamos el resto (siempre va a haber un simple)    
                            } else {
                                insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                //insertNode(matrixServices, serviceNameFinal + '.dobles_available', false);
                                insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.service_id);
                                insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);

                            }



                        } 

                   });
                   console.log(availables);
                   console.log(matrixServices);
                   

                   if (jQuery.isEmptyObject({matrixServices})) {

                    console.log('matrix is empty');



                   } else {
                        console.log('matrix is NOT empty');

                        //recorro matrixServices para validar y chequear si hay trues,
                        //eso significaria que nadie aún, o alguien quizas ya realizó una reserva, tengo que comprobarlo
                        $.each( matrixServices, function( i, item ){
                            console.log(item);
                            console.log(i);
                            if (item.shorter_available == false && item.longer_available == false){
                                //este servicio debe pintarse como no disponible y setear service_available=false
                                insertNode(matrixServices, item.service_name + '.service_available', false);


                            } else {


                                /*
                                if item.menor_duracion = false {
                                    set service_avalible = false;
                                }
                                */

                                console.log('pintado disponible');
                                //significa que debe aparecer pintado como disponible y setear service_available=true
                                //si esta disponible sacamos sus ids para buscar si alguien ya reservo ese servicio
                                if (item.shorter_available == true) {
                                    console.log('agrego un servicio single al array');
                                    idBookingServicesAvailables.push(item.service_id_singles);
                                }
                                if (item.longer_available == true) {
                                    console.log('agrego un servicio doble al array');
                                    idBookingServicesAvailables.push(item.service_id_dobles);
                                }

                            }

                
                        
                        });
                        
                        console.log(idBookingServicesAvailables);
                        //if idBookingServicesAvailables is not empty
                        if (Array.isArray(idBookingServicesAvailables) && idBookingServicesAvailables.length) {
                            
                            $.ajax({
                                // URL del Web Service
                                    url: "https://regatasreservas.lenguajesport.com/?rest_route=/salon/api/v1/bookings",
                                    method: 'GET',
                                    dataType: "json",
                                    contentType: "application/json",
                                    headers: {
                                        "Access-Token": tokenBooking
                                    },
                                    data: { 
                                        "start_date": dateFinal,
                                        "end_date": dateFinal,
                                        "services": idBookingServicesAvailables 
                        
                                    },
                                    timeout: timeOut,
                                    success: function(response){
                                        console.log(response);
                                        allBookingsDay = response.items;
                                        //filtrar response by time
                                        $.each( allBookingsDay, function( i, item ){
                                            console.log('allbokingday');
                                            console.log(item);
                                            
                                            if(item.time == hourFinal) {
                                                console.log('existe una reserva a esa hora');
                                                //si existe una reserva a esta hora
                                                //tengo que setear/calcular en mi matriz cuantos lugares disponibles hay
                                                //quienes ocupan estos lugares
                                                //var idServiceAlreadyBooked = item.services.id[i];

                                                /*



                                                */
                                                


                                            } else {
                                                //no hay ninguna reserva a esa hora, por lo cual sos el primero

                                            }
                                        
                                        });


                                    
                                    },
                                    error: function (data, status, error){
                                    //alert('Hubo un error, por favor revisá tu correo y contraseña');
                                        console.log(error, data, status);
                                    }
                            });

                        }    

                        //console.log()
                        
                        
                        /*
                        significa que quizas haya alguna reserva
                        hago una llamada ajax para saber los detalles con la hora y el dia

                        filtro los resultados by time

                        */

                   }

                   mainView.router.load({ pageName: "services" });
                

                } else {
                    alert('Hubo un problema, por favor intente nuevamente');
                }

            },
            error: function (data, status, error){

        }
    });

}
  

