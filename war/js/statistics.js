function getStat(option){
        $.ajax({
            type : 'GET',
            url: '/statistics',
             data: { 
             'option': option
                },
            dataType : 'json',
            success : function(data) {
                createStatTable(data, option);
            },
            error : function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
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
        $("table").trigger("update");
    } else {
        $('#tabel').hide();
    }
}