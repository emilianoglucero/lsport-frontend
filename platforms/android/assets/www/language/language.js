function changeLanguage(language)
{
	jQuery.i18n.properties({
	    name:'Messages', 	//Nombre del fichero
	    path:'language/', 	//Carpeta donde la incluimos
	    mode:'both', 
	    language:language,  	//Lenguaje, hablaremos del el abajo
	    callback: function() 
	    {
	        //Callback, podemos ejecutar código luego de inicializar el plugin.
	    }
	});	
}

changeLanguage('es');