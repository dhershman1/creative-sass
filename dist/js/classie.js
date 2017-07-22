'use strict';
var classReg = function (className) {
	return new RegExp(('(^|\\s+)' + className + '(\\s+|$)'));
};

var classie = function () {
	var hasClass = function (el, cl) {
		if ('classList' in document.documentElement) {
			return el.classList.contains(cl);
		}

		return classReg(cl).test(el.className);
	};

	var addClass = function (el, cl) {
		if ('classList' in document.documentElement) {
			el.classList.add(cl);
		} else if (!hasClass(el, cl)) {
			el.className = (el.className) + ' ' + cl;
		}
	};

	var removeClass = function (el, cl) {
		if ('classList' in document.documentElement) {
			el.classList.remove(cl);
		} else if (!hasClass(el, cl)) {
			el.className = el.className.replace(classReg(cl), ' ');
		}
	};

	var toggleClass = function (el, cl) {
		var fn = hasClass(el, cl) ? removeClass : addClass;

		fn(el, cl);
	};

	var findChild = function (el, cl) {
		var i = 0;
		var len = el.childNodes.length;

		for (i; i < len; i++) {
			if (el.childNodes[i].className && el.childNodes[i].className.includes(cl)) {
				return el.childNodes[i];
			}
		}

		return null;
	};

	return {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		findChild: findChild
	};
};

window.classie = classie();
