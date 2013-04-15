function otsimine() {
		var fName = $("#name").val();
		//var lName = $("#lastname").attr("value");
		var partyCode = $("#partyselector").val();
		var regionCode = $("#regionselector").val();
		var partyName = $("#partyselector option:selected").text();
		var regionName = $("#regionselector option:selected").text();
		$('*').css('cursor','wait');
		
		if (navigator.onLine){
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
					var candidates = data;
					console.log(JSON.stringify(candidates));
					createTable(candidates, partyName, regionName);
					$('*').css('cursor','default');
				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('*').css('cursor','default');
					alert(thrownError);
				}
			});
		}
		else if (!navigator.onLine){
			beginning = "SELECT Person.FullName";
			middle = "";
			end = "WHERE ";
			if(!(fName=="") && fName != null)
				end += "FullName LIKE '"+ fName + "%'' AND ";	
			if(!(partyCode=="") && partyCode != null) {
				beginning += ", Area.AreaName";
				end += "PartyID=\""+partyCode+"\" AND ";
			}
			if(!(regionCode=="") && regionCode != null) {
				beginning += ", Party.PartyName";
				end += "AreaID=\""+regionCode+"\" AND ";
			}
			if(partyCode=="" && regionCode=="" && partyCode != null && regionCode != null){
				beginning += ", Area.AreaName";
				beginning += ", Party.PartyName";
			}
			middle += "JOIN Party ON Person.PartyID = Party.Party_Id ";
			middle += "JOIN Area ON Person.AreaID = Area.Area_Id ";
			//remove last " AND "
			end = end.substring(0, end.length - 6);
			beginning +=" FROM Person ";
			query = beginning + middle + end;
			console.log(query);
			var res=[];
			db.transaction(function(tx) {
                tx.executeSql(query, [], function(tx, rs) {
                    for(var i=0; i<rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        
                        var rida={ };
                        rida['FullName']=row['FullName'];
                        rida['party']=row['PartyName'];
                        rida['area']=row['AreaName'];
                        res.push(rida);
                       /* res.push({
                        		FullName : row['FullName'],
                        		party : row['PartyName'],
                        		area : row['AreaName']
                        });*/
                    }
                    
        			createTable(res, partyName, regionName);//fix it

                });
            });
			

			//createTable(jsonobj, partyName, regionName);
			$('*').css('cursor','default');
		}

	$('#showInfo').click(function() {
		$.getJSON("json/candidate.json", function(data) {
			getCandidateInfo(data);
		});
	});
}

function createTable(candidates, givenParty, givenRegion) {
	//clear previous table
	//console.log("loome tabelit");

	$('#tabel tbody tr').remove();

	var name, region, party;

	for (i in candidates) {
		//get values from json data
		if (navigator.onLine){
			name = candidates[i]['firstName'] + ' ' + candidates[i]['lastName'];
		}
		else if (!navigator.onLine){
			name = candidates[i]['FullName'];
		}
		x=0;//suvaline asi, not sure kas ifidejada muidu töötab
		
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
		
//		kandidaadinimi="klikinime('"+name+"')";
//		kandidaadilinn="klikinime('"+region+"')";
//		kandidaadipartei="klikinime('"+party+"')";
		kandidaadiInfo="klikinime('"+name+"','"+region+"','"+party+"')";
		//asi="klikinime('"+name+"')";
		
		cols[0] = $("<td></td>").text(name).attr("onClick",kandidaadiInfo);
		cols[1] = $("<td></td>").text(region).attr("onClick",kandidaadiInfo);
		cols[2] = $("<td></td>").text(party).attr("onClick",kandidaadiInfo);
		var row = $("<tr></tr>");//.attr("onClick",kandidaadiInfo);
		//$("td").click(function(){klikinime(kandidaadinimi,kandidaadilinn,kandidaadipartei);});

		
		for (j in cols)
			row.append(cols[j]);
		//append data to table
		row.addClass("candidateClickable");
		$("#tabel tbody").append(row);
		//$(".candidateClickable").click(klikinime(name,region,party));
		//row.attr("onClick", klikinime(name,region,party));
	}
	//display table and apply tablesorter
	if ($("#tabel tbody tr").size() > 0) {
		$('#tabel').show();
		$("#tabel").trigger("clearCache");
		// let the plugin know that we made a update 
		$("#tabel").trigger("update");
		// set sorting column and direction, this will sort on the first column 
		var sorting = [[0,0]]; 
		// sort on the first column 
		$("tabel").trigger("sorton",[sorting]);
	} else {
		$('#tabel').hide();
	}
}

function getCandidateInfo(candidate) {
	$('#partyInfo').text(candidate.party.name);
	$('#regionInfo').text(candidate.region.name);
	$('#personInfo').text(candidate.person.name);
}
