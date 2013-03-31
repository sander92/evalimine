var ldata;
function setData(d){
	ldata=d;
}

function getData(){
	alert(data);
	return ldata;
}

function getList() {
		try{
			var flName = $("#name").val().trim();
		}
		catch (e) {
			flName="Ma";
		}
		


		if (flName != "") {
			/*$.getJSON("json/findCandidatesByPartyAndRegion.json", function(data){
			  	var candidates = data['candidates']
			  	createTable(candidates, party, region);
			}); */
			$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/Poliitik',
				 data: { 
        		 "Name": flName// <-- the $ sign in the parameter name seems unusual, I would avoid it
   				},
				dataType : 'json',
				success : function(data) {
					setData(data);
					alert(data);
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