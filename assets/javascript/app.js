$(document).ready(function(){
    var displayedButtons = ["cat", "dog", "birds"];

    function displayImg(){
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=t0gOHu8czKpdjDuhsD1vHDyFgnyPuXkY";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            for (var i = 0; i < limit; i++){
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: "+ rating);
                displayDiv.append(pRating);
                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderBtns(){
        $("#display-buttons").empty();

        for (var j = 0; j<displayedButtons.length; j++){

            var newBtn = $("<button>");
            newBtn.attr("class", "btn btn-default");
            newBtn.attr("id", "input");
            newBtn.attr("data-name", displayedButtons[j]);
            newBtn.text(displayedButtons[j]);
            $("#display-buttons").append(newBtn);
        }
    }

    function imgChangeState(){
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        if(state == "still"){
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        }
        else if(state == "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitBtn").on("Click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
        renderBtns();

        return false;
    })

    renderBtns();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imgChangeState);

});