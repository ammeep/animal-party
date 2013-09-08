/*global Backbone */
var Party = Party || {};
Party.Router = (function(App, Backbone){
  "use strict";

    var Router = Backbone.Router.extend({

     	routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},

		showGuestList: function () {
			Party.App.showApp('GuestList',{region:Party.App.main});
		},
		startTheParty: function () {
			Party.App.showApp('PartyAnimals',{region:Party.App.main});
		}

    });
  return Router;

})(Party.App, Backbone); 