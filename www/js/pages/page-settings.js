var json;

var areFavouritesChanged = false;
myApp.onPageInit('settings', function (page)
{
    var user = firebase.auth().currentUser;
    if (user) {
        $("#notLoggedSettings").hide();
        $("#loggedSettings").show();

        //load settings page
        $('#buttonSaveFavouritesSettings').hide();
        //$('#lblMenuItemSettingsFavourites').text(lblHeaderSettingsFavourites);
        //$('#lblMenuItemSettingsNotifications').text(lblHeaderSettingsNotifications);
        $('#buttonSaveFavouritesSettings').text(lblSaveFavouritesSettings);
       /* $('#buttonSaveFavouritesSettings').on('click', function(){
            goBack = false;
            sendPreferences();
        });*/

        $('#btnBackPageSettings').on('click', function(){
            confirmChangesFavouritesSettings();
        });
        $$('.panel-left').on('open', function () {
            if(mainView.activePage.name == "settings"){
                confirmChangesFavouritesSettingsFromMenu();
            }
        });

        //traigo los favoritos
        showLoadSpinnerWS();
        $.ajax({
        // URL del Web Service, en este ws no hace falta enviar datos, con el bearer identifica el usuario
                url: getPathWS() + 'setPreferencias',
                type: "GET",
                contentType: "application/json",
                dataType: 'json',
                timeout: timeOut,
                success: function(response){
                    /*if(response.errorCode != 0)
                    {
                        hideLoadSpinnerWS();
                        filterCodeErrorWS(response);
                        $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
                        return;
                    }
                    if(isAppUpdate(response.serverVersion) == false){
                        hideLoadSpinnerWS();
                        mainView.router.load({pageName: 'update'});
                        return;
                    }*/

                    console.log(response);
                    json = response;
                    update_tree();


                    //$ele1 = $(this);
                    $('.check').filter('[data-favourite="1"]').attr("data-checked", "1");
                    var busquedaChecks = $('.check').filter('[data-favourite="1"]');
                    console.log(busquedaChecks);
                    //var ele2 = $('.custom_check .fa-check');
                    //console.log(ele2);
                    //var ele3 = $('.check').find('.fa-check');
                    //console.log(ele3);


                    var finalresult = busquedaChecks.find('.custom_check .fa-check');
                    console.log(finalresult);
                    console.log(finalresult[0]);
                    console.log(finalresult[1]);
                    finalresult.css("display", "inline");
                    //var finalresultParents1 = finalresult.parents('.check');
                    //var finalresultParents2 = finalresultParents1.parents('.custom_check');
                    //var finalresultParents2 = finalresultParents1.parent('.custom_check');


                    var finalresultParents = finalresult.closest('.check');
                    var finalresultParents2 = finalresultParents.closest('.check').closest('.check_container').closest('.check').children( '.custom_check' ).children( '.fa-check' ).css("display", "inline");
                    //console.log(finalresultParents1[0]);
                    //console.log(finalresultParents2[0]);
                    var finalresultParentsContainer = finalresultParents.closest('.check').closest('.check_container');
                    var contCheckNoFavourite = 0;
                    console.log(finalresultParentsContainer.length);
                    console.log(finalresultParentsContainer);
                    console.log(finalresultParentsContainer[0]);
                    console.log(finalresultParentsContainer[1]);
                    console.log(finalresultParentsContainer.eq(1).children('.check'));
                    //console.log(finalresultParentsContainer.eq(1).children());
                    var cantDom;
                        for (cantDom = 0; cantDom < finalresultParentsContainer.length; cantDom++) {
                        console.log('for');
                        console.log(cantDom);
                        console.log(finalresultParentsContainer.length);
                        var finalresultParentsContainerCheck = finalresultParentsContainer.eq(cantDom).children('.check');
                        console.log(finalresultParentsContainerCheck);
                        //console.log(finalresultParentsContainerCheck.attr('data-favourite'));
                        var cantCheck;
                            for (cantCheck = 0; cantCheck < finalresultParentsContainerCheck.length; cantCheck++) {
                            console.log(finalresultParentsContainerCheck.eq(cantCheck));

                                if (finalresultParentsContainerCheck.eq(cantCheck).attr('data-favourite') == "0" ) {
                                console.log('datafavourite00');
                                contCheckNoFavourite = contCheckNoFavourite++;
                                console.log(finalresultParentsContainerCheck.eq(cantCheck));
                                //console.log(finalresultParentsContainerCheck[cantCheck]);
                                finalresultParentsContainerCheck.eq(cantCheck).closest( '.check_container' ).siblings( '.custom_check' ).children( '.fa-check' ).css("display", "none");
                                var finalresultParentsContainerCheckMinus = finalresultParentsContainerCheck.eq(cantCheck).closest( '.check_container' ).siblings( '.custom_check' ).children( '.fa-minus' ).css("display", "inline");
                                console.log (finalresultParentsContainerCheckMinus);

                                }
                            }



                        }
                        hideLoadSpinnerWS();
                        //showMessageToast(messageSettingsNotificationsSuccessfullySaved);


                },
                error: function (data, status, error){
                    console.log(error);
                    console.log(data);
                    console.log(status);
                    //showMessageToast(messageConexionError);
                    //$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
            },
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
        });

    } else {
        $("#loggedSettings").hide();
        $("#notLoggedSettings").show();

        $('#btnBackPageSettings').on('click', function(){
            mainView.router.back({
                pageName: 'home',
                force: true
            });
        });
    }





});

