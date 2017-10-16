var dropdownFx = window.dropdownFx;

(function() {
	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		if (el.className.indexOf('cs-circle') > -1) {
			dropdownFx(el, {
				stickyPlaceholder: false,
				onChange: function(val) {
					var img = document.createElement('img');

					img.src = '/dist/imgs/' + val + '.png';
					img.onload = function() {
						var doc = document.querySelector('.cs-circle span.cs-placeholder');

						doc.style.backgroundImage = 'url(/dist/imgs/' + val + '.png)';
					};
				}
			});
		} else {
			dropdownFx(el);
		}
	} );
}());
