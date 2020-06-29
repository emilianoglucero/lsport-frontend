
var areContentTabMyPastBookingsBuilder = false;
var areContentTabMyNextBookingsBuilder = false;

var areContentTabNewsSportDetailsBuilder = false;

myApp.onPageInit('activitydetails', function (page) {
	
	$('#subnavbarActivityDetails1').text("Proximas");
	$('#subnavbarActivityDetails2').text("Historial");
	$('#tabActivityDetails1').html("");
	$('#tabActivityDetails2').html("");
	

	$$('#tabActivityDetails1').on('show', function () {
		console.log("tab1");
       // myApp.alert('Tab 1 is visible');
        if (areContentTabNewsSportDetailsBuilder == false) {
            console.log("tab 1 visible");
            builderUserNextBookings();
            areContentTabNewsSportDetailsBuilder = true;
        }
	});

	$$('#tabActivityDetails2').on('show', function () {
		//myApp.alert('Tab 2 is visible');
		console.log("tab2");
        if (areContentTabMyPastBookingsBuilder == false) {
            builderUserPastBookings();
            areContentTabMyPastBookingsBuilder = true;
        }
	});


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
	
	builderUserNextBookings();
	areContentTabNewsSportDetailsBuilder = true;


});

myApp.onPageReinit('user', function (page)
{


});

myApp.onPageBeforeAnimation('activitydetails', function (page) {
	//myApp.params.swipePanel = false;
	
});

function formatDateFromUsToArg(date){
	var dateSplited = date.split('-');
	var dateFinalArg = dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0];
	return dateFinalArg;
}

function builderUserNextBookings() {
    showLoadSpinnerWS();
    $('#tabActivityDetails1').html('');
	console.log(userID, todaysDateFormated);


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
                "customers": userID,
                "orderby": "date_time",
                "start_date": todaysDateFormated
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                var userBookingsList = response.items;
                
                console.log(userBookingsList);
                var strBuildeUserBookingContent = [];

                if(userBookingsList.length == 0){
                    strBuildeUserBookingContent.push('<div class="content-block">');
                    strBuildeUserBookingContent.push('<div class="divNotLastestNews">No tienes proximas reservas aún</div>');
                    strBuildeUserBookingContent.push('</div>');
                    
                } else{
                    strBuildeUserBookingContent.push('<div class="content-block-title">TUS PROXIMAS RESERVAS</div>');
                    strBuildeUserBookingContent.push('<div class="list-block media-list">');
					strBuildeUserBookingContent.push('<ul>');
					var serviceDetail;
                    $.each( userBookingsList, function( i, item ){
						console.log(item);
						console.log(item.services[0]);
						serviceDetail = item.services[0];

                        var finalDateArg = formatDateFromUsToArg(item.date);
                        var dayOfTheWeek = getDayOfWeek(item.date);
                        var myCodeBooking = codeBooking(item.date, item.time, item.id);
                        console.log(myCodeBooking);
                        //console.log(idServiceSelected);
                        //if(item.service_id == idServiceSelected){
                            //serviceName = item.service_name;

                            //alert(item.service_name);
                            /*strBuildeUserBookingContent.push('<li><a href="#" class="item-link item-content">');
                            //strBuildeUserBookingContent.push('<div class="item-media"></div>');
                            strBuildeUserBookingContent.push('<div class="item-inner"><div class="item-title-row">');
                            strBuildeUserBookingContent.push('<div class="item-title">'+serviceDetail.service_name+'</div><div class="item-after">Precio Final: $'+item.amount+'</div></div>');
                            strBuildeUserBookingContent.push('<div class="item-subtitle">'+finalDateArg+'</div>');
                            strBuildeUserBookingContent.push('<div class="item-subtitle">Desde: '+serviceDetail.start_at+'hs</div>');
							strBuildeUserBookingContent.push('<div class="item-subtitle">Hasta: '+serviceDetail.end_at+'hs</div>');
							strBuildeUserBookingContent.push('<div class="item-subtitle">ID: '+item.id+'</div>');
							//strBuildeUserBookingContent.push('<div class="item-subtitle"><a href="#" onclick="readFile()" class="item-link list-button">Read File</a></div>');
							//strBuildeUserBookingContent.push('<div class="item-subtitle"><a href="#" onclick="toPDF()" class="item-link list-button">To PDF</a></div>');
							//strBuildeUserBookingContent.push('<div class="item-subtitle"><a href="#" onclick="openBooking()" class="item-link list-button">Abrir Ticket</a></div>');
                            strBuildeUserBookingContent.push('</div></a></li>');*/


                            //alert(item.service_name);
                            strBuildeUserBookingContent.push('<li  style="margin-top: 20px;list-style-position: inside;border-radius: 10px;border: 1px solid #c9d1cb">');
                            //strBuildeUserBookingContent.push('<div class="item-media"></div>');
                            strBuildeUserBookingContent.push('<div class="item-inner" style="padding: 15px;><div class="item-title-row">');
                            strBuildeUserBookingContent.push('<div class="item-title">'+serviceDetail.service_name+'</div></div>');
                            strBuildeUserBookingContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Fecha: '+dayOfTheWeek+' '+finalDateArg+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Precio Facturado: $'+item.amount+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Desde: '+serviceDetail.start_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Hasta: '+serviceDetail.end_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Código de Reserva: '+myCodeBooking+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">ID: '+item.id+'</div>');
                            //strBuildeUserBookingContent.push('</div>');
                            strBuildeUserBookingContent.push('</div></li>');
                        //}
                    }); 
                    strBuildeUserBookingContent.push('</ul></div>');   

				} 
				console.log(strBuildeUserBookingContent);
				$('#tabActivityDetails1').append(strBuildeUserBookingContent.join(""));   
				hideLoadSpinnerWS();


            },
            error: function (data, status, error){
                console.log(erro, data, status);
			}
			

            
    });



}

