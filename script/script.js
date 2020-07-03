window.addEventListener('DOMContentLoaded', () => {
	'use srtrict';

	// timer
	const countTimer = deadline => {
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

		const addZero = num => {
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
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		};

		setInterval(upDateClock, 1000);
	};

	countTimer('3 jule 2020');

	// menu
	const toggleMenu = () => {
		const menu = document.querySelector('menu'),
			mainHeader = document.querySelector('.main-header');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		mainHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.menu');

			if (target) {
				handlerMenu();
			}
		});

		menu.addEventListener('click', event => {
			const target = event.target;

			if (target.classList.contains('close-btn') || target.tagName === 'A') {
				handlerMenu();
			}
		});

	};

	toggleMenu();

	// popup
	const togglePopUp = () => {
		const popUp = document.querySelector('.popup'),
			popUpBtn = document.querySelectorAll('.popup-btn'),
			popUpContent = document.querySelector('.popup-content');
		let count = 0,
			popUpInterval;

		const popUpAnimate = () => {
			popUpInterval = requestAnimationFrame(popUpAnimate);
			count++;
			if (count <= 38 && document.documentElement.clientWidth > 768) {
				popUpContent.style.left = count + '%';
			} else {
				cancelAnimationFrame(popUpInterval);
			}
		};

		popUpBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popUp.style.display = 'block';
				popUpInterval = requestAnimationFrame(popUpAnimate);
			});
		});

		popUp.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popUp.style.display = 'none';
				return count = 0;
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popUp.style.display = 'none';
					return count = 0;
				}
			}
		});

	};

	togglePopUp();

	// page scroll
	const pageScroll = () => {
		const menu = document.querySelector('menu'),
			menuItems = menu.querySelectorAll('a[href*="#"]'),
			btnDown = document.querySelector('a[href*="#"]');

		menuItems.forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault();

				const menuId = item.getAttribute('href').substring(1);

				if (menuId !== 'close') {
					document.getElementById(menuId).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}

			});
		});

		btnDown.addEventListener('click', e => {
			e.preventDefault();

			const btnDownId = btnDown.getAttribute('href').substring(1);

			document.getElementById(btnDownId).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	pageScroll();

	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}

			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();

	const slider = () => {
		const slider = document.querySelector('.portfolio-content'),
			slide = document.querySelectorAll('.portfolio-item'),
			portfolioDots = document.querySelector('.portfolio-dots');


		slide.forEach(() => {
			const elem = document.createElement('li');
			elem.classList.add('dot');
			portfolioDots.appendChild(elem);
		});

		const dot = document.querySelectorAll('.dot');
		dot[0].classList.add('dot-active');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);

	};

	slider();

});
