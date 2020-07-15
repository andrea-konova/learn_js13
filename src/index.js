'use srtrict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import pageScroll from './modules/pageScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// timer
countTimer('17 jule 2020');
// menu
toggleMenu();
// popup
togglePopUp();
// page scroll
pageScroll();
// tabs
tabs();
// slider
slider();
// change image
const command = document.querySelector('.command');
command.addEventListener('mouseover', changeImage);
command.addEventListener('mouseout', changeImage);
// calculator
calc(100);
// send-ajax-form
sendForm();