myApp.onPageReinit('settings', function (page)
{
    /*var user = firebase.auth().currentUser;
    if (user) {
        $("#notLoggedSettings").hide();
        $("#loggedSettings").show();
    } else {
        $("#loggedSettings").hide();
        $("#notLoggedSettings").show();
    }*/

    var user = firebase.auth().currentUser;
    if (user) {
        $("#notLoggedSettings").hide();
        $("#loggedSettings").show();

        //load settings page
        $('#buttonSaveFavouritesSettings').hide();
        //$('#lblMenuItemSettingsFavourites').text(lblHeaderSettingsFavourites);
        //$('#lblMenuItemSettingsNotifications').text(lblHeaderSettingsNotifications);
        $('#buttonSaveFavouritesSettings').text(lblSaveFavouritesSettings);
        /*$('#buttonSaveFavouritesSettings').on('click', function(){
            goBack = false;
            sendPreferences();
        });*/

        $('#btnBackPageSettings').on('click', function(){
            confirmChangesFavouritesSettings();
        });
        $$('.panel-left').on('open', function () {
            if(mainView.activePage.name == "settings"){
                confirmChangesFavouritesSettingsFromMenu();
            }
        });

        //traigo los favoritos
        showLoadSpinnerWS();
        $.ajax({
        // URL del Web Service, en este ws no hace falta enviar datos, con el bearer identifica el usuario
                url: getPathWS() + 'setPreferencias',
                type: "GET",
                contentType: "application/json",
                dataType: 'json',
                timeout: timeOut,
                success: function(response){

                    console.log(response);
                    json = response;
                    update_tree();


                    //$ele1 = $(this);
                    $('.check').filter('[data-favourite="1"]').attr("data-checked", "1");
                    var busquedaChecks = $('.check').filter('[data-favourite="1"]');
                    console.log(busquedaChecks);
                    //var ele2 = $('.custom_check .fa-check');
                    //console.log(ele2);
                    //var ele3 = $('.check').find('.fa-check');
                    //console.log(ele3);


                    var finalresult = busquedaChecks.find('.custom_check .fa-check');
                    console.log(finalresult);
                    console.log(finalresult[0]);
                    console.log(finalresult[1]);
                    finalresult.css("display", "inline");
                    //var finalresultParents1 = finalresult.parents('.check');
                    //var finalresultParents2 = finalresultParents1.parents('.custom_check');
                    //var finalresultParents2 = finalresultParents1.parent('.custom_check');


                    var finalresultParents = finalresult.closest('.check');
                    var finalresultParents2 = finalresultParents.closest('.check').closest('.check_container').closest('.check').children( '.custom_check' ).children( '.fa-check' ).css("display", "inline");
                    //console.log(finalresultParents1[0]);
                    //console.log(finalresultParents2[0]);
                    var finalresultParentsContainer = finalresultParents.closest('.check').closest('.check_container');
                    var contCheckNoFavourite = 0;
                    console.log(finalresultParentsContainer.length);
                    console.log(finalresultParentsContainer);
                    console.log(finalresultParentsContainer[0]);
                    console.log(finalresultParentsContainer[1]);
                    console.log(finalresultParentsContainer.eq(1).children('.check'));
                    //console.log(finalresultParentsContainer.eq(1).children());
                    var cantDom;
                        for (cantDom = 0; cantDom < finalresultParentsContainer.length; cantDom++) {
                        console.log('for');
                        console.log(cantDom);
                        console.log(finalresultParentsContainer.length);
                        var finalresultParentsContainerCheck = finalresultParentsContainer.eq(cantDom).children('.check');
                        console.log(finalresultParentsContainerCheck);
                        //console.log(finalresultParentsContainerCheck.attr('data-favourite'));
                        var cantCheck;
                            for (cantCheck = 0; cantCheck < finalresultParentsContainerCheck.length; cantCheck++) {
                            console.log(finalresultParentsContainerCheck.eq(cantCheck));

                                if (finalresultParentsContainerCheck.eq(cantCheck).attr('data-favourite') == "0" ) {
                                console.log('datafavourite00');
                                contCheckNoFavourite = contCheckNoFavourite++;
                                console.log(finalresultParentsContainerCheck.eq(cantCheck));
                                //console.log(finalresultParentsContainerCheck[cantCheck]);
                                finalresultParentsContainerCheck.eq(cantCheck).closest( '.check_container' ).siblings( '.custom_check' ).children( '.fa-check' ).css("display", "none");
                                var finalresultParentsContainerCheckMinus = finalresultParentsContainerCheck.eq(cantCheck).closest( '.check_container' ).siblings( '.custom_check' ).children( '.fa-minus' ).css("display", "inline");
                                console.log (finalresultParentsContainerCheckMinus);

                                }
                            }



                        }
                        hideLoadSpinnerWS();
                        //showMessageToast(messageSettingsNotificationsSuccessfullySaved);


                },
                error: function (data, status, error){
                    console.log(error);
                    console.log(data);
                    console.log(status);
                    //showMessageToast(messageConexionError);
                    //$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
            },
            beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
        });

    } else {
        $("#loggedSettings").hide();
        $("#notLoggedSettings").show();

        $('#btnBackPageSettings').on('click', function(){
            mainView.router.back({
                pageName: 'home',
                force: true
            });
        });
    }


console.log('reinittt');
$('#buttonSaveFavouritesSettings').hide();




});

