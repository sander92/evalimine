////teeb mingi nupu vist
//(function(d, s, id) {
//	  var js, fjs = d.getElementsByTagName(s)[0];
//	  if (d.getElementById(id)) return;
//	  js = d.createElement(s); js.id = id;
//	  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=404187206346181";
//	  fjs.parentNode.insertBefore(js, fjs);
//	}
//(document, 'script', 'facebook-jssdk'));

////initsialiseering, ma ei tea mille jaoks voi kas seda praegu vajagi on
window.fbAsyncInit = function() {
	  
    FB.init({
      appId      : '404187206346181', // App ID
      channelUrl : 'http://netivalimised.appspot.com/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    

	//logina staatus
	FB.getLoginStatus(function(response) {
	    if (response.status === 'connected') {
	        // User logged into FB and authorized
	    	window.kasutajaID=response.authResponse.userID; //votab kasutaja ID
	        testAPI();
	        //document.getElementById('fb-logout').style.display = 'block';
	        document.getElementById("loginupp").onclick =function(){logout()};
	        document.getElementById("loginupp").innerHTML="V&#228;lju";
	        a = location.hash;
	    	a = a.replace("#", "");
	    	if (a == "Vote" ||a == "Kandidaadid") {
				$("#sees").show();
	    	}
//	        document.getElementById("kasutajainfo").innerHTML="Olete sisse logitud.";
//	        document.getElementById("kasutajainfo").appendChild(document.createElement("br"));
//	        document.getElementById("kasutajainfo").innerHTML="Kasutaja ID on: " + response.authResponse.userID;;
	    } else if (response.status === 'not_authorized') {
	        // User logged into FB but not authorized
	        //login();
	        document.getElementById("loginupp").onclick = function(){login()};
//	        document.getElementById("loginupp").innerHTML="Sisene"
	        a = location.hash;
	    	a = a.replace("#", "");
	    	if (a == "Vote" ||a == "Kandidaadid") {
				$("#sees").hide();
	    	}
	    } else {
	        // User not logged into FB
	        //login();
	        //document.getElementById('fb-logout').style.display = 'block';
	        document.getElementById("loginupp").onclick = function(){login()};
//	        document.getElementById("loginupp").innerHTML="Sisene";
	        a = location.hash;
	    	a = a.replace("#", "");
	    	if (a == "Vote" ||a == "Kandidaadid") {
				$("#sees").hide();
	    	}
	    }
	});
}

//ysna kasulik funktsioon, ei tea milleks...

function testAPI() {
	    console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me', function(response) {
	        console.log('Good to see you, ' + response.name + '.');
	    });
	}

//login funks
function login() {
	    FB.login(function(response) {
	        if (response.authResponse) {
	            // connected
	            testAPI();
	            document.getElementById('loginupp').innerHTML = 'V&#228;lju';
	            document.getElementById("loginupp").onclick = function(){logout()};
		        document.getElementById("kasutajainfo").innerHTML="Olete sisse logitud.<br>Kasutaja ID on: " + window.kasutajaID;
		        a = location.hash;
		    	a = a.replace("#", "");
		    	if (a == "Vote" ||a == "Kandidaadid") {
					$("#sees").show();
		    	}
	        } else {
	            // cancelled
	        }
	        
	    });
	}

//logout funks
function logout() {
	    FB.logout(function(response) {
	        console.log('User is now logged out');
	        document.getElementById('loginupp').innerHTML = 'Sisene';
	        document.getElementById("loginupp").onclick = function(){login()};
	        document.getElementById("kasutajainfo").innerHTML="Palun logige sisse.";
	        a = location.hash;
	    	a = a.replace("#", "");
	    	if (a == "Vote" ||a == "Kandidaadid") {
				$("#sees").hide();
	    	}
	    });
	}

// Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));