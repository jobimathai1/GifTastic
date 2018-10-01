//load the javascript once HTML document is finished loading.
$(document).ready(function () {
    //Default buttons to display when the page loads
    var displayedButtons = ["tacos", "cats", "bloopers"];

    //Function to display the images from Giphy API onto the page.
    function displayImg() {
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;

        //Query the Giphy API based on the user's input. 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=t0gOHu8czKpdjDuhsD1vHDyFgnyPuXkY";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            for (var i = 0; i < limit; i++) {

                //Create a new div on the page to display the Gifs
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                //Create an img url based on the data provided by the Giphy API.
                var image = $("<img>");
                image.attr("src", response.data[i].images.original_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating);
                $("#display-images").append(displayDiv);
            }
        });
    }

    //After the user enters a word in the search field, create a button to display on the page
    function renderBtns() {
        $("#display-buttons").empty();

        for (var j = 0; j < displayedButtons.length; j++) {

            var newBtn = $("<button>")
            newBtn.attr("class", "btn btn-default");
            newBtn.attr("id", "input")
            newBtn.attr("data-name", displayedButtons[j]);
            newBtn.text(displayedButtons[j]);
            $("#display-buttons").append(newBtn);
        }
    }

    //a function to change the state of the image from Still to Animate & back to Still when the image is clicked on by the user
    function imgChangeState() {
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        }
        else if (state == "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }
    }

    //Creating a new button for each word entered by the users
    $("#submitBtn").on("click", function () {
        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
        renderBtns();

        return false;
    })
    //Calling the renderBtns function 
    renderBtns();

    //When the button is clicked, this displays the gifs
    $(document).on("click", "#input", displayImg);

    //When the user clicks on a gif, it changes the state from still to animate & vice versa
    $(document).on("click", ".gif", imgChangeState);

});