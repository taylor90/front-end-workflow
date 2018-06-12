// extension plugin
(function($){
    //plugin to check if an element exist in the DOM, and run a callback based on the element
    jQuery.fn.elemExist = function(callback){
        var	isFunction = jQuery.isFunction(callback), // check if callback is a function
            isObject = jQuery.isPlainObject(callback), // check if callback is an object
            settings = $.extend({
                amount : ' !=0',
                init : null,
                present : null, // if the element exist
                absent : null, // if the element does not exist
                complete : null
            }, callback),
            state = false;
        target = jQuery(this); // defines target
        var targetExist = eval(target.length + settings.amount); // check if element exist
        if(targetExist && isFunction){
            state = callback.call(this);
        }else if(targetExist && isObject){
            var callIs = jQuery.isFunction(callback.present);
            if(callIs)
                state = callback.present.call(this);
        }else if(!targetExist && isObject){
            var callIsNot = jQuery.isFunction(callback.absent);
            if(callIsNot)
                state = callback.absent.call();
        }else if(targetExist){
            state = true;
        }else if(!targetExist){
            state = false;
        }
        return state;
    };// end of fn.exist
}(jQuery));
// end extension plugin

// Document ready function
jQuery(function(){

    fnAccordion();
    fnMusicList();
    fnSmallSlider();
    fnNavigation();
    fnZoomSlider();
    fnScreen();
    menuSearchFn();
    removeFilterBarItemsFn();
    toggleFilterbarFn();
    mdlCustomMultiSelectFn();

    // Function Accordion
    function fnAccordion(){
        jQuery('#accordion').elemExist({
            present : function(){
                // display the first div by default.
                jQuery('#accordion > div').hide();
                jQuery('#accordion > div').first().css('display', 'block');

                // Get all the links.
                var link = jQuery('#accordion a');

                // On clicking of the links do something.
                link.on('click', function(e) {
                    e.preventDefault();
                    link.removeClass('active');
                    var a = jQuery(this).attr("href");
                    jQuery(this).addClass('active');
                    jQuery(a).slideDown('fast');
                    jQuery('#accordion > div').not(a).slideUp('fast');
                });
            }
        });
    }

    // Function Music
    function fnMusicList() {
        jQuery('#musicList').elemExist({
            present : function(){
                jQuery('#musicList').on('change', function () {
                    var dataUrl = jQuery(this).find(':selected').data('url');
                    var dataTitle = jQuery(this).find(':selected').text();

                    jQuery('#player').jPlayer("setMedia", {
                        title: dataTitle,
                        mp3: dataUrl
                    });
                });
                jQuery("#player").jPlayer({
                    swfPath: "/jplayer",
                    supplied: "mp3",
                    wmode: "window",
                    useStateClassSkin: true,
                    autoBlur: false,
                    smoothPlayBar: true,
                    keyEnabled: true,
                    remainingDuration: true,
                    toggleDuration: true
                });
            }
        });
    }

    // Function small slider
    function fnSmallSlider() {
        jQuery('.js-small-slick').elemExist({
            present : function(){
                jQuery('.js-small-slick').slick({
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>'
                });
            }
        });
        /* Open larger layer */
        jQuery('.zoom').on('click', function () {
            jQuery('#layerSlider').addClass('show');
        });
        jQuery('#layerSlider .closeLayer').on('click', function () {
            jQuery('#layerSlider').removeClass('show');
        });
    }

    // Function small slider
    function fnNavigation() {
        jQuery('.js-menu-tree').elemExist({
            present : function(){
                var jstreeConfig = {
                    "core" : {
                      "themes" : {
                        "variant" : "medium",
                        "icons": false
                      }
                    },
                    "checkbox" : {
                        "keep_selected_style" : false
                    },
                    "plugins" : [ "checkbox", "types", "themes", "wholerow" ]
                };
                jQuery('.js-menu-tree').jstree(jstreeConfig);
                jQuery('.js-menu-tree').bind("open_node.jstree", function () {
                    $('.js-menu-color-item').each(function(e){
                        $(this).css('background-color', $(this).data('colorItem'));
                    });
                }).jstree(jstreeConfig);
                $('.js-menu-color-item').each(function(e){
                    $(this).css('background-color', $(this).data('colorItem'));
                });
                $('.js-menu-tree-checkall').on('click', function(e){
                    e.preventDefault();
                    $(".js-menu-tree").jstree("check_all");
                    $('.js-menu-tree-uncheckall').show();
                    $('.js-menu-tree-checkall').hide();
                });
                $('.js-menu-tree-uncheckall').on('click', function(e){
                    e.preventDefault();
                    $(".js-menu-tree").jstree("uncheck_all");
                    $('.js-menu-tree-checkall').show();
                    $('.js-menu-tree-uncheckall').hide();
                });
                $('.js-menu-tree-uncheckall').hide();
            }
        });
    }

    // Function Zoom slider
    function fnZoomSlider(){
        jQuery('.js-slick-main').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.js-slick-thumbs',
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>'
        });
        jQuery('.js-slick-thumbs').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.js-slick-main',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>'
        });
    }

    // Function Mode Ecran
    function fnScreen() {
        jQuery('.screenMode').elemExist({
            present : function(){
                jQuery('.screenMode span').on('click', function () {
                    jQuery(this).find('span').toggleClass('active');
                    jQuery('.mainContent').toggleClass('wide');
                    jQuery('.navigation, .sidebar').toggleClass('unwide');
                });
            }
        });
    }
    
    //Function menu search
    function menuSearchFn() {
        jQuery('.js-dropdownmenu-searchfield').elemExist({
            present : function(){
                $('.js-dropdownmenu-searchfield').on('click', function(e){
                    e.preventDefault();

                });
            }
        });
    }

    /**
     * remove filterbar items
     * class : js-blk-filterbar-chip-remove
     */
    function removeFilterBarItemsFn() {
        jQuery('.js-blk-filterbar-chip-remove').elemExist({
            present : function(){
                $('.js-blk-filterbar-chip-remove').on('click', function(e){
                    e.preventDefault();
                    $(this).parents('.mdl-chip').remove();
                });
            }
        });
    }

    //js-toogle-filter
    /**
     * toggle filterbar
     * class : js-toogle-filter
     */
    function toggleFilterbarFn() {
        jQuery('.js-toogle-filter').elemExist({
            present : function(){
                $('.js-filterbar-breadcrum').hide();
                $('.js-toogle-filter').on('click', function(e){
                    e.preventDefault();
                    $('.js-filterbar-breadcrum').show();
                    jQuery('.js-blk-filterbar').slideToggle()
                });
            }
        });
    }

    //js-mdl-custom-selectfield
    function mdlCustomMultiSelectFn() {
        jQuery('.js-mdl-custom-selectfield').elemExist({
            present : function(){
                jQuery(document).click(function(e) {
					var target = e.target;
					if ( jQuery(target).hasClass('js-mdl-custom-selectfield-value') || jQuery(target).parents('.js-mdl-custom-selectfield').length > 0 ) {
						
					} else {
						$('.js-mdl-custom-selectfield-list').addClass('hidden');
					}
				})
                $('.js-mdl-custom-selectfield-value, .js-mdl-custom-selectfield-label').on('click', function(){
                    $('.js-mdl-custom-selectfield-list').not($(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-list')).addClass('hidden');
                    $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-list').toggleClass('hidden');
                });

                //no multi select
                $('.js-mdl-custom-selectfield--no-multiselect .js-mdl-custom-selectfield-list .mdl-list__item').on('click', function(){
                    var checkItems = $(this).data('noMultiselect');
                    $('.js-mdl-custom-selectfield--no-multiselect .mdl-list__item').not($(this)).removeClass('active');
                    $(this).addClass('active');
                    if(checkItems) {
                        $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-label').addClass('active');
                    } else {
                        $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-label').removeClass('active');
                    }
                    var str = checkItems;
                    $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-value').html(str);
                });

                //Default multi select
                $('.js-mdl-custom-selectfield-list .mdl-checkbox').on('click', function(){
                    var checkItems = $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-list').find('input[type="checkbox"]:checked')
                    var str = "";
                    var showSelected = "";
                    if(checkItems.length == 0) {
                        $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-label').removeClass('active');
                    } else {
                        $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-label').addClass('active');
                    }
                    checkItems.each(function(){
                        if (checkItems.length > 1) {
                            str += $(this).val()+', ';
                        } else {
                            str += $(this).val();
                        }
                        if($(this).parents('.js-mdl-custom-selectfield').hasClass('js-mdl-custom-selectfield-showselected')) {
                            showSelected += '<span class="mdl-chip mdl-chip--deletable"><span class="mdl-chip__text">'+$(this).val()+'</span></span>';
                        }
                    });
                    if($(this).parents('.js-mdl-custom-selectfield').hasClass('js-mdl-custom-selectfield-showselected')) {
                        $(this).parents('.blk-filterbar-select-items').find('.js-chips-deletable').html(showSelected);
                    }
                    $(this).parents('.js-mdl-custom-selectfield').find('.js-mdl-custom-selectfield-value').html(str);
                });
            }
        });
    }


});