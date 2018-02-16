/*jslint browser: true*/
/*global $, jQuery, console, alert*/


function openNav() {
    document.getElementById("mySidenav").style.width = "360px";

    $('#overlay').addClass('overlay');

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $('#mainBody').removeClass('overlay');

}


$('.fa-search').click(function () {
    'use strict';

    $('.navbar .col-md-6 input').css('display', 'block');
})


$('.secondNavbar .container ul li').click(function () {
    'use strict';

    // Add class selected to the clicked tab and remove it from other tabs
    $(this).addClass('selected').siblings().removeClass('selected');;

});


var slideIndex = 1;
showSlides(slideIndex);


// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


///////////////////// Games Display /////////////////////////////////////

$(document).ready(function () {
    "use strict";

    var feed = 'https://api.myjson.com/bins/l9pn3';

    var myRequest = new XMLHttpRequest();

    myRequest.open('GET', feed);
    myRequest.onload = function () {

        var myData = JSON.parse(myRequest.responseText);
        var gameSection1 = document.getElementsByClassName("games-list-in-actionAndAdv")[0],
            gameSection2 = document.getElementsByClassName("games-list-in-casualGames")[0],
            gameSection3 = document.getElementsByClassName("games-list-in-puzzels")[0],
            restOfGames = document.getElementsByClassName("rest-of-games")[0];

        for (var i = 0; i < myData.length; i++) {

            var img = myData[i].imageURL,
                name = myData[i].name,
                publisher = myData[i].publisher,
                rating = myData[i].rating;


            var appDiv = document.createElement('div');
            $(appDiv).addClass('app');

            var appImageDiv = document.createElement('div');
            $(appImageDiv).addClass('app-image');
            var appContentDiv = document.createElement('div');
            $(appContentDiv).addClass('app-content');

            var Image = document.createElement('img');
            Image.src = img;
            appImageDiv.appendChild(Image);


            var appTitle = document.createElement('div'),
                appPublisher = document.createElement('div'),
                appRating = document.createElement('div');

   //////// drawing the rating stars according to the number of stars comming from Json /////////
   
            for (var j = 0; j < rating; j++) {
                var stars = document.createElement('div');
                $(stars).addClass('fa fa-star');
                appRating.appendChild(stars);
            }
            for (var j = 0; j < (5 - rating); j++) {
                var stars = document.createElement('div');
                $(stars).addClass('fa fa-star-o');
                appRating.appendChild(stars);
            }

    /////////////////////////////////////////////////////////////////////////////////////////////////

            appTitle.innerHTML = name;
            $(appTitle).addClass('app-title');

            appPublisher.innerHTML = publisher;
            $(appTitle).addClass('app-publisher');



            appContentDiv.appendChild(appTitle);
            appContentDiv.appendChild(appPublisher);
            appContentDiv.appendChild(appRating);

            appDiv.appendChild(appImageDiv);
            appDiv.appendChild(appContentDiv);

            if (i < 5) { gameSection1.appendChild(appDiv); }
            else if (i == 5 || i < 10) { gameSection2.appendChild(appDiv); }
            else if (i == 10 || i < 15) { gameSection3.appendChild(appDiv); }
            else { restOfGames.appendChild(appDiv); }

        }
        ////////////// display the next 5 games once 'MORE' is clicked //////////////////


        $('.first-more').click(function () {
            $('.games-list-in-actionAndAdv').animate({
                opacity: 0,
                marginLeft: '-200px'
            }, 'fast', 'linear', function () {
                $(this).empty();
                $(".rest-of-games").fadeIn(1500);
            });
        });



    };
    myRequest.send();
});

          //////////////////////////////////////////////////