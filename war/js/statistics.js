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
        		$('*').css('cursor','default');
        		if(option == 'regionbyparty')
        			createMapOverlay(data,option);
        		else
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
    cols.push($("<td></td>").text("HÃ¤Ã¤li"));
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


var regionData = {
			'indexes': {0:'HA', 1:'HI', 2:'IV', 3:'JA', 4:'JO', 5:'LA', 6:'LV', 7:'PO',
						8:'PR', 9:'RA', 10:'SA', 11:'TA', 12:'VA', 13:'VI', 14:'VO'},
			'regions': {
			            'HA': {'x': 59.436968, 'y': 24.753575},
			            'HI': {'x': 58.998201, 'y': 22.746804},
			            'IV': {'x': 59.376731, 'y': 28.192095},
			            'JA': {'x': 58.887109, 'y': 25.569943},
			            'JO': {'x': 58.7463, 'y': 26.397209},
			            'LA': {'x': 58.94826, 'y': 23.537037},
			            'LV': {'x': 59.347988, 'y': 26.36254},
			            'PO': {'x': 58.053749, 'y': 27.054865},
			            'PR': {'x': 58.385812, 'y': 24.496572},
			            'RA': {'x': 59.005741, 'y': 24.794238},
			            'SA': {'x': 58.252961, 'y': 22.485043},
			            'TA': {'x': 58.380689, 'y': 26.725013},
			            'VA': {'x': 57.777085, 'y': 26.031522},
			            'VI': {'x': 58.368089, 'y': 25.597838},
			            'VO': {'x': 57.846076, 'y': 26.998692}
			},
			'parties': {'Keskerakond':'blue', 'Reformierakond':'red', 'Kristik Erakond':'green', 'Rohelised':'purple', 'Sotsiaaldemokraadid':'yellow'}
			//darkorange, saddlebrown
}

function createMapOverlay(data){	
	var mapProp = {
			center:new google.maps.LatLng(58.8086, 25.4325),
			zoom:7,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	
	var defaultColor = 'lightgray';
	var markerIcon = {
	    	  path: google.maps.SymbolPath.CIRCLE,
	    	  fillOpacity: 0.5,
	    	  fillColor: defaultColor,
	    	  strokeOpacity: 1.0,
	    	  strokeColor: defaultColor,
	    	  strokeWeight: 1.0, 
	    	  scale: 20
	};
	var markers = new Array();
	
	var prevId;
	var color;
	var totalVotes = 0;
	for(var i = 0;i<data.length;i++){
		follColor = defaultColor;
		strokeColor = defaultColor;
		var id = data[i]['region'];
		//party with most votes
		if(id != prevId){
			var party = data[i]['party'];
			var votes = data[i]['votes'];
			markers[i] = new google.maps.Marker({
			      position: new google.maps.LatLng(regionData['regions'][id]['x'],regionData['regions'][id]['y']),
			      icon: {
			    	  path: google.maps.SymbolPath.CIRCLE,
			    	  fillOpacity: 0.5,
			    	  fillColor: defaultColor,
			    	  strokeOpacity: 1.0,
			    	  strokeColor: defaultColor,
			    	  strokeWeight: 1.0, 
			    	  scale: 20},
			      map: map,
			      infoString: ''
			});
			//set marker color and infowindow text
			if(party != null && votes != 0){
				color = regionData['parties'][party];
				markers[i].getIcon().fillColor = color;
				markers[i].getIcon().strokeColor = color;
				markers[i].infoString = '' + party + ' ' + votes + ' häält';
				google.maps.event.addListener(markers[i], 'click', function() {
					var infowindow = new google.maps.InfoWindow();
					infowindow.setContent(this.infoString);
					infowindow.open(map,this);
				});
			}
			prevId = id;
		}
		//other parties in the region
		else
			totalVotes += data[i]['votes'];
	}	
}


function setMarkerInfo(marker, votes, totalVotes){
	
}