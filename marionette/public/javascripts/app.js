PartyApp = (function(Backbone, Marionette){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    mainRegion: "#app-container" 
  });

  App.on("initialize:after", function(){
    if (Backbone.history){
      Backbone.history.start({pushState: true});
    }	
  });

	$(function () {
		 App.start();	
		 //var app = App.showApp('GuestList',{region:App.main});
	});
  return App;
})(Backbone, Marionette);