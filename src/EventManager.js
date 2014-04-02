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
