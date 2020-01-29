myApp.onPageInit('services', function (page)
{
    console.log('services init');
    builderServicesAvailables();

    
});


function builderServicesAvailables() {
    
    var strBuilderServicesContent = [];

	if(servicesAvailables.length == 0){
		strBuilderServicesContent.push('<div class="content-block">');
        strBuilderServicesContent.push('<div class="divNotLastestNews">No hay reservas disponibles</div>');
        strBuilderServicesContent.push('</div>');
        
	} else{
        strBuilderServicesContent.push('<div class="content-block-title">Reservas Disponibles</div>');
        strBuilderServicesContent.push('<ul>');
        $.each( servicesAvailables, function( i, item ){
            console.log(item);
            if(item.selected == true){

                alert(item.service_name);
                strBuilderServicesContent.push('<li><label class="label-checkbox item-content">');
                strBuilderServicesContent.push('<input type="checkbox" name="'+item.service_name+'" value="'+item.service_id+'">');
                strBuilderServicesContent.push('<div class="item-media"> <i class="icon icon-form-checkbox"></i></div>');
                strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+item.service_name+'</div></div>');
                strBuilderServicesContent.push('</label></li>');
            }
        }); 
        strBuilderServicesContent.push('</ul>');   

    } 
    $('#services-list').append(strBuilderServicesContent.join(""));   




}