

//$(document).ready(function(){



//});

myApp.onPageInit('user', function (page)
{

    
});

myApp.onPageBeforeAnimation('user', function (page)
{
    //document.getElementById("user-profile-name").placeholder = userFullName;
});

function logOutUser() {

        var textMessage = 'Estas seguro que queres cerrar sesion en este dispositivo?';
        myApp.confirm(textMessage, function () {

                firebase.auth().signOut();
                usedPhoneNumber = '';
                smsCode = '';
                //vaciar el input smscode y setear el tiempo que quedo corriendo a 0
                $("#smscode").val('');
                sec = 0;
                showLoadSpinnerWS();
                setTimeout("hideLoadSpinnerWS()", 1000);
                window.location.reload(true);

        });

}






function GetTree(objs, par, lvl) {
    var str = '';

    if(typeof lvl == "undefined") lvl = 1;
    if(lvl > 3) return str;

    $.each(objs, function(k,ele) {
    console.log(ele);

           if(ele.parent !== par) return;
           var children = GetTree(objs,  ele.id, lvl+1);

           str += '<div data-lvl="'+lvl+'" data-id="'+ele.id+'" data-type="'+ele.type+'" org-id="'+ele.org_id+'" data-checked="0" '+
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
    var json = {
                       "deportes": [
                                    {
                                    "id": 8,
                                    "descripcion": "fútbol",
                                    "detalle": "fútbol",
                                    "orden": 0,
                                    "nombre": "Fútbol",
                                    "nombreCorto": "Fut",
                                    "imagenPrincipal": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_1000x600xrecortar.png?1517945719",
                                    "imagenSecundaria": "",
                                    "imagenPrincipalMin": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_160x100xrecortar.png?1517945719",
                                    "imagenSecundariaMin": "",
                                    "tipoObjeto": "deporte",
                                    "showlvl": "2",
                                    "expand": "2",
                                    "tipoCategoria": "3",
                                    "ENAC": [
                                             {
                                             "id": 2,
                                             "descripcion": "",
                                             "lugar": "",
                                             "horarioTexto": "",
                                             "precio": "",
                                             "correoContacto": "",
                                             "orden": 0,
                                             "nombre": "AFA",
                                             "nombreCorto": "AFA",
                                             "nombreCompleto": "Asociacion de Futbol Argentino",
                                             "tipoObjeto": "enac",
                                             "preferenciaPrincipal": 1,
                                             "preferenciaNotificacion": 0,
                                             "categorias": [
                                                            {
                                                            "id": 18,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "AFA - Primera",
                                                            "nombreCorto": "AFA - 1ra",
                                                            "nombreCompleto": "AFA - Primera",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 1,
                                                            "preferenciaNotificacion": 0
                                                            },
                                                            {
                                                            "id": 19,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "AFA - Reserva",
                                                            "nombreCorto": "AFA - res",
                                                            "nombreCompleto": "AFA - Reserva",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 0,
                                                            "preferenciaNotificacion": 0
                                                            }
                                                            ]
                                             },
                                             {
                                             "id": 3,
                                             "descripcion": "",
                                             "lugar": "",
                                             "horarioTexto": "",
                                             "precio": "",
                                             "correoContacto": "",
                                             "orden": 0,
                                             "nombre": "LCF",
                                             "nombreCorto": "LCF",
                                             "nombreCompleto": "Liga Cañadense de Futbol",
                                             "tipoObjeto": "enac",
                                             "preferenciaPrincipal": 1,
                                             "preferenciaNotificacion": 0,
                                             "categorias": [
                                                            {
                                                            "id": 20,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "LCF - Primera",
                                                            "nombreCorto": "LCF - 1ra",
                                                            "nombreCompleto": "AFA - Primera",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 1,
                                                            "preferenciaNotificacion": 0
                                                            },
                                                            {
                                                            "id": 21,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "LCF - Reserva",
                                                            "nombreCorto": "LCF - res",
                                                            "nombreCompleto": "AFA - Reserva",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 0,
                                                            "preferenciaNotificacion": 0
                                                            }
                                                            ]
                                             }
                                    ]
                                    },
                                    {
                                    "id": 9,
                                    "descripcion": "Basketball",
                                    "detalle": "Basketball",
                                    "orden": 0,
                                    "nombre": "Basketball",
                                    "nombreCorto": "Bsk",
                                    "imagenPrincipal": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_1000x600xrecortar.png?1517945719",
                                    "imagenSecundaria": "",
                                    "imagenPrincipalMin": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_160x100xrecortar.png?1517945719",
                                    "imagenSecundariaMin": "",
                                    "tipoObjeto": "deporte",
                                    "showlvl": "0",
                                    "expand": "0",
                                    "tipoCategoria": "1",
                                    "ENAC": [
                                             {
                                             "id": 4,
                                             "descripcion": "",
                                             "lugar": "",
                                             "horarioTexto": "",
                                             "precio": "",
                                             "correoContacto": "",
                                             "orden": 0,
                                             "nombre": "Liga Default",
                                             "nombreCorto": "Liga Default",
                                             "nombreCompleto": "Liga Default",
                                             "tipoObjeto": "enac",
                                             "preferenciaPrincipal": 1,
                                             "preferenciaNotificacion": 0,
                                             "categorias": [
                                                            {
                                                            "id": 19,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "Categoria Default",
                                                            "nombreCorto": "Categoria Default",
                                                            "nombreCompleto": "Categoria Default",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 1,
                                                            "preferenciaNotificacion": 0
                                                            }
                                             ]
                                             }
                                    ]
                                    },
                                    {
                                    "id": 9,
                                    "descripcion": "Rugby",
                                    "detalle": "Rugby",
                                    "orden": 0,
                                    "nombre": "Rugby",
                                    "nombreCorto": "Rugby",
                                    "imagenPrincipal": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_1000x600xrecortar.png?1517945719",
                                    "imagenSecundaria": "",
                                    "imagenPrincipalMin": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_160x100xrecortar.png?1517945719",
                                    "imagenSecundariaMin": "",
                                    "tipoObjeto": "deporte",
                                    "showlvl": "0",
                                    "expand": "0",
                                    "tipoCategoria": "1",
                                    "ENAC": [
                                             {
                                             "id": 4,
                                             "descripcion": "",
                                             "lugar": "",
                                             "horarioTexto": "",
                                             "precio": "",
                                             "correoContacto": "",
                                             "orden": 0,
                                             "nombre": "Liga Default",
                                             "nombreCorto": "Liga Default",
                                             "nombreCompleto": "Liga Default",
                                             "tipoObjeto": "enac",
                                             "preferenciaPrincipal": 1,
                                             "preferenciaNotificacion": 0,
                                             "categorias": [
                                                            {
                                                            "id": 19,
                                                            "descripcion": "",
                                                            "lugar": "",
                                                            "horarioTexto": "",
                                                            "precio": "",
                                                            "correoContacto": "",
                                                            "orden": 0,
                                                            "nombre": "Categoria Default",
                                                            "nombreCorto": "Categoria Default",
                                                            "nombreCompleto": "Categoria Default",
                                                            "tipoObjeto": "deporte-categoria",
                                                            "preferenciaPrincipal": 1,
                                                            "preferenciaNotificacion": 0
                                                            }
                                                            ]
                                             }
                                             ]
                                    },
                                   {
                                    "id": 9,
                                    "descripcion": "Basketball2",
                                    "detalle": "Basketball2",
                                    "orden": 0,
                                    "nombre": "Basketball2",
                                    "nombreCorto": "Bsk",
                                    "imagenPrincipal": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_1000x600xrecortar.png?1517945719",
                                    "imagenSecundaria": "",
                                    "imagenPrincipalMin": "http://clubes.lenguajefutbol.com/img/archivos/deporte/deporte-imagenPrincipal-8_160x100xrecortar.png?1517945719",
                                    "imagenSecundariaMin": "",
                                    "tipoObjeto": "deporte",
                                    "showlvl": "1",
                                    "expand": "1",
                                    "tipoCategoria": "2",
                                     "categorias": [
                                                    {
                                                    "id": 19,
                                                    "descripcion": "",
                                                    "lugar": "",
                                                    "horarioTexto": "",
                                                    "precio": "",
                                                    "correoContacto": "",
                                                    "orden": 0,
                                                    "nombre": "Futbol 1era",
                                                    "nombreCorto": "Futbol 1era",
                                                    "nombreCompleto": "Futbol 1era",
                                                    "tipoObjeto": "deporte-categoria",
                                                    "preferenciaPrincipal": 1,
                                                    "preferenciaNotificacion": 0
                                                    },
                                                   {
                                                    "id": 19,
                                                    "descripcion": "",
                                                    "lugar": "",
                                                    "horarioTexto": "",
                                                    "precio": "",
                                                    "correoContacto": "",
                                                    "orden": 0,
                                                    "nombre": "Futbol 4ta",
                                                    "nombreCorto": "Futbol 4ta",
                                                    "nombreCompleto": "Futbol 4ta",
                                                    "tipoObjeto": "deporte-categoria",
                                                    "preferenciaPrincipal": 1,
                                                    "preferenciaNotificacion": 0
                                                    }
                                     ]

                                    }
                                    ],
                       "actividades": [
                                       {
                                       "id": 2,
                                       "nombre": "Yoga",
                                       "nombreCorto": "Yoga",
                                       "imagenPrincipal": "",
                                       "imagenSecundaria": "",
                                       "lugarDesarrollo": "Club",
                                       "descripcion": "Yoga Descripcion corta",
                                       "detalle": "Yoga Detalle",
                                       "horarioTexto": "Lunes a Viernes",
                                       "precio": "",
                                       "imagenPrincipalMin": "",
                                       "imagenSecundariaMin": "",
                                       "tipoObjeto": "club-actividad",
                                       "preferenciaPrincipal": 1,
                                       "preferenciaNotificacion": 0
                                       },
                                       {
                                       "id": 3,
                                       "nombre": "Pilates",
                                       "nombreCorto": "Pilates",
                                       "imagenPrincipal": "",
                                       "imagenSecundaria": "",
                                       "lugarDesarrollo": "Club",
                                       "descripcion": "Descripcion corta de Pilates",
                                       "detalle": "Detalle de Pilates",
                                       "horarioTexto": "Sabados de 20 a 21",
                                       "precio": "50",
                                       "imagenPrincipalMin": "",
                                       "imagenSecundariaMin": "",
                                       "tipoObjeto": "club-actividad",
                                       "preferenciaPrincipal": 0,
                                       "preferenciaNotificacion": 0
                                       }
                                       ]
  };
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



                  $('body').on('click', '.check_arrow', function() {
                               var x = $(this).closest('.check').attr('data-expanded');
                               if(parseInt(x) == 1){
                                $(this).closest('.check').attr('data-expanded', "0");
                               } else{
                                $(this).closest('.check').attr('data-expanded', "1");
                               }
                  });

                  $('body').on('click', '.custom_check', update_ele);

                  $('body').on('click', 'button#create', update_tree);
                  $('body').on('click', 'button#fill', fill_it);
                  $('body').on('click', 'button#clear', clear);

                  $('body').on('click','.check_title', function() {
                               $(this).closest('.check').find('.check_arrow:first').click()
                  })



});


function update_ele() {
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
                      str += '{"id":"'+curr_cnt+'", "org_id":"'+ele2.id+'", "name":"'+ele2.nombre+'", "parent":null, "img":"'+ele2.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'", "expand_level": "'+ele2.showlvl+'"},';
                      curr_cnt++;
                      console.log(ele2);
                      console.log(ele2.ENAC);
                     // if(ele2.ENAC !== "undefined") {


                          if(ele2.tipoCategoria == 3) {

                          var par = curr_cnt - 1;

                              $.each(ele2.ENAC, function(k, ele3) {
                              console.log(ele3);
                                     str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'"},';
                                     curr_cnt++;
                                     console.log(ele3.categorias);
                                         if(ele3.categorias !== "undefined") {
                                         var inner_par = curr_cnt - 1;
                                         $.each(ele3.categorias, function(k, ele4) {
                                         console.log(ele4);
                                                str += '{"id":"'+curr_cnt+'", "org_id":"'+ele4.id+'", "name":"'+ele4.nombre+'", "parent":"'+inner_par+'", "img":"'+ele4.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'"},';
                                                curr_cnt++;
                                                });

                                         }
                              });

                          }
                          if(ele2.tipoCategoria == 1) {

                            var par = curr_cnt - 1;

                              $.each(ele2.ENAC, function(k, ele3) {
                              console.log(ele3);
                                     str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'"},';
                                     curr_cnt++;
                                     console.log(ele3.categorias);
                                         if(ele3.categorias !== "undefined") {
                                         var inner_par = curr_cnt - 1;
                                         $.each(ele3.categorias, function(k, ele4) {
                                         console.log(ele4);
                                                str += '{"id":"'+curr_cnt+'", "org_id":"'+ele4.id+'", "name":"'+ele4.nombre+'", "parent":"'+inner_par+'", "img":"'+ele4.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'"},';
                                                curr_cnt++;
                                                });

                                         }
                              });

                          }
                          if(ele2.tipoCategoria == 2) {
                          var par = curr_cnt - 1;
                            $.each(ele2.categorias, function(k, ele3) {
                              console.log(ele3);
                                     str += '{"id":"'+curr_cnt+'", "org_id":"'+ele3.id+'", "name":"'+ele3.nombre+'", "parent":"'+par+'", "img":"'+ele3.imagenPrincipalMin+'", "enabled":"'+ele2.expand+'"},';
                                     curr_cnt++;
                                     console.log(str);

                            });


                          }

               });
           }




           if(k == "actividades") {
           console.log("actividades");
           $.each(ele, function(k, ele2) {
                  str += '{"id":"'+curr_cnt+'", "org_id":"'+ele2.id+'", "name":"'+ele2.nombre+'", "parent":null, "img":"'+ele2.imagenPrincipalMin+'", "enabled":"0", "type": "activity", "expand_level": "0"},';
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
//console.log($parent);
var busquedaDeportes = $('.check').filter('[data-checked="1"][data-lvl="3"]');
console.log(busquedaDeportes);
//console.log(busqueda[0].[2]);
console.log(busquedaDeportes[0].getAttribute("org-id"));
console.log(busquedaDeportes.length);
var i;
var sportsCategories = [];
for (i = 0; i < busquedaDeportes.length; i++) {
    busquedaDeportes[i].getAttribute("org-id");
    sportsCategories.push(busquedaDeportes[i].getAttribute("org-id"));
}
console.log(sportsCategories);
var busquedaActividades = $('.check').filter('[data-checked="1"][data-lvl="1"][data-type="activity"]');
console.log(busquedaActividades);

var activitiesCategories = [];
for (i = 0; i < busquedaActividades.length; i++) {
    busquedaActividades[i].getAttribute("org-id");
    activitiesCategories.push(busquedaActividades[i].getAttribute("org-id"));
}
console.log(activitiesCategories);

//$test = $(this);
//result = $test.filter('.check[data-checked="1"]');
//console.log(result);


}

//sendPreferences();

