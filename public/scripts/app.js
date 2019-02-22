//jshint esversion:6
$(function() {
    console.log("ready!");

    // display review that are in database on page
    let placeName = $('.barebottle').text();
    let placeId='';
    $.ajax({
        method: 'GET',
        url: `/api/place/name/${placeName}`,
        success: setReviews,
        error: (err) => console.log(err)
    });

    function setReviews(place){
        placeId = place._id;

        $.ajax({
            method: 'GET',
            url: `/api/place/${placeId}/reviews`,
            success: (res) => {
                console.log(res);
                res.forEach(review => {
                    $('.append-id').append(`<li>${review.rating}, ${review.text}</li>`);
                })
            },
            error: (err) => console.log(err)
        });
    }
    

    //Create A User
    $('.signUpButton').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: `/api/user`,
            data: {
                name: name,
                email: email,
                password: password,
                username: username
            },
            success: successUser,
            error: errorUser
        });
    });

    function successUser() {
        console.log('User Created');
    }
    function errorUser() {
        console.log("Could not Create User");
    }


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
            let placeNameFix = element.name;
            console.log(placeNameFix);
            console.log(placeLink);
            $('.searchedPlaces').append(
                `<li><a href=${placeLink}>${placeNameFix}</a></li>`
            );
        });
    }
    function errorSearch(e) {
        console.log("Search not found");
    }
    function clearSearchItems() {
        $(`.searchedPlaces`).empty();
    }


    //Clicking on header leads to main page
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.href = "/";
    });

    // toggle reviewform on click 
    $('#form').hide();
    $('.createReviewButton').on('click', function() {
        $('#form').slideToggle();
    });

    // append dynamic review to page
    $('.clickReview').on('click', function(e) {
        e.preventDefault();
        // console.log($('#review').serialize());
        
        let review = $('#review').serialize()+'&'+$.param({ 'place': placeId });
        // review.place = placeId;
        console.log(review);
        $.ajax({
            method: 'POST',
            url: '/api/review',
            data: review,
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
        console.log("error on new review creation");
    }

    // keep new reviews on page after page refresh
    

    // function reviewRemainSuccess(response) {
    //     for(let i = 0; i < response.review.length; i++) {
    //         let newReview = response.review;
    //         $(".append-id").append(`<li>${newReview}</li>`);
    //     }
    // }

    // function reviewRemainError(error) {
    //     console.log(error);
    // }

    //Bootstrap Sign Up Form Validator
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();




});