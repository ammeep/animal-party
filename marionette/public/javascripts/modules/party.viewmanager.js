PartyApp.module("ViewManager", function(ViewManager, App, Backbone, Marionette, $, _){
  	
  	var Controller, Router, router, controller;

	Router = Marionette.AppRouter.extend({
	  appRoutes: {
   		'': 'showGuestList',
		'start-the-party': 'startTheParty'
	  },
	});

  	Controller = Marionette.Controller.extend({

  		showGuestList: function(){
  			this.startModule('GuestList',{region:App.mainRegion})
  		},

  		startTheParty: function(){
  			this.startModule('PartyAnimals',{region:App.mainRegion})
  		},

  		startModule: function(moduleName, args){
		    var currentModule = App.module(moduleName);
		    if (this.currentModule === currentModule){ return; }

		    if (this.currentModule){
		      this.currentModule.stop();
		    }

		    this.currentModule = currentModule;
		    currentModule.start(args);
		    currentModule.show();
		    return currentModule;
		}
  	});


  	ViewManager.on("before:start", function(options){
  		controller = new Controller();
    	router = new Router({controller: controller});
  	});
  	
  	ViewManager.on("before:stop",function(){
    	if (router){
      		delete router;
    	}
 	});
});