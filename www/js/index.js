function dialog() {
	
}

function loadData(){
	//declaring and initializing variables
	var api = "?api_key=ba9334384ab4cfdd9d0e8d8b60752a52"; // api key got from tmdb
	var upcomingURL = "http://api.themoviedb.org/3/movie/upcoming"+api; //url for the upcoming movies
	var popularTvURL = "http://api.themoviedb.org/3/tv/popular"+api; //TV Shows
	var famousCelebURL = "http://api.themoviedb.org/3/person/popular"+api; //Celebreties
	var imageBaseURL = "http://image.tmdb.org/t/p/w92"; //Url for small images in the list
	var imageBaseURL2 = "http://image.tmdb.org/t/p/w185"; //For large images


	/* SEARCH PART STARTS HERE */
	//Viacheslav Litvinov

	//click listener for the search button
	$("#searchButton").on("click", function(){
		//getting value from the search box
		var searchCombination = $("#searchbox").val();				
		//setting up the search combination into a right format
		searchCombination = searchCombination.toLowerCase();		
		searchCombination = searchCombination.replace(/ /g, "+");
		//creating a query for the url	
		var searchQuery = "&query="+searchCombination;
		//getting the type to search for: person, TVshow or movie 				
		var searchType = $('#searchType').val();
		
		//startind different AJAX calls according to the type of search
		if (searchType == 'person') {
			var searchURL = "http://api.themoviedb.org/3/search/person"+api+searchQuery; //URL for searching for celebreties
			//starting AJAX call
			$.ajax({
				method: "GET",
				url: searchURL,
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					var output = ""; //contains the list of results
					var dialog = ""; //contains the pop up window
					
					//loop through the result array - json.results[]
					for (var i = 0; i < json.results.length; i++) {
						
						//if the current list item (celebrety) doesn't have a picture (which is json.results[i].profile_path) then set it to be default one
						if(json.results[i].profile_path === null){
							output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + "-search class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" + " width=\"53\" height=\"80\"" +">";
						}
						//if has - get the data and set it to list item
						else{
							output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + "-search class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].profile_path + ">";
						}
						
						//Add name to the list item
						output += "<h2>" + json.results[i].name + "</h2></a></li>";
						
						//creating the pop up window UI and set got data to it
						dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "-search\" >";
						dialog += "<div data-role=\"header\">";
						dialog += "<h1>Trivia</h1></div>";
						dialog += "<div role=\"main\" class=\"ui-content\">";
						dialog += "<h2>" + json.results[i].name + "</h2>";
						dialog += "<h3>Known For:</h3>";
						
					//BUG FIX	

						dialog += "<p>";
							//looping through the json.results[i].known_for[] array and adding data from it to the pop up window
							for(var k = 0; k < json.results[i].known_for.length; k++){
								dialog +=  json.results[i].known_for[k].title;
								//if there is one more object inside the array - put a comma         
								if(k + 1 < json.results[i].known_for.length){
									dialog += ", ";
								}
										
							} 
						dialog += "</p>";
					//BUG FIX						
						
						dialog += "</br>";

						//if the current list item (celebrety) doesn't have a picture (which is json.results[i].profile_path) then set it to be default one
						if(json.results[i].profile_path === null){
							dialog += "<img src=" +"http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" + " height=\"278\" width=\"185\" " + ">"
						}
						//if has - get the data and set it to pop up window
						else{
							dialog += "<img src=" + imageBaseURL2 + json.results[i].profile_path + ">";
						}
						dialog += "</div></div>";		
					}

					var list = $("#searchList"); //declaring list setting its value as a list from index.html
					list.html(output); //put the result list inside as list in index.html
					var container = $("#search"); //declaring container and setting its value as a search container from index.html
					container.after(dialog); //put all the pop up windows before the container
				},
				error: function(e) {
				    console.log(e.message); //in a case of error, show the message
				}
			});
		}

		//starting actions if the search type is TV shows
		else if (searchType == 'tv') {
			var searchURL = "http://api.themoviedb.org/3/search/tv"+api+searchQuery; //URL for searching for TV shows
			//starting AJAX call
			$.ajax({
				method: "GET",
				url: searchURL,
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					var output = ""; //contains the list of results
					var dialog = ""; //contains the pop up window

					//loop through the result array - json.results[]
					for (var i = 0; i < json.results.length; i++) {
						
						//if the current list item (TV Show) doesn't have a poster (which is json.results[i].poster_path) then set it to be default one
						if (json.results[i].poster_path === null){
							output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" + " width=\"53\" height=\"80\" "  + ">";
						} 
						//if has - get the data and set it to list item
						else{
						output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].poster_path + ">";
						}
						
						//Add name and first air date to the list item
						output += "<h2>" + json.results[i].name + "</h2>";
						output += "<p>" + json.results[i].first_air_date + "</p></a></li>";
						
						//creating the pop up window UI and set got data to it
						dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "\" >";
						dialog += "<div data-role=\"header\">";
						dialog += "<h1>Trivia</h1></div>";
						dialog += "<div role=\"main\" class=\"ui-content\">";
						dialog += "<h2>" + json.results[i].name + " (" + json.results[i].first_air_date.substring(0, 4) + ")</h2>"; //header - name + year in paretheses
						dialog += "<h3>Story:</h3>";
						dialog += "<p>" + json.results[i].overview + "</p>"; //overview
						
						//if the current list item (TV show) doesn't have a poster (which is json.results[i].poster_path) then set it to be default one
						if(json.results[i].poster_path === null){
							dialog += "<img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" + " width=\"185\" height=\"278\" " + ">";
						}
						//if has - get the data and set it to pop up window
						else{
							dialog += "<img src=" + imageBaseURL2 + json.results[i].poster_path + ">";				
						}

						dialog += "</div></div>"; //closing pop up container		
					}
					var list = $("#searchList"); //declaring list setting its value as a list from index.html
					list.html(output); //put the result list inside as list in index.html
					var container = $("#search"); //declaring container and setting its value as a search container from index.html
					container.after(dialog); //put all the pop up windows before the container
				},
				error: function(e) {
				    console.log(e.message); //in a case of error, show the message
				}
			});
		}

		//starting actions if the search type is Movie
		else {
			var searchURL = "http://api.themoviedb.org/3/search/movie"+api+searchQuery; //URL for searching for TV shows
			//starting AJAX call
			$.ajax({
				method: "GET",
				url: searchURL,
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					var output = ""; //contains the list of results
					var dialog = ""; //contains the pop up window

					//loop through the result array - json.results[]
					for (var i = 0; i < json.results.length; i++) {
						//if the current list item (Movie) doesn't have a poster (which is json.results[i].poster_path) then set it to be default one
						if(json.results[i].poster_path === null){
							output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"80\" width=\"55\" "+">";
						} 
						//if has - get the data and set it to list item
						else{
						output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].poster_path + ">";
						}
						
						//Add name and release date to the list item
						output += "<h2>" + json.results[i].title + "</h2>";
						output += "<p>" + json.results[i].release_date + "</p></a></li>";
						
						//creating the pop up window UI and set got data to it
						dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "\" >";
						dialog += "<div data-role=\"header\">";
						dialog += "<h1>Trivia</h1></div>";
						dialog += "<div role=\"main\" class=\"ui-content\">";
						dialog += "<h2>" + json.results[i].title + " (" + json.results[i].release_date.substring(0, 4) + ")</h2>"; //header - name + year in paretheses	 			
						dialog += "<h3>Story:</h2>";
						dialog += "<p>" + json.results[i].overview + "</p>"; //overview
						
						//if the current list item (Movie) doesn't have a poster (which is json.results[i].poster_path) then set it to be default one
						if(json.results[i].poster_path === null){
							dialog += "<img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"278\" width=\"185\" "+">";
						} 
						//if has - get the data and set it to pop up window
						else{
						dialog += "<img src=" + imageBaseURL2 + json.results[i].poster_path + ">";
						}
						dialog += "</div></div>"; //closing pop up container				
					
					}
					var list = $("#searchList"); //declaring list setting its value as a list from index.html
					list.html(output); //put the result list inside as list in index.html
					var container = $("#search"); //declaring container and setting its value as a search container from index.html
					container.after(dialog); //put all the pop up windows before the container
				},
				error: function(e) {
				    console.log(e.message); //in a case of error, show the message
				}
			});
		}
	});
	
	/* SEARCH PART ENDS HERE */

	$.ajax({
		method: "GET",
		url: upcomingURL,
		//jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			var output = "";
			var dialog = "";
			for (var i = 0; i < json.results.length; i++) {
				
				//WILL IMPLEMENT FUNCTION IF POSSIBLE
				if(json.results[i].poster_path === null){
					output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"80\" width=\"53\" "+">";
				} else{
				output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].poster_path + ">";
				}
				//WILL IMPLEMENT FUNCTION IF POSSIBLE
				
				output += "<h2>" + json.results[i].title + "</h2>";
				output += "<p>" + json.results[i].release_date + "</p></a></li>";
				
				dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "\" >";
				dialog += "<div data-role=\"header\">";
				dialog += "<h1>Trivia</h1></div>";
				dialog += "<div role=\"main\" class=\"ui-content\">";
				dialog += "<h2>" + json.results[i].title + " (" + json.results[i].release_date.substring(0, 4) + ")</h2>";				
				dialog += "<h3>Story:</h2>";
				dialog += "<p>" + json.results[i].overview + "</p>";
				
				if(json.results[i].poster_path === null){
					dialog+= "<img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"278\" width=\"185\" "+">"
				}else{
				dialog += "<img src=" + imageBaseURL2 + json.results[i].poster_path + ">";
				}				
				dialog += "</div></div>";				
			
			/*<a role="button" href="#" class="ui-btn ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-left" data-transition="pop" data-direction="reverse">Close</a>*/
			}
			var list = $("#upComingList")
			list.html(output);
			var container = $("#up-coming");
			container.after(dialog);
		},
		error: function(e) {
		    console.log(e.message);
		}
	});
	$.ajax({
		method: "GET",
		url: popularTvURL,
		//jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			var output = "";
			var dialog = "";
			for (var i = 0; i < json.results.length; i++) {
				
				//WILL IMPLEMENT FUNCTION IF POSSIBLE
				if(json.results[i].poster_path === null){
					output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"80\" width=\"53\" "+">";
				} else{
				output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].poster_path + ">";
				}
				//WILL IMPLEMENT FUNCTION IF POSSIBLE
		
				output += "<h2>" + json.results[i].name + "</h2>";
				output += "<p>" + json.results[i].first_air_date + "</p></a></li>";
				
				dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "\" >";
				dialog += "<div data-role=\"header\">";
				dialog += "<h1>Trivia</h1></div>";
				dialog += "<div role=\"main\" class=\"ui-content\">";
				dialog += "<h2>" + json.results[i].name + " (" + json.results[i].first_air_date.substring(0, 4) + ")</h2>";
				dialog += "<h3>Story:</h3>";
				dialog += "<p>" + json.results[i].overview + "</p>";
				if(json.results[i].poster_path === null){
					dialog += "<img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"278\" width=\"185\" "+">"
				} else{
				dialog += "<img src=" + imageBaseURL2 + json.results[i].poster_path + ">";				
				}
				dialog += "</div></div>";		
			}
			var list = $("#popularTvList")
			list.html(output);
			var container = $("#popular-tv");
			container.after(dialog);
		},
		error: function(e) {
		    console.log(e.message);
		}
	});
	$.ajax({
		method: "GET",
		url: famousCelebURL,
		//jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			var output = "";
			var dialog = "";
			for (var i = 0; i < json.results.length; i++) {
				
				if (json.results[i].profile_path === null){
				output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"80\" width=\"53\" "+">";	
				}else{
				output += "<li class=\"ui-li-has-thumb\"><a href=#" + json.results[i].id + " class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\"><img src=" + imageBaseURL + json.results[i].profile_path + ">";
				}
				
				output += "<h2>" + json.results[i].name + "</h2></a></li>";
				
				dialog += "<div data-role=\"page\" data-dialog=\"true\" id=\"" + json.results[i].id + "\" >";
				dialog += "<div data-role=\"header\">";
				dialog += "<h1>Trivia</h1></div>";
				dialog += "<div role=\"main\" class=\"ui-content\">";
				dialog += "<h2>" + json.results[i].name + "</h2>";
				dialog += "<h3>Known For:</h3>";
				
				//dialog += "<p>" + json.results[i].known_for[0].title + ", " + json.results[i].known_for[1].title + ", " + json.results[i].known_for[2].title + "</p>";
			
			//BUG FIX
				dialog += "<p>";
									 for(var k = 0; k < json.results[i].known_for.length; k++){
									dialog +=  json.results[i].known_for[k].title;         
									if(k + 1 < json.results[i].known_for.length){
										dialog += ", ";
									}
										
									} 
				dialog += "</p>";
			//BUG FIX
			
				
				if (json.results[i].profile_path === null){
					dialog += "<img src=" + "http://nancyharmonjenkins.com/wp-content/plugins/nertworks-all-in-one-social-share-tools/images/no_image.png" +" height=\"278\" width=\185\" "+">";
				} else{
				dialog += "<img src=" + imageBaseURL2 + json.results[i].profile_path + ">";
				}
				
				dialog += "</div></div>";		
			}
			var list = $("#famousCelebList")
			list.html(output);
			var container = $("#famous-celeb");
			container.after(dialog);
		},
		error: function(e) {
		    console.log(e.message);
		}
	});
	
}

function bindEvents(){
	$(".up-coming").bind("click", function(){
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html" );
	});
	$(".popular-tv").bind("click", function(){
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#popular-tv" );
	});
	$(".famous-celeb").bind("click", function(){
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#famous-celeb" );
	});
	$(".search").bind("click", function(){
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#search" );
	});
	$('.open').on("click", function(){
		$.mobile.activePage.find('#options').panel("open");
    });       
}

$(document).ready(function(){
	loadData();
	bindEvents();
});