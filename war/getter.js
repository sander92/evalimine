var ldata=null;
function setLData(d){
	ldata=d;
}


function getLData(){
	getList();
	var myVar=setInterval(function(){
			if(ldata!=null){
				names=["Mari","J�ri"];
				autoc();
				clearTimeout(myVar);
				alert(ldata.toString());
				//return ldata;
			}
		},500)
	
	setTimeout(function(){
		clearTimeout(myVar);
		alert("listdata timeouti sees");
		
	},5000);
}

function getList() {
		try{
			var flName = $("#name").val().trim();
		}
		catch (e) {
			flName="Ma";
		}
		alert(flName.toString());


		if (flName != "") {
			/*$.getJSON("json/findCandidatesByPartyAndRegion.json", function(data){
			  	var candidates = data['candidates']
			  	createTable(candidates, party, region);
			}); */
			$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/KandidaadileheServlet',
				 data: { 
        		 "Name": flName// <-- the $ sign in the parameter name seems unusual, I would avoid it
   				},
				dataType : 'json',
				success : function(data) {
					setLData(data);
					
					//var candidates = data['candidates']
					//createTable(candidates, party, region);
				},
				error : function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});
		
		}
	}
	
/*	
function getVFor(voterID){
	getVoted(voterID);
	//$("#VotedFor").innerHTML=data;
}*/