function builderUserPastBookings() {
    showLoadSpinnerWS();
    $('#tabActivityDetails2').html('');
	console.log(userID, todaysDateFormated);

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
                "customers": userID,
                "orderby": "date_time",
                "end_date": todaysDateFormated
            },
            timeout: timeOut,
            success: function(response){
				console.log(response);
                var userBookingsList = response.items;
                
                console.log(userBookingsList);
                var strBuildeUserBookingContent = [];

                if(userBookingsList.length == 0){
                    strBuildeUserBookingContent.push('<div class="content-block">');
                    strBuildeUserBookingContent.push('<div class="divNotLastestNews">No has hecho reservas aún</div>');
                    strBuildeUserBookingContent.push('</div>');
                    
                } else{
                    strBuildeUserBookingContent.push('<div class="content-block-title">TUS RESERVAS PASADAS</div>');
                    strBuildeUserBookingContent.push('<div class="list-block media-list">');
					strBuildeUserBookingContent.push('<ul>');
					var serviceDetail;
                    $.each( userBookingsList, function( i, item ){
						console.log(item);
						console.log(item.services[0]);
                        serviceDetail = item.services[0];
                        console.log(serviceDetail);

                        var finalDateArg = formatDateFromUsToArg(item.date);
                        var dayOfTheWeek = getDayOfWeek(item.date);
                        var myCodeBooking = codeBooking(item.date, item.time, item.id);
                        console.log(myCodeBooking);
                        //if(item.service_id == idServiceSelected){
                            //serviceName = item.service_name;

                            //alert(item.service_name);
                            strBuildeUserBookingContent.push('<li  style="margin-top: 20px;list-style-position: inside;border-radius: 10px;border: 1px solid #c9d1cb">');
                            //strBuildeUserBookingContent.push('<div class="item-media"></div>');
                            strBuildeUserBookingContent.push('<div class="item-inner" style="padding: 15px;><div class="item-title-row">');
                            strBuildeUserBookingContent.push('<div class="item-title">'+serviceDetail.service_name+'</div></div>');
                            strBuildeUserBookingContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Fecha: '+dayOfTheWeek+' '+finalDateArg+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Precio Facturado: $'+item.amount+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Desde: '+serviceDetail.start_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Hasta: '+serviceDetail.end_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">Código de Reserva: '+myCodeBooking+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle">ID: '+item.id+'</div>');
                            //strBuildeUserBookingContent.push('</div>');
                            strBuildeUserBookingContent.push('</div></li>');


                            /*strBuildeUserBookingContent.push('<li><a href="#" class="item-link item-content">');
                            //strBuildeUserBookingContent.push('<div class="item-media"></div>');
                            strBuildeUserBookingContent.push('<div class="item-inner"><div class="item-title-row">');
                            strBuildeUserBookingContent.push('<div class="item-title">'+serviceDetail.service_name+'</div><div class="item-after">Precio Final: $'+item.amount+'</div></div>');
                            strBuildeUserBookingContent.push('<div class="item-subtitle">'+finalDateArg+'</div>');
                            strBuildeUserBookingContent.push('<div class="item-subtitle">Desde: '+serviceDetail.start_at+'hs</div>');
							strBuildeUserBookingContent.push('<div class="item-subtitle">Hasta: '+serviceDetail.end_at+'hs</div>');
							strBuildeUserBookingContent.push('<div class="item-subtitle">ID: '+item.id+'</div>');
                            strBuildeUserBookingContent.push('</div></a></li>');


                            strBuildeUserBookingContent.push('<li>');
                            //strBuildeUserBookingContent.push('<div class="item-media"></div>');
                            strBuildeUserBookingContent.push('<div class="item-inner" style="padding: 15px;><div class="item-title-row">');
                                strBuildeUserBookingContent.push('<div class="item-title">'+serviceDetail.service_name+'</div></div>');
                            strBuildeUserBookingContent.push('</div>');
                            strBuildeUserBookingContent.push('<div class="booking-cards" style="margin: 10px;">');
                                strBuildeUserBookingContent.push('<div class="item-subtitle" style="margin: 5px;">Precio Final: $'+radioValuePrice+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle" style="margin: 5px;">Fecha: '+finalDateArg+'</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle" style="margin: 5px;">Desde: '+serviceDetail.start_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle" style="margin: 5px;">Hasta: '+serviceDetail.end_at+'hs</div>');
                                strBuildeUserBookingContent.push('<div class="item-subtitle" style="margin: 5px;">ID: '+item.id+'hs</div>');
                            strBuildeUserBookingContent.push('</div></li>');*/
                        //}
                    }); 
                    strBuildeUserBookingContent.push('</ul></div></div>');   

				} 
				console.log(strBuildeUserBookingContent);
				$('#tabActivityDetails2').append(strBuildeUserBookingContent.join(""));   
				hideLoadSpinnerWS();


            },
            error: function (data, status, error){
                console.log(erro, data, status);
            }

            
    });



}
