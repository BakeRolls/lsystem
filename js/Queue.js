var Queue = function() {
	this.steps = [];

	this.put = function(step) {
		this.steps.push(step);
	};

	this.pop = function() {
		var step = this.steps[this.steps.length - 1];
		this.steps.splice(this.steps.length - 1, 1);

		return step;
	}
};
