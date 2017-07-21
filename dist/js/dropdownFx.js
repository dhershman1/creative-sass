'use strict';
var classie = window.classie;

function extend(a, b) {
	var key = '';

	for (key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}

	return a;
}

function hasParent(e, div) {
	var el = e.target || e.srcElement || e;

	if (!e) return false;
	while (el && el !== div) {
		el = el.parentNode;
	}

	return Boolean(el);
}

function dropdownFx(el, options) {
	var defaults = {
		newTab: true,
		stickyPlaceholder: true,
		onChange: function() {
			return false;
		}
	};
	var scriptOpts = extend(defaults, options);
	var selectedOpt = '';
	var optEls = '';
	var placeholder = '';
	var currentSelected = '';
	var optCount = 0;
	var currIndex = 0;
	var mainDiv = '';
	var preSelCurr = -1;

	function isOpen() {
		return classie.hasClass(mainDiv, 'cs-active');
	}

	function removeFocus() {
		var focusEl = mainDiv.querySelector('li.cs-focus');

		if (focusEl) {
			classie.removeClass(focusEl, 'cs-focus');
		}
	}

	function toggleSelect() {
		removeFocus();

		if (isOpen()) {
			if (currIndex !== -1) {
				placeholder.textContent = optEls[currIndex].textContent;
			}
			classie.removeClass(mainDiv, 'cs-active');
		} else {
			if (scriptOpts.stickyPlaceholder) {
				placeholder.textContent = selectedOpt.textContent;
			}
			classie.addClass(mainDiv, 'cs-active');
		}
	}

	function changeOption() {
		var currOpt = '';
		var oldOpt = '';

		if (preSelCurr && preSelCurr !== -1) {
			currIndex = preSelCurr;
			preSelCurr = -1;
		}
		currOpt = optEls[currIndex];
		oldOpt = mainDiv.querySelector('li.cs-selected');
		placeholder.textContent = currOpt.textContent;
		el.value = currOpt.getAttribute('data-value');

		if (oldOpt) {
			classie.removeClass(oldOpt, 'cs-selected');
		}
		classie.addClass(currOpt, 'cs-selected');

		if (currOpt.getAttribute('data-link')) {
			if (scriptOpts.newTab) {
				window.open(currOpt.getAttribute( 'data-link' ), '_blank');
			} else {
				window.location = currOpt.getAttribute('data-link');
			}
		}
		scriptOpts.onChange(el.value);
	}

	function navNext() {
		if (!isOpen()) {
			toggleSelect();
		}
		if (currIndex < optCount - 1) {
			currIndex++;
			removeFocus();
			classie.addClass(optEls[currIndex], 'cs-focus');
		}
	}

	function navPrev() {
		if (!isOpen()) {
			toggleSelect();
		}
		if (currIndex > 0) {
			currIndex--;
			removeFocus();
			classie.addClass(optEls[currIndex], 'cs-focus');
		}
	}

	function keyboardEvents() {
		mainDiv.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode || e.which;

			switch (keyCode) {
				// Up
				case 38:
					e.preventDefault();
					navPrev();
					break;
				// Down
				case 40:
					e.preventDefault();
					navNext();
					break;
				// Space
				case 32:
					e.preventDefault();
					if (isOpen() && preSelCurr && preSelCurr !== -1) {
						changeOption();
					}
					toggleSelect();
					break;
				// Enter
				case 13:
					e.preventDefault();
					if ( isOpen() && preSelCurr && preSelCurr !== -1 ) {
						changeOption();
						toggleSelect();
					}
					break;
				// Esc
				case 27:
					e.preventDefault();
					if (isOpen()) {
						toggleSelect();
					}
					break;
				default:
					break;
			}
		});
	}

	function events() {
		placeholder.addEventListener('click', function() {
			toggleSelect();
		});

		optEls.forEach(function(opt, idx) {
			opt.addEventListener('click', function() {
				currIndex = idx;
				changeOption();
				toggleSelect();
			});
		});
		// Add a listener so if the user doesn't click the select or an option it closes the box
		document.addEventListener('click', function(e) {
			var target = e.target;

			if (isOpen() && target !== mainDiv && !hasParent(target, mainDiv)) {
				toggleSelect();
			}
		});

		keyboardEvents();
	}

	function init() {
		mainDiv = el.parentNode;
		selectedOpt = el.querySelector('option[selected]');
		placeholder = mainDiv.querySelector('.cs-placeholder');
		currentSelected = mainDiv.querySelector('li.cs-selected');
		optEls = [].slice.call(mainDiv.querySelectorAll('li[data-option]'));
		optCount = optEls.length;
		currIndex = optEls.indexOf(currentSelected) || -1;
		events();
	}

	init();
}

window.dropdownFx = dropdownFx;
