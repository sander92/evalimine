/*function getLData() {
	var myVarmuu = setInterval(function() {

		
		if ($("#name").val().length > 1) {
			autoc();
			clearTimeout(myVarmuu);
		}

	}, 1000);

}*/
function autoc() {

	$("#name").autocomplete({
		source : function(request, response) {
			$.ajax({
				type : 'GET',
				url : "/AutocompleteServlet",
				dataType : "json",
				data : {
					"Name" : request.term
				},
				success : function(data) {
					$('*').css('cursor', 'default');

					response($.map(data, function(item) {
						return {
							label : item.firstName,
							value : item.firstName

						}
					}));
				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('*').css('cursor', 'default');
					alert(thrownError);
				}
			});
		},
		minLength : 2,
		select : function(event, ui) {
			$("#name").text(ui.item.label);
		}

	});
}
//$("#name").onfocus = getLData();
/*$("#name").onblur=autoc;*/

