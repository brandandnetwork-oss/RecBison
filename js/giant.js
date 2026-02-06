/*
1. preloader
2. fadeIn.element
  2-1. fadeIn.borders
3. page scroll
4. navigation
  4-1. highlight navigation
  4-2. close mobile menu
  4-3. collapse navigation
5. to top arrow animation
6. slick slider
  6-1. slick left
  6-2. slick know-how, slick services
  6-3. slick fullscreen
  6-4. slick fullscreen SPLIT
7. owl carousel
  7-1. testimonials carousel
  7-2. home subtitle carousel
  7-3. home carousel slider
8. facts counter
9. skills bar
10. forms
  10-1. contact form
  10-2. newsletter form
11. services accordion
12. home fadeOut animation
13. YTPlayer
14. typed text
15. swiper thumbnail slider
16 countdown
  16-1. countdown SETUP start
17. google maps POSITION
*/


$(function () {
    "use strict";


    $(window).on("load", function () {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);

        // 2. fadeIn.element
        setTimeout(function () {
            $(".fadeIn-element").delay(600).css({
                display: "none"
            }).fadeIn(800);
        }, 0);
        // 2-1. fadeIn.borders
        setTimeout(function () {
            $(".border-left").removeClass("left-position");
        }, 0);
        setTimeout(function () {
            $(".border-right").removeClass("right-position");
        }, 0);
        setTimeout(function () {
            $(".border-top").removeClass("top-position");
        }, 0);
        setTimeout(function () {
            $(".border-bottom").removeClass("bottom-position");
        }, 0);
    });

    // 3. page scroll
    $("a.page-scroll").on("click", function (e) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, 'easeInOutExpo');
        e.preventDefault();
    });

    // 4. navigation
    // 4-1. highlight navigation
    $("body").scrollspy({
        target: ".navbar-fixed-top"
    })
    // 4-2. close mobile menu
    $(".navbar-collapse ul li a").on("click", function () {
        $(".navbar-toggle:visible").click();
    });
    // 4-3. collapse navigation
    $(window).on("scroll", function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-bg-switch").addClass("main-navigation-bg");
            $(".navbar-bg-switch-bordered").addClass("main-navigation-bg-bordered");
        } else {
            $(".navbar-bg-switch").removeClass("main-navigation-bg");
            $(".navbar-bg-switch-bordered").removeClass("main-navigation-bg-bordered");
        }

        // 5. to top arrow animation
        if ($(this).scrollTop() > 400) {
            $(".to-top-arrow").addClass("show");
        } else {
            $(".to-top-arrow").removeClass("show");
        }
    });

    // 6. slick slider
    // 6-1. slick left
    $(".slick-left").slick({
        fade: true
    });
    // 6-2. slick know-how, slick services
    $(".slick-right-alternative").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 500
    });
    // 6-3. slick fullscreen
    $(".slick-fullscreen").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 800,
        draggable: true,
        dots: true,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });
    // 6-4. slick fullscreen SPLIT
    $(".slick-fullscreen-split").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 800,
        draggable: true,
        dots: true,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });

    // 7. owl carousel
    // 7-1. testimonials carousel
    $("#testimonials-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"]
    });
    // 7-2. home subtitle carousel
    $(".home-page-subtitle-carousel").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: false,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
        responsiveRefreshRate: 50
    });
    // 7-3. home carousel slider
    $("#home-page-img-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });

    // 8. facts counter
    $(".facts-counter-number").appear(function () {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });

    // 9. skills bar
    $(".show-skillbar").appear(function () {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });

    // 10. forms
    // 10-1. contact form
    $("form#form").on("submit", function () {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                "inputError"), s = !0;
            else if ($(this).hasClass("email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                    "inputError"), s = !0);
            }
        }), !s) {
            $("form#form input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#form").slideUp("fast", function () {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
    // 10-2. newsletter form
    $("form#subscribe").on("submit", function () {
        $("form#subscribe .subscribe-error").remove();
        var s = !1;
        if ($(".subscribe-requiredField").each(function () {
            if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter your Email</span>'),
                $(this).addClass("inputError"), s = !0;
            else if ($(this).hasClass("subscribe-email")) {
                var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter a valid Email</span>'),
                    $(this).addClass("inputError"), s = !0);
            }
        }), !s) {
            $("form#subscribe input.submit").fadeOut("normal", function () {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function () {
                $("form#subscribe").slideUp("fast", function () {
                    $(this).before('<div class="subscribe-success">Thank you for subscribing.</div>');
                });
            });
        }
        return !1;
    });

    // 11. services accordion
    $(".services-accordion ul li span").on("click", function () {
        $(this).parent("li").siblings("li.toggled").removeClass("toggled").children("ul").stop(true, true).slideUp();
        if (!$(this).parent().hasClass("toggled")) {
            $(this).next("ul").stop(true, true).slideDown();
            $(this).parent().addClass("toggled");
        } else {
            $(this).next("ul").stop(true, true).slideUp();
            $(this).parent().removeClass("toggled");
        }
    });

    // 12. home fadeOut animation
    $(window).on("scroll", function () {
        $("h1.home-page-title, .home-page-subtitle-carousel").css("opacity", 1 - $(window).scrollTop() / $(".hero-fullscreen, #viewport").height());
    });

    // 13. YTPlayer
    $("#background-video").YTPlayer({
        videoId: "r8j-MWq4HZc", // DEMO URL is: https://www.youtube.com/watch?v=r8j-MWq4HZc
        mute: true,             // options: true, false
        pauseOnScroll: false,
        repeat: true,
        fitToBackground: true,
        playerVars: {
            modestbranding: 0,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            wmode: "transparent",
            branding: 0,
            rel: 0,
            autohide: 0
        }
    });

    // 14. typed text
    $(".typed-title").typed({
        strings: ["Giant", "Fully Responsive", "Creative Portfolio", "Made for KINGS"],
        typeSpeed: 25,
        backDelay: 3500,
        loop: true
    });

    // 15. swiper thumbnail slider
    var swipersliderTop = new Swiper(".swiper-slider-top", {
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        autoplay: 4000,
        loop: false,
        mousewheelControl: false,
        keyboardControl: true
    });
    var swipersliderBottom = new Swiper(".swiper-slider-bottom", {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 1,
        slideToClickedSlide: true
    });
    swipersliderTop.params.control = swipersliderBottom;
    swipersliderBottom.params.control = swipersliderTop;

    $(document).on("ready", function () {
        // 16. countdown 
        $('#countdown').countdown({
            since: new Date(Date.parse(setting.counter.lastDate)),
            layout: $('#countdown').html(),
            timezone: setting.counter.timeZone
        });
    });
    // 16-1. countdown SETUP start
    var setting = {
        counter: {
            lastDate: '1/1/2022 00:00:00', // target date settings, 'MM/DD/YYYY HH:MM:SS'
            timeZone: null
        }
    };


});