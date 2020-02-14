myApp.onPageInit('confirmation', function (page)
{
    console.log(idConfirmation);
    builderConfirmationService();

    
});


function builderConfirmationService() {
    
    var strBuilderConfirmationServicesContent = [];

        strBuilderConfirmationServicesContent.push('<div class="content-block-title">Tu Reserva</div>');
        strBuilderConfirmationServicesContent.push('<div class="list-block media-list">');
        strBuilderConfirmationServicesContent.push('<ul>');


                //alert(item.service_name);
                strBuilderConfirmationServicesContent.push('<li><a href="#" class="item-link item-content">');
                //strBuilderConfirmationServicesContent.push('<div class="item-media"></div>');
                strBuilderConfirmationServicesContent.push('<div class="item-inner"><div class="item-title-row">');
                strBuilderConfirmationServicesContent.push('<div class="item-title"></div>'+serviceName+'<div class="item-after">Precio Facturado: $40</div></div>');
                strBuilderConfirmationServicesContent.push('<div class="item-subtitle">'+dateToShow+'</div>');
                strBuilderConfirmationServicesContent.push('<div class="item-subtitle">Desde: '+hourFinal+'hs</div>');
                strBuilderConfirmationServicesContent.push('<div class="item-subtitle">Hasta: '+hourFinalEnd+'hs</div>');
                strBuilderConfirmationServicesContent.push('<div class="item-subtitle">Tu número de reserva es : '+idConfirmation+'</div>');
                strBuilderConfirmationServicesContent.push('<div class="item-text">Recibirás un correo electronico de confirmación de reserva.<br> Si no lo recibís en 5 minutos, chequea tu bandeja de SPAM. Si necesitas cambiar tu reserva comunicate al 034199999.</div>');
                strBuilderConfirmationServicesContent.push('</div></a></li>');
        strBuilderConfirmationServicesContent.push('</ul></div></div>');   

    $('#services-confirmation').append(strBuilderConfirmationServicesContent.join(""));   


}

function backHome() {
    mainView.router.load({ pageName: "home" });
}