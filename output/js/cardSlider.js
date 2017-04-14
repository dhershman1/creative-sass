(function() {
	var currCard = 0;
	var allCards = [].slice.call(document.querySelectorAll('.card'));

	function prevCard() {
		if (currCard > 0) {
			allCards[currCard].className += ' hidden';

			currCard--;

			allCards[currCard].className = allCards[currCard].className.replace(' hidden', '');
		}
	}

	function nextCard() {
		if (currCard < allCards.length - 1) {
			allCards[currCard].className += ' hidden';

			currCard++;

			allCards[currCard].className = allCards[currCard].className.replace(' hidden', '');
		}
	}


	[].slice.call(document.querySelectorAll('.btn.move-card')).forEach(function(btnEl) {
		if (btnEl.id === 'prev') {
			btnEl.addEventListener('click', prevCard);
		} else {
			btnEl.addEventListener('click', nextCard);
		}
	});
}());
