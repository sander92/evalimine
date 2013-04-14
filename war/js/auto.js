/*function getLData() {
	var myVarmuu = setInterval(function() {

		
		if ($("#name").val().length > 1) {
			autoc();
			clearTimeout(myVarmuu);
		}

	}, 1000);

}*/
function autoc() {
	if (navigator.onLine){
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
	else if (!navigator.onLine){
		if (Modernizr.localstorage && Modernizr.websqldatabase) {
			$(function() {
	            var result = [];
	
				db.transaction(function(tx) {
	                tx.executeSql("SELECT FullName FROM Person", [], function(tx, rs) {
	                    for(var i=0; i<rs.rows.length; i++) {
	                        var row = rs.rows.item(i)
	                        result.push(
	                        	row['FullName']
	                            //body: row['body']
	                        );
	                    }
	                    //success(result);
	                });
	            });

			    $("#name").autocomplete({
							      source : function(request, response) {
								var matcher = new RegExp("^"
										+ $.ui.autocomplete
												.escapeRegex(request.term), "i");
								response($.grep(result, function(item) {
									return matcher.test(item);
								}));
							},
			      minLength : 2
			    });
			  });
				
		}
		else{
			alert("Vabandame, aga sinu brauser ei toeta WebSQL andmebaasi võimalusi\nTeatud osad lehel võivad olla seetõttu piiratud");
		}
	}
}
//$("#name").onfocus = getLData();
/*$("#name").onblur=autoc;*/

