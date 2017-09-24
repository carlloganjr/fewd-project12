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
  }
});

// show / close menu when 'menu' button is clicked
menu.addEventListener('click', function(e) {
  if(e.target && menu_p.innerHTML == 'MENU') {
    navigation.style.zIndex = '1000';
    ul.style.transform = 'translateX(0)';
    menu_p.innerHTML = 'CLOSE';
  } else if(e.target && menu_p.innerHTML == 'CLOSE'){
    ul.style.transform = 'translateX(100%)';
    menu_p.innerHTML = 'MENU';
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
    let y_start = win_ht + folio_offset - (win_ht * .1);
    let bg_start = win_ht + folio_offset - (win_ht * .4);
    let menu_bg = win_ht - 55;
    if(y_start <= y_scroll) {
      $(this).next().children().children('svg').css('margin-top', '1.25rem');
    } else {
      $(this).next().children().children('svg').css('margin-top', '100%');
    }
    if(bg_start <= y_scroll) {
      $(this).next().css('background-image', bg_img[i]);
    }
    if(menu_bg <= y_scroll) {
      $('.menu_bg').css('height', '55px');
    } else {
      $('.menu_bg').css('height', '0');
    }
  });
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
  $('.slide_up').slideUp();
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
        $('.speech_on').css('top', '-175px');
      }, 2000);
      setTimeout(function() {
        $('.speech_on').css('top', '-100%');
      }, 5200);
      setTimeout(function() {
        $("#fun_panel").slideDown();
        $('#fun_close').css('visibility', 'visible');
      }, 5700);
    } else {
      setTimeout(function() {
        $('.speech_off').css('top', '-175px');
      }, 700);
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

// close the funtrols panel
$('#fun_close').click(function() {
    $('.slide_up').slideDown();
    $("#fun_panel").removeClass('fun_panel');
    $('#fun_panel div').addClass('btn_in');
    $('#fun_close').css('visibility', 'collapse');
    $('.on_off').removeClass('lights_on lights_off');
});
