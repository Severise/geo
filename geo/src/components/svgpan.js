console.log('try');

var panzoom = require('panzoom');

document.addEventListener('DOMContentLoaded', function() {
	var element = document.getElementById('irkutsk');
	panzoom(element, {
		smoothScroll: false,
		bounds: true,
		boundsPadding: 0.1,
		maxZoom: 4,
		minZoom: 0.8
	});
});