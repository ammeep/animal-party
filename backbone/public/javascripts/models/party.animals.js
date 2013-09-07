/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.PartyAnimals = Backbone.Collection.extend({
		model: Party.Guest,

		url: "party"
	});

}(Backbone));