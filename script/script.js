window.addEventListener('DOMContentLoaded', () => {
	'use srtrict';

	// timer
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}

		function upDateClock() {
			const timer = getTimeRemaining();

			timerHours.textContent = timer.hours;
			if (timer.hours < 10) {
				timerHours.textContent = '0' + timer.hours;
			}
			timerMinutes.textContent = timer.minutes;
			if (timer.minutes < 10) {
				timerMinutes.textContent = '0' + timer.minutes;
			}
			timerSeconds.textContent = timer.seconds;
			if (timer.seconds < 10) {
				timerSeconds.textContent = '0' + timer.seconds;
			}
		}
		const timer = getTimeRemaining();

		if (timer.timeRemaining > 0) {
			const timerId = setInterval(upDateClock, 1000);
			console.log('Вызов setInterval');
			if (timer.timeRemaining <= 0) {
				clearInterval(timerId);
			}
		} else if (timer.timeRemaining <= 0) {
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
		}


	}

	countTimer('2 jule 2020');

	// menu
	const toggleModalMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
	};

	toggleModalMenu();

	// popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
			});
		});

		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});
	};

	togglePopUp();

});
