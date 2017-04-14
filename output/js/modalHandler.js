var classie = window.classie;

(function() {

	function init() {

		var overlay = document.querySelector('.md-overlay');

		[].slice.call( document.querySelectorAll('.md-trigger')).forEach( function(el) {

			var modal = document.querySelector( '#' + el.getAttribute('data-modal')),
				close = modal.querySelector('.md-close');

			function removeModal(hasPerspective) {
				classie.remove(modal, 'md-show');

				if (hasPerspective) {
					classie.remove(document.documentElement, 'md-perspective');
				}
			}

			function removeModalHandler() {
				removeModal(classie.hasClass(el, 'md-setperspective'));
			}

			el.addEventListener('click', function() {
				classie.addClass(modal, 'md-show');
				overlay.removeEventListener('click', removeModalHandler);
				overlay.addEventListener('click', removeModalHandler);

				if (classie.has(el, 'md-setperspective')) {
					setTimeout(function() {
						classie.addClass(document.documentElement, 'md-perspective');
					}, 25);
				}
			});

			close.addEventListener('click', function(ev) {
				ev.stopPropagation();
				removeModalHandler();
			});

		});

	}

	init();

}());
