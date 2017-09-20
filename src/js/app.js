const scroll_div = document.getElementsByClassName('scroll');
// const home = document.getElementById('home');
// const folio = document.getElementById('portfolio');
// const about = document.getElementById('about');
const navigation = document.querySelector('nav');
const ul = document.querySelector('nav ul');
const nav = document.querySelectorAll('.nav a');
// let y_scroll = home.scrollHeight;
const menu = document.getElementById('menu');
const menu_p = menu.firstElementChild;



navigation.addEventListener('click', function(e) {
  for(i = 0; i < nav.length; i++) {
    let anchor = nav[i];
    let home_nav = nav[0];
    if(e.target == anchor) {
      e.preventDefault();
      scroll_div[i].scrollIntoView({behavior: 'smooth'});
    }
  }
});

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
