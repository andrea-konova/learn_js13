const pageScroll = () => {
	const btnDown = document.querySelector('a[href*="#"]');

	document.addEventListener('click', event => {
		event.preventDefault();
		const target = event.target;

		if (target.matches('a[href*="#"]')) {
			const menuId = target.getAttribute('href').substring(1);
			if (menuId !== 'close') {
				document.getElementById(menuId).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
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
