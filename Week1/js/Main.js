	// Adds preset data if no data present
	function addDefaultData(){
		for(var n in json){
			var newId = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(newId, JSON.stringify(json[n]));
		}
	}
	//Display localStorage Function
	function displayLocalStorage() {
		if (isNaN(localStorage.key(0)) || localStorage.length === 0) {
			alert("There are no saved reviews so default reviews were added.");
			addDefaultData();
		};
		var html = '';
		for (var i=0; i<localStorage.length; i++) {
			if(isNaN(localStorage.key(i))){
			}else{
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var newObj = JSON.parse(value);
				if (newObj.catergory[1] === "First Person Shooter"){
					html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src="img/First Person Shooter.png" />' + '<ul><li style=display:none>' + key + '</li>';	
				} else {
					html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src=img/' + newObj.catergory[1] + '.png />' + '<ul><li style=display:none>' + key + '</li>';	
				}
				for (var o in newObj) {
					if (o === name){
						html += newObj.name[1];
					}
					html += '<li>' + newObj[o][0] +''+ newObj[o][1] + '</li>';

				};
				html += '<div><input type=button title=deleteEntry name=deleteEntry id=deleteEntry value=Delete data-inline=true /><input type=button title=editEntry name=editEntry id=editEntry value=Edit data-inline=true '+ key +' /></div></ul></div>';
				$('#displayReviews div #dynamicReviews').html(html);
			};
		};
	};
	displayLocalStorage();
//Home Page
$(document).on('pageinit', '#home', function(){

});	
//Add Item Page
$(document).on('pageinit', '#addItem', function(){
	//Add Item Page Global Variables
	var types = [gameCatergory, gameName, gamePublisher, gameRelease, gameRate, gameConsole, comments];
	var types2 = ["Game Catergory: ", "Game Name: ", "Game Publisher: ", "Game Release: ", "Game Rate: ", "Game Console: ", "Comments: "];
	var myForm = $('#gameReviewForm');
	var errorLink = $('#addItemErrorsLink');
	//Form Validator
	myForm.validate({
		ignore: '.ignore',
		invalidHandler: function(form, validator){
			errorLink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]');
				var legend = $('#consoleList').children('legend');
				var fieldName = key=="xbox360" ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
			$('#addItemErrors ul').html(html);
		},
		submitHandler: function(){
			var newId = Math.floor(Math.random() * 1000000001);
			var newType = {};
			newType.catergory = ["Game Catergory: ", gameCatergory.value];
			newType.name = ["Game Name: ", gameName.value];
			newType.publisher = ["Game Publisher: ", gamePublisher.value];
			newType.release = ["Game Release: ", gameRelease.value];
			newType.rate = ["Game Rating: ", gameRate.value];
			newType.console = ["Game Console: ", getConsole()];
			newType.comments = ["Comments: ", comments.value];
			localStorage.setItem(newId, JSON.stringify(newType));
			alert(gameName.value + " Game Review Edited!");
			localStorage.removeItem("Game Catergory: ");
			localStorage.removeItem("Game Name: ");
			localStorage.removeItem("Game Publisher: ");
			localStorage.removeItem("Game Release: ");
			localStorage.removeItem("Game Rate: ");
			localStorage.removeItem("Game Console: ");
			localStorage.removeItem("Comments: ");
			return;
		}
	});
	var getCatergory = function () {
		localStorage.setItem("Game Catergory: ", $('span.required').html());
	};
	var getName = function () {
		localStorage.setItem("Game Name: ", gameName.value);
	};
	var getPublisher = function () {
		localStorage.setItem("Game Publisher: ", gamePublisher.value);
	};
	var getRelease = function () {
		localStorage.setItem("Game Release: ", gameRelease.value);
	};
	var getRate = function () {
		var label = document.getElementById("ratingLabel");
		localStorage.setItem("Game Rate: ", gameRate.value);
	};
	var getComments = function () {
		localStorage.setItem("Comments: ", comments.value);
	};
	var getConsole = function () {
		if($('#xbox360').is(':checked') || $('#ps3').is(':checked') || $('#wii').is(':checked')){
			var con = [];
			if($('#xbox360').is(':checked')){
				con.push($('#xbox360').val())
			}
			if($('#ps3').is(':checked')){
				con.push($('#ps3').val())
			}
			if($('#wii').is(':checked')){
				con.push($('#wii').val())
			}
			console.log(con)
			localStorage.setItem("Game Console: ", con);
			return (con);
		} else {
			alert("Please select atleast one console");
		}
	};
	function listLinks(key, thisLi){
		//Delete Display Data Button
		var deleteLink = document.createElement("input");
		deleteLink.key = key;
		deleteLink.setAttribute("type","button");
		deleteLink.setAttribute("class","button");
		deleteLink.setAttribute("title","deleteEntry");
		deleteLink.setAttribute("name", "deleteEntry");
		deleteLink.setAttribute("id","deleteEntry");
		deleteLink.setAttribute("value", "Delete Review");
		thisLi.appendChild(deleteLink);
		//Edit Display Link
		var editLink = document.createElement("input");
		editLink.key = key;
		editLink.setAttribute("type","button");
		editLink.setAttribute("class","button");
		editLink.setAttribute("title","editEntry");
		editLink.setAttribute("name", "editEntry");
		editLink.setAttribute("id","editEntry");
		editLink.setAttribute("value", "Edit Review");
		thisLi.appendChild(editLink);
	}
	function addImage(catergory, thisLi){
		var newLi = document.createElement("li");
		var image = document.createElement("img");
		var sorce = image.setAttribute("src", "img/"+ catergory + ".png");
		image.setAttribute("class","image");
		newLi.appendChild(image);
	}

	
	// Fill form data with old data from last visit
	var autoFillData = function (){
		for (var i = 0; i<types2.length; i++) {
			var key = types2[i];
			var value = localStorage.getItem(key);
			if (value !== undefined || value !== null) {
				
				types[i].value = value;
			};
		};
	};
	
	// Auto run functions
	autoFillData();
	
	// Binds to all input fields for storage
	$('#gameCatergory-button').bind("blur", getCatergory);
	$('#gameName').bind("blur", getName);
	$('#gamePublisher').bind("blur", getPublisher);
	$('#gameRelease').bind("blur", getRelease);
	$('#gameRate').bind("change", getRate);
	$('#gameConsole').bind("change", getConsole);
	$('#comments').bind("blur", getComments);	
});
// End Add Item page
// Display Reviews Page
$(document).on('pageinit', '#displayReviews', function(){
	function deleteThis(key){
		var thisConfirm = confirm("Are you sure you want to delete this entry?");
		if(thisConfirm){
			localStorage.removeItem(key);
		} else {
			return;
		};
	}
	$('#deleteEntry').bind('click', deleteThis);

});
//End Display Reviews Page