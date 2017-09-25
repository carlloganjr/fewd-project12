const scroll_div = document.getElementsByClassName('scroll');
const navigation = document.querySelector('nav');
const ul = document.querySelector('nav ul');
const nav = document.querySelectorAll('.nav a');
const menu = document.getElementById('menu');
const menu_p = menu.firstElementChild;
const get_in_touch = document.getElementById('touch');


// scroll to the section when nav links are clicked
navigation.addEventListener('click', function(e) {
  for(i = 0; i < nav.length; i++) {
    let anchor = nav[i];
    if(e.target == anchor) {
      e.preventDefault();
      scroll_div[i].scrollIntoView({behavior: 'smooth', block: 'start'});
    } else if(e.target && menu_p.innerHTML == 'CLOSE'){
      ul.style.transform = 'translateX(100%)';
      menu_p.innerHTML = 'MENU';
      setTimeout(function() {
        navigation.style.zIndex = '-1';
      }, 600);
    }
    if(scroll_div[0] && window.scrollY <= 10) {
      $('.carl_logo').css('top', '-100%');
    }
  }
});

// contact navigation triggers .title_div event
$('.contact_nav').click(function(e) {
  $(get_in_touch).trigger('click');
});

// show / close menu when 'menu' button is clicked
menu.addEventListener('click', function(e) {
  if(e.target && menu_p.innerHTML == 'MENU') {
    navigation.style.zIndex = '1000';
    ul.style.transform = 'translateX(0)';
    menu_p.innerHTML = 'CLOSE';
    $('.carl_logo').css('top', '7px');
  } else if(e.target && menu_p.innerHTML == 'CLOSE') {
    ul.style.transform = 'translateX(100%)';
    menu_p.innerHTML = 'MENU';
    if($('.slide_up').css('display') === 'none' || $('.menu_bg').css('height') == '55px') {
      $('.carl_logo').css('top', '7px');
    } else {
      $('.carl_logo').css('top', '-100%');
    }
    setTimeout(function() {
      navigation.style.zIndex = '-1';
    }, 600);
  }
});

// capture the current Y scroll coords to determine background image load and
// portfolio animations.  also show / hide background for menu button
$(window).scroll(function() {
  $('.proj').each(function(i) {
    const projects = document.getElementsByClassName('proj');
    const y_scroll = window.scrollY;
    const win_ht = window.innerHeight;
    const folio_offset = projects[i].offsetTop;
    let bg_img = [
      'url(img/dir.png)',
      'url(img/video.png)',
      'url(img/dash.png)',
      'url(img/form.png)',
      'url(img/gallery.png)'
    ]
    let y_start = win_ht + folio_offset - (win_ht * .7);
    let bg_start = win_ht + folio_offset - (win_ht * .4);
    let menu_bg = win_ht - 55;
    if(y_start <= y_scroll) {
      $(this).children().children('svg').css('margin-top', '1.25rem');
    } else {
      $(this).children().children('svg').css('margin-top', '100%');
    }
    if(bg_start <= y_scroll) {
      $(this).next().css('background-image', bg_img[i]);
    }
    if(menu_bg <= y_scroll) {
      $('.menu_bg').css('height', '55px');
      $('.carl_logo').css('top', '7px');
    } else {
      $('.menu_bg').css('height', '0');
      if($('.slide_up').css('display') === 'none') {
        $('.carl_logo').css('top', '7px');
      } else {
        $('.carl_logo').css('top', '-100%');
      }
    }
  });
  $('.about_pic').css('background-image', 'url(img/carl_logan.jpg)');
});

function toggle_text(element, is_text, to_be_text) {
  $(element).text(function() {
    let text = $(element).text();
    if(text != to_be_text) {
      $(element).text(to_be_text);
    } else {
      $(element).text(is_text);
    }
  });
};

// displays contact div and toggle button text
$('.title_div').click(function(e) {
  e.preventDefault();
  if(e.target === get_in_touch) {
    toggle_text('#touch', 'get in touch', 'thanks! i\'m done');
    $('.contact').toggleClass('toggle_contact');
  }
});

// remove class and toggle button text when contact links are clicked
$('.contact').click(function(e) {
    $(this).removeClass('toggle_contact');
    toggle_text('#touch', 'get in touch', 'thanks! i\'m done');
});

// open the funtrols panel
$('#fun_panel').click(function(e) {
  e.preventDefault();
  $('.slide_up').slideUp(function() {
    $('.carl_logo').css('top', '7px');
  });
  $(this).addClass('fun_panel');
  $('#fun_panel div').removeClass('btn_in');
  $('#fun_close').css('visibility', 'visible');
  if($('.contact').hasClass('toggle_contact')) {
    $('.contact').removeClass('toggle_contact');
    toggle_text('#touch', 'get in touch', 'thanks! i\'m done');
  }
});

