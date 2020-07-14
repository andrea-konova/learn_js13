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

	countTimer('14 jule 2020');

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

			const form3 = document.getElementById('form3'),
				modalMessage = document.querySelector('.main-form h3');

			if (target.classList.contains('popup-close')) {
				popUp.style.display = 'none';
				form3.style.display = 'block';
				modalMessage.textContent = 'Введите свои данные для связи с нами!';
				return count = 0;
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popUp.style.display = 'none';
					form3.style.display = 'block';
					modalMessage.textContent = 'Введите свои данные для связи с нами!';
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

	// slider
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

	// change image
	const changeImage = event => {
		const target = event.target;

		if (target.matches('img')) {
			[target.src, target.dataset.img] = [target.dataset.img, target.src];
		}

	};

	const command = document.querySelector('.command');

	command.addEventListener('mouseover', changeImage);
	command.addEventListener('mouseout', changeImage);

	// calc input validation
	const calcBlock = document.querySelector('.calc-block');

	calcBlock.addEventListener('input', event => {
		const target = event.target;

		if (target.tagName === 'INPUT') {
			target.value = target.value.replace(/\D/g, '');
		}
	});

	// calculator
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;

			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			let count = 0,
				idInterval;

			const outNum = () => {
				idInterval = requestAnimationFrame(outNum);

				count += 2;
				if (count === total) {
					cancelAnimationFrame(idInterval);
				}

				totalValue.textContent = count;

			};

			if (calcCount.value > 0) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value <= 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value <= 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
				idInterval = requestAnimationFrame(outNum);
			}

		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}

		});
	};

	calc(100);

	// send-ajax-form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem;';
		statusMessage.style.color = '#ffffff';

		const hideStatusMessage = () => {
			statusMessage.style.display = 'none';
		};

		const postDate = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});

			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'aplication/json');
			request.send(JSON.stringify(body));
		};

		const postForm = (form, inputName, inputEmail, inputPhone, inputMessage) => {
			form.appendChild(statusMessage);
			statusMessage.style.display = 'block';
			statusMessage.textContent = loadMessage;
			const formData = new FormData(form);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postDate(body, () => {
				statusMessage.textContent = successMessage;
				setTimeout(hideStatusMessage, 3000);
			},
			error => {
				statusMessage.textContent = errorMessage;
				setTimeout(hideStatusMessage, 3000);
				console.error(error);
			});
			inputName.value = '';
			inputEmail.value = '';
			inputPhone.value = '';
			if (inputMessage) {
				inputMessage.value = '';
			}
		};

		document.addEventListener('submit', event => {
			event.preventDefault();
			const target = event.target;

			if (target.matches('#form1')) {
				const form = document.getElementById('form1'),
					inputName = document.getElementById('form1-name'),
					inputEmail = document.getElementById('form1-email'),
					inputPhone = document.getElementById('form1-phone');
				postForm(form, inputName, inputEmail, inputPhone);
			}

			if (target.matches('#form2')) {
				const form = document.getElementById('form2'),
					inputName = document.getElementById('form2-name'),
					inputEmail = document.getElementById('form2-email'),
					inputPhone = document.getElementById('form2-phone'),
					inputMessage = document.getElementById('form2-message');
				postForm(form, inputName, inputEmail, inputPhone, inputMessage);
			}

			if (target.matches('#form3')) {
				const form = document.getElementById('form3'),
					inputName = document.getElementById('form3-name'),
					inputEmail = document.getElementById('form3-email'),
					inputPhone = document.getElementById('form3-phone');
				postForm(form, inputName, inputEmail, inputPhone);
			}
		});

		document.addEventListener('input', event => {
			const target = event.target;

			if (target.classList.contains('form-phone')) {
				target.value = target.value.replace(/[^+\d]/g, '');
			}

			if (target.classList.contains('form-name') || target.classList.contains('mess')) {
				target.value = target.value.replace(/[^а-яё\s]/ig, '');
			}
		});

	};

	sendForm();
});
