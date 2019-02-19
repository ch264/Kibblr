//jshint esversion:6
$(function() {
    console.log("ready!");

    $('#findPlace').submit(function(e) {
        e.preventDefault();
        let search = $('#searchTerm').val();

        $.ajax({
            method: 'GET',
            url: `/api/search?place=${search}`,
            success: successSearch,
            error: errorSearch
        });
    });

    function successSearch(response) {
        clearSearchItems();
        response.forEach(function(element) {
            let placeLink = element.url;
            let placeName = element.name;
            console.log(placeName);
            console.log(placeLink);
            $('.searchedPlaces').append(
                `<a href=${placeLink}>${placeName}</a>`

            )
        })
    }

    function errorSearch(e) {
        console.log("Search not found");
    }

    function clearSearchItems() {
        $(`.searchedPlaces`).empty();
    };







    //Clicking on header leads to main page
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.href = "/";
    });
    //Clicking on review button leads to review page
    $('.review').click(function(e) {
        e.preventDefault();
        window.location.href = "http://localhost:3000/reviewForm.html";
    });




});