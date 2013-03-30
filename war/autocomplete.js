function autoasi() {
var availableTags = [
"ActionScript",
"AppleScript",
"Asp",
"BASIC",
"C",
"C++",
"Clojure",
"COBOL",
"ColdFusion",
"Erlang",
"Fortran",
"Groovy",
"Haskell",
"Java",
"JavaScript",
"Lisp",
"Perl",
"PHP",
"Python",
"Ruby",
"Scala",
"Scheme"
];
$( "#name" ).autocomplete({source: availableTags});
}

//$("#example").autocomplete(data);
/*function asi{
	$('#name').autocomplete({
	    serviceUrl: '/sign',
	    onSelect: function (suggestion) {
	        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
	    }
	});
}*/
window.onload=asi;
window.onhashchange=asi;