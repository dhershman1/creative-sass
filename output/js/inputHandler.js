var classie = window.classie;

function trim(val) {
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	return val.replace(rtrim, '');
}

function onInputFocus(ev) {
	classie.addClass(ev.target.parentNode, 'input--filled');
}

function onInputBlur(ev) {
	if (ev.target.value.trim() === '') {
		classie.removeClass(ev.target.parentNode, 'input--filled');
	}
}

[].slice.call(document.querySelectorAll('input.input__field')).forEach( function(inputEl) {
	if (trim(inputEl.value) !== '') {
		classie.addClass(inputEl.parentNode, 'input--filled');
	}

	inputEl.addEventListener('focus', onInputFocus);
	inputEl.addEventListener('blur', onInputBlur);
} );
