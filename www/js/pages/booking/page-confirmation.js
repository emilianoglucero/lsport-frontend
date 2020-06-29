myApp.onPageInit('confirmation', function (page)
{
    console.log(idConfirmation);
    builderConfirmationService();

    
});


function builderConfirmationService() {

    showLoadSpinnerWS();

    $.ajax({
        // URL del Web Service
            url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/bookings/"+idConfirmation,
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "id": idConfirmation 

            },
            timeout: timeOut,
            success: function(response){
               
                console.log(response);
                var confirmationInfo = response.items[0];
                console.log(confirmationInfo);

                var strBuilderConfirmationServicesContent = [];

                strBuilderConfirmationServicesContent.push('<div class="content-block-title" style="text-align: center;">Tu Reserva</div>');
                strBuilderConfirmationServicesContent.push('<div class="list-block media-list">');
                strBuilderConfirmationServicesContent.push('<ul>');
                var myCodeBooking = codeBooking(confirmationInfo.date, confirmationInfo.time, confirmationInfo.id);
                console.log(myCodeBooking);
                var dayOfTheWeek = getDayOfWeek(confirmationInfo.date);
                console.log(dayOfTheWeek);
                var finalDateArg = formatDateFromUsToArg(confirmationInfo.date);

                        //alert(item.service_name);
                        strBuilderConfirmationServicesContent.push('<li>');
                        //strBuilderConfirmationServicesContent.push('<div class="item-media"></div>');
                        strBuilderConfirmationServicesContent.push('<div class="item-inner">');
                            strBuilderConfirmationServicesContent.push('<div class="item-title" style="text-align: center;">'+confirmationInfo.services[0].service_name+'</div></div>');
                        strBuilderConfirmationServicesContent.push('<div class="booking-cards" style="margin: 10px;">');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Precio Facturado: $'+confirmationInfo.amount+'</div>');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Fecha: '+dayOfTheWeek+' '+finalDateArg+'</div>');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Hora: '+confirmationInfo.time+'hs</div>');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Duración: '+confirmationInfo.duration+'hs</div>');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">Código de reserva: '+myCodeBooking+'</div>');
                            strBuilderConfirmationServicesContent.push('<div class="item-subtitle" style="margin: 5px;">ID : '+confirmationInfo.id+'</div>');
                            strBuilderConfirmationServicesContent.push('<div class="text-booking-services" style="margin: 5px;" style="margin: 5px;">Recibirás un correo electronico de recordatorio de reserva 1 hora antes.<br>Si necesitas cambiar tu reserva comunicate al 034199999.</div>');
                        strBuilderConfirmationServicesContent.push('</div></li>');
                strBuilderConfirmationServicesContent.push('</ul></div></div>');   

            $('#services-confirmation').append(strBuilderConfirmationServicesContent.join(""));

            hideLoadSpinnerWS();
            myApp.closeModal();

            },
            error: function (data, status, error){

            }
   
            
    });
    

}

function backHome() {
    mainView.router.load({ pageName: "home" });
}