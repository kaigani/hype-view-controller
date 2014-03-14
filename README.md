**Why?**


I've been using Tumult's Hype from the start, and with each new version
they've transformed it from a tool in which you can create animations in HTML5
into a tool that is robust enough to build a rich, responsive web
presentations.

  

I'm a big advocate of using it for prototyping apps and games, and through
this prototyping I realised that Hype is an ideal tool for designing the views
of a fully-featured web app.

  

At the moment, Hype allows for importing and creating custom Javascript files
and functions to be embedded in the Hype document – but this can get
convoluted. I wanted to make a clearer distinction between the UI views in
Hype and the application logic.

  

The concept is– for Hype to handle all of the interaction on the UI side, and
then to communicate with the core app logic via events.

  

**Example **


If you're familiar with Hype, the example use case I had in mind for
developing the hypeViewController is– to would you design a calculator using
Hype. 

I've provided an example of a basic, but working calculator app in the
Examples/ folder. 

You can see that once you've created and linked your Hype objects to the view
controller, you can change the design of the calculator, add animations and
transitions, and the core application logic won't need to change.  You could
even use the timeline to automate events that would make the calculator
operate itself.

**How to use hypeViewController.js**

Adding 'hypeViewController.js' to your project resources will create the
hypeViewController class, and it will instantiate a version into the HVC
namespace.


**GLOBAL PROPERTIES**

These are convenience functions for setting properties globally to share
values between the Hype document and your application.

**HVC.setProperty(name, value)** – sets a value

**HVC.getProperty(name)** – returns a value

**
**

**VIEW**

This allows you to add and update ViewObject objects to the view.  ViewObjects
are essentially containers for DOM elements, but with an added layer of
abstraction.

  

**HVC.view.update()** – update all view objects**  
**

**HVC.view.addViewObject(element,[id])** -- element is the DOM element, id is optional and will default to element.id

**HVC.view.getViewObject(id)** – returns ViewObject obj

  

**VIEW OBJECT**

I've added convenience functions for adding properties to the view objects,
but the most important method is .setText() which allows you to modify the
text within an object.  Using .setText() you can style the text as you want in
Hype and then change that text from within the application.

  

**viewObject.update()** – updates the display of this view object, better handled by the parent view's view.update()

**viewObject.setProperty(name, value)** – sets a value

**viewObject.getProperty(name)** – returns a value

  

**viewObject.setText(text)** – sets the text within that object (creates or changes the first textNode within the DOM element)

  

**EVENT MANAGER**

A simple wrapper that makes adding event listeners and sending events easier.

**HVC.eventManager.addEventListener(eventName, handler)** – add an event listener - a simplified version of document.addEventListener
**HVC.eventManager.removeEventListener(eventName, handler)** – remove an event listener

**HVC.send(eventName, [data])** – where sending data is optional, and will be attached to the event, e.details property in the handler
