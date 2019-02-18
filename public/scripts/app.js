//jshint esversion:6
$(function() {
    console.log("ready!");

    // AJAX Calls
    const handleResponse = (json) => {
        console.log(json);
    };

    const handleError = (err) => {
        console.log("error");
    };

    //Create a user through signup
    $.ajax({
        method: 'POST',
        url: '/api/user',
        success: handleResponse,
        error: handleError
    });

    //Sign a user in 
    $.ajax({
        method: 'GET',
        url: '/api/user',
        success: handleResponse,
        error: handleError
    });

    //Enter a review
    // $.ajax({
    //   method:
    //   url:
    //   success:
    //   error:
    // })


    // Redirection through clicks
    //Clicking on header leads to main page
    $('.navbar-brand').click(function() {
        window.location.href = "/Users/User/Desktop/Project01/views/index.html";
    });
    //Clicking on review button leads to review page
    $('.review').click(function() {
        window.location.href = "/Users/User/Desktop/Project01/views/reviewForm.html";
    });



});