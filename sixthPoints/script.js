'use strict';

const date = new Date();

const hours = date.getHours();
if (hours >= 0 && hours <= 5) {
	console.log('Доброй ночи');
}
if (hours > 5 && hours <= 11) {
	console.log('Доброe утро');
}
if (hours > 11 && hours <= 17) {
	console.log('Добрый день');
}
if (hours > 17 && hours <= 23) {
	console.log('Добрый вечер');
}

const day = date.getDay();
let dayWeek;
switch (day) {
case 0:
	dayWeek = 'Воскресенье';
	break;
case 1:
	dayWeek = 'Понедельник';
	break;
case 2:
	dayWeek = 'Вторник';
	break;
case 3:
	dayWeek = 'Среда';
	break;
case 4:
	dayWeek = 'Четверг';
	break;
case 5:
	dayWeek = 'Пятница';
	break;
case 6:
	dayWeek = 'Суббота';
	break;
}
console.log('Сегодня: ' + dayWeek);

let meridiem;
if (hours >= 0 && hours < 12) {
	meridiem = 'AM';
} else {
	meridiem = 'PM';
}
console.log('Текущее время: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + meridiem);

const newDay = new Date('1 january 2021');
const msecondsToDay = 24 * 60 * 60 * 1000;
const days = Math.floor((newDay - date) / msecondsToDay);
let dayName;
const lastNum = days.toString().slice(-1);
if (lastNum === 1) {
	dayName = 'день';
} else if (lastNum > 1 && lastNum < 4) {
	dayName = 'дня';
} else {
	dayName = 'дней';
}
console.log('До нового года осталось: ' + days + ' ' + dayName);
