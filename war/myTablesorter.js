$(document).ready(function() 
    { 
    	if($("#tabel tbody tr").size() > 0)
        	$("#tabel").tablesorter( {sortList: [[0,0]]} ); 
    } 
); 