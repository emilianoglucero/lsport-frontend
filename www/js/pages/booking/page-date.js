var servicesAvailables;
var dateFinal;
var hourFinal;
var dateToShow;
var availables = {};

/*
* ASSUMPTIONS 
*/
// array que almacena strings que se utilizaran para diferenciar servicios extendidos
//var extendedKeys = [idCategory :"_DOUBLE_", "isLongerExt": true];

//




var allBookingsDay = {};
var filteredBookingsDay = {};

//declaramos un array donde almacenar los servicios validados ya x matrixServicex
var idBookingServicesAvailables = [];

//declaramos un array donde almacenar los servicios NOT availables x matrixServicex
//var idBookingServicesNotAvailables = [];

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

/* function to sum hours/minutes
* https://stackoverflow.com/questions/40808504/sum-hours-and-minutes-in-javascript
*/
function get_add_two_times(json1, json2) {
    hr            = parseInt(json1.hour) + parseInt(json2.hour); 
    mn            = parseInt(json1.minutes) + parseInt(json2.minutes);
    final_hr      = hr + Math.floor(mn/60);
    final_mn      = mn%60;
    final_mn      = (final_mn < 10) ? '0' + final_mn : final_mn;
    //console.log(final_hr);
    if (final_hr <= 9){ final_hr = "0" + final_hr;}
    //console.log(final_hr +':'+ final_mn);
    return final_hr +':'+ final_mn;
}

