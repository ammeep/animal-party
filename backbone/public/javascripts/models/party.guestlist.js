/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.GuestList = Backbone.Collection.extend({
		model: Party.Guest,

		url: "guests",

		confirmed: function () {
			return this.filter(function (guest) {
				return guest.get('rsvp');
			});
		},

		declined: function () {
			return this.without.apply(this, this.confirmed());
		}
	});

}(Backbone));