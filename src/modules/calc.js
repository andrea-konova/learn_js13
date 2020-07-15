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

			count += Math.round(total / 120);
			if (count >= total) {
				count = total;
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

		calcBlock.addEventListener('input', event => {
			const target = event.target;

			if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
				cancelAnimationFrame(idInterval);
			}
		});

	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});

	calcBlock.addEventListener('input', event => {
		const target = event.target;

		if (target.tagName === 'INPUT') {
			target.value = target.value.replace(/\D/g, '');
		}
	});
};

export default calc;
