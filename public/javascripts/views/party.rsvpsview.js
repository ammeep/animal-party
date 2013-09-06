/*global Backbone, $, _ */
var Party = Party || {};

(function (Backbone, $, _){
	'use strict';

	Party.RsvpsView = Backbone.View.extend({

		el: '#rspv-counter',

		template: _.template($('#rsvp-template').html()),

		initialize: function () {
		//	this.listenTo(this.collection, 'change:rsvp', this.render);
		},

		render: function () {
			var confirmed = this.collection.confirmed().length;
			var declined = this.collection.declined().length;
			this.$el.html(this.template({confirmed:confirmed,declined:declined}));
			return this;
		}
	});

}(Backbone,$ ,_));