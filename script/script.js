window.addEventListener('DOMContentLoaded', () => {
	'use srtrict';

	// timer
	const countTimer = (deadline) => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
    };
    
    const addZero = (num) => {
      if (num < 10) {
				return '0' + num;
      }
      return num;
    };

		const upDateClock = () => {
			const timer = getTimeRemaining();

			timerHours.textContent = addZero(timer.hours);
			timerMinutes.textContent = addZero(timer.minutes);
			timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(upDateClock);
      }
    };
    
		const timer = getTimeRemaining();

		if (timer.timeRemaining > 0) {
			let timerId = setInterval(upDateClock, 1000);
      console.log('Вызов setInterval');
      if (timer.timeRemaining <= 0) {
        clearInterval(timerId);
      }
    }  
    
    //  else if (timer.timeRemaining <= 0) {
		// 	timerHours.textContent = '00';
		// 	timerMinutes.textContent = '00';
		// 	timerSeconds.textContent = '00';
		// }
	};

	countTimer('3 jule 2020');

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
			popupClose = document.querySelector('.popup-close'),
			popupContent = document.querySelector('.popup-content');
		let count = 0,
			popupInterval;

		const popupAnimate = () => {
			popupInterval = requestAnimationFrame(popupAnimate);
			count++;
			if (count < 38) {
				popupContent.style.left = count + '%';
			} else {
				cancelAnimationFrame(popupInterval);
			}
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				popupInterval = requestAnimationFrame(popupAnimate);
			});
		});

		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
			return count = 0;
		});

	};

	togglePopUp();

});
