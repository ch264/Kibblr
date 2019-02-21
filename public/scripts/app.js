//jshint esversion:6
$(function() {
    console.log("ready!");
    //Search API
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
                `<li><a href=${placeLink}>${placeName}</a></li>`
            )
        })
    }

    function errorSearch(e) {
        console.log("Search not found");
    }

    function clearSearchItems() {
        $(`.searchedPlaces`).empty();
    };


    //Review Form API
    // $('.review').click(function(e) {
    //     e.preventDefault();
    //     var restaurantPage = document.getElementsByTagName('h2')[0].innerText;

    //     console.log(restaurantPage);

    //     $.ajax({
    //         method: 'GET',
    //         url: `/api/search?place=${restaurantPage}`,
    //         success: successWrite,
    //         error: errorWrite
    //     });
    // })

    // function successWrite(pizza) {

    //     console.log(pizza);
    //     let name = pizza[0].name;
    //     $('.append-id').append(name);
    // }

    // function errorWrite(e) {
    //     console.log("Place not found");
    // }

    //Clicking on header leads to main page
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.href = "/";
    });
    // Clicking on review button leads to review page
    // $('.review').click(function(e) {
    //     e.preventDefault();
    //     window.location.href = "http://localhost:3000/reviewForm.html";
    // });

    // create reviewform on click 
    $('#form').hide();
    $('.createReviewButton').on('click', function () {
        $('#form').slideToggle();
        
    });

    $('.clickReview').on('click', function (e) {
        e.preventDefault();
        // console.log($('#review').serialize());
        console.log("clicking");
    
        $.ajax({
            method: 'POST',
            url: '/api/review',
            data: $('#review').serialize(),
            success: newReviewSuccess,
            error: newReviewError
        });
    });
    
    function newReviewSuccess(json) {
        // console.log(json);
        $('.append-id').append(`<li>${json.rating}, ${json.text}</li>`);
        // console.log($('.append-id'));
    }

    function newReviewError(error) {
        console.log(error);
        console.log("error on new review creation")
    }
});