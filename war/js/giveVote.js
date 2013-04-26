var kand_nimi;
var kand_party;
var kand_ala;

function klikinime(a_name,a_region,a_party){
	document.getElementById("kandidaadivaade").style.visibility="visible";
	document.getElementById("personInfo").innerHTML=a_name;
	kand_nimi=a_name;
	document.getElementById("regionInfo").innerHTML=a_region;
	kand_ala=a_region;
	document.getElementById("partyInfo").innerHTML=a_party;
	kand_party=a_party;
	$("#seeshaal").show();
}

function kinnita(){
	var x=window.confirm("Olete kindel, et soovite enda esindajaks isikut '"+kand_nimi+"' ?")
	if (x){
		
		$.ajax({
			type : 'POST',
			//url : 'json/findCandidatesByPartyAndRegion.json',
			url: '/toVote',
			 data: { 
    		 "voterID": window.kasutajaID,
    		 "candidateName" : kand_nimi,
    		 "candidateParty" : kand_party,
    		 "candidateArea" : kand_ala    		 
    		 // <-- the $ sign in the parameter name seems unusual, I would avoid it
				},
			dataType : 'html',
			success : function(data) {
				if(data=="prob"){
					alert("Tekkis probleem.\nSinu valik ei läinud arvesse");
				}
				else if(data=='ei'){
					alert("Oled juba valinud");
				}
				else{
					alert("Sina valisid enda esindajaks isiku:\nPoliitiku nimi: "+data);
				}
				$('*').css('cursor','default');

			},
			error : function(xhr, ajaxOptions, thrownError) {
				$('*').css('cursor','default');
				alert(thrownError);
			}
		});
		
	}
}