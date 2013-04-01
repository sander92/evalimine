var names=["Magdalena Malejeva","Eduard Ekskavaator","Filbert Hollins","Ulrich Van Andringa"];
var k=0;
function autoc() {
	if(k==0){
		getLData();
		k=1;
	}

	//if(vahenames!=null){
		//names = vahenames;
	//}
									   //!!!    !!!!     !!!!!!!!     !!!!!!!!!
	$("#name")						///teha kuidagi nii, et see võtaks ajaxist neid
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
$("#name").onfocus=autoc;
$("#name").onblur=autoc;

