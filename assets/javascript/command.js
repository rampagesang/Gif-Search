$(document).ready(function() {

  var trending = ["Dogs", "lol", "League", "Korean", "Tesla", "Dodgers", "NBA", "Drake", "Curry"]
  var recentsearches = [];

  function displayGifs() {
    var userChoice = $(this).data("meme");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userChoice + "&api_key=BRw7x8LKCaFSQ0JFm0lvcO95FeOcsCyn";

  $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          $("#gifs").empty();
          for (var i = 0; i < results.length; i++) {
            var animatedResult = results[i].images.fixed_height.url;
            var stillResult = results[i].images.fixed_height_still.url;
            var gifDisplay = $("<img>");
            var gifDiv = $("<div>");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);  
       
            gifDisplay.attr("src", stillResult);
            gifDisplay.addClass("gif");
            gifDisplay.attr("data-state", "still");
            gifDisplay.attr("data-still", stillResult);
            gifDisplay.attr("data-animate", animatedResult);
            
            gifDiv.append(gifRating);
            gifDiv.append(gifDisplay);
            $("#gifs").prepend(gifDiv);
          }
        });
  }

  function displayGifsOnClick(input) {
    var userChoice = input;
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userChoice + "&api_key=BRw7x8LKCaFSQ0JFm0lvcO95FeOcsCyn";

  $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          $("#gifs").empty();
          for (var i = 0; i < results.length; i++) {
            var animatedResult = results[i].images.fixed_height.url;
            var stillResult = results[i].images.fixed_height_still.url;
            var gifDisplay = $("<img>");
            var gifDiv = $("<div>");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);  
       
            gifDisplay.attr("src", stillResult);
            gifDisplay.addClass("gif");
            gifDisplay.attr("data-state", "still");
            gifDisplay.attr("data-still", stillResult);
            gifDisplay.attr("data-animate", animatedResult);
            
            gifDiv.append(gifRating);
            gifDiv.append(gifDisplay);
            $("#gifs").prepend(gifDiv);
          }
        });
  }

  function renderButtons() {
    $("#trending").empty();
    $("#recentsearches").empty();


    for (var i = 0; i < trending.length; i++) {
      var a = $('<button>');
      a.attr("id", "gif-buttons");
      a.attr("data-meme", trending[i]);
      a.text(trending[i]);
      $("#trending").append(a);
    }

    for (var i = 0; i < recentsearches.length; i++) {
      var a = $('<button>');
      a.attr("id", "gif-buttons");
      a.attr("data-meme", recentsearches[i]);
      a.text(recentsearches[i]);
      $("#recentsearches").append(a);
    }
  }
  
  
  function pauseGifs() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  }

  renderButtons();

  $("#search-button").on("click", function(event) {
    event.preventDefault();
    var userInput = $("#search").val().trim();
    recentsearches.push(userInput);
    $("#search").val('');
    renderButtons();
    displayGifsOnClick(userInput);
  });

  $(document).on("click", "#gif-buttons", displayGifs);
  $(document).on("click", ".gif", pauseGifs);


});