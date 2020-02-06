var idServiceSelected;


myApp.onPageInit('services', function (page)
{
    console.log('services init');
    builderServicesAvailables();

    
});

function serviceCheck(){
    

            var radioValue = $("input[name='my-radio']:checked").val();
            if(radioValue){
                //alert("Your id is - " + radioValue);
            }


    idServiceSelected = radioValue;
    console.log(idServiceSelected);
    console.log('servicecheck');
    mainView.router.load({ pageName: "review" });
}

function builderServicesAvailables() {
    
    var strBuilderServicesContent = [];

	if(servicesAvailables.length == 0){
		strBuilderServicesContent.push('<div class="content-block">');
        strBuilderServicesContent.push('<div class="divNotLastestNews">No hay reservas disponibles</div>');
        strBuilderServicesContent.push('</div>');
        
	} else{
        //strBuilderServicesContent.push('<div class="content-block-title">Reservas Disponibles</div>');
        strBuilderServicesContent.push('<ul>');
        $.each( servicesAvailables, function( i, item ){
            console.log(item);
            console.log(i)
            if(item.selected == true){
                if(i == 0) {
                    //alert(item.service_name);
                    strBuilderServicesContent.push('<li><label class="label-radio item-content">');
                    strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item.service_id+'" checked="checked">');
                    strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                    strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+item.service_name+'</div></div>');
                    strBuilderServicesContent.push('</label></li>');

                } else{
                    //alert(item.service_name);
                    strBuilderServicesContent.push('<li><label class="label-radio item-content">');
                    strBuilderServicesContent.push('<input type="radio" name="my-radio" value="'+item.service_id+'">');
                    strBuilderServicesContent.push('<div class="item-media"><i class="icon icon-form-radio"></i></div>');
                    strBuilderServicesContent.push('<div class="item-inner"><div class="item-title">'+item.service_name+'</div></div>');
                    strBuilderServicesContent.push('</label></li>');

                }

            } else {
                
            }
        }); 
        strBuilderServicesContent.push('</ul>');   

    } 
    $('#services-list').append(strBuilderServicesContent.join(""));   




}