myApp.onPageBeforeAnimation('settings', function (page)
{

	activateStateItemMenu(myApp.getCurrentView().activePage.name);
	trackPageGA("Configuraciones");


});

function GetTree(objs, par, lvl) {
    var str = '';

    if(typeof lvl == "undefined") lvl = 1;
    if(lvl > 3) return str;

    $.each(objs, function(k,ele) {
    console.log(ele);
    //console.log(elementTosend);

           if(ele.parent !== par) return;
           var children = GetTree(objs,  ele.id, lvl+1);

           str += '<div data-lvl="'+lvl+'" data-id="'+ele.id+'" data-type="'+ele.type+'" data-tosend="'+ele.elementTosend+'" data-favourite="'+ele.favourite+'" org-id="'+ele.org_id+'" data-checked="0" '+
           (lvl == 1 ? 'data-expandlevel="'+ele.expand_level+'" ' : '')
           +'data-enabled="'+ele.enabled+'" data-expanded="1" class="check">' +
           (children == '' ? '' : '<div class="check_arrow"><i class="fa fa-caret-right"></i></div>')
           + '<div class="custom_check"><i class="fa fa-check"></i><i class="fa fa-minus"></i></div>\
           <div class="check_title"><img src="'+ele.img+'" alt="">'+ ele.name +'</div>\
           <div class="check_container">'+children+'</div>\
           </div>';


           });

    return str;
}

