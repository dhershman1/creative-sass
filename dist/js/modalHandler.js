var classie = window.classie;

(function() {

	var overlay = document.querySelector('.cm__overlay');

	[].slice.call(document.querySelectorAll('.cm__trigger')).forEach(function (el) {
		var modal = document.querySelector( '#' + el.getAttribute('data-modal'));
		var close = modal.querySelector('.cm__close');

		var removeModal = function(hasPerspective) {
			classie.removeClass(modal, 'cm--show');
			classie.removeClass(modal, 'cm__modal--show');
			classie.removeClass(overlay, 'cm__overlay--show');

			if (hasPerspective) {
				classie.removeClass(document.documentElement, 'cm-perspective');
			}
		};

		var removeModalHandler = function() {
			removeModal(classie.hasClass(el, 'cm-setperspective'));
		};

		el.addEventListener('click', function() {
			classie.addClass(modal, 'cm--show');
			classie.addClass(modal, 'cm__modal--show');
			classie.addClass(overlay, 'cm__overlay--show');
			overlay.removeEventListener('click', removeModalHandler);
			overlay.addEventListener('click', removeModalHandler);

			if (classie.hasClass(el, 'cm-setperspective')) {
				setTimeout(function() {
					classie.addClass(document.documentElement, 'cm-perspective');
				}, 25);
			}
		});

		close.addEventListener('click', function(ev) {
			ev.stopPropagation();
			removeModalHandler();
		});

	});
}());