myApp.onPageInit('date', function (page)
{
    console.log('date page init');
    console.log(idBookingServices);

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

                    if (item.selected == true) {
                    
                        console.log(item);
                        var serviceNameFinal;
                        //variable float para saber si es un servicio extendido
                        var isExtended;
                        var serviceName = item.service_name;

                        //formateo el nombre final para insertar en mi matriz
                        //recorro extendedKeys para completar dinamicamente el string _DOUBLE_

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
                                if (extendedIsLonger == true) {
                                    insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_service_id', item.service_id);
                                    //if serviceNameFinal.shorter_available is undefined {
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', false);
                                    //}    
                                    
                                    //
                                } else {

                                    insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.service_id);
                                    //if serviceNameFinal.shorter_available is undefined {
                                        insertNode(matrixServices, serviceNameFinal + '.longer_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.longer_service_id', false);
                                    //}

                                }

                                insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);

                            } else {

                                if (extendedIsLonger == true) {
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.service_id);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_available', false);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_service_id', false);
                                    insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                    insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);
                                } else {
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_available', false);
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', false);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_service_id', falitem.service_idse);
                                    insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                                    insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);
                                }
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
                            if (item.shorter_available == true && item.longer_available == true){
                                //este servicio debe pintarse como no disponible y setear service_available=false
                                //insertNode(matrixServices, item.service_name + '.service_available', false);
                                idBookingServicesAvailables.push(item.longer_service_id);


                            } else if (item.shorter_available == false && item.longer_available == true){
                                
                                insertNode(matrixServices, item.service_name + '.longer_available', false);
                                // 
                                insertNode(matrixServices, item.service_name + '.service_available', false);

                            } else if (item.shorter_available == true && item.longer_available == false) { 

                                idBookingServicesAvailables.push(item.longer_service_id);

                            } else if (item.shorter_available == false && item.longer_available == false) {
                                
                                insertNode(matrixServices, item.service_name + '.service_available', false);

                            } //else {
                                //averiguar sintaxis, sino usar la ultima condicion false false
                            //}


                                
                                //if (item.shorter_available == false) {
                                    //set service_avalible = false;
                                   // insertNode(matrixServices, item.service_name + '.service_available', false);

                                    //setear a false el longer_available
                                //} /*else {
                                   // console.log('agrego un servicio single al array');
                                    //idBookingServicesAvailables.push(item.shorter_service_id);
                                

                                //formula to determinate not availables services
                                //longer_service->End_at   >   booking_time  AND  longer_service->start_at < (booking_time + service_duration)
                                

                                //console.log('pintado disponible');
                                //significa que debo investigar mas sobre estos servicios para saber si estan realmente disponibles
                                //si esta disponible sacamos sus ids para buscar si alguien ya reservo ese servicio
                                //if (item.shorter_available == true) {
                                    //console.log('agrego un servicio single al array');
                                    //idBookingServicesAvailables.push(item.service_id_singles);
                               

                            

                
                        
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

                                        //function to sum hours
                                        var hourFinalSplited = hourFinal.split(":");
                                        var ItemDuration = item.duration.split(":");

                                        var bookingTime = { hour : hourFinalSplited[0], minutes : hourFinalSplited[1] };
                                        var serviceDuration = { hour : ItemDuration[0], minutes : ItemDuration[1] };

                                        var hourFinalPlusServiceDuration = get_add_two_times(bookingTime,serviceDuration);
                                        console.log(hourFinalPlusServiceDuration);

                                        //seteo contadores de reservas de shorters o longers
                                        var shorterServiceCounter = 0;
                                        var longerServiceCounter = 0;
                                        //tercer pasada por la matriz

                                        allBookingsDay = response.items;

                                        $.each( matrixServices, function( i, item ){

                                            if (item.shorter_available == true && item.longer_available == true){

                                                //puede convertirse en false - true

                                                //set contador reservas a la misma hora = 0;
                                                
                                                //1 - 1 persona reserva para single => TRUE FALSE
                                                //2 -1 a 3 personas haya rerservado dobles => FALSE TRUE
                                                //3 - nada reservado  => TRUE TRUE

                                                 $.each( allBookingsDay, function( a, booking ){

                                                    if (booking.time == hourFinal) {
                                                        //set contador += 1
                                                        //ver que tipo de servicio es 
                                                        console.log(booking.services[0].id);
                                                        if (booking.services[0].id == item.longer_service_id){
                                                            //sumo +1 reserva a longer
                                                            shorterServiceCounter = ++shorterServiceCounter;

                                                        } else if (booking.services[0].id == item.shorter_service_id) {
                                                            // o sumo +1 reserva a shorter
                                                            longerServiceCounter = ++longerServiceCounter;
                                                        }
                                                        

                                                    }
                                                    
                                                 });
                                                 console.log(longerServiceCounter);
                                                 console.log(shorterServiceCounter);

                                                 //me fijo cuantas reservas de que tipo se han hecho 
                                                 //a esa misma hora con los contadores y de ahi determino
                                                 //como setear la matriz
                                                 if (shorterServiceCounter == 0 && longerServiceCounter == 0) {
                                                     //no hay reservas a esa hora de singles o dobles
                                                     //setear a TRUE TRUE lo cual ya está
                                                     //setear tipo de servicio disponible single y doble, y available units 2 y 4
                                                     insertNode(matrixServices, item.service_name + '.shorter_available', true);
                                                     insertNode(matrixServices, item.service_name + '.longer_available', true);
                                                     

                                                 } else if (shorterServiceCounter == 1) {
                                                     //existe una reserva de singles
                                                     //setear a TRUE FALSE
                                                     
                                                     insertNode(matrixServices, item.service_name + '.shorter_available', true);
                                                     insertNode(matrixServices, item.service_name + '.longer_available', false);

                                                     //available_units_shorter = 1;
                                                     insertNode(matrixServices, item.service_name + '.shorter_available_units', 1);

                                                 } else if (longerServiceCounter <= 3) {
                                                     //hay una reserva de dobles
                                                     // FALSE TRUE
                                                     //available_units_shorter

                                                     insertNode(matrixServices, item.service_name + '.shorter_available', false);
                                                     insertNode(matrixServices, item.service_name + '.longer_available', true);

                                                     //available_units_shorter = 1;
                                                     var unitsLongerAvailable = 4 - longerServiceCounter;
                                                     insertNode(matrixServices, item.service_name + '.longer_available_units', unitsLongerAvailable);

                                                 }

                                                

                     
                                            } else if (item.shorter_available == true && item.longer_available == false) { 

                                                //i use Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10') to compare hours
                                                //https://stackoverflow.com/questions/6212305/how-can-i-compare-two-time-strings-in-the-format-hhmmss
                                           

                                                //set contador reservas a la misma hora = 0;

                                                $.each( allBookingsDay, function( a, booking ){
                                                    
                                                    //Date.parse('01/01/2011 10:20:45')
                                                    if (Date.parse('01/01/2011 '+booking.services[0].end_at) > Date.parse('01/01/2011 '+hourFinal) && Date.parse('01/01/2011' +booking.services[0].start_at) < Date.parse('01/01/2011 ' +hourFinalPlusServiceDuration)) {
                                                        console.log("set item shorter available false");
                                                        //SET FALSE FALSE
                                                    } else {
                                                        //set item shorter available true
                                                        //SET TRUE FALSE
                                                    }
                                                    
                                                    //if (booking.services[0].end_at > hourFinal && booking.services[0].start_at < hourFinalPlusServiceDuration ) {

                                                    //}
                                                    

                                                });
                                              
                
                                            } 

                                        });
                                    },
                                    error: function (data, status, error){
                        
                                    }    
                                        
                            });    

                        }

                        
                

                

                
                    }
                    console.log(matrixServices);
                    mainView.router.load({ pageName: "services" });

                } else{
                    console.log("response was not ok");
                }
            },
            error: function (data, status, error){

            }
   
            
    });

}
  

