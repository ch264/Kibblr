//jshint esversion:6
$(function() {
    console.log("ready!");

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

    //Sign A User In

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
<<<<<<< HEAD
            );
        });
=======
            )
        })
>>>>>>> master
    }

    function errorSearch(e) {
        console.log("Search not found");
    }

    function clearSearchItems() {
        $(`.searchedPlaces`).empty();
<<<<<<< HEAD
    }


=======
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
>>>>>>> master

    //Clicking on header leads to main page
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.href = "/";
    });
<<<<<<< HEAD

=======
    // Clicking on review button leads to review page
    // $('.review').click(function(e) {
    //     e.preventDefault();
    //     window.location.href = "http://localhost:3000/reviewForm.html";
    // });
>>>>>>> master

    // create reviewform on click 
<<<<<<< HEAD
    $('.createReviewButton').on('click', function() {
=======
    $('#form').hide();
    $('.createReviewButton').on('click', function () {
>>>>>>> master
        $('#form').slideToggle();
        
    });
<<<<<<< HEAD

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
=======

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
>>>>>>> master
});