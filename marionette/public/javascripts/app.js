var Party = Party || {};
Party.router = new Party.Router();
Party.App = (function(Backbone, Marionette){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    main: "#app-container" //previously this was owned by each othe views.
  });

  App.on("initialize:after", function(){
    if (Backbone.history){
      Backbone.history.start({pushState: true});
    }	
   
  });

  App.startSubApp = function(appName, args){
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp){ return; }

    if (App.currentApp){
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
    return currentApp;
  };
 
	$(function () {
		 App.start();
		 var app = App.startSubApp('GuestList',{region:App.main});
		 app.show();
	});
  return App;
})(Backbone, Marionette);