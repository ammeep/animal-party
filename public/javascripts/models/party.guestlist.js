/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.GuestList = Backbone.Collection.extend({
		model: Party.Guest,

		url: "guests"
	});

}(Backbone));