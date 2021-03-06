/*
Created by Bertrand on 06/2017.
 */

$(document).ready(function() {  
    
    var toogle = $('#toggle');
    var nav = $('#navigation');
    var home = $('#home');
    var walk = $('#walk');
    var bike = $('#bike');
    var content_home = $('#content_home');
    var content_walk = $('#content_walk');
    var content_bike = $('#content_bike');
    var rows = $('.rows');
    var sum = 0;
    var percentage = 0;
    var px = 0;
    var goal = 3000;
    var line = $('#line');
    var mySlider = $('#mySlider');
    var settings_btn = $('#btn_settings'); 
    var background_slider = $('.background-slider');
    var water_color = '';
    var water = $('.water');
    var start = 0; 
    var end = 7;
    var previous = $('#previous');
    var next = $('#next');
    var first_row = rows.first();
    var last_row = rows.last();
    var first_btn = $('#first');
    var last_btn = $('#last');
    
    // Show / Animate last ten rows when page is loaded //
    rows.slice(start,end).show();
    animateWater();

    // Vertical Navigation //
    toogle.click(function() {
        $(this).toggleClass('on');
        nav.animate({width: 'toggle'});
    });

    content_home
        .mouseenter(function () {
            $(this).css('background-color', '#4975FB');
            home.removeClass('md-light md-inactive');
            home.addClass('link');

        })
        .mouseleave(function () {
            $(this).css('background-color', 'transparent');
            home.addClass('md-light md-inactive');
        })

    content_walk
        .mouseenter(function () {
            $(this).css('background-color', '#924DE6');
            walk.removeClass('md-light md-inactive');
            walk.addClass('link');
        })
        .mouseleave(function () {
            $(this).css('background-color', 'transparent');
            walk.addClass('md-light md-inactive');
        })

    content_bike
        .mouseenter(function () {
            $(this).css('background-color', '#F59500');
            bike.removeClass('md-light md-inactive');
            bike.addClass('link');
        })
        .mouseleave(function () {
            $(this).css('background-color', 'transparent');
            bike.addClass('md-light md-inactive');
        })

    // Slider //
    mySlider
        .slider({
          formatter: function(value) {
               return value;
            }
        })
    mySlider
       .on('slideStop', function() {
           goal = $(this).slider('getValue');
           animateWater();
        });
    
    // Settings //
    settings_btn.click(function() {
       background_slider.slideToggle('fast');
    });

   function sumFct() {
        sum = 0;
        //percentage = 0;
        $.each(rows.slice(start,end), function( index, value ) {
            sum = sum + parseInt($(this).find('td:eq(1)').text());
        });
        //console.log(sum);
        //sum = Math.round((sum/goal)*100);
        /*if (sum > 3800)
            sum = 3800;*/
        //console.log(sum);
        return sum;
    }

   function colorFct() {
        water_color = '';
        var sum_for_color = 0;
        sum_for_color = sumFct();
        if (goal == 2000){

                    if (sum_for_color >= 2000){
                        //color = '#AFC440'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_green.png';
                    }
                    else if (sum_for_color > 1000 && sum_for_color < 2000  ) {
                        //color = '#F59500'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_orange.png';
                    }
                    else {
                        //color ='#EF5252'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_red.png';
                    }

        } 
        else if (goal == 3000){

                    if (sum_for_color>= 3000){
                        //color = '#AFC440'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_green.png';
                    }
                    else if (sum_for_color > 1500 && sum_for_color < 3000  ) {
                        //color = '#F59500'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_orange.png';
                    }
                    else {
                        //color ='#EF5252'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_red.png';
                    }

        }
         else if (goal == 4000){

                     if (sum_for_color >= 4000){
                        //color = '#AFC440'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_green.png';
                    }
                    else if (sum_for_color > 2000 && sum_for_color < 4000  ) {
                        //color = '#F59500'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_orange.png';
                    }
                    else {
                        //color ='#EF5252'
                        water_color = 'http://127.0.0.1:8081/keep-slim/web/assets/images/water_red.png';
                    }

        }
        
        return water_color;
    }

    function animateLine() {
        if (goal == 2000)
            line.css('bottom', '130px');
        else if (goal == 3000)
            line.css('bottom', '228px');
        else if (goal == 4000)
            line.css('bottom', '308px');
        line.show();
        for (var i=0; i<5; i++) {
            line.fadeOut('slow').fadeIn('slow');
        };
    }

    function animateWater() {
        water.toggleClass('water-animate');
        px = (sumFct()/10);
        if (px >= 400)
            px = 380;
        water.css('height', px + 'px');
        water.css('background-image', 'url(' + colorFct() + ')');
        animateLine();
        //console.log(px);
    }

    // Previous //
    previous.click(function() {
         if (last_row.is(':visible')){
            /*previous.attr('disabled', 'disabled');
            previous.addClass('disabled');
            next.removeAttr('disabled');
            next.removeClass('disabled');
            next.addClass('active');*/
        } else {
            /*previous.addClass('active');*/
            start+=7;
            end+=7;
            rows.hide();
            rows.slice(start,end).show();
            animateWater();
            /*console.log('start = ' + start);
            console.log('end = ' + end);*/
        }
    });

    // Next //
    next.click(function() {

        if (first_row.is(':visible')){
           /* next.attr('disabled', 'disabled');
            next.addClass('disabled');
            previous.removeAttr('disabled');
            previous.removeClass('disabled');
            previous.addClass('active');*/
        } else {
             if (start < 7) {
                /*console.log('start < 0');  */
                start = 0;
                end = 7;
                /*console.log('start =' + start + '; end = ' + end);*/
                rows.hide();
                rows.slice(start,end).show();
                animateWater(); 
               
           } else {
                start-=7;
                end-=7;
                rows.hide();
                rows.slice(start,end).show();
                animateWater();
                /*console.log('start = ' + start);
                console.log('end = ' + end);*/
            }
        }
    });

    first_btn.click(function() {
        rows.slice(start, end).hide();
        end = rows.length;
        start = end-7;
        rows.slice(start).show();
        animateWater();
        /*console.log('start = ' + start);
        console.log('end = ' + end);*/
    });

    last_btn.click(function() {
        rows.slice(start, end).hide();
        end = 7;
        start = 0;
        rows.slice(start, end).show();
        animateWater();
        /*console.log('start = ' + start);
        console.log('end = ' + end);*/
    });
})