function update_tree() {
    console.log(json);
    //json = JSON.stringify(json);
    //console.log(json);

    var json1 = $('#txt').text();
    console.log(json1);



    //json1 = convert_json(json1);
    console.log(json1);
    json = convert_json(json);
    console.log(json);
    var obj = JSON.parse(json);
    //json = json1;
    //var obj = json;
    console.log(obj);
    var htm = GetTree(obj, null);
    $('#container').html(htm);
    $.each($('.check[data-expandlevel]'), function(k,ele) {
           $ele = $(ele);
           $ele.find('.check').attr('data-expanded', '0');
           lvl = $ele.attr('data-expandlevel');
           if(lvl == 0) $ele.attr('data-expanded', '0');
           if(lvl>0)$ele.attr('data-enabled', '1');
           while(lvl > 0) {
           $ele.find('.check[data-lvl='+lvl+']').attr('data-expanded', '1');
           $ele.find('.check[data-lvl='+lvl+']').attr('data-enabled', '1');
           lvl--;
           }
    })

}

function fill_it() {
    $('#txt').text('[{"id":0,"name":"Hockey","level":1,"parent":null,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":1,"name":"Dutch League","level":2,"parent":0,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":2,"name":"Ajax","level":3,"parent":1,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":3,"name":"Amsterdam Sport","level":3,"parent":1,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":4,"name":"Argentinean League","level":2,"parent":0,"img": "img/img.png", "enabled":1,"expand_level":0},{"id":5,"name":"Boca","level":3,"parent":4,"img": "img/img.png", "enabled":1,"expand_level":0},{"id":6,"name":"River","level":3,"parent":4,"img": "img/img.png", "enabled":1,"expand_level":0},{"id":7,"name":"Football","level":1,"parent":null,"img": "img/img.png", "enabled":1,"expand_level":0},{"id":8,"name":"Premier League","level":2,"parent":7,"img": "https://image.freepik.com/free-icon/instagram-logo_318-84939.jpg", "enabled":1,"expand_level":0},{"id":9,"name":"Manchester United","level":3,"parent":8,"img": "https://image.freepik.com/free-icon/instagram-logo_318-84939.jpg", "enabled":1,"expand_level":0},{"id":10,"name":"Manchester City","level":3,"parent":8,"img": "https://image.freepik.com/free-icon/instagram-logo_318-84939.jpg", "enabled":1,"expand_level":0},{"id":11,"name":"Liverpool City","level":3,"parent":8,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":12,"name":"La Liga","level":2,"parent":7,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":13,"name":"Barcelona","level":3,"parent":12,"img": "img/logo.png", "enabled":1,"expand_level":0},{"id":14,"name":"Real Madrid","level":3,"parent":12,"img": "img/img.png", "enabled":1,"expand_level":0}]');


}
function clear() {
    $('#txt').text('');
}
$(document).ready(function() {


      $('#buttonSaveFavouritesSettings').hide();
      $('body').on('click', '.check_arrow', function() {
                   var x = $(this).closest('.check').attr('data-expanded');
                   if(parseInt(x) == 1){
                    $(this).closest('.check').attr('data-expanded', "0");
                   } else{
                    $(this).closest('.check').attr('data-expanded', "1");
                   }
      });

      $('body').on('click', '.custom_check', update_ele);

     // $('body').on('click', 'button#create', update_tree);
     // $('body').on('click', 'button#fill', fill_it);
      $('body').on('click', 'button#clear', clear);

      $('body').on('click','.check_title', function() {
                   $(this).closest('.check').find('.check_arrow:first').click()
      })

      //"save" button  
      $('#buttonSaveFavouritesSettings').on('click', function(){
        goBack = false;
        sendPreferences();
    });

    $('.lblNotLogged').text(lblNotLogged);



});


function update_ele() {
    //muestro el boton "Salvar"
    $('#buttonSaveFavouritesSettings').show();

    $ele = $(this);
    $ele_par = $ele.closest('.check');
    var state;
    $ele.find('.fa-minus').hide();
    if($ele_par.attr('data-checked') == "0") {
        state = "1";
        $ele_par.attr('data-checked', "1");
        $ele.find('.fa-check').show();
    } else {
        state = "0";
        $ele_par.attr('data-checked', "0");
        $ele.find('.fa-check').hide();
    }

    $.each($ele_par.find('.check'), function(k, ele) {

           $(ele).find('.custom_check:first .fa-minus').hide();
           $(ele).attr('data-checked', state);
           if(state == "1"){
           $(ele).find('.custom_check:first .fa-check').show();
           //console.log(ele);
           }else{
           $(ele).find('.custom_check:first .fa-check').hide();
           }

    });

    console.log($ele_par);
    //console.log($ele_par.attributes);
    update_parent($ele_par);


}


