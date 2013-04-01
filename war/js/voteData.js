
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
					$("#VotedFor")[0].innerHTML="Sina andsid oma hääle järgmisele isikule:<br>Poliitiku nimi: "+data.firstName+" "+data.lastName+"<br>"+"Erakond: "+data.party+"<br>"+"Piirkond: "+data.area;
					$('*').css('cursor','default');

				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('*').css('cursor','default');
					alert(thrownError);
				}
			});

}

function getVFor(voterID){
	$('*').css('cursor','wait');
	getVoted(voterID);
}

