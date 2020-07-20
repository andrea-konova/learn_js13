const changeImage = event => {
	const target = event.target;

	if (target.matches('img') && target.dataset.img) {
		[target.src, target.dataset.img] = [target.dataset.img, target.src];
	}

};

export default changeImage;
