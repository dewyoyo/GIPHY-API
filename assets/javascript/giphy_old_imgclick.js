// Initial array of gifs
var categoryList = [
    "cat",
    "dog",
    "bird",
    "cartoon",
    "comedy"
];

var catButton = $("<button>");
catButton.attr("data-category", categoryList[0]);
$("#category-list").append(catButton);

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#category-list").empty();

    // Looping through the array of movies
    for (var i = 0; i < categoryList.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("gif-btn");
        // Adding a data-attribute
        a.attr("data-category", categoryList[i]);
        // Providing the initial button text
        a.text(categoryList[i]);
        // Adding the button to the buttons-view div
        $("#category-list").append(a);
    }
};
// making buttons with categoryList 
renderButtons();

// Event listener for all button elements
$("button").on("click", function () {
    $("#gifs-appear-here").empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var category = $(this).attr("data-category");

    // Constructing a URL to search Giphy for the name of the category who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        category + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(response.data);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // // Creating a div for the gif
                    // var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var categoryImage = $("<img>");

                    categoryImage.addClass("cat-image");
                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    categoryImage.attr("src", results[i].images.fixed_height.url);
                    
                    // Giving the image tag a still img src and a animate img src
                    // categoryImage.attr("data-still", results[i].images.original_still.url);
                    // categoryImage.attr("data-animate", results[i].images.original_mp4.url);
                    categoryImage.attr("data-state", "animate");
                    

                    // Appending the paragraph and categoryImage we created to the "gifDiv" div we created
                    $("#gifs-appear-here").append(p);
                    $("#gifs-appear-here").append(categoryImage);

                    // // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    // $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});

$('#gifs-appear-here').on('click', '.cat-image', function (){
    console.log("cat-image clicked");
});