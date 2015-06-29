var LSystem = function(seed, rules, iterations, rotation, length, factor, position, canvas) {
  self            = this;
	this.seed       = seed;
	this.rules      = rules;
	this.iterations = iterations;
	this.rotation   = rotation;
	this.length     = length;
	this.factor     = factor;
	this.position   = position;
	this.canvas     = canvas;
	this.angle      = 0;
	this.opacity    = 1;
  this.ctx        = this.canvas.getContext('2d');
	this.queue      = new Queue();
	this.logics     = {
		'F': self.draw,
		'G': self.draw,
		'H': self.move,
		'[': self.put,
		']': self.pop,
		'-': self.rotateLeft,
		'+': self.rotateRight
	};
};

LSystem.prototype.move = function() {
	this.position = {
		x: this.position.x + this.length * this.factor * Math.sin(this.angle * Math.PI / 180),
		y: this.position.y + this.length * this.factor * Math.cos(this.angle * Math.PI / 180) * -1
	};

  this.level++;
};

LSystem.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.position.x, this.position.y);

	this.move();

  this.ctx.lineWidth = 2;
  this.ctx.strokeStyle = 'white';

	this.ctx.lineTo(this.position.x, this.position.y);
	this.ctx.stroke();
	this.ctx.closePath();
};

LSystem.prototype.put = function() {
	this.queue.put({
		angle:    this.angle,
		length:   this.length,
		rotation: this.rotation,
		position: this.position
	});

  this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};

LSystem.prototype.pop = function() {
	var state = this.queue.pop();

	this.angle    = state.angle;
	this.length   = state.length;
	this.rotation = state.rotation;
	this.position = state.position;
};

LSystem.prototype.rotateLeft = function() {
	this.angle -= this.rotation;
};

LSystem.prototype.rotateRight = function() {
	this.angle += this.rotation;
};

LSystem.prototype.iterate = function() {
	var self = this;
	var seed = '';

	this.seed.split('').forEach(function(char) {
		seed += (result = self.rules[char]) ? result : char;
	});

	return seed;
}

LSystem.prototype.run = function() {
	for(var i = 0; i < this.iterations; i++) {
		this.seed = this.iterate();
	}

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	var self = this;

	this.seed.split('').forEach(function(char) {
		if(typeof self.logics[char] == 'function') {
			self.logics[char].apply(self);
		}
	});
};
