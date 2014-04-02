//
// HypeViewController.js 
//

//
// author: kaigani
// email: kaigani@gmail.com
//


// GLOBAL CLASS
var HypeViewController = function(){

	var that = this;

	this.view = new View();
	this.eventManager = new EventManager(document,'HVC:');

	// Private properties
	var props = {};

	// Accessors
	this.setProperty = function(name, value){ props[name] = value; return this; }; // returns root object for chaining
	this.getProperty = function(name){ return props[name]; };

	// loop count
	var count = 0;

	// Private update loop
	var update = function(){
		requestAnimFrame(update);
		count++;
		that.eventManager.send('tick',count);

		// Do something
		that.view.update();
	};

	// Start run loop
	this.start = function(){

		// Do any initialisation
		// ...

		update();
	};

};

