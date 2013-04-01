var data="Pole h‰‰letanud";
function setData(d){
	data=d;
}

function getData(){
	var myVarD=setInterval(function(){
		if(data!="Pole h‰‰letanud"){
			$("#VotedFor")[0].innerHTML="Kodanik x";//panna waiter ka
			//data="Kodanik x";//tuleks tegelt ajaksist
			clearTimeout(myVarD);
			alert("VoteData: "+data.toString());
			//return ldata;
		}
	},500)

setTimeout(function(){
	clearTimeout(myVarD);
	$("#VotedFor")[0].innerHTML="H‰‰letusandmeid ei ole saadaval";
	alert("minu andmed timeouti sees");
	
},5000);
	
	//return data;
}

function getVoted(voterID){
	$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/AndmedServlet',
				 data: { 
        		 "voterID": voterID // <-- the $ sign in the parameter name seems unusual, I would avoid it
   				},
				dataType : 'json',
				success : function(data) {
					setData(data);
					//var candidates = data['candidates']
					//createTable(candidates, party, region);
				},
				error : function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});

}

function getVFor(voterID){
	getVoted(voterID);
	getData();
}

