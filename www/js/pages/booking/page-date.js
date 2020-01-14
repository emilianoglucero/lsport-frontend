myApp.onPageInit('date', function (page)
{
    console.log('date page init');
});


  
$$(document).on('DOMContentLoaded', function() {

  var today = new Date();
  var yesterday = new Date().setDate(today.getDate() - 1);
  
  var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
   
  var calendarDisabled = myApp.calendar({
      input: '#calendar-date-booking',
      dateFormat: 'dd-mm-yyyy',
      disabled: {
        from: new Date(1900, 1, 1),
        to: yesterday
      }
  });


 
  var pickerDescribe = myApp.picker({
    input: '#picker-hour',
    rotateEffect: true,
    cols: [
        {
            textAlign: 'left',
            values: ('00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23').split(' ')
        },
        // Divider
        {
            divider: true,
            content: ':'
        },
        {
            values: ('00 30').split(' ')
        },
    ]
  });                                




});

function serviceAvailable() {
    var date = document.getElementById('calendar-date-booking').value.split('-');
    var hour = document.getElementById('picker-hour').value;

   
    var hourFinal = hour.split(" ").join(":");
    console.log(date);
    var dateFinal = date[1] + '-' + date[0] + '-' + date[2];

    console.log(date);
    console.log(hour);
    console.log(hourFinal);

    console.log(dateFinal);
}
  

