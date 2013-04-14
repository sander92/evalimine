var db;
function lokaalneInit(){
	if (Modernizr.localstorage && Modernizr.websqldatabase) {
		db = openDatabase('evalimised', '1.0', 'evalimisedTest', 2 * 1024 * 1024);
		db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS Area (Area_Id unique, AreaName)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Party (Party_Id unique, PartyName)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Person (Person_Id unique, FullName, PartyID, AreaID)');
			tx.executeSql('CREATE TABLE IF NOT EXISTS Vote (Vote_Id unique, PersonID, Date, voterID)');
			// tx.executeSql('CREATE TABLE IF NOT EXISTS users (Id unique,
			// UserName, IdCode, LastName, FirstName)');

			// tx.executeSql('INSERT INTO foo (id, text) VALUES (1,
			// "synergies")');
		});
		} 
	else{
		alert("Vabandame, aga sinu brauser ei toeta WebSQL andmebaasi võimalusi\nTeatud osad lehel võivad olla seetõttu piiratud");
	}
	
}

function votaAndmed(nimi,id){
	// [{"Area_Id":"HA","AreaName":"Harjumaa"},{"Area_Id":"SA","AreaName":"Saaremaa"},{"Area_Id":"TA","AreaName":"Tartumaa"}]
	if (navigator.onLine){
		if (id==null){
			$.ajax({
				type : 'GET',
				// url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/getData',
				 data: { 
				 "tableName": nimi		 
				 // <-- the $ sign in the parameter name seems unusual, I
					// would avoid it
					},
				dataType : 'json',
				success : function(data) {
					if(nimi=="Area"){
						insertArea(data);
					}
					else if(nimi=="Party"){
						insertParty(data);
					}
					else if(nimi=="Person"){
						insertPerson(data);
					}
					//alert(JSON.stringify(data));
				},
				error : function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});
		}
		else{
			$.ajax({
				type : 'GET',
				// url : 'json/findCandidatesByPartyAndRegion.json',
				url: '/getData',
				 data: { 
				 "tableName" : nimi,
				 "id" : id
					},
				dataType : 'json',
				success : function(data) {
					if(nimi=="Vote"){
						insertVote(data);
					}
				},
				error : function(xhr, ajaxOptions, thrownError) {
					alert(thrownError);
				}
			});
		}
		
		
	}
}

function insertArea(areaJson){
	db.transaction(function(tx) {
			tx.executeSql('DELETE FROM Area;');
	});	
	
	db.transaction(function(tx) {
		for (i in areaJson){
			tx.executeSql('INSERT INTO Area(Area_Id, AreaName) VALUES ("'+areaJson[i]['Area_Id']+'","'+areaJson[i]['AreaName']+'");');
		}
	});	
}

function insertParty(partyJson){
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM Party;');
	});	
	
	db.transaction(function(tx) {
		for (i in partyJson){
			tx.executeSql('INSERT INTO Party(Party_Id, PartyName) VALUES ("'+partyJson[i]['Party_Id']+'","'+partyJson[i]['PartyName']+'");');
		}
	});	
}

function insertPerson(personJson){
	//alert(JSON.stringify(personJson));
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM Person;');
	});	
	
	db.transaction(function(tx) {
		for (i in personJson){
			tx.executeSql('INSERT INTO Person(Person_Id, FullName, PartyID, AreaID) VALUES ("'+personJson[i]['id']+'","'+personJson[i]['firstName']+" "+personJson[i]['lastName']+'","'+personJson[i]['party']+'","'+personJson[i]['area']+'");');		}
	});	
}

function insertVote(voteJson){
	db.transaction(function(tx) {
		tx.executeSql('DELETE FROM Vote;');
	});	
	
	db.transaction(function(tx) {
		for (i in voteJson){
			tx.executeSql('INSERT INTO Vote(Vote_Id, PersonID, Date, voterID) VALUES ("'+voteJson[i]['Vote_Id']+'","'+voteJson[i]['PersonID']+'","'+voteJson[i]['Date']+'","'+voteJson[i]['voterID']+'");');
		}
	});	
}

function getOfflineData(){
	if (Modernizr.localstorage && Modernizr.websqldatabase) {
	
		votaAndmed("Area",null);
		votaAndmed("Party",null);
		votaAndmed("Person",null);
		if(loggedin==true){
			votaAndmed("Vote",voterID);
		}
		else if(loggedin==false){
			votaAndmed("Vote","0");
		}
	}
	
}

lokaalneInit();
getOfflineData();
