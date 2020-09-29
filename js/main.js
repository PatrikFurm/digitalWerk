$(document).ready(function (){
    teamCardRotate();
    smoothScroll();

    mobileChangeBgNav();
    initSlick();
});

// --- SCROLL EVENT --- //
$( document ).scroll( function () {
    navChangeColorOnSroll();
    heroChangeOpacityOnScroll();
});

// --- RESIZE EVENT --- //
$( window ).resize( function(){

});

// --- LOAD EVENT --- //
$( window ).bind( 'load' , function () {
    initGallery()
});

function navChangeColorOnSroll() {
    var $nav = $(".navbar.fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
}

function heroChangeOpacityOnScroll() {
    $("section.hero").css("opacity", 1 - $(window).scrollTop() / $('section.hero').height());
}

function teamCardRotate() {
    $('section.team .team-card').click(function (){
        var $card = $(this);
        $card.toggleClass('rotated');
        $('section.team .team-card').each(function (){
            if ( $card[0] != $(this)[0] ) $(this).removeClass('rotated');
        });
    })
}

function initGallery() {
    $('#lightgallery').lightGallery({
        download: false,
        loop: false
    });
}


/* OnChange validation */
function shouldBeValidated(field) {
    return (
        !(field.getAttribute("readonly") || field.readonly) &&
        !(field.getAttribute("disabled") || field.disabled) &&
        (field.getAttribute("pattern") || field.getAttribute("required"))
    );
}

function instantValidation(field) {
    if (shouldBeValidated(field)) {
        if ( field.value == "") {
            field.removeAttribute("aria-invalid");
            return
        }
        var invalid =
            (field.getAttribute("required") && !field.value) ||
            (field.getAttribute("pattern") &&
                field.value &&
                !new RegExp(field.getAttribute("pattern")).test(field.value));
        if (!invalid) {
            field.setAttribute("aria-invalid", "false");
        } else if (invalid) {
            field.setAttribute("aria-invalid", "true");
        }
    }
}

function mobileChangeBgNav() {
    $('#navbarNavAltMarkup').on('show.bs.collapse', function(){
        $('#main-nav').addClass('collapsing-nav');
    });

    $('#navbarNavAltMarkup').on('hide.bs.collapse', function(){
        $('#main-nav').removeClass('collapsing-nav');
    });
}


function initSlick(){
    $('#slick-them').slick({
        centerMode: true,
        slidesToShow: 1,
        centerPadding: '120px',
        slidesToScroll: 1,
        infinite: true,
        dots: true,

        prevArrow: $('.paginator .prev'),
        nextArrow: $('.paginator .next'),

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '80px',
                }
            },
            {
                breakpoint: 520,
                settings: {
                    centerPadding: '60px',
                }
            },
            {
                breakpoint: 476,
                settings: {
                    centerPadding: '40px',
                }
            },
            {
                breakpoint: 440,
                settings: {
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 417,
                settings: {
                    centerPadding: '20px',
                }
            },
            {
                breakpoint: 396,
                settings: {
                    centerPadding: '15px',
                }
            },
            {
                breakpoint: 384,
                settings: {
                    centerPadding: '10px',
                }
            },
            {
                breakpoint: 370,
                settings: {
                    centerPadding: '5px',
                }
            },

            {
                breakpoint: 360,
                settings: {
                    centerPadding: '0px',
                }
            },
        ]
    });
}

function smoothScroll(){
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                setTimeout(function (){
                    $("#navbarNavAltMarkup").collapse('hide');
                }, 200);

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                // - 70 is the offset/top margin
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 61.5
                }, 800, function() {

                    // Add hash (#) to URL when done scrolling (default click behavior), without jumping to hash
                    if (history.pushState) {
                        history.pushState(null, null, hash);
                    } else {
                        window.location.hash = hash;
                    }
                });
                return false;
            } // End if
        });
}
