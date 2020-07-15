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

export default pageScroll;
