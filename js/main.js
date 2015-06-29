var system = undefined;
var select = document.querySelector('select');
var canvas = document.querySelector('canvas');
var shapes = [{
	name: 'Stochastic',
	system: new LSystem('BF', {
		'F': '+FFFB',
		'B': '+[-]B'
	}, 7, 60, 30, .3, {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	}, canvas)
}, {
	name: 'Star',
	system: new LSystem('F', {
		'F': '+FF'
	}, 6, 60, 250, .3, {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	}, canvas)
}, {
	name: 'Bread',
	system: new LSystem('WV', {
		'F': 'IFFI',
		'V': 'V+',
		'W': 'FF',
		'I': '[]FIF+F-VI'
	}, 4, 90, 100, .3, {
		x: window.innerWidth / 4,
		y: window.innerHeight / 2
	}, canvas)
}, {
	name: 'Koch Kurve',
	system: new LSystem('G+G+G+G', {
		'G': 'G+G-G-GG+G+G-G'
	}, 3, 90, 5, 1, {
		x: window.innerWidth / 2.75,
		y: window.innerHeight / 1.5
	}, canvas)
}, {
	name: 'Rings',
	system: new LSystem('F+F+F+F', {
		'F': 'FF+F+F+F+F+F-F'
	}, 4, 90, 5, 1, {
		x: window.innerWidth / 3.25,
		y: window.innerHeight / 3
	}, canvas)
}, {
	name: 'Gosper',
	system: new LSystem('XF', {
		'X': 'X+YF++YF-FX--FXFX-YF+',
		'Y': '-FX+YFYF++YF+FX--FX-Y'
	}, 4, 60, 10, 1, {
		x: window.innerWidth / 3.25,
		y: window.innerHeight / 2.5
	}, canvas)
}];

shapes.forEach(function(shape, index) {
	select.innerHTML += '<option value="' + index + '">' + shape.name + '</option>';
});

select.onchange = function(event) {
	system = Object.create(shapes[this.value].system);
	system.run();
};

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

system = Object.create(shapes[0].system);
system.run();
