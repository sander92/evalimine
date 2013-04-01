var data="Pole h‰‰letanud";
function setData(d){
	data=d;
}

function getData(){
	var myVarD=setInterval(function(){
		if(data!="Pole h‰‰letanud"){
			$("#VotedFor").innerHTML="Kodanik x";//panna waiter ka
			//data="Kodanik x";//tuleks tegelt ajaksist
			clearTimeout(myVarD);
			alert("VoteData: "+data.toString());
			//return ldata;
		}
	},500)

setTimeout(function(){
	clearTimeout(myVarD);
	alert("minu andmed timeouti sees");
	
},5000);
	
	//return data;
}

function getVoted(voterID){
	$.ajax({
				type : 'GET',
				url: '/UserdataServlet',
				 data: { 
        		 "voterID": voterID
   				},
				dataType : 'json',
				success : function(data) {
					setData(data);
				},
				error : function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});

}

function getVFor(voterID){
	getVoted(voterID);
	getData();
	$("#VotedFor")[0].innerHTML=data;
}

