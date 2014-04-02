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
