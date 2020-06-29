var servicesAvailables;
var dateFinal;
var hourFinal;
var dateToShow;
var availables = {};



var allBookingsDay = {};
var filteredBookingsDay = {};

//declaramos un array donde almacenar los servicios validados ya x matrixServicex
var idBookingServicesAvailables = [];

//declaramos un array donde almacenar los servicios NOT availables x matrixServicex
//var idBookingServicesNotAvailables = [];

//matriz donde voy a almacenar la logica de mis servicios
var matrixServices = {};


var extendedKeys = {

        "extendedName": "_DOUBLE_",
        "isExtendedLonger": true,
        "unitsShorterTotal": 2,
        "unitsLongerTotal": 4
}

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

    //json info to send in booking/services
    var bookingServiceInfo = {};
    var arrayOfServicesToSearchAvailability = [];
    $.each( idBookingServices, function( i, item ){
        arrayOfServicesToSearchAvailability.push({"service_id": item});
    });
    insertNode(bookingServiceInfo, 'date', dateFinal);
    insertNode(bookingServiceInfo, 'time', hourFinal);
    insertNode(bookingServiceInfo, 'is_all_services', false);
    insertNode(bookingServiceInfo, 'services', arrayOfServicesToSearchAvailability);

    console.log(bookingServiceInfo);
    var objectStringified = JSON.stringify(bookingServiceInfo);
    console.log(objectStringified);


    $.ajax({
        // URL del Web Service
            //url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/availability/services/primary",
            url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/availability/booking/services",
            method: 'POST',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data:JSON.stringify(bookingServiceInfo),
            /*data: { 
                "date": dateFinal,
                "time": hourFinal,
                "primary_services": idBookingServices 

            },*/
            timeout: timeOut,
            success: function(response){
                console.log(response);
                allServicesAvailables = response.services;
                //vacio la matriz cada vez que hago una consulta
                matrixServices = {};
                if (response.status == "OK"){

                
                   $.each( allServicesAvailables, function( i, item ){

                    //available only means the service is in the time schedule selected
                   // if (item.available == true) {
                    
                        console.log(item);
                        var serviceNameFinal;
                        //variable float para saber si es un servicio extendido
                        var isExtended;
                        var serviceName = item.name;

                        //formateo el nombre final para insertar en mi matriz
                        //recorro extendedKeys para completar dinamicamente el string _DOUBLE_
                        console.log(extendedKeys);
                        console.log(extendedKeys.extendedName);
                        //if(serviceName.includes("_DOUBLE_")) {
                        if(serviceName.includes(extendedKeys.extendedName)) {    
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
                        if (!matrixServices.hasOwnProperty(serviceNameFinal)) { 
                        
                            console.log("is NOT in the matrix");
                            //si no esta en la matriz lo agregamos por primera vez
                            insertNode(matrixServices, serviceNameFinal,);

                        }  
                        
                       // var pathToMatrixServiceName = "matrixServices."+serviceNameFinal;
                        //console.log(pathToMatrixServiceName);
                        //var value1 = matrixServices?.[serviceNameFinal];
                        //console.log(value1);
                        //var value2 = matrixServices?.[serviceNameFinal]?.shorter_available;
                        //console.log(value2);

                            
                            //console.log("is in the matrix");
                        //if (isExtended == true){
                            //si ser extendido signifca que va a ser el de mas larga duracion
                            console.log(extendedKeys.isExtendedLonger);

                            if (extendedKeys.isExtendedLonger == true) {
                                if (isExtended == true){
                                    console.log('is extended true and extended is the longest');
                                    //insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_service_id', item.id);
                                    insertNode(matrixServices, serviceNameFinal + '.service_has_extended', true);
                                    //solo escribo si no existe esa propiedad en mi matriz
                                    //if(!pathToMatrixServiceName.hasOwnProperty('shorter_available')) {
                                    if (matrixServices?.[serviceNameFinal]?.shorter_available == undefined){
                                        console.log('path does not exist');
                                            //alert("myProperty does not exist"); 
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', false);
                                    }    
                                
                                } else {
                                    console.log('is extended false and extended is the longest');
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.id);
                                    //if serviceNameFinal.shorter_available is undefined {
                                    //if(!pathToMatrixServiceName.hasOwnProperty('longer_available')) {  
                                    if (matrixServices?.[serviceNameFinal]?.longer_available == undefined){
                                        console.log('path longer does not exist');   
                                        insertNode(matrixServices, serviceNameFinal + '.longer_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.longer_service_id', false);
                                    }

                                    if (matrixServices?.[serviceNameFinal]?.service_has_extended == undefined){
                                        console.log('service extended flag does not exist yet');   
                                        insertNode(matrixServices, serviceNameFinal + '.service_has_extended', false);
                                    }
                                }
                            } else {
                                if (isExtended == true){
                                    console.log('is extended true and extended is NOT the longest');
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', item.id);
                                    insertNode(matrixServices, serviceNameFinal + '.service_has_extended', true);
                                    //if serviceNameFinal.shorter_available is undefined {
                                    //if(!pathToMatrixServiceName.hasOwnProperty('longer_available')) {  
                                    if (matrixServices?.[serviceNameFinal]?.longer_available == undefined){
                                        console.log('path longer does not exist');  
                                        insertNode(matrixServices, serviceNameFinal + '.longer_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.longer_service_id', false);
                                    }
                                } else {
                                    console.log('is extended false and extended is NOT the longest');
                                    insertNode(matrixServices, serviceNameFinal + '.longer_available', item.available);
                                    insertNode(matrixServices, serviceNameFinal + '.longer_service_id', item.id);
                                    //solo escribo si no existe esa propiedad en mi matriz
                                    //if(!pathToMatrixServiceName.hasOwnProperty('shorter_available')) {
                                    if (matrixServices?.[serviceNameFinal]?.shorter_available == undefined){
                                        console.log('path does not exist');
                                            //alert("myProperty does not exist"); 
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_available', false);
                                        insertNode(matrixServices, serviceNameFinal + '.shorter_service_id', false);
                                    }
                                    if (matrixServices?.[serviceNameFinal]?.service_has_extended == undefined){
                                        console.log('service extended flag does not exist yet');   
                                        insertNode(matrixServices, serviceNameFinal + '.service_has_extended', false);
                                    }
                                }
                            }

                            insertNode(matrixServices, serviceNameFinal + '.date', dateFinal);
                            insertNode(matrixServices, serviceNameFinal + '.time', hourFinal);

                            console.log(matrixServices);


                    //}  
                   });
                   console.log(availables);
                   console.log(matrixServices);
                   

                    if (jQuery.isEmptyObject({matrixServices})) {

                    console.log('matrix is empty');



                    } else {
                        console.log('matrix is NOT empty');
                        idBookingServicesAvailables = [];

                        //recorro matrixServices por segunda vez, para validar y chequear si hay trues,
                        //eso significaria que nadie aún, o alguien quizas ya realizó una reserva, tengo que comprobarlo
                        $.each( matrixServices, function( i, item ){
                            console.log(item);
                            console.log(i);
                            /*if (item.shorter_service_id != false) {
                                idBookingServicesAvailables.push(item.shorter_service_id);
                            }
                            if (item.longer_service_id != false) {
                                idBookingServicesAvailables.push(item.longer_service_id);
                            }
                            idBookingServicesAvailables.push(item.longer_service_id);
                            idBookingServicesAvailables.push(item.shorter_service_id);*/
                            if (item.shorter_available == true && item.longer_available == true){
                                console.log('item shorter true and item longer true');
                                //este servicio debe pintarse como no disponible y setear service_available=false
                                //insertNode(matrixServices, item.service_name + '.service_available', false);
                                idBookingServicesAvailables.push(item.longer_service_id);
                                idBookingServicesAvailables.push(item.shorter_service_id);


                            } else if (item.shorter_available == false && item.longer_available == true){
                                console.log('item shorter false and item longer true');
                                
                                insertNode(matrixServices, i + '.longer_available', false);
                                // 
                                insertNode(matrixServices, i + '.service_available', false);

                            } else if (item.shorter_available == true && item.longer_available == false) { 
                                console.log('item shorter true and item longer false');

                                idBookingServicesAvailables.push(item.shorter_service_id);

                            } else if (item.shorter_available == false && item.longer_available == false) {
                                console.log('item shorter false and item longer false');
                                
                                insertNode(matrixServices, i + '.service_available', false);

                            }

                
                        
                        });
                        
                        console.log(idBookingServicesAvailables);
                        //if idBookingServicesAvailables is not empty
                        if (Array.isArray(idBookingServicesAvailables) && idBookingServicesAvailables.length) {
                            console.log('bookingids not empty');
                            
                            $.ajax({
                                // URL del Web Service
                                    url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/bookings",
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
                                        if (Array.isArray(allBookingsDay) && allBookingsDay.length) {
                                            console.log("theres booking in the day");

                                             //var ItemDuration = item.duration.split(":");
                                            //var serviceDuration = { hour : ItemDuration[0], minutes : ItemDuration[1] };
                                            //function to sum hours
                                            var hourFinalSplited = hourFinal.split(":");
                                            var bookingTime = { hour : hourFinalSplited[0], minutes : hourFinalSplited[1] };
                                            

                                            //var hourFinalPlusServiceDuration = get_add_two_times(bookingTime,serviceDuration);
                                            //console.log(hourFinalPlusServiceDuration);

                                            
                                            //tercer pasada por la matriz

                                            //allBookingsDay = response.items;
                                            //if (Array.isArray(allBookingsDay) && allBookingsDay.length) {
                                            //console.log("theres bookings in the matrix");
                                            var hourFinalPlusServiceDuration;

                                            $.each( matrixServices, function( i, item ){
                                                console.log(item);
                                                console.log(i);

                                                //seteo contadores de reservas de shorters o longers
                                                var shorterServiceCounter = 0;
                                                var longerServiceCounter = 0;

                                                if (item.shorter_available == true && item.longer_available == true){
                                                    

                                                    //puede convertirse en false - true

                                                    //set contador reservas a la misma hora = 0;
                                                    
                                                    //1 - 1 persona reserva para single => TRUE FALSE
                                                    //2 -1 a 3 personas haya rerservado dobles => FALSE TRUE
                                                    //3 - nada reservado  => TRUE TRUE

                                                    $.each( allBookingsDay, function( a, booking ){

                                                        console.log(booking);
                                                        console.log(item);

                                                        console.log(booking.services[0].service_id);
                                                        //function to calculate hours   
                                                        //var ItemDurationUnSplitted = booking.duration; 
                                                        //console.log(ItemDurationUnSplitted);
                                                        var ItemDuration = booking.duration.split(":");
                                                        var serviceDuration = { hour : ItemDuration[0], minutes : ItemDuration[1] };
                                                        //function to sum hours
                                                        hourFinalPlusServiceDuration = get_add_two_times(bookingTime,serviceDuration);
                                                        console.log(hourFinalPlusServiceDuration);

                                                            if (booking.time == hourFinal) {
                                                                //set contador += 1
                                                                //ver que tipo de servicio es 
                                                                console.log(booking.services[0].service_id);
                                                                console.log(item.shorter_service_id);

                                                                if (booking.services[0].service_id == item.longer_service_id){
                                                                    //sumo +1 reserva a longer
                                                                    
                                                                    longerServiceCounter = ++longerServiceCounter;
                                                                    console.log("+1 contador longer");

                                                                } else if (booking.services[0].service_id == item.shorter_service_id) {
                                                                    // o sumo +1 reserva a shorter
                                                                    console.log("+1 contador shorter");
                                                                    shorterServiceCounter = ++shorterServiceCounter;
                                                                }                                               

                                                            }
                                                        
                                                    });
                                                    console.log(longerServiceCounter);
                                                    console.log(shorterServiceCounter);

                                                    //me fijo cuantas reservas de que tipo se han hecho 
                                                    //a esa misma hora con los contadores y de ahi determino
                                                    //como setear la matriz
                                                    if (shorterServiceCounter == 0 && longerServiceCounter == 0) {
                                                        console.log('no hay reservas');
                                                        console.log(item);
                                                        //no hay reservas a esa hora de singles o dobles
                                                        //setear a TRUE TRUE lo cual ya está
                                                        //setear tipo de servicio disponible single y doble, y available units 2 y 4

                                                        //decidir si setear no setear todavia a true y esperar a la segunda comprobacion
                                                        insertNode(matrixServices, i + '.shorter_available', true);
                                                        insertNode(matrixServices, i + '.longer_available', true);
                                                        insertNode(matrixServices, i + '.service_available', true);

                                                        insertNode(matrixServices, i + '.longer_has_bookings', false);
                                                        insertNode(matrixServices, i + '.shorter_has_bookings', false);
                                                        

                                                    } else if (shorterServiceCounter < extendedKeys.unitsShorterTotal && shorterServiceCounter > 0) {
                                                        console.log('reserva de 1 singles');
                                                        console.log(item);
                                                        console.log(item.service_name);
                                                        console.log(i);
                                                        //existe una reserva de singles
                                                        //setear a TRUE FALSE
                                                        
                                                        insertNode(matrixServices, i + '.shorter_available', true);
                                                        insertNode(matrixServices, i + '.longer_available', false);
                                                        insertNode(matrixServices, i + '.service_available', true);

                                                        //available_units_shorter = 1;
                                                        console.log(extendedKeys.unitsShorterTotal);
                                                        var unitsShorterAvailable = extendedKeys.unitsShorterTotal - shorterServiceCounter;
                                                        console.log(unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_available_units', unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_has_bookings', true);

                                                    } else if (longerServiceCounter < extendedKeys.unitsLongerTotal && longerServiceCounter > 0) {
                                                        console.log('hay una reserva de dobles');
                                                        //hay una reserva de dobles
                                                        // FALSE TRUE
                                                        //available_units_shorter

                                                        insertNode(matrixServices, i + '.shorter_available', false);
                                                        insertNode(matrixServices, i + '.longer_available', true);

                                                        //available_units_shorter = 1;
                                                        console.log(extendedKeys.unitsLongerTotal);
                                                        var unitsLongerAvailable = extendedKeys.unitsLongerTotal - longerServiceCounter;
                                                        insertNode(matrixServices, i + '.longer_available_units', unitsLongerAvailable);
                                                        insertNode(matrixServices, i + '.service_available', true);
                                                        insertNode(matrixServices, i + '.longer_has_bookings', true);

                                                    } /*else if (shorterServiceCounter == extendedKeys.unitsShorterTotal || longerServiceCounter == extendedKeys.unitsLongerTotal) {

                                                        insertNode(matrixServices,i + '.shorter_available', false);
                                                        insertNode(matrixServices, i + '.longer_available', false);

                                                    }*/
                                                    

                        
                                                } else if (item.shorter_available == true && item.longer_available == false) { 
                                                    console.log("shorter true and longer falsee");

                                                    //i use Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10') to compare hours
                                                    //https://stackoverflow.com/questions/6212305/how-can-i-compare-two-time-strings-in-the-format-hhmmss
                                            

                                                    //set contador reservas a la misma hora = 0;

                                                    $.each( allBookingsDay, function( a, booking ){


                                                        //SERVICE COUNTER
                                                        console.log(booking.services[0].service_id);
                                                        //function to calculate hours   
                                                        //var ItemDurationUnSplitted = booking.duration; 
                                                        //console.log(ItemDurationUnSplitted);
                                                        var ItemDuration = booking.duration.split(":");
                                                        var serviceDuration = { hour : ItemDuration[0], minutes : ItemDuration[1] };
                                                        //function to sum hours
                                                        hourFinalPlusServiceDuration = get_add_two_times(bookingTime,serviceDuration);
                                                        console.log(hourFinalPlusServiceDuration);

                                                            if (booking.time == hourFinal) {
                                                                //set contador += 1
                                                                //ver que tipo de servicio es 
                                                                console.log(booking.services[0].service_id);
                                                                console.log(item.shorter_service_id);

                                                                if (booking.services[0].service_id == item.shorter_service_id) {
                                                                    // o sumo +1 reserva a shorter
                                                                    console.log("+1 contador shorter");
                                                                    shorterServiceCounter = ++shorterServiceCounter;
                                                                }                                               

                                                            }

                                                        


                                                        
                                                        //Date.parse('01/01/2011 10:20:45')
                                                        if (Date.parse('01/01/2011 '+booking.services[0].end_at) > Date.parse('01/01/2011 '+hourFinal) && Date.parse('01/01/2011' +booking.services[0].start_at) < Date.parse('01/01/2011 ' +hourFinalPlusServiceDuration)) {
                                                            console.log("set item shorter available false");
                                                            //SET FALSE FALSE
                                                            insertNode(matrixServices, i + '.shorter_available', false);
                                                            insertNode(matrixServices, i + '.longer_available', false);
                                                            insertNode(matrixServices, i + '.service_available', false);
                                                        } else {
                                                            console.log('set true false');
                                                            //set item shorter available true
                                                            //SET TRUE FALSE
                                                            insertNode(matrixServices, i + '.shorter_available', true);
                                                            insertNode(matrixServices, i + '.longer_available', false);
                                                            insertNode(matrixServices, i + '.service_available', true);
                                                        }
                                                        
                                                        //if (booking.services[0].end_at > hourFinal && booking.services[0].start_at < hourFinalPlusServiceDuration ) {

                                                        //}
                                                        

                                                    });

                                                    if (shorterServiceCounter == 0) {
                                                        console.log('no hay reservas');
                                                        console.log(item);
                                                        //no hay reservas a esa hora de singles o dobles
                                                        //setear a TRUE TRUE lo cual ya está
                                                        //setear tipo de servicio disponible single y doble, y available units 2 y 4
                                                        console.log(extendedKeys.unitsShorterTotal);
                                                        var unitsShorterAvailable = extendedKeys.unitsShorterTotal - shorterServiceCounter;
                                                        console.log(unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_available_units', unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_has_bookings', false);
                                                        
                                                        

                                                    } else if (shorterServiceCounter == 1) {
                                                        console.log('reserva de 1 singles');
                                                        console.log(item);
                                                        console.log(item.service_name);
                                                        console.log(i);
                                                        //existe una reserva de singles
                                                        //setear a TRUE FALSE
                                                        
                                                        

                                                        //available_units_shorter = 1;
                                                        console.log(extendedKeys.unitsShorterTotal);
                                                        var unitsShorterAvailable = extendedKeys.unitsShorterTotal - shorterServiceCounter;
                                                        console.log(unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_available_units', unitsShorterAvailable);
                                                        insertNode(matrixServices, i + '.shorter_has_bookings', true);

                                                    }
                                                
                    
                                                } 

                                            });
                                        }
                                    },
                                    error: function (data, status, error){
                                        console.log(error,data, status);
                        
                                    }
                                    
                                        
                            });   

                        }

                        
                

                

                
                    }
                    console.log(matrixServices);
                   //mainView.router.load({ pageName: "services" });

                } else{
                    console.log("response was not ok");
                }
            },
            error: function (data, status, error){

            }
   
            
    });

}
  

