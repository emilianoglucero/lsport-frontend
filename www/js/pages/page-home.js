var idBookingServices = [];
var allCategoriesIdsToList = [];
var categorieIdHTML;
var categorieNameHTML;

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
                    //allCategoriesIdsToList.push(item.id);
                    allCategoriesIdsToList[item.id] = item.name;
                                      
                
                });


                //buil home with the name of the categories

                builderCategoriesNames(allCategoriesIdsToList);

            
            },
            error: function (data, status, error){
            //alert('Hubo un error, por favor revisá tu correo y contraseña');
                console.log(error, data, status);
            }
    });

});

function serviceReservation(categorieIdHTML){
    console.log(categorieIdHTML);
    categorieIdHTML = categorieIdHTML;
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
                       console.log(item.categories[0]);
                       console.log(categorieIdHTML);
                       if(item.categories[0] == categorieIdHTML) {

                        //idBookingServices.push(item.id);
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

function builderCategoriesNames(allCategoriesIdsToList){
    console.log(allCategoriesIdsToList);

    //var mainId = item.id;
        var strBuilderCategoriesNames = [];
        $('#homecategories-list').html('');
        $.each( allCategoriesIdsToList, function( i, item ){
            console.log(item);
            console.log(i);
            categorieIdHTML = i;
            categorieNameHTML = item;
            //find a better solution to this array
            if (item !== undefined) {
                strBuilderCategoriesNames.push("<p><a href='#' onclick='serviceReservation(\""+ categorieIdHTML + "\")' class='button button-big button-fill' >"+item+"</a></p>");
            }   
        });
        $('#homecategories-list').append(strBuilderCategoriesNames.join(""));
}



