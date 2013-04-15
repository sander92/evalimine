
function onOpened() {
	connected = true;
	//alert('connected to server'); 
};

function onMessage(m) {
	data = JSON.parse(m.data);
	//alert(data);
	if($('body').attr('class') == 'Statistika')
		createStatTable(data, 'candidate');
};

function getToken(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/getToken', false);
	xhr.send(null);
	if (xhr.status == 200) {
		return(xhr.responseText);
	} 
};

function openChannel(token){
	var channel = new goog.appengine.Channel(token);
	var handler = {
		'onopen': onOpened,
		'onmessage': onMessage,
		'onerror': function() {},
		'onclose': function() {}
	};
	var socket = channel.open(handler);
};

 function initialize() {
	 var token = getToken();
	 if ( token != null&& token != 'error') {
		//alert(token);
		//strip newline from returned token
		 var cleantoken =token.replace("\n", "", "g");
		 openChannel(cleantoken);
	 } 
	 else {
	 alert('Error fetching token');
	 }
 };