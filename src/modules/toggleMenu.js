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

export default toggleMenu;
