/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.Guest = Backbone.Model.extend({
		
		defaults: {
			name: '',
			rsvp: false
		},

		toggleRsvp: function () {
			this.save({rsvp: !this.get('rsvp')});
		}
	});

}(Backbone));