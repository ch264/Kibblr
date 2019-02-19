//jshint esversion:6
$(function() {
    console.log("ready!");

    // AJAX Calls
    // const handleResponse = (json) => {
    //     console.log(json);
    // };

    // const handleError = (err) => {
    //     console.log("error");
    // };




    // Redirection through clicks
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