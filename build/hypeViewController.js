// 
// HypeViewController.js - Intro
//

// 
// START CLOSURE
//

(function(window){

// For building with CodeKit ( see https://incident57.com/codekit/ )

// @codekit-append “_globals.js”
// @codekit-append “View.js”
// @codekit-append “EventManager.js”
// @codekit-append "HypeViewController.js"

// @codekit-append “_outro.js”


;
// GLOBAL utilities & shims

// shim layer with setTimeout fallback - doesn't seem to outperform setInterval though...
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60); // 60 fps
          };
})();

// Add a clone function to the array
Array.prototype.clone = function(){
	return this.slice();
};

;
//
// VIEW CLASS
//

var View = function(){

	this.root = null; // document holder
	this.stage = []; // view object array
};

//
// View.update() - update all view objects
//

View.prototype.update = function(){

	for(var i=0;i<this.stage.length;i++){

		this.stage[i].update();
	}

};

//
// View.addViewObject(element,[id]) -- element = DOM element
//

View.prototype.addViewObject = function(e,id){

	id = id ? id : e.id;
	if(!id) return null;

	var o = new ViewObject(e,id,false);
	this.stage.push(o);

	return o;

};

//
// View.getViewObject(id) = ViewObject o
//

View.prototype.getViewObject = function(id){

	for(var i=0;i<this.stage.length;i++){

		var o = this.stage[i];

		if(o.id === id) return o;
	}

	return null;
};

//
// ViewObject class - gives a generic interface to objects we add to the view
//
// new ViewObject(element,id) 
//  -- element - DOM element or CANVAS
//  -- id - text id
//  -- isCanvas - true/false - if element is the canvas element and the type is canvas object

var ViewObject = function(element, id, isCanvas){

	this.element = element;
	this.id = id;
	this.isCanvas = (this.isCanvas)?true:false;
	
	// Private
	var props = {};

	// Privileged
	this.setProperty = function(name,value){ props[name] = value; return this; }; // chaining
	this.getProperty = function(name){ return props[name]; };
};

//
// ViewObject.update()
//

ViewObject.prototype.update = function(){

	if(!this.isCanvas){

		// Update DOM element properties

		// props.text
		var text = this.getProperty('text');
		var textNode = this.getProperty('textNode');

		if( typeof text !== 'undefined' && typeof textNode !== 'undefined' ){

			textNode.textContent = text;
		}

	}else{

		// Update CANVAS properties
	}
};


//
// ViewObject.setText(text) = also sets the text property 
//

ViewObject.prototype.setText = function(text){

	this.setProperty('text',text);

	// ADD TO TEXT NODE in ELEMENT, or CREATE A NODE - store in textNode property
	if( !this.isCanvas && !this.getProperty('textNode') ){

		var textNode;

		// Will return the last text node of the children, if it exists
		for (i=0; i<this.element.childNodes.length; i++){
			if (this.element.childNodes[i].nodeType==document.TEXT_NODE){
				textNode = this.element.childNodes[i];
			}
		}

		textNode = textNode ? textNode : document.createTextNode(text);
		this.setProperty( 'textNode', textNode );
		this.element.appendChild(textNode);
	}

	// this.update(); // uncomment if not using an animation loop

	return this; // for chaining.

};

// 
// ViewObject.setColor(r,g,b) - sets the text color
//

ViewObject.prototype.setColor = function(r,g,b){

	if( !this.isCanvas){

		this.element.style.color = "rgb("+r+","+g+","+b+")";
	}

	return this; // for chaining
};

// 
// ViewObject.setBackgroundColor(r,g,b) - sets the background color
//

ViewObject.prototype.setBackgroundColor = function(r,g,b){

	if( !this.isCanvas){

		this.element.style.backgroundColor = "rgb("+r+","+g+","+b+")";
	}

	return this;
};
;
//
// EVENT MANAGER
//

var EventManager = function(DOMelement,namespace){

	this.DOMelement = DOMelement ? DOMelement : document;
	this.namespace = namespace ? namespace : '';
};

EventManager.prototype.addEventListener = function(event,handler){

	this.DOMelement.addEventListener( this.namespace+event, handler, false );
};

EventManager.prototype.removeEventListener = function(event, handler){

	this.DOMelement.removeEventListener( this.namespace+event, handler, false );
};

// 
// CLASS: EventManager.send(event,[data]) - send an event
// ---

EventManager.prototype.send = function(event,data){

	//console.log("Sending: "+this.namespace+event);

	var e;

	if(typeof data === 'undefined'){

		e = new Event(this.namespace+event); // HVC: event namespace
		//console.log('no data');
	}else{

		e = new CustomEvent(this.namespace+event, { 'detail': data });
		//console.log('data: '+data);
	}

	this.DOMelement.dispatchEvent(e);
};

;
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


;
// 
// HypeViewController.js - Outro
//

// 
// END CLOSURE & Add hypeViewController class to Global namespace
//

	window.HypeViewController = HypeViewController;

})(window);

// For ease of use in Hype
window.HVC = new HypeViewController();