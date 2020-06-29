//var userInfo;
var userFirstName;
var userLastName;
var userEmail;
var userID;

var userBookingsList;

$(document).ready(function(){

    $('#lblTitleUser').text(lblTitleUser);
    $('#lblNameUser').text(lblNameUser);
    $('#lblLogoutButton').text(lblLogoutButton);
    $('#lblMyBookingsButton').text(lblMyBookingsButton);

    $('.lblNotLogged').text(lblNotLogged);

});

myApp.onPageInit('user', function (page)
{
    /*var user = firebase.auth().currentUser;
    //console.log(user);
    //if (user) {
        $("#notLoggedUser").hide();
        $("#loggedUser").show();
    } else {
        $("#loggedUser").hide();
        $("#notLoggedUser").show();
    }*/
    $("#notLoggedUser").hide();
    console.log(email);

    getUserBasicInfo();


});
myApp.onPageReinit('user', function (page)
{
    /*var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
        $("#notLoggedUser").hide();
        $("#loggedUser").show();
    } else {
        $("#loggedUser").hide();
        $("#notLoggedUser").show();
    }*/
    $("#notLoggedUser").hide();
    //getUserBasicInfo();


});

myApp.onPageBeforeAnimation('user', function (page)
{

});

function getUserBasicInfo () {
    //load user info and bookings
    showLoadSpinnerWS();
    $.ajax({
        // URL del Web Service
            url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/customers",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "search": email
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                
                $.each( response.items, function( i, item ){
                    console.log(item);
                    if (item.email == email) {
                        console.log("its the same");
                        userFirstName = item.first_name;
                        userLastName = item.last_name;
                        userEmail = item.email;
                        userID = item.id;

                    } else {
                        console.log("no se encontro el usuario");
                    }

                   
                    
                });

                document.getElementById("user-profile-name").placeholder = userFirstName+" "+userLastName;
                //document.getElementById("user-profile-lastname").placeholder = userLastName;
                document.getElementById("user-profile-email").placeholder = email;

                

            },
            error: function (data, status, error){
                console.log(error, data, status);
            }
   
            
    });
    hideLoadSpinnerWS();
}

/*function getAllMyBookingInformation() {

    $.ajax({
        // URL del Web Service
            url: "https://demoreservas.lenguajesport.com/?rest_route=/salon/api/v1/bookings",
            method: 'GET',
            dataType: "json",
            contentType: "application/json",
            headers: {
                "Access-Token": tokenBooking
            },
            data: { 
                "customers": userID,
                "orderby": "date_time"
            },
            timeout: timeOut,
            success: function(response){
                console.log(response);
                userBookingsList = response.items;
                
                //builderUserBookings(userBookingsList);

            },
            error: function (data, status, error){
                console.log(erro, data, status);
            }

            
    });
}*/

function myBookingsPage() {
    console.log("my bookings");
    mainView.router.load({ pageName: "activitydetails" });
}

function logOutUser() {

        var textMessage = 'Estas seguro que queres cerrar sesion en este dispositivo?';
        myApp.confirm(textMessage, function () {

                /*firebase.auth().signOut();
                usedPhoneNumber = '';
                smsCode = '';
                //vaciar el input smscode y setear el tiempo que quedo corriendo a 0
                $("#smscode").val('');
                sec = 0;
                showLoadSpinnerWS();
                setTimeout("hideLoadSpinnerWS()", 1000);
                window.location.reload(true);*/

                $.ajax({
                    // URL del Web Service
                        url: "https://demoreservas.lenguajesport.com/wpfrontend/wp-json/salon/api/v1/logout",
                        method: 'POST',
                        dataType: "json",
                        contentType: "application/json",
                        headers: {
                            "Access-Token": tokenBooking
                        },
                        timeout: timeOut,
                        success: function(response){
                            console.log(response);
                            showLoadSpinnerWS();
                            setTimeout("hideLoadSpinnerWS()", 1000);
                            window.location.reload(true);
                        },
                        error: function (data, status, error){
            
                        }
               
                        
                });

        });

}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

/**
* Create a PDF file according to its database64 content only.
* 
* @param folderpath {String} The folder where the file will be created
* @param filename {String} The name of the file that will be created
* @param content {Base64 String} Important : The content can't contain the following string (data:application/pdf;base64). Only the base64 string is expected.
*/
function savebase64AsPDF(folderpath,filename,content,contentType){
// Convert the base64 string in a Blob
var DataBlob = b64toBlob(content,contentType);

console.log("Starting to write the file :3");

window.resolveLocalFileSystemURL(folderpath, function(dir) {
    console.log("Access to the directory granted succesfully");
    dir.getFile(filename, {create:true}, function(file) {
        console.log("File created succesfully.");
        file.createWriter(function(fileWriter) {
            console.log("Writing content to file");
            fileWriter.write(DataBlob);
        }, function(){
            alert('Unable to save file in path '+ folderpath);
        });
    });
});
}

