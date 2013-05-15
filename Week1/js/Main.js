//This code has to be outside of all other functions for now.
function addDefaultData(){
	for(var n in json){
		var newId = Math.floor(Math.random() * 1000000001);
		localStorage.setItem(newId, JSON.stringify(json[n]))
	}
}
function displayLocalStorage() {
	if (isNaN(localStorage.key(0)) || localStorage.length === 0) {
		alert("There are no saved reviews so default reviews were added.");
		addDefaultData();
	};
	var html = '';
	for (i=0; i<localStorage.length; i++) {
		if(isNaN(localStorage.key(i))){
		}else{
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var newObj = JSON.parse(value);
			if (newObj.category[1] === "First-Person-Shooter"){
				html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src="img/First-Person-Shooter.png" />' + '<ul><li style=display:none>' + key + '</li>';	
			} else {
				html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src=img/' + newObj.category[1] + '.png />' + '<ul><li style=display:none>' + key + '</li>';	
			}
			for (var o in newObj) {
				if (o === name){
					html += newObj.name[1]
				}
				html += '<li>' + newObj[o][0] +''+ newObj[o][1] + '</li>';

			};
			html += '<div><input type="button" title="deleteEntry" class="deleteButton" name="deleteEntry" id="'+key+'" value="Delete" data-inline=true /><input type=button title=editEntry name=editEntry id='+key+' class="editButton" value=Edit data-inline=true '+ key +' /></div></ul></div>'
			$('#displayReviews div #dynamicReviews').html(html)
		};
	};
};
// Displays for different categorys
function displaycategory(cat) {
	if (isNaN(localStorage.key(0)) || localStorage.length === 0) {
		alert("There are no saved reviews so default reviews were added.");
		addDefaultData();
	};
	var html = '';
	for (i=0; i<localStorage.length; i++) {
		if(isNaN(localStorage.key(i))){
		}else{
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var newObj = JSON.parse(value);
			if(newObj.category[1] === cat){
				if (newObj.category[1] === "First-Person-Shooter"){
					html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src="img/First-Person-Shooter.png" />' + '<ul><li style=display:none>' + key + '</li>';	
				} else {
					html += '<div data-role="collapsible" id=' + i + '><h3>' + newObj.name[1] + '</h3><img height="50" width="100" src=img/' + newObj.category[1] + '.png />' + '<ul><li style=display:none>' + key + '</li>';	
				}
				for (var o in newObj) {
					if (o === name){
						html += newObj.name[1]
					}
					html += '<li>' + newObj[o][0] +''+ newObj[o][1] + '</li>';
	
				};
				html += '<div><input type="button" title="deleteEntry" class="deleteButton" name="deleteEntry" id="'+key+'" value="Delete" data-inline=true /><input type=button title=editEntry name=editEntry id='+key+' class=editEntry value=Edit data-inline=true/></div></ul></div>'
				$('#'+cat+' div #'+cat+'Reviews').html(html)
			};
		};
	};
};
function editThis(key){
		var lsPull = localStorage.getItem(key)
		var thisItem = JSON.parse(lsPull)
		for(var n in thisItem){
			if(n === "category"){
				console.log($('option[value='+thisItem.category[1]+']'))
				$('option[value='+ thisItem.category[1] + ']').attr('selected', true);
			} else if(n === "name"){
				gameName.value = thisItem.name[1]
			} else if(n === "publisher"){
				gamePublisher.value = thisItem.publisher[1]
			} else if(n === "release"){
				gameRelease.value = thisItem.release[1]
			} else if(n === "rate"){
				gameRate.value = thisItem.rate[1]
			} else if(n === "console"){
				for(var i=0; i<thisItem.console[1].length; i++){
						console.log($('input[value="'+thisItem.console[1][i]+'"]'))
						$('input[value="'+thisItem.console[1][i]+'"]').attr('checked', true)
				}
			} else if(n === "comments"){
				comments.value = thisItem.comments[1]
			};
		}
		getcategory();
		getName();
		getPublisher();
		getRelease();
		getRate();
		getConsole();
		getComments();
		window.location.assign('#addItem')
}
var thisDelete = function(key){
	var thisGame = localStorage.getItem(key);
	var gameParse = JSON.parse(thisGame)
	var thisName = gameParse.name[1]
	var thisConfirm = confirm("Are you sure you want to delete "+thisName+"?");
	if(thisConfirm){
		localStorage.removeItem(key);
		location.reload();
	} else {
		return;
	};
};
var getcategory = function () {
	localStorage.setItem("Game category: ", $('span.required').html());
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
var getConsole = function () {
	var con = [];
	$('input[type=checkbox]').each(function(){
		if(this.checked){
			con.push(this.value)
		}
	})
	localStorage.setItem("Game Console: ", con);
	return (con);
};
var getComments = function () {
	localStorage.setItem("Comments: ", comments.value);
};
function addImage(category, thisLi){
	var newLi = document.createElement("li");
	var image = document.createElement("img");
	var sorce = image.setAttribute("src", "img/"+ category + ".png");
	image.setAttribute("class","image")
	newLi.appendChild(image);
};
var autoFillData = function (){
	for (i = 0; i<types2.length; i++) {
		var key = types2[i];
		var value = localStorage.getItem(key);
		if (value !== undefined && key !== "Game category: ") {
			types[i].value = value;
		} else if (value !== undefined && key === "Game category: "){
			$('#gamecategory').val(value)
		}
	};
};
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});
$('#Action').ready(function(){
	displaycategory("Action");
});
$('#Adventure').ready(function(){
	displaycategory("Adventure");
});
$('#First-Person-Shooter').ready(function(){
	displaycategory("First-Person-Shooter");
});
$('#Racing').ready(function(){
	displaycategory("Racing");
});
$('#Role-Playing').ready(function(){
	displaycategory("Role-Playing");
});

