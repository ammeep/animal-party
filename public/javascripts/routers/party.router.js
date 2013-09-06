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
			var guestList = new Party.GuestList();
			new Party.GuestListView({collection : guestList});
			guestList.fetch();
		},
		startTheParty: function () {
			var collection = new Party.GuestList();
			new Party.PartyView({collection:collection});
			collection.fetch();
		}
	});

}(Backbone));