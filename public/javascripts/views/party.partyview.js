/*global Backbone, $, _ */
var Party = Party || {};

(function (Backbone, $, _){
	'use strict';

	var PartyAnimalView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#party-animal-template').html()),

		events: {
			'click': 'removeAnimal'
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
		},

		removeAnimal: function () {
			this.model.destroy();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
	Party.PartyView = Backbone.View.extend({
		el: '#app-container',
		template: _.template($('#party-template').html()),
		
		initialize: function () {
			this.listenTo(this.collection, 'add', this.addOne, this);
			this.render();
		},		
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		addOne: function (animalInvite) {
			var view = new PartyAnimalView({ model: animalInvite });
			this.$('#party-animals').append(view.render().el);
		},
		addAll: function () {
			this.$('#party-animals').html('');
			this.collection.each(this.addOne, this);
		}
	});

}(Backbone,$ ,_));