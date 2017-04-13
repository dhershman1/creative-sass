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
	var isOpen = false;
	var preSelCurr = -1;

	function toggleSelect() {

	}

	function changeOption() {

	}

	function navOpts(dir) {
		var tmpCurr = (preSelCurr && preSelCurr !== -1) ? preSelCurr : currIndex;

		if (!isOpen) {
			toggleSelect();
		}
	}

	function keyboardEvents() {
		mainDiv.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode || e.which;

			switch (keyCode) {
				// Up
				case 38:
					e.preventDefault();
					navOpts('prev');
					break;
				// Down
				case 40:
					e.preventDefault();
					navOpts('next');
					break;
				// Space
				case 32:
					e.preventDefault();
					if (isOpen && preSelCurr && preSelCurr !== -1) {
						changeOption();
					}
					toggleSelect();
					break;
				// Enter
				case 13:
					e.preventDefault();
					if ( isOpen && preSelCurr && preSelCurr !== -1 ) {
						changeOption();
						toggleSelect();
					}
					break;
				// Esc
				case 27:
					e.preventDefault();
					if (isOpen) {
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

			if (isOpen && target !== mainDiv && !hasParent(target, mainDiv)) {
				toggleSelect();
			}
		});

		keyboardEvents();
	}

	function init() {
		mainDiv = el.querySelector('div.cs-select');
		selectedOpt = el.querySelector('option[selected]');
		placeholder = el.querySelector('.cs-placeholder');
		currentSelected = mainDiv.querySelector('li.cs-selected');
		optEls = [].slice.call(mainDiv.querySelectorAll('li[data-option]'));
		optCount = optEls.length;
		currIndex = optEls.indexOf(mainDiv.querySelector( 'li.cs-selected' )) || -1;
		events();
	}

	init();

	return {};
}

window.dropdownFx = dropdownFx;
