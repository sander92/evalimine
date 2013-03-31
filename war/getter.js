var ldata;
function setData(d){
	ldata=d;
}

function getList() {
		try{
			var fName = $("#name").val();
			var lName = $("#name").val();
		}
		catch (e) {
			fName="Ma"
			lName="";
		}
		
		var party = "";
		var region = "";

		if (fName != "") {
			/*$.getJSON("json/findCandidatesByPartyAndRegion.json", function(data){
			  	var candidates = data['candidates']
			  	createTable(candidates, party, region);
			}); */
			$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/sign',
				 data: { 
        		 FirstName: fName// <-- the $ sign in the parameter name seems unusual, I would avoid it
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
		} else if (region != "") {
			$.getJSON("json/findCandidatesByRegion.json", function(data) {
				var candidates = data['candidates']
				createTable(candidates, null, region);
			});
		} else if (party != "") {
			$.getJSON("json/findCandidatesByParty.json", function(data) {
				var candidates = data['candidates']
				createTable(candidates, party, null);
			});
		}

	}
	
/*	
function getVFor(voterID){
	getVoted(voterID);
	//$("#VotedFor").innerHTML=data;
}*/