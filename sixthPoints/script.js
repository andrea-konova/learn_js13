

const date = new Date(),
	day = date.getDay(),
	hours = date.getHours(),
	minutes = date.getMinutes(),
	seconds = date.getSeconds();

const getHi = () => {
	let hello;
	if (hours >= 0 && hours <= 5) {
		hello = 'Доброй ночи';
	}
	if (hours > 5 && hours <= 11) {
		hello = 'Доброe утро';
	}
	if (hours > 11 && hours <= 17) {
		hello = 'Добрый день';
	}
	if (hours > 17 && hours <= 23) {
		hello = 'Добрый вечер';
	}

	const div = document.createElement('div');
	div.innerHTML = hello;
	document.body.append(div);
};

const getDayWeek = () => {

	const dayWeek = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота'
	];

	const div = document.createElement('div');
	div.innerHTML = 'Сегодня: ' + dayWeek[day];
	document.body.append(div);
};

const getMeridiem = () => {
	let meridiem;
	hours < 12 ? meridiem = 'AM' : meridiem = 'PM';

	const div = document.createElement('div');
	div.innerHTML = 'Текущее время: ' + hours + ':' + minutes + ':' + seconds + ' ' + meridiem;
	document.body.append(div);
};

const getNewYearDays = () => {
	const newDay = new Date('1 january 2021');
	const msecondsToDay = 24 * 60 * 60 * 1000;
	const days = Math.floor((newDay - date) / msecondsToDay);

	let dayName;

	const fixDayName = () => {
		const lastNum = days.toString().slice(-1);
		if (lastNum == 1) {
			dayName = 'день';
		} else if (lastNum > 1 && lastNum < 4) {
			dayName = 'дня';
		} else {
			dayName = 'дней';
		}
	};

	fixDayName();

	const div = document.createElement('div');
	div.innerHTML = 'До нового года осталось: ' + days + ' ' + dayName;
	document.body.append(div);
};

const start = () => {
	getHi(hours);
	getDayWeek(day);
	getMeridiem(hours);
	getNewYearDays();
};

start();
