/*>var areContentTabMyPastBookingsBuilder = false;
var areContentTabMyNextBookingsBuilder = false;

var areContentTabNewsSportDetailsBuilder = false;

$(document).ready(function(){

    
    
});



myApp.onPageInit('bookings', function (page)
{
    console.log("bookings page");

    //$('#lblTitleUser').text(lblTitleUser);
    $$('#tabMyBookingsDetails1').on('tab:show', function () {
        console.log("tab1");
        myApp.alert('Tab 1 is visible');
        if (areContentTabNewsSportDetailsBuilder == false) {
            console.log("tab 1 visible");
            builderUserNextBookings();
            areContentTabNewsSportDetailsBuilder = true;
        }
    });
    
    $$('#tabMyBookingsDetails2').on('tab:show', function () {
        myApp.alert('Tab 2 is visible');
        if (areContentTabMyPastBookingsBuilder == false) {
            builderUserPastBookings();
            areContentTabMyPastBookingsBuilder = true;
        }
    });

    $('#subnavbarMyBookingsDetails1').text("Proximas Reservas");
	$('#subnavbarMyBookingsDetails2').text("Historial de Reservas");

    
    var todaysDate = new Date();

    function convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    console.log(convertDate(todaysDate)); // Returns: 2015-08-25
    todaysDateFormated = convertDate(todaysDate);

    
   
    

});
myApp.onPageReinit('bookings', function (page)
{
   

});

myApp.onPageBeforeAnimation('bookings', function (page)
{
    myApp.params.swipePanel = false;
});



function builderUserNextBookings() {


    $.ajax({
        // URL del Web Service
            url: "https://demoreservas.lenguajesport.com/?rest_route=/salon/api/v1/bookings",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "customers": userID,
                "orderby": "date_time",
                "start_date": todaysDateFormated
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                var userBookingsList = response.items;
                
               /* console.log(userBookingsList);
                var strBuilderReviewServicesContent = [];

                if(userBookingsList.length == 0){
                    strBuilderReviewServicesContent.push('<div class="content-block">');
                    strBuilderReviewServicesContent.push('<div class="divNotLastestNews">No has hecho reservas aún</div>');
                    strBuilderReviewServicesContent.push('</div>');
                    
                } else{
                    strBuilderReviewServicesContent.push('<div class="content-block-title">Tus Reservas</div>');
                    strBuilderReviewServicesContent.push('<div class="list-block media-list">');
                    strBuilderReviewServicesContent.push('<ul>');
                    $.each( userBookingsList, function( i, item ){
                        console.log(item);
                        console.log(idServiceSelected);
                        if(item.service_id == idServiceSelected){
                            serviceName = item.service_name;

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


            },
            error: function (data, status, error){
                console.log(erro, data, status);
            }

            
    });



}

function builderUserPastBookings() {


    $.ajax({
        // URL del Web Service
            url: "https://demoreservas.lenguajesport.com/?rest_route=/salon/api/v1/bookings",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "customers": userID,
                "orderby": "date_time",
                "end_date": todaysDateFormated
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                var userBookingsList = response.items;
                
               /* console.log(userBookingsList);
                var strBuilderReviewServicesContent = [];

                if(userBookingsList.length == 0){
                    strBuilderReviewServicesContent.push('<div class="content-block">');
                    strBuilderReviewServicesContent.push('<div class="divNotLastestNews">No has hecho reservas aún</div>');
                    strBuilderReviewServicesContent.push('</div>');
                    
                } else{
                    strBuilderReviewServicesContent.push('<div class="content-block-title">Tus Reservas</div>');
                    strBuilderReviewServicesContent.push('<div class="list-block media-list">');
                    strBuilderReviewServicesContent.push('<ul>');
                    $.each( userBookingsList, function( i, item ){
                        console.log(item);
                        console.log(idServiceSelected);
                        if(item.service_id == idServiceSelected){
                            serviceName = item.service_name;

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


            },
            error: function (data, status, error){
                console.log(erro, data, status);
            }

            
    });



}*/