function convert_json(json) {
    console.log(json);
    //var jas = JSON.parse(json);
    var jas = json;
    console.log(jas);
    var curr_cnt = 0;
    var str = '[';
    $.each(jas, function(k, ele) {

           if(k == "deportes") {
               $.each(ele, function(k, ele2) {
                      str += '{"id":"'+curr_cnt+'", "org_id":"'+ele2.id+'", "name":"'+ele2.nombre+'", "parent":null, "img":"'+ele2.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'", "favourite":"'+ele2.preferenciaPrincipal+'", "expand_level": "'+ele2.showlvl+'"},';
                      curr_cnt++;
                      console.log(ele2);
                      console.log(ele2.enac);
                     // if(ele2.ENAC !== "undefined") {


                          if(ele2.tipoRoot == 3) {

                          var par = curr_cnt - 1;
                              if(ele2.hasOwnProperty('enac')){
                                  $.each(ele2.enac, function(k, ele3) {
                                  console.log(ele3);
                                         str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombreCorto+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "favourite":"'+ele3.preferenciaPrincipal+'", "enabled":"'+ele2.expand+'"},';
                                         curr_cnt++;
                                         console.log(ele3.categorias);
                                             if(ele3.categorias !== "undefined") {
                                             var inner_par = curr_cnt - 1;
                                             $.each(ele3.categorias, function(k, ele4) {
                                             console.log(ele4);
                                                    str += '{"id":"'+curr_cnt+'", "org_id":"'+ele4.id+'", "name":"'+ele4.nombre+'", "parent":"'+inner_par+'", "img":"'+ele4.imagenPrincipalMin+'", "elementTosend":"true", "favourite":"'+ele4.preferenciaPrincipal+'", "enabled":"'+ele2.expand+'"},';
                                                    curr_cnt++;
                                                    });

                                             }
                                  });
                              }
                              if(ele2.hasOwnProperty('categorias')){
                                  $.each(ele2.categorias, function(k, ele3) {
                                    console.log(ele3);
                                           str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "elementTosend":"true", "favourite":"'+ele3.preferenciaPrincipal+'", "enabled":"'+ele2.expand+'"},';
                                           curr_cnt++;
                                           console.log(str);

                                  });
                              }

                          }
                          if(ele2.tipoRoot == 2) {

                            var par = curr_cnt - 1;

                              $.each(ele2.categorias, function(k, ele3) {
                                console.log(ele3);
                                       str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "favourite":"'+ele3.preferenciaPrincipal+'", "elementTosend":"true", "enabled":"'+ele2.expand+'"},';
                                       curr_cnt++;
                                       console.log(str);

                              });

                          }
                          if(ele2.tipoRoot == 1) {
                          var par = curr_cnt - 1;
                            $.each(ele2.categorias, function(k, ele3) {
                              console.log(ele3);
                                     str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "favourite":"'+ele3.preferenciaPrincipal+'", "elementTosend":"true", "enabled":"'+ele2.expand+'"},';
                                     curr_cnt++;
                                     console.log(str);

                            });


                          }

               });
           }




           if(k == "actividades") {
           console.log("actividades");
           $.each(ele, function(k, ele2) {
                  str += '{"id":"'+curr_cnt+'", "org_id":"'+ele2.id+'", "name":"'+ele2.nombre+'", "parent":null, "img":"'+ele2.imagenPrincipalMin+'", "enabled":"0", "type": "activity", "favourite":"'+ele2.preferenciaPrincipal+'", "expand_level": "0"},';
                  curr_cnt++;
           });

           }

    });
    str = str.substr(0, str.length-1);

    str += ']';
    return str;
    console.log(str);
}

function update_parent(ele) {
    $parent = $(ele).parents('.check');
    if($parent.length <=0) return;
    $parent = $($parent[0]);
    //console.log($parent);
    $parent.find('.custom_check:first .fa-minus').show();

    $parent.find('.custom_check:first .fa-check').hide();
    $parent.attr('data-checked', "2");
    if($parent.find('.check[data-checked="1"]').length == $parent.find('.check').length) {
        $parent.attr('data-checked', "1");
        $parent.find('.custom_check:first .fa-minus').hide();
        $parent.find('.custom_check:first .fa-check').show();
    }
    if($parent.find('.check[data-checked="0"]').length == $parent.find('.check').length) {
        $parent.attr('data-checked', "0");
        $parent.find('.custom_check:first .fa-minus').hide();
        $parent.find('.custom_check:first .fa-check').hide();
    }
    //console.log($parent);
    update_parent($parent);

}

