'use srtrict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import 'mdn-polyfills/Node.prototype.append';
import elementClosest from 'element-closest';
elementClosest(window);

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
countTimer('28 july 2020');
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
