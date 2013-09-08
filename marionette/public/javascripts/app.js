var Party = Party || {};

Party.App = (function(Backbone, Marionette){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    main: "#app-container" //previously this was owned by each othe views.
  });

  App.on("initialize:after", function(){
  	App.Router = new Party.Router();
    if (Backbone.history){
      Backbone.history.start({pushState: true});
    }	
  });

  App.showApp = function(appName, args){
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp){ return; }

    if (App.currentApp){
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
    currentApp.show();
    return currentApp;
  };
 
	$(function () {
		 App.start();	
		 //var app = App.showApp('GuestList',{region:App.main});
	});
  return App;
})(Backbone, Marionette);