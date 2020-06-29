var idServiceSelected;

var radioValueId;
var radioValueHasCode;
var radioValueDuration;
var radioValuePrice;
var radioValueName;
var radioValueType;

var finalCodeBooking;


matrixServicesHardCode = {
    "Cancha de Tenis 1": {
        "shorter_available": true,
        "shorter_service_id": 15,
        "longer_available": true,
        "longer_service_id": 19,
        "date": "2020-05-15",
        "time": "12:00",
        "shorter_units_available": 2,
        "longer_units_available": 4,
        "longer_duration": "01:30",
        "shorter_price": "40",
        "longer_price": "40",
        "shorter_duration": "01:00",
        "shorter_has_bookings": false,
        "longer_has_bookings": false,
        "longer_code": 000000,
        "shorter_code": 000000,
        "service_has_extended": true
    },
    "Cancha de Tenis 2": {
        "shorter_available": false,
        "shorter_service_id": 17,
        "longer_available": true,
        "longer_service_id": 21,
        "date": "2020-05-15",
        "time": "12:00",
        "shorter_units_available": 2,
        "longer_units_available": 2,
        "longer_duration": "01:30",
        "shorter_price": "40",
        "longer_price": "40",
        "shorter_duration": "01:00",
        "shorter_has_bookings": false,
        "longer_has_bookings": true,
        "longer_code": 000000,
        "shorter_code": 000000,
        "service_has_extended": true
    },
    "Cancha de Tenis 3": {
        "shorter_available": true,
        "shorter_service_id": 171,
        "longer_available": false,
        "longer_service_id": 175,
        "date": "2020-05-15",
        "time": "12:00",
        "shorter_units_available": 1,
        "longer_units_available": 4,
        "longer_duration": "01:30",
        "shorter_duration": "01:00",
        "shorter_price": "40",
        "longer_price": "40",
        "shorter_has_bookings": true,
        "longer_has_bookings": false,
        "longer_code": 000000,
        "shorter_code": 000000,
        "service_has_extended": true
    },
    "Cancha de Tenis 4": {
        "shorter_available": true,
        "shorter_service_id": 173,
        "longer_available": true,
        "longer_service_id": 177,
        "date": "2020-05-15",
        "time": "12:00",
        "shorter_units_available": 2,
        "longer_units_available": 4,
        "longer_duration": "01:30",
        "shorter_duration": "01:00",
        "shorter_price": "40",
        "longer_price": "40",
        "shorter_has_bookings": false,
        "longer_has_bookings": false,
        "longer_code": 000000,
        "shorter_code": 000000,
        "service_has_extended": true
    }
}


myApp.onPageInit('services', function (page)
{
    console.log('services init');
    console.log(matrixServices);
    builderServicesAvailables(matrixServicesHardCode);

    
});
myApp.onPageReinit('services', function (page)
{
    //radioValueHasCode = "";
    //radioValueId = "";
    console.log("page services re init")
    //radioValue = undefined;


});

function serviceCheck(){
    

    var radioValue = $("input[name='my-radio']:checked").val();

            if(radioValue != undefined){
                //alert("Your id is - " + radioValue);
                console.log(radioValue);
                //+item.longer_service_id+'-'+item.longer_has_bookings+'-'+item.longer_duration+'-'+item.longer_price+'-'+i+'-isLonger">');
                var radioValueSplited = radioValue.split("-");
                radioValueId = radioValueSplited[0];
                radioValueHasCode = radioValueSplited[1];
                radioValueDuration = radioValueSplited[2];
                radioValuePrice = radioValueSplited[3];
                radioValueName = radioValueSplited[4];
                radioValueType = radioValueSplited[5];
                console.log(radioValueId);
                console.log(radioValueHasCode);
                console.log(radioValueDuration);
                console.log(radioValuePrice);
                console.log(radioValueName);
                console.log(radioValueType);

                if(radioValueHasCode == "true"){
                    console.log("to the codecheck");
                    mainView.router.load({ pageName: "codecheck" });
                } else {
                    console.log("to the review");
                    mainView.router.load({ pageName: "review" });

                }

            } else {

                showMessage("No has seleccionado ninguna opción!");
                //alert("Tenes que seleccionar una opción");
            }

}

