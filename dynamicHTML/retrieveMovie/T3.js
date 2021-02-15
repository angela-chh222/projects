	function findMovie() {
		var xhttp = new XMLHttpRequest();
		var movieIDInput = document.getElementById("movieID").value;
		var movielink1 = "http://www.omdbapi.com/?i=";
		var movielink2 = "&apikey=bec77b67";
		var link = movielink1.concat(movieIDInput, movielink2);
		
		if (movieIDInput == "" || movieIDInput == null) {
			alert("Please enter an ID!");
			return false;
		}
		
		xhttp.onreadystatechange = function() {			
			if (this.readyState == 4 && this.status == 200) {
				getMovie(xhttp);
			}
		};
		
		xhttp.open("GET", link, true);
		xhttp.send();
		
		document.getElementById("movieID").value = "";
	}
	
	function getMovie(xml) {
		//alert(xml.responseText);
		var movieReturn = xml.responseText;
		var movieInfo = JSON.parse(movieReturn);
		
		document.getElementById("displayInfoHere").innerHTML = "Title: " + movieInfo.Title + "<br>" + "Year: " + movieInfo.Year + "<br>" + "Runtime: " + movieInfo.Runtime + "<br>" + "Genre: " + movieInfo.Genre + "<br>" + "Actors: " + movieInfo.Actors;
	}

	
	function addReview() {
		var newReviewValue = document.getElementById("displayNewReview").value;
		var newRatingValue = document.getElementById("ratings").value;
		
		if (newReviewValue == "" || newReviewValue == null) {
			alert("Please leave a review!");
			return false;
		}
		
		if (newRatingValue == "noRating") {
			alert("Please leave a rating!");
			return false;
		}
		
		var newRating = document.createElement("p");
		var newReview = document.createElement("p");
		
		var r = document.createTextNode(newRatingValue);
		var r2 = document.createTextNode(newReviewValue);
		newRating.appendChild(r);
		newReview.appendChild(r2);
		document.getElementById("displayReviewHere").appendChild(newRating);
		document.getElementById("displayReviewHere").appendChild(newReview);
		
		document.getElementById("displayNewReview").value = "";
		document.getElementById("ratings").value = "noRating";
	}
	