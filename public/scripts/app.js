//jshint esversion:6
$(function() {
    console.log("ready!");

    //Clicking on header leads to main page
    $('.navbar-brand').click(function(e) {
        e.preventDefault();
        window.location.href = "/";
    });

// ////////////////////////////////////////////////////////////////////////////////////////////////////
    // rendering places and associated reviews to page 
    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Ajax call to keep place review on place page  
    let placeName = $('.places').text();
    let placeId = '';
    // for hardcoded places. look into db and populate page with seed data, on document ready
    $.ajax({
        method: 'GET',
        url: `/api/placename/${placeName}`,
        success: setReviews,
        error: (err) => console.log(err)
    });

    // place is the responce we get back and we take its ID to put into the url for the server
    function setReviews(place) {
        placeId = place._id;
        console.log(place)
        $.ajax({
            method: 'GET',
            url: `/api/place/${placeId}/reviews`,
            success: (res) => {
                console.log(res);
                res.forEach(review => {
                    $('.append-id').prepend(`
                    <hr>
                    <div>
                        <h2>My Rating: ${review.rating}, Because: ${review.text}</h2>
                        <button type="button" name="button" class="review-button-delete btn pull-right" data-id=${review._id}>Delete</button>
                        <button type="button" class="review-button-edit btn pull-right" data-id="${review._id}">Edit</button>

                        <form class="edit-input" style="display: none" data-id="${review._id}">
                            <input type="text" name="title" value="" />                            <button type="submit" class="review-button-edit-save">Save</button>
                        </form>
                    </div>`);
                })
            },
            error: (err) => console.log(err)
        });
    }

    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    //Create A User
    // ////////////////////////////////////////////////////////////////////////////////////////////////////
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
            success: (res) => console.log('User Created', res),
            error: (err) => console.log("Could not create User", err)
        });
    });

    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Search API
    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#findPlace').submit(function(e) {
        e.preventDefault();
        let search = $('#searchTerm').val();
        $.ajax({
            method: 'GET',
            url: `/api/search?place=${search}`,
            success: successSearch,
            error: (err) => console.log("Could not find searched place", err)
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
                `<hr> <div class="search-results"> <li><a href=${placeLink}>${placeNameFix}</a></li> <div>`
            );
        });
    }

    function clearSearchItems() {
        // empty is jquery method
        $(`.searchedPlaces`).empty();
    }

    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    // create reviewform on click 
    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#form').hide();
    $('.createReviewButton').on('click', function() {
        $('#form').slideToggle();
    });

    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Create review
    // ////////////////////////////////////////////////////////////////////////////////////////////////////
    $('.clickReview').on('click', function(e) {
        e.preventDefault();
        // console.log($('#review').serialize());
        let review = $('#review').serialize() + '&' + $.param({ 'place': placeId }) + '&' + $.param({ 'username': '5c6f21dd6a18cc8bddc86fb1' });
        // review.place = placeId;
        console.log(review);
        $.ajax({
            method: 'POST',
            url: '/api/review',
            data: review,
            success: json => { console.log(json);
                $('.append-id').prepend(`
                <hr class="edit-button-show">
                <div>
                    <h2> My Rating: ${json.rating} <br> Reason for my rating: ${json.text}</h2>
                    <button type="button" name="button" class="review-button-delete btn" >Delete</button>
                    <button type="button" nameclass="review-button-edit btn">Edit</button>

                    <form class="edit-input" style="display: none" data-id="${review._id}">
                    <input type="text" name="input" value="Review" />
                    <button type="submit" class="videogame-button-edit-submit btn btn-secondary">Save</button>
                </form>
                </div>`);},
            error: newReviewError
        });
    });

    function newReviewError(error) {
        console.log(error);
        alert("error on new review creation, please try again later");
    }

    // /////////////////////////////////////////////////////////////////////////////////////////
    /// Delete Review
    // /////////////////////////////////////////////////////////////////////////////////////////

    $('.append-id').on('click','.review-button-delete',  function(e) {
        e.preventDefault();
        console.log(e)
        $.ajax({
            method: 'DELETE',
            url: "/api/review/" +$(this).attr('data-id'),
            success: deleteSuccess,
            error: (err) => console.log("Could not delete this review", err)
        });
    })

    function deleteSuccess(json) {
        console.log('this is json', json)
    }

    // /////////////////////////////////////////////////////////////////////////////////////////
    /// Edit Review
    // /////////////////////////////////////////////////////////////////////////////////////////

    $('.append-id').on('click', '.review-button-edit', function(e) {
        e.preventDefault();
        console.log("edit button clicked")
        $.ajax({
            method: 'PUT',
            url: "/api/review/" +$(this).attr('data-id'),
            success: editSuccess,
            error: (err) => console.log(' Could not edit this review', err)
        })
    })

    function editSuccess(json) {
        console.log(`the edit Success fxn works`)
        $(this).parent().find(".review-button-edit-save").show();
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




    // after login set user to local storage
    // on click grab two things from html
    // $('.loginUser').on('click', function(e) {
    //     e.preventDefault();
    //     let username = $('.username').val();
    //     let password = $('.password').val();
    //     debugger
    //     $.ajax({
    //         method: 'GET',
    //         url: `/api/user/${username}/${password}`,
    //         success: newLoginSuccess,
    //         error: newLoginError
    //     });
    //     // newLoginSuccess = (response) => {
    //     //     localStorage.userId = response._id
    //     // }
    // });
    // newLoginSuccess = (response) => {
    //     localStorage.userId = response._id
    // }
    // newLoginError = () => {
    //         console.log('err');
    //     }
    // localStorage.userId (getting it)
});