function builderServicesAvailables(matrixServicesHardCode) {
    console.log(matrixServicesHardCode);
    $('#services-list').html('');
    
    var strBuilderServicesContent = [];

    
	if(Object.entries(matrixServicesHardCode).length === 0){
		strBuilderServicesContent.push('<div class="content-block">');
        strBuilderServicesContent.push('<div class="divNotLastestNews">No hay reservas disponibles</div>');
        strBuilderServicesContent.push('</div>');
        
	} else{
        //strBuilderServicesContent.push('<div class="content-block-title">Reservas Disponibles</div>');
        strBuilderServicesContent.push('<ul>');
        $.each( matrixServicesHardCode, function( i, item ){
            console.log(item);
            console.log(i)
           // if(item.selected == true){
                //if(i == 0) {
                    //alert(item.service_name);
                    /*strBuilderServicesContent.push('<li><label class="label-radio item-content">');
                    strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item.service_id+'" checked="checked">');
                    strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                    strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+item.service_name+'</div></div>');
                    strBuilderServicesContent.push('</label></li>');*/

                //} else{
                    //alert(item.service_name);
                    if(item.service_has_extended == true){
                        if(item.longer_available == true) {
                            strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #fff6bf;margin-bottom: 15px;padding-bottom: 15px;font-family: Montserrat-Regular">');
                            strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item.longer_service_id+'-'+item.longer_has_bookings+'-'+item.longer_duration+'-'+item.longer_price+'-'+i+'-isLonger">');
                            strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                            strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+' para DOBLES</div></div>');
                            strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuilderServicesContent.push('<div class="item-subtitle">Precio: $'+item.longer_price+'</div>');
                                strBuilderServicesContent.push('<div class="item-subtitle">Duración: '+item.longer_duration+'hs</div>');


                            if(item.longer_has_bookings == false){
                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno aún no ha sido reservado por nadie, sé el primero!</div>');

                            } else {
                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno ya ha sido reservado por otra persona, si deseas unirte,  tendrás que ingresár el código de reserva</div>');
                        
                            }
                            strBuilderServicesContent.push('</div>');
                            strBuilderServicesContent.push('</label></li>');

                        } else {
                            strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #ed9898;margin-bottom: 15px;padding-bottom: 15px;font-family: Montserrat-Regular">');
                            strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                            strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+' para DOBLES</div></div>');
                            strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este servicio no está disponible en el día y horario seleccionados</div>');
                            strBuilderServicesContent.push('</div>');
                            strBuilderServicesContent.push('</label></li>');
                        
                        }

                    } 
                   // else {
                        if(item.shorter_available == true) {

                            strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #fff6bf;margin-bottom: 15px;padding-bottom: 15px;font-family: Montserrat-Regular">');
                            strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item.shorter_service_id+'-'+item.shorter_has_bookings+'-'+item.shorter_duration+'-'+item.shorter_price+'-'+i+'-isShorter">');
                            strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                            strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+' para SINGLES</div></div>');
                            strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuilderServicesContent.push('<div class="item-subtitle">Precio: $'+item.shorter_price+'</div>');
                                strBuilderServicesContent.push('<div class="item-subtitle">Duración: '+item.shorter_duration+'hs</div>');

                            if(item.shorter_has_bookings == false){

                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno aún no ha sido reservado por nadie, sé el primero!</div>');

                            } else {

                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno ya ha sido reservado por otra persona, si deseas unirte,  tendrás que ingresár el código de reserva</div>');

                            }

                            strBuilderServicesContent.push('</div>');
                            strBuilderServicesContent.push('</label></li>');
                            
                        } else {

                            strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #ed9898;margin-bottom: 15px;padding-bottom: 15px;">');
                            strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                            strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+' para SINGLES</div></div>');
                            strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este servicio no está disponible en el día y horario seleccionados</div>');
                            strBuilderServicesContent.push('</div>');
                            strBuilderServicesContent.push('</label></li>');
                        
                        }

                    //}
                    /*
                    strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #f2ff7a;margin-bottom: 15px;padding-bottom: 15px;font-family: Montserrat-Regular">');
                    strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item+'">');
                    strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                    strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+'</div></div>');
                    strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                        strBuilderServicesContent.push('<div class="item-subtitle">Precio: $40</div>');
                        strBuilderServicesContent.push('<div class="item-subtitle">Duración: 01:30hs</div>');
                        strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno aún no ha sido reservado por nadie, sé el primero!</div>');
                    strBuilderServicesContent.push('</div>');
                    strBuilderServicesContent.push('</label></li>');

                    strBuilderServicesContent.push('<li><label class="label-radio item-content" style="display: block;background-color: #f2ff7a;margin-bottom: 15px;padding-bottom: 15px;font-family: Montserrat-Regular">');
                    strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item+'">');
                    strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                    strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+i+'</div></div>');
                    strBuilderServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                        strBuilderServicesContent.push('<div class="item-subtitle">Precio: $40</div>');
                        strBuilderServicesContent.push('<div class="item-subtitle">Duración: 01:30hs</div>');
                        strBuilderServicesContent.push('<div class="text-booking-services" style="margin-top: 5px;">Este turno aún no ha sido reservado por nadie, sé el primero!</div>');
                    strBuilderServicesContent.push('</div>');
                    strBuilderServicesContent.push('</label></li>');*/

               // }

           // } else {
                
            //}
        }); 
        strBuilderServicesContent.push('</ul>');   

    } 
    $('#services-list').append(strBuilderServicesContent.join(""));   




}