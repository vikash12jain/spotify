

 $(function(){$(".ticker1").modernTicker({effect:"scroll",scrollType:"continuous",scrollStart:"inside",scrollInterval:20,transitionTime:500,autoplay:true});
$(".ticker2").modernTicker({effect:"fade",displayTime:4e3,transitionTime:300,autoplay:true});$(".ticker3").modernTicker({effect:"type",typeInterval:10,displayTime:4e3,transitionTime:300,autoplay:true});$(".ticker4").modernTicker({effect:"slide",slideDistance:100,displayTime:4e3,transitionTime:350,autoplay:true})});


$(window).load(function() {
   
    
    $("#flexiselDemo3").flexisel({
        visibleItems: 5,
        itemsToScroll: 1,         
        autoPlay: {
            enable: true,
            interval: 1000,
            pauseOnHover: true
        }        
    });
    
  
});





 $('.accordion').on('click', '.title', function(event) {
        event.preventDefault();
        $(this).siblings('.accordion .active').next().slideUp('normal');
        $(this).siblings('.accordion .title').removeClass("active");
        
        if($(this).next().is(':hidden') == true) {
            $(this).next().slideDown('normal');
            $(this).addClass("active");
        }
    });
    $('.accordion .content').hide();
    $('.accordion .active').next().slideDown('normal');
    

// for hover dropdown menu
  $('ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });


$("#latest-news").owlCarousel({ 
		items : 4,
		pagination	: true,	
		autoPlay	: true,
		stopOnHover	: true,
	});
 // slick slider call 
    $('.slick_slider').slick({
      dots: true,
      infinite: true,      
      speed: 500,      
      slidesToShow: 1,
      slide: 'div',
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear'

    });
    // slick slider2 call 
    $('.slick_slider2').slick({
      dots: true,
      infinite: true,      
      speed: 500,      
      autoplay: true,
      autoplaySpeed: 2000,
      fade:true,
      slide: 'div',
      cssEase: 'linear'
    });

    $('#foo1').carouFredSel({
                items: 6,
                height: 220,
                prev: '.prev',
                next: '.next',
                auto: true,
                scroll: 1
            });


