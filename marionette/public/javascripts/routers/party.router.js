/*global Backbone */
PartyApp.Router = (function(App, Backbone){
  "use strict";

    var Router = Backbone.Router.extend({

     	routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},

		showGuestList: function () {
			PartyApp.showApp('GuestList',{region:PartyApp.main});
		},
		startTheParty: function () {
			PartyApp.showApp('PartyAnimals',{region:PartyApp.main});
		}

    });
  return Router;

})(PartyApp, Backbone); 