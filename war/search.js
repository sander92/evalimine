function otsimine() {

	$("#tabel").tablesorter();
	$('#tabel').hide();

	$("#otsi").click(function() {

		var fName = $("#firstname").attr("value");
		var lName = $("#lastname").attr("value");
		var party = $("#partyselector").val();
		var region = $("#regionselector").attr("value");

		if (party != "" && region != "") {
			/*$.getJSON("json/findCandidatesByPartyAndRegion.json", function(data){
			  	var candidates = data['candidates']
			  	createTable(candidates, party, region);
			}); */
			$.ajax({
				type : 'GET',
				url : 'json/findCandidatesByPartyAndRegion.json',
				dataType : 'json',
				success : function(data) {
					var candidates = data['candidates']
					createTable(candidates, party, region);
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

	});
	$('#showInfo').click(function() {
		$.getJSON("json/candidate.json", function(data) {
			getCandidateInfo(data);
		});
	});

	function createTable(candidates, givenParty, givenRegion) {
		//var row = "<tr><td>" + candidates[0]['person']['name'] + "</td><td>" + candidates[0]['region']['name'] + "</td><td>" + candidates[0]['region']['name'] + "</td></tr>";
		//clear previous table
		$('#tabel tbody tr').remove();

		var name, region, party;

		for (i in candidates) {
			//get values from json data
			name = candidates[i]['person']['name'];
			if (givenParty != null && givenRegion != null) {
				region = givenRegion;
				party = givenParty;
			} else if (givenParty != null) {
				region = candidates[i]['region']['name'];
				party = givenParty;
			} else if (givenRegion != null) {
				party = candidates[i]['party']['name'];
				region = givenRegion;
			}
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
}

function hider() {
	$('#tabel').hide();

}
