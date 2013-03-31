var names=["Magdalena Malejeva"];
function autoc() {
	names = getData();/*[ "Magdalena Malejeva", "Harme N�ljah�da", "Olga Oravasaba",
			"Eduard Ekskavaator", "Ferdinand Fuksia", "Gerhard G�teg�verdus",
			"Harald Hamster", "Ildegaard Ilumeel", "Janaida Jalutova",
			"K�ikme Kannatame�ra", "Filbert Hollins", "Ulrich Van Andringa",
			"Carl Zino" ];*/
	
	$("#name")
			.autocomplete(
					{
						source : function(request, response) {
							var matcher = new RegExp("^"
									+ $.ui.autocomplete
											.escapeRegex(request.term), "i");
							response($.grep(names, function(item) {
								return matcher.test(item);
							}));
						},
						minLength: 2
					});
}