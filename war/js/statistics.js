function getStat(option){
	if (navigator.onLine){//flipped
		$.ajax({
            type : 'GET',
            url: '/statistics',
             data: { 
             'option': option
                },
            dataType : 'json',
            success : function(data) {
            	//console.log(JSON.stringify(data));
        		$('*').css('cursor','default');
                createStatTable(data, option);

            },
            error : function(xhr, ajaxOptions, thrownError) {
        		$('*').css('cursor','default');
                alert(thrownError);

            }
        });
	}
	else if (!navigator.onLine){
    	if(option=="region"){	
			query ="SELECT Area.AreaName, COUNT(Vote.Vote_Id) AS Votes FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Area ON Person.AreaID=Area.Area_Id GROUP BY AreaID";
			var res=[];
			db.transaction(function(tx) {
	            tx.executeSql(query, [], function(tx, rs) {
	                for(var i=0; i<rs.rows.length; i++) {
	                    var row = rs.rows.item(i);
	                    
	                    var rida={ };
	                    rida['region']=row['AreaName'];
	                    rida['votes']=row['Votes'];
	                    res.push(rida);
	                   /* res.push({
	                    		FullName : row['FullName'],
	                    		party : row['PartyName'],
	                    		area : row['AreaName']
	                    });*/
	                }
	                
	    			createStatTable(res, option);//fix it

	            });
	        });
		}
		else if(option=="party"){
			query ="SELECT Party.PartyName, COUNT(Vote.Vote_Id) AS Votes FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Party ON Person.PartyID=Party.Party_Id GROUP BY PartyID";
			
			var res=[];
			db.transaction(function(tx) {
	            tx.executeSql(query, [], function(tx, rs) {
	                for(var i=0; i<rs.rows.length; i++) {
	                    var row = rs.rows.item(i);
	                    
	                    var rida={ };
	                    rida['party']=row['PartyName'];
	                    rida['votes']=row['Votes'];
	                    res.push(rida);
	                   /* res.push({
	                    		FullName : row['FullName'],
	                    		party : row['PartyName'],
	                    		area : row['AreaName']
	                    });*/
	                }
	                
	    			createStatTable(res, option);//fix it

	            });
	        });
			
			
		}
		else if(option=="candidate"){
			query = "SELECT Person.FullName, Area.AreaName, Party.PartyName, COUNT(Vote.Vote_Id) AS Votes FROM Vote " +
					"JOIN Person ON Vote.PersonID = Person.Person_Id JOIN Party ON Person.PartyID=Party.Party_Id " +
					"JOIN Area ON Person.AreaID=Area.Area_Id GROUP BY PersonID";
			
			var res=[];
			db.transaction(function(tx) {
	            tx.executeSql(query, [], function(tx, rs) {
	                for(var i=0; i<rs.rows.length; i++) {
	                    var row = rs.rows.item(i);
	                    
	                    var rida={ };
	                    rida['name']=row['FullName'];
	                    rida['party']=row['AreaName'];
	                    rida['region']=row['PartyName'];
	                    rida['votes']=row['Votes'];
	                    res.push(rida);
	                   /* res.push({
	                    		FullName : row['FullName'],
	                    		party : row['PartyName'],
	                    		area : row['AreaName']
	                    });*/
	                }
	                
	    			createStatTable(res, option);//fix it

	            });
			});
		}
		
			

			//createTable(jsonobj, partyName, regionName);
		$('*').css('cursor','default');
	}
}

function createStatTable(data, option) {
    //clear previous table
    $('#tabel tbody tr').remove();
    var cols = new Array();
    var row;
    //create table head
    $('#tabel thead tr').remove();
    //create new row with data
    var cols = new Array();
    if(option == "party")
        cols.push($("<td></td>").text("Erakond"));
    else if(option == "region")
        cols.push($("<td></td>").text("Piirkond"));
    else if(option == "candidate"){
        cols.push($("<td></td>").text("Nimi"));
        cols.push($("<td></td>").text("Erakond"));
        cols.push($("<td></td>").text("Piirkond"));
    }
    cols.push($("<td></td>").text("Hääli"));
    var row = $("<tr></tr>");
    for (j in cols)
        row.append(cols[j]);
    // Remove tablesorter and all classes
   /*$("tabel").trigger("destroy", [false, function(){
        // callback after the destroy method
    $('#tabel thead tr').html(row);
        $("#tabel").tablesorter();

    }]);*/
    $("#tabel thead").append(row);
    //push data to table
    //create table body
    var name, region, party;
    for (i in data) {
        cols = new Array();
        //get values from json data
        if(option == "party"){
            party = data[i]['party'];
            cols[0] = $("<td></td>").text(party);
        }
        else if(option == "region"){
            region = data[i]['region'];
            cols[0] = $("<td></td>").text(region);
        }
        else if(option == "candidate"){
            name = data[i]['name'];
            party = data[i]['party'];
            region = data[i]['region'];
            cols[0] = $("<td></td>").text(name);
            cols[1] = $("<td></td>").text(party);
            cols[2] = $("<td></td>").text(region);
        }
        votes = data[i]['votes'];
        cols.push($("<td></td>").text(votes));
        //create new row with data
        row = $("<tr></tr>");
        for (j in cols)
            row.append(cols[j]);
        //push data to table
        $("#tabel tbody").append(row);
    }

    //display table and apply tablesorter
    if ($("#tabel tbody tr").size() > 0) {
        $('#tabel').show();
        $("#tabel").trigger("clearCache");
        // let the plugin know that we made a update 
        $("tabel").trigger("update");
       
    } else {
        $('#tabel').hide();
    }
}
