var idBookingServices;
var allCategoriesNamesToList = [];

/*services ids from categories*/
//var tenisIDs = [15,17, 19, 21];
//var botesIDs = [10,37,39,41,20];
myApp.onPageInit('date', function (page)
{
    console.log('date page init');

    //call to determine the categories to use and list in the home page
    $.ajax({
        // URL del Web Service
            url: "https://regatasreservas.lenguajesport.com/?rest_route=/salon/api/v1/services/categories",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                var allCategoriesToList = response.items;
                //filtrar response by time
                $.each( allCategoriesToList, function( i, item ){
                    
                    console.log(item.name);
                    allCategoriesNamesToList.push(item.name);
                                      
                
                });

                //builderhome with the name of the categories



            
            },
            error: function (data, status, error){
            //alert('Hubo un error, por favor revisá tu correo y contraseña');
                console.log(error, data, status);
            }
    });

});

function serviceRerservation(tenisIDs){
    console.log(tenisIDs);
    idBookingServices = tenisIDs;
    mainView.router.load({ pageName: "date" });

}

function builderHomeServices(allCategoriesNamesToList) {

    var arrayTobuildHome;

    arrayTobuildHome.push('html');

}


