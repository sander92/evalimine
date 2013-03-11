function sisu(nimi)
{
	
	$("body").attr("class",nimi);

	$("#peasisu").load(nimi+".html #sisu");

	//$("#sisu").outerHTML=$("#sisu").innerHTML;
	//document.getElementById('sisu').outerHTML=document.getElementById('sisu').innerHTML;
	//}
	//$("body").load(nimi+".html");
	
	/*$.getScript("jquery-latest.js");
	$.getScript("jquery.tablesorter.js");
	
	$.getScript("myTablesorter.js");
	$.getScript("progress.js");
	$.getScript("menu.js");
	$.getScript("sisu.js");*/
}