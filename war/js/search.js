function otsimine() {
		var fName = $("#name").attr("value");
		//var lName = $("#lastname").attr("value");
		var partyCode = $("#partyselector").val();
		var regionCode = $("#regionselector").val();
		var partyName = $("#partyselector option:selected").text();
		var regionName = $("#regionselector option:selected").text();

		$.ajax({
			type : 'GET',
			url: '/search',
			 data: { 
    		 'fName': fName, 
    		 'lName': '',
    		 'party': partyCode,
    		 'area': regionCode
				},
			dataType : 'json',
			success : function(data) {
				var candidates = data
				createTable(candidates, partyName, regionName);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				alert(thrownError);
			}
		});

	$('#showInfo').click(function() {
		$.getJSON("json/candidate.json", function(data) {
			getCandidateInfo(data);
		});
	});
}

function createTable(candidates, givenParty, givenRegion) {
	//clear previous table
	$('#tabel tbody tr').remove();

	var name, region, party;

	for (i in candidates) {
		//get values from json data
		name = candidates[i]['name'];
		if (givenParty == '')
			party = candidates[i]['party'];
		else
			party = givenParty;
		if (givenRegion == '')
			region = candidates[i]['area'];
		else
			region = givenRegion;
		
		//create new row with data
		var cols = new Array();
		cols[0] = $("<td></td>").text(name);
		cols[1] = $("<td></td>").text(region);
		cols[2] = $("<td></td>").text(party);
		var row = $("<tr></tr>");
		for (j in cols)
			row.append(cols[j]);
		//append data to table
		row.addClass("candidateClickable");
		$("#tabel tbody").append(row);
	}

	//display table and apply tablesorter
	if ($("#tabel tbody tr").size() > 0) {
		$('#tabel').show();
		$("#tabel").trigger("clearCache");
		// let the plugin know that we made a update 
		$("table").trigger("update");
		// set sorting column and direction, this will sort on the first column 
		//var sorting = [[0,0]]; 
		// sort on the first column 
		//$("table").trigger("sorton",[sorting]);
	} else {
		$('#tabel').hide();
	}
}

function getCandidateInfo(candidate) {
	$('#partyInfo').text(candidate.party.name);
	$('#regionInfo').text(candidate.region.name);
	$('#personInfo').text(candidate.person.name);
}


