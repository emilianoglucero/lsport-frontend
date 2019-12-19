myApp.onPageInit('date', function (page)
{
    console.log('date page init');
});

/*var today = new Date();
var yesterday = new Date().setDate(today.getDate() - 1);

var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
 
var calendarDisabled = myApp.calendar({
    input: '#calendar-date-booking',
    dateFormat: 'M dd yyyy',
    disabled: {
      from: new Date(1900, 1, 1),
      to: yesterday
    }
});*/
 

var calendarDefault = myApp.calendar({
  input: '#calendar-default',
});     

