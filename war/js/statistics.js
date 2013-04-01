function getStat(option){
    alert(option);
        $.ajax({
            type : 'GET',
            url: '/statistics',
             data: { 
             'option': option
                },
            dataType : 'json',
            success : function(data) {
                createTable(data, option);
            },
            error : function(xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
}

function createTable(data, option) {
    //clear previous table
    $('#tabel tbody tr').remove();

    var name, region, party;

    for (i in data) {
        //get values from json data
        name = data[i]['firstName'] + " " + data[i]['lastName'];
        party = data[i]['party'];
        
        //create new row with data
        var cols = new Array();
        cols[0] = $("<td></td>").text(name);
        var row = $("<tr></tr>");
        for (j in cols)
            row.append(cols[j]);
        //append data to table
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