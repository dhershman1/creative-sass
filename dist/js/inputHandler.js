var classie = window.classie;

var trim = function(val) {
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	return val.replace(rtrim, '');
};

var onInputFocus = function(ev) {
	classie.addClass(ev.target.parentNode, 'ci--filled');
};

var onInputBlur = function(ev) {
	if (ev.target.value.trim() === '') {
		classie.removeClass(ev.target.parentNode, 'ci--filled');
	}
};

[].slice.call(document.querySelectorAll('input.ci__field')).forEach(function(inputEl) {
	if (trim(inputEl.value) !== '') {
		classie.addClass(inputEl.parentNode, 'ci--filled');
	}

	inputEl.addEventListener('focus', onInputFocus);
	inputEl.addEventListener('blur', onInputBlur);
});
