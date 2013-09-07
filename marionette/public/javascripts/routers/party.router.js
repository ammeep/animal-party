/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.Router = Backbone.Router.extend({
		routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},
		showGuestList: function () {
			//Party.startSubApp('GuestList',{region:Party.App.main});
		},
		startTheParty: function () {
			var collection = new Party.PartyAnimals();
			new Party.PartyView({collection:collection});
			collection.fetch();
		}
	});

}(Backbone));