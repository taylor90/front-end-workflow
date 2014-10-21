//var myinterval = setInterval(function() {
//    console.log(new Date());
//}, 1000);
$(function() {
    
    var sildewidth = 780;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;
    
    //caching DOM
    var $vidSilder = $('.video-slideshow-wrapper');
    var $vidSliderContainer = $vidSilder.find('.video-slideshow-slides');
    var $vidSlides = $vidSliderContainer.find('.video-slideshow-slide');
    
    var interval;
    
    function startSlider () {
        interval = setInterval(function() {
            $vidSliderContainer.animate({'margin-left':'-='+sildewidth}, animationSpeed, function() {
                currentSlide++;
                if (currentSlide === $vidSlides.length) {
                    currentSlide = 1;
                    $vidSliderContainer.css('margin-left',0);
                }
            });
        }, pause);
    }
    
    function pauseSlider() {
        clearInterval(interval);
    }
    
    $vidSilder.on('mouseenter', pauseSlider).on('mouseleave', startSlider);
    
    startSlider();
    //setInterval
    //animate margin-left
    //if last silde, go to silde 1 (0px);
    
    // listen for mouseenter and pause
    //resume one mouse leave
    
});