// lights! button -- toggle between lights on and lights off
$('#lights').click(function() {
  $("#fun_panel").slideUp(function() {
    $('#fun_close').css('visibility', 'collapse');
    $('.on_off').toggleClass('lights_on');
    $('.on_off').addClass(function() {
      if($('.on_off').hasClass('lights_on')) {
        return '';
      } else {
        return 'lights_off';
      }
    });
    if($('.on_off').hasClass('lights_on')) {
      setTimeout(function() {
        $('.speech_on_left').css('top', '-175px');
      }, 2000);
      setTimeout(function() {
        $('.speech_on_mid').css('top', '-250px');
      }, 2500);
      setTimeout(function() {
        $('.speech_on_right').css('top', '-225px');
      }, 3000);
      setTimeout(function() {
        $('.speech_on').css('top', '-100%');
      }, 5200);
      setTimeout(function() {
        $("#fun_panel").slideDown();
        $('#fun_close').css('visibility', 'visible');
      }, 5700);
    } else {
      setTimeout(function() {
        $('.speech_off_left').css('top', '-175px');
      }, 700);
      setTimeout(function() {
        $('.speech_off_mid').css('top', '-250px');
      }, 1200);
      setTimeout(function() {
        $('.speech_off_right').css('top', '-225px');
      }, 1700);
      setTimeout(function() {
        $('.speech_off').css('top', '-100%');
      }, 3700);
      setTimeout(function() {
        $("#fun_panel").slideDown();
        $('#fun_close').css('visibility', 'visible');
      }, 4000);
    }
  });
});

$('#blast').click(function() {
  $('.rocket').css('background-image', 'url(img/rocket.svg)');
  $("#fun_panel").slideUp(function() {
    $('.city').addClass('blast_off');
    $('.rocket').addClass('rocket_blast');
    $('#fun_close').css('visibility', 'collapse');
    setTimeout(function() {
      $('.city').removeClass('blast_off');
      $('.rocket').removeClass('rocket_blast');
      $("#fun_panel").slideDown();
      $('#fun_close').css('visibility', 'visible');
    }, 5500);
  });
});

$('#ufo').click(function() {
  $("#fun_panel").slideUp(function() {
    $('#fun_close').css('visibility', 'collapse');
    $('.ufo_swoop').addClass('ufo_swoop_swing');
    $('.ufo').addClass('ufo_swing');
    setTimeout(function() {
      $('#beam').css('opacity', '1');
    }, 2300);
    setTimeout(function() {
      $('#dude').css({'opacity': '1', 'top': '-15px'});
    }, 2600);
    setTimeout(function() {
      $('#dude').css('opacity', '0');
      $('#beam').css('opacity', '0');
    }, 3400);
    setTimeout(function() {
      $('.ufo_swoop').removeClass('ufo_swoop_swing');
      $('.ufo').removeClass('ufo_swing');
      $('#dude').css('top', '110px');
    }, 4000);
    setTimeout(function() {
      $('.ufo_date').css('top', '-175px');
    }, 4300);
    setTimeout(function() {
      $('.ufo_date').css('top', '-100%');
    }, 6300);
    setTimeout(function() {
      $("#fun_panel").slideDown();
      $('#fun_close').css('visibility', 'visible');
    }, 6500);
  });
});

// close the funtrols panel
$('#fun_close').click(function() {
    $('.carl_logo').css('top', '-100%');
    $('.slide_up').slideDown();
    $("#fun_panel").removeClass('fun_panel');
    $('#fun_panel div').addClass('btn_in');
    $('#fun_close').css('visibility', 'collapse');
    $('.on_off').removeClass('lights_on lights_off');
});

// carl_logo click and scroll to home
$('.carl_logo').click(function(e) {
  scroll_div[0].scrollIntoView({behavior: 'smooth', block: 'start'});
  if(e.target && menu_p.innerHTML == 'CLOSE') {
    $(menu).trigger('click');
  }
});


$('.btn_connect').click(function(e) {
  e.preventDefault();
  scroll_div[0].scrollIntoView({behavior: 'smooth', block: 'start'});
  setTimeout(function() {
    $(get_in_touch).trigger('click');
  }, 900);
});

const funtrols_div = document.querySelector('.funtrols');
funtrols_div.addEventListener('mouseover', function(e) {
  const funtrols = $('.funtrols li');
  for(i = 0; i < funtrols.length; i++) {
    if(e.target == funtrols[i]) {
      let fun_tips = [
        'Turn the city lights on and off.',
        'See what\'s lurking above.',
        'Watch a rocket launch.'
      ]
      $('.fun_tips p').text(fun_tips[i]);
    }
  }
});
