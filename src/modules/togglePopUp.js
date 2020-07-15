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

export default togglePopUp;
