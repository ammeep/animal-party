/*global Backbone */
var Party = Party || {};

(function (Backbone){
	'use strict';

	Party.Animal = Backbone.Model.extend({
		
		defaults: {
			name: ''
		}
	});

}(Backbone));