var db = null;

function id(element) {
    return document.getElementById(element);
}

$( function() {
    $("#datepicker").datetimepicker({
	controlType: 'select',
	oneLine: true,
	dateFormat: 'MM dd, yy ',
	timeFormat: 'HH:mm:ss'
	});
	$('#datepicker').focus(function() {
  		this.blur();
	});
});


function init(){
    
   	id("LoadDateSelector").addEventListener("click", function(){
       gotoDateSelector();
   	});
    
   	id("ShowNotification").addEventListener("click", function(){
       NotifyDateHour();
   	}); 
	
	id("LoadsqlLite").addEventListener("click", function(){
       	db.executeSql('SELECT * FROM Notify', [], function(rs) {
			alert('******* Rows number (expected to be 2): ' + rs.rows.length);
			console.log(JSON.stringify(rs));
		}, function(error) {
			console.log('SELECT SQL statement ERROR: ' + error.message);
		});
   	});
   
	db = window.sqlitePlugin.openDatabase({name: 'db_notify.db', location: 'default'});
	db.sqlBatch([
		'DROP TABLE Notify',
		'CREATE TABLE IF NOT EXISTS Notify (date, event)',
		[ 'INSERT INTO Notify VALUES (?,?)', ['12/12/2012', 'Dinner'] ],
		[ 'INSERT INTO Notify VALUES (?,?)', ['114/12/2012', 'Supper'] ],
	], function() {
			alert('Populated database OK');
		}, function(error) {
			console.log('SQL batch ERROR: ' + error.message);
	});
}

function gotoDateSelector(){
    $.mobile.navigate("#pagetwo", {info:"info goes here"});
}


function NotifyDateHour(){
	var stringdatetime = document.getElementById("datepicker").value;;
	var notifDate = new Date(stringdatetime);
	//alert(notifDate);
	cordova.plugins.notification.local.schedule({
		title: 'D/T Notification',
		text: 'Notification launched at' + stringdatetime,
		trigger: { 
			at: notifDate
		}
	}); 
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