function toPDF() {

    //function to download the pdf file
    console.log('to pdf');

    /*var options = {
    documentSize: 'A4',
    type: 'base64'
    }

    pdf.fromData('<html><h1>Hello World</h1></html>', options)
    .then((base64)=>'ok')   // it will
    .catch((err)=>console.err(err))*/

    //functin to download the pdf file direct to the user system folder
    var idBooking = '123456';
    var fileName = idBooking + '.pdf';
    console.log(fileName);
    
    var options = {
        documentSize: 'A4',
        type: 'base64'                
    };

    var pdfhtml = '<html><body style="font-size:120%">This is the pdf content</body></html>';
            
    pdf.fromData(pdfhtml , options)
        .then(function(base64){               
            // To define the type of the Blob
            var contentType = "application/pdf";
                
            // if cordova.file is not available use instead :
            // var folderpath = "file:///storage/emulated/0/Download/";
            //var folderpath = 'file:///android_asset/www/assets/';
            //var folderpath = cordova.file.dataDirectory;
            var folderpath = 'file:///storage/emulated/0/Download'
            //var folderpath = cordova.file.externalRootDirectory //you can select other folders
            savebase64AsPDF(folderpath, fileName, base64, contentType);          
        })  
        .catch((err)=>console.err(err));
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

//var url = cordova.file.externalRootDirectory + '/test.pdf';
//var url = 'file:///android_asset/www/assets/'
//var url = cordova.file.cacheDirectory;
//var url = 'assets/test.pdf';
//var url = cordova.file.dataDirectory;
//var url = 'file:///storage/emulated/0/Download/test.pdf';

var options = {
	title: 'pdf viewwwer',
	documentView : {
		closeLabel : 'cerrar'
	},
	navigationView : {
		closeLabel : 'cerrarr'
	},
	email : {
		enabled : false
	},
	print : {
		enabled : false
	},
	openWith : {
		enabled : false
	},
	bookmarks : {
		enabled : false
	},
	search : {
		enabled : false
	},
	autoClose: {
		onPause : false
	}
}

var contentType = 'application/pdf';
var mimeType = 'application/pdf'

function readFile() {

    //cordova.plugins.SitewaertsDocumentViewer.canViewDocument(
      //  url, contentType, options, onPossible, onMissingApp, onImpossible, onError);

    cordova.plugins.SitewaertsDocumentViewer.viewDocument(
        urlAndroid, mimeType, options, onShow, onClose, onMissingApp, onError);    
}

function onPossible(){
    window.console.log('document can be shown');
    //e.g. track document usage
  }

function onMissingApp(appId, installer)
{
    if(confirm("Do you want to install the free PDF Viewer App "
            + appId + " for Android?"))
    {
        installer();
    }
}

function onImpossible(){
    window.console.log('document cannot be shown');
    //e.g. track document usage
  }

  function onError(error){
    window.console.log(error);
    alert("Sorry! Cannot show document.");
  }

  function onShow(){
    window.console.log('document shown');
    //e.g. track document usage
  }  
  function onClose(){
    window.console.log('document closed');
    //e.g. remove temp files
  }

//save the pdf in dowload and open the booking
  function openBooking() {
    console.log(platform);

    //functin to download the pdf file direct to the user system folder
    var idBooking = '123456';
    var fileName = idBooking + '.pdf';
    console.log(fileName);
    
    var options = {
        documentSize: 'A4',
        type: 'base64'                
    };

    var pdfhtml = '<html><body style="font-size:120%">This is the pdf content</body></html>';
    
    if (platform == 'Android') {
    console.log('android');
        var url = 'file:///storage/emulated/0/Download/123456.pdf';

        pdf.fromData(pdfhtml , options)
            .then(function(base64){               
                // To define the type of the Blob
                var contentType = "application/pdf";
                    
                // if cordova.file is not available use instead :
                // var folderpath = "file:///storage/emulated/0/Download/";
                //var folderpath = 'file:///android_asset/www/assets/';
                //var folderpath = cordova.file.dataDirectory;
                var folderpath = 'file:///storage/emulated/0/Download'
                //var folderpath = cordova.file.externalRootDirectory //you can select other folders
                savebase64AsPDF(folderpath, fileName, base64, contentType);          
            })  
            .catch((err)=>console.err(err));

            //open the pdf already saved
        cordova.plugins.SitewaertsDocumentViewer.viewDocument(
        url, mimeType, options, onShow, onClose, onMissingApp, onError);
    } else {
    console.log('ios');
        var url = cordova.file.documentsDirectory + '/123456.pdf';
        pdf.fromData(pdfhtml , options)
            .then(function(base64){               
                // To define the type of the Blob
                var contentType = "application/pdf";
                    
                // if cordova.file is not available use instead :
                // var folderpath = "file:///storage/emulated/0/Download/";
                //var folderpath = 'file:///android_asset/www/assets/';
                var folderpath = cordova.file.documentsDirectory;
                //var folderpath = 'file:///storage/emulated/0/Download'
                //var folderpath = cordova.file.externalRootDirectory //you can select other folders
                savebase64AsPDF(folderpath, fileName, base64, contentType);          
            })  
            .catch((err)=>console.err(err));

            //open the pdf already saved
        cordova.plugins.SitewaertsDocumentViewer.viewDocument(
        url, mimeType, options, onShow, onClose, onMissingApp, onError);

    }   

    
  }