$('#addItem').on('pageinit', function(){
		var types = [gamecategory, gameName, gamePublisher, gameRelease, gameRate, gameConsole, comments];
		var types2 = ["Game category: ", "Game Name: ", "Game Publisher: ", "Game Release: ", "Game Rate: ", "Game Console: ", "Comments: "];
		var myForm = $('#gameReviewForm');
		var errorLink = $('#addItemErrorsLink');
		$('#clearData').click(function(){
			var confirmThis = confirm("This will clear all saved data!")
			if(thisConfirm){
				localStorage.clear();
			} else {
				return;
			};
		})
		myForm.validate({
			ignore: '.ignore',
			invalidHandler: function(form, validator){
				errorLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]')
					var legend = $('#consoleList').children('legend');
					var fieldName = key=="xbox360" ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>'
				};
				$('#addItemErrors ul').html(html);
			},
			submitHandler: function(){
				var newId = Math.floor(Math.random() * 1000000001);
				var newType = {};
				newType.category = ["Game category: ", gamecategory.value];
				newType.name = ["Game Name: ", gameName.value];
				newType.publisher = ["Game Publisher: ", gamePublisher.value];
				newType.release = ["Game Release: ", gameRelease.value];
				newType.rate = ["Game Rating: ", gameRate.value];
				newType.console = ["Game Console: ", getConsole()];
				newType.comments = ["Comments: ", comments.value];
				localStorage.setItem(newId, JSON.stringify(newType));
				alert(gameName.value + " Game Review Edited!");
				localStorage.removeItem("Game category: ");
				localStorage.removeItem("Game Name: ");
				localStorage.removeItem("Game Publisher: ");
				localStorage.removeItem("Game Release: ");
				localStorage.removeItem("Game Rate: ");
				localStorage.removeItem("Game Console: ");
				localStorage.removeItem("Comments: ");
				return;
			}
		});
		var getcategory = function () {
			localStorage.setItem("Game category: ", $('span.required').html());
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
		var getConsole = function () {
			var con = [];
			$('input[type=checkbox]').each(function(){
				if(this.checked){
					con.push(this.value)
				}
			})
			localStorage.setItem("Game Console: ", con);
			return (con);
		};
		var getComments = function () {
			localStorage.setItem("Comments: ", comments.value);
		};
		function addImage(category, thisLi){
			var newLi = document.createElement("li");
			var image = document.createElement("img");
			var sorce = image.setAttribute("src", "img/"+ category + ".png");
			image.setAttribute("class","image")
			newLi.appendChild(image);
		};
		var autoFillData = function (){
			for (i = 0; i<types2.length; i++) {
				var key = types2[i];
				var value = localStorage.getItem(key);
				if (value !== undefined && key !== "Game category: ") {
					types[i].value = value;
				} else if (value !== undefined && key === "Game category: "){
					$('#gamecategory').val(value)
				}
			};
		};
		autoFillData();
		$('#gamecategory-button').bind("mouseleave", getcategory);
		$('#gameName').bind("blur", getName);
		$('#gamePublisher').bind("blur", getPublisher);
		$('#gameRelease').bind("blur", getRelease);
		$('#gameRate').bind("change", getRate);
		$('#gameConsole').bind("change", getConsole);
		$('#comments').bind("blur", getComments);
	
	//any other code needed for addItem page goes here
	
});
$('#displayReviews').ready(function(){
	displayLocalStorage();
});
$('#displayReviews').on('pageinit', function(){
  //Display Reviews Page Function
  $('.deleteButton').click(function(){thisDelete(this.id)});
  $('.editButton').click(function(){editThis(this.id)})
});