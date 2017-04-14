'use strict';
function classReg( className ) {
	return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
}

function classie() {
	function hasClass(el, cl) {
		if ('classList' in document.documentElement) {
			return el.classList.contains( cl );
		}

		return classReg(cl).test( el.className );
	}

	function addClass(el, cl) {
		if ('classList' in document.documentElement) {
			el.classList.add(cl);
		} else if ( !hasClass( el, cl ) ) {
			el.className = el.className + ' ' + cl;
		}
	}

	function removeClass(el, cl) {
		if ('classList' in document.documentElement) {
			el.classList.remove(cl);
		} else if ( !hasClass( el, cl ) ) {
			el.className = el.className.replace(classReg(cl), ' ');
		}
	}

	function toggleClass(el, cl) {
		var fn = hasClass(el, cl) ? removeClass : addClass;

		fn(el, cl);
	}

	return {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass
	};
}

window.classie = classie();
