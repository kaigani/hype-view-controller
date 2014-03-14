window.onload = function(){

	// Init global properties
	HVC.setProperty('accumulator',0);
	HVC.setProperty('storeValue',0);
	HVC.setProperty('operator','');
	HVC.setProperty('memory','');

	// Init display
	HVC.view.getViewObject('calculatorDisplay').setText('0');
	HVC.view.getViewObject('memoryDisplay').setText('');
	HVC.view.update();

	var pushButton = function(e){

		if(typeof e.detail !== 'undefined'){

			var acc = HVC.getProperty('accumulator');
			var storeValue = HVC.getProperty('storeValue');
			var op = HVC.getProperty('operator');
			var mem = HVC.getProperty('memory');

			var button = HVC.view.getViewObject(e.detail); // send id names
			var value = button.getProperty('value');

			// Assume buttons without associated value are operators
			if(typeof value === 'undefined'){

				var doEqual = function(){

					if(op === 'ADD'){
						acc = storeValue+acc;
						storeValue = 0;
					}else if(op === 'SUB'){
						acc = storeValue-acc;
						storeValue = 0;
					}
					op = 'EQ';
					mem = '';
				};

				switch(button.id){

					case 'button-add':
						console.log('ADD button');
						doEqual();
						op = "ADD";
						storeValue = acc;
						mem += storeValue.toString()+' + ';
						acc = 0;
					break;

					case 'button-sub':
						console.log('SUBTRACT button');
						doEqual();
						op = "SUB";
						storeValue = acc;
						mem += storeValue.toString()+' - ';
						acc = 0;
					break;

					case 'button-equal':
						console.log('EQUAL button');
						doEqual();
					break;

					case 'button-clear':
						console.log('CLEAR button');
						acc = 0;
						mem = '';
					break;

					default:
						console.log('ERROR - what button?');
					break;
				}
			}else{

				// NUMERIC BUTTON - has value
				if(op === 'EQ'){
					op = '';
					acc = 0;
					mem = '';
				}
				acc = acc*10 + value;

			}

			// Store properties
			HVC.setProperty('accumulator', acc);
			HVC.setProperty('storeValue', storeValue);
			HVC.setProperty('operator', op);
			HVC.setProperty('memory', mem);

			// Update display
			HVC.view.getViewObject('calculatorDisplay').setText(acc);
			HVC.view.getViewObject('memoryDisplay').setText(mem);
			HVC.view.update();
		}
	};

	HVC.eventManager.addEventListener('pushButton',pushButton);
};