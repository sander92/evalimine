function getVoted(voterID){
	$.ajax({
				type : 'GET',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/UserdataServlet',
				 data: { 
        		 "voterID": voterID // <-- the $ sign in the parameter name seems unusual, I would avoid it
   				},
				dataType : 'json',
				success : function(data) {
					data=data[0];
					if(data.party!="null"){
						$("#VotedFor")[0].innerHTML="Sina andsid oma h&auml;&auml;le j&auml;rgmisele isikule:<br>Poliitiku nimi: "+data.firstName+" "+data.lastName+"<br>"+"Erakond: "+data.party+"<br>"+"Piirkond: "+data.area;
						$("#del").show();
					}
					else{
						$("#VotedFor")[0].innerHTML="Sina pole veel oma valikut teinud";
					}
					$('*').css('cursor','default');

				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('*').css('cursor','default');
					alert(thrownError);
				}
			});

}

function delVoted(voterID){
	$.ajax({
				type : 'POST',
				//url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/delVote',
				 data: { 
        		 "voterID": voterID // <-- the $ sign in the parameter name seems unusual, I would avoid it
   				},
				dataType : 'html',
				success : function(data) {
					$("#VotedFor")[0].innerHTML="";
					$('*').css('cursor','default');
					alert("Valik kustutatud");

				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('*').css('cursor','default');
					alert(thrownError);
				}
			});

}
function getVFor(){
	$('*').css('cursor','wait');
	getVoted(voterID);
}

function delVFor(){
	$('*').css('cursor','wait');
	delVoted(voterID);
}