function sendPreferences() {
showLoadSpinnerWS();
//buscs los id de deportes
var busquedaDeportes = $('.check').filter('[data-checked="1"][data-tosend="true"]');
//console.log(busquedaDeportes);
//console.log(busqueda[0].[2]);
//console.log(busquedaDeportes[0].getAttribute("org-id"));
//console.log(busquedaDeportes.length);

var settingsToSend = {
    preferenciasPrincipales: {
        actividades: [0],
        deportesCategorias: [0]
    },
    preferenciasNotificacion: {
        actividades: [0],
        deportesCategorias: [0]
    }
};

var i;
//var sportsPreferenceCategories = [];
for (i = 0; i < busquedaDeportes.length; i++) {
    busquedaDeportes[i].getAttribute("org-id");
    settingsToSend.preferenciasPrincipales.deportesCategorias.push(busquedaDeportes[i].getAttribute("org-id"));
}
//console.log(sportsPreferenceCategories);

//busca los id de actividades
var busquedaActividades = $('.check').filter('[data-checked="1"][data-lvl="1"][data-type="activity"]');
console.log(busquedaActividades);

//var activitiesPreferenceCategories = [];
for (i = 0; i < busquedaActividades.length; i++) {
    busquedaActividades[i].getAttribute("org-id");
    settingsToSend.preferenciasPrincipales.actividades.push(busquedaActividades[i].getAttribute("org-id"));
}

//insert data in preferenciasNotificaciones array
for (i = 0; i < busquedaDeportes.length; i++) {
    busquedaDeportes[i].getAttribute("org-id");
    settingsToSend.preferenciasNotificacion.deportesCategorias.push(busquedaDeportes[i].getAttribute("org-id"));
}



console.log(settingsToSend);
var settingsToSendFinal = JSON.stringify(settingsToSend);
console.log(settingsToSendFinal);

	$.ajax({
	// URL del Web Service, en este ws no hace falta enviar datos, con el bearer identifica el usuario
    		url: getPathWS() + 'setPreferencias',
    		type: "POST",
    		data: settingsToSendFinal,
    		contentType: "application/json",
    		dataType: 'json',
    		timeout: timeOut,
    		success: function(response){
    			/*if(response.errorCode != 0)
    			{
    				hideLoadSpinnerWS();
    			    filterCodeErrorWS(response);
    			    $('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    			    return;
    			}
    			if(isAppUpdate(response.serverVersion) == false){
    				hideLoadSpinnerWS();
    				mainView.router.load({pageName: 'update'});
    				return;
    			}*/

    			hideLoadSpinnerWS();
    			console.log(response);
    			showMessageToast(messageSettingsNotificationsSuccessfullySaved);
    			$('#buttonSaveFavouritesSettings').hide();
                if( goBack == true){
                    mainView.router.back({
                            pageName: 'home',
                            force: true
                    });
                }

    		},
    		error: function (data, status, error){
    		    console.log(error);
    		    console.log(data);
    		    console.log(status);
    			showMessageToast(messageConexionError);
    			$('#iconHeaderFavouritesHome .icon').removeClass('animation-preloader');
    			hideLoadSpinnerWS();
    	   },
           beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + accessToken ); } //set tokenString before send
	});




}

var goBack = false;
function confirmChangesFavouritesSettings()
{
    console.log('confirmchangesfavourites');
	goBack = false;
	if($('#buttonSaveFavouritesSettings').is(':visible') == true){
		myApp.modal({
			title:  lblNameClub,
			text: messageConfirmChangesNotifications,
			buttons: [{
				text: lblButtonCancel,
				onClick: function() {
					mainView.router.back({
	    				pageName: 'home',
	    				force: true
	    			});
				}
				},{
				text: lblButtonOk,
				onClick: function() {
					goBack = true;
					sendPreferences();
				}}]});
	}
	else{
		mainView.router.back({
	    				pageName: 'home',
	    				force: true
	    		});
	}
}

