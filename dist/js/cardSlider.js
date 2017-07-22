var classie = window.classie;

(function() {
	var currCard = 0;
	var allCards = [].slice.call(document.querySelectorAll('.card'));

	var prevCard = function() {
		if (currCard > 0) {
			classie.addClass(allCards[currCard], 'hidden');

			currCard--;

			classie.removeClass(allCards[currCard], 'hidden');
		}
	};

	var nextCard = function() {
		if (currCard < allCards.length - 1) {
			classie.addClass(allCards[currCard], 'hidden');

			currCard++;

			classie.removeClass(allCards[currCard], 'hidden');
		}
	};


	[].slice.call(document.querySelectorAll('.cb.move-card')).forEach(function(btnEl) {
		if (btnEl.id === 'prev') {
			btnEl.addEventListener('click', prevCard);
		} else {
			btnEl.addEventListener('click', nextCard);
		}
	});
}());
