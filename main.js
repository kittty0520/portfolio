'use strict';

//make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});

//Handle scrolling when tapping on the navbar menu
//scroll to section when buttons are clicked
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click',(event)=>{
    
    const target = event.target;
    const link = target.dataset.link;
    if(link===null){
        return;
    }
    scrollIntoView(link);
});

//Handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',()=>{
    scrollIntoView('#contact');
});



//making home section transparent when scrolling
//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    if(window.scrollY<homeHeight){
       home.style.opacity=1-window.scrollY / homeHeight;
    }
});

//Show 'arrow up' button when scrolling up
const arrowUp= document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY>homeHeight/2){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the 'arrow up' button
arrowUp.addEventListener('click',()=>{
    scrollIntoView('#home');
});



function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}