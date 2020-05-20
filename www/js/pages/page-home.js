var idBookingServices = [];
var allCategoriesNamesToList = [];
var categorieName;

/*services ids from categories*/
//var tenisIDs = [15,17, 19, 21];
//var botesIDs = [10,37,39,41,20];
myApp.onPageInit('home', function (page)
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


                //buil home with the name of the categories

                builderCategoriesNames(allCategoriesNamesToList);

            
            },
            error: function (data, status, error){
            //alert('Hubo un error, por favor revisá tu correo y contraseña');
                console.log(error, data, status);
            }
    });

});

function serviceReservation(categorieNameHTML){
    console.log(categorieNameHTML);
    categorieName = categorieNameHTML;
    //console.log(tenisIDs);
    //idBookingServices = tenisIDs;
    //list all the services and finde only the ones with the name categorie
    $.ajax({
        // URL del Web Service
            url: "https://regatasreservas.lenguajesport.com/?rest_route=/salon/api/v1/services",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "type": "primary",
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                var allServicesList = response.items;
                //filtrar response by time
                if (response.status == "OK") {
                    $.each( allServicesList, function( i, item ){
                        
                       console.log(item);
                       console.log(categorieName);
                       if(item.name.includes(categorieName)) {

                        idBookingServices.push(item.id);

                       }
                                        
                    
                    });

                    mainView.router.load({ pageName: "date" });
                }
            
            },
            error: function (data, status, error){
            //alert('Hubo un error, por favor revisá tu correo y contraseña');
                console.log(error, data, status);
            }
    });
   // mainView.router.load({ pageName: "date" });

}

function builderCategoriesNames(allCategoriesNamesToList){
    console.log(allCategoriesNamesToList);

    //var mainId = item.id;
        var strBuilderCategoriesNames = [];
        $('#homecategories-list').html('');
        $.each( allCategoriesNamesToList, function( i, item ){
            console.log(item);
            var categorieNameHTML = item;
                strBuilderCategoriesNames.push("<p><a href='#' onclick='serviceReservation(\""+ categorieNameHTML + "\")' class='button button-big button-fill' >"+item+"</a></p>");
                
        });
        $('#homecategories-list').append(strBuilderCategoriesNames.join(""));
}


