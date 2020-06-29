/* 
logic to search for services availables


http://172.105.156.64/?rest_route=/salon/api/v1/availability/services/primary
with date, time

output:
{
    "status": "OK",
    "services": [
        {
            "service_id": 15,
            "service_name": "Cancha de Tenis 1",
            "available": false,
            "selected": false,
            "error": "The service for 12:00 is currently full"
        },
        {
            "service_id": 17,
            "service_name": "Cancha de Tenis 2",
            "available": true,
            "selected": false,
            "error": ""
        },
        {
            "service_id": 19,
            "service_name": "Cancha de Tenis 1 - DOBLES -",
            "available": true,
            "selected": false,
            "error": ""
        },
        {
            "service_id": 21,
            "service_name": "Cancha de Tenis 2 – DOBLES –",
            "available": true,
            "selected": false,
            "error": ""
        }
    ]
}

check:
recorro el json y empiezo a llenar mi matriz
if available: false
    lo incluyo en servicios a no mostrar junto con su par inverso (singles o dobles)

if available: true (significa que puede que no haya reservado nadie o alguien reservado single o dobles)
    tengo que hacer la segunda llamada    
    http://172.105.156.64/?rest_route=/salon/api/v1/bookings
    with date 
    
    filtrar los resultados by time

    if hay un item id = service_id 
        set to true (hay una reserva ya)
            if ese id es de un doble {
                muestro el nombre de la persona que reservó
                y sumo 1
                al final deberia acumular cuantas reservas hay ese dia, listarlas
                y restarle 4 para mostrar los lugares disponibles

            } else {
                es un single
                muestro el nombre de la persona que reservó
                y que queda 1 lugar disponible
            }
    else {
        no hay una reserva, sos el primero
    }     

https://stackoverflow.com/questions/3559070/are-there-dictionaries-in-javascript-like-python
*/
