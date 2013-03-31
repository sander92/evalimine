var names=["Magdalena Malejeva","Eduard Ekskavaator","Filbert Hollins","Ulrich Van Andringa"];
function autoc() {
	vahenames=getData();
	if(vahenames!=null){
		names = vahenames;
	}
	
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