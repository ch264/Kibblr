//jshint esversion:6
$(function() {
    console.log("ready!");

    $('#findPlace').click(function(e) {
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
        console.log(response);
    }


    function errorSearch(e) {
        console.log("Search not found");
    }


    // $('.clickReview').on('submit', function(e) {
    //     e.preventDefault();

    // Review Form 
    //     $.ajax({
    //         method: 'POST',
    //         url: 'api/review',
    //         success: reviewSuccess,
    //         error: reviewError
    //     });
    // });

    // function reviewSuccess(response) {
    //     console.log(response);
    //     var reviewInfo = response.Review;
    //     var listReview = `<li>
    // <h2>${Review.place}</h2>
    // <p>${Review.rating}</p>
    // <p>${Review.username}</p>
    // <p>${Review.text}</p>
    // </h2></li>`
    //     $('#Review').append(listReview)
    // };




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