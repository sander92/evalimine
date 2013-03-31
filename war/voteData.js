var data;
function setData(d){
	data=d;
}

function getVoted(voterID){
	$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/Kandidaat',
				 data: { 
        		 "voter": voterID // <-- the $ sign in the parameter name seems unusual, I would avoid it
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
	$("#VotedFor").innerHTML=data;
}

