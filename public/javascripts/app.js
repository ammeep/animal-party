(function (){
	
	var ENTER_KEY = 13;
	
	var app = app || {};
	
	var Guest = Backbone.Model.extend({});
	
	var GuestList = Backbone.Collection.extend({
		model: Guest,
		url: "animals"
	});
	
	var GuestView = Backbone.View.extend({
		template: _.template($('#guest-item-template').html()),
		tagName: 'a',
		className: 'list-group-item',

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
	var GuestListView = Backbone.View.extend({
		el: '#app-container',
		template: _.template($('#guest-list-template').html()),
		
		initialize: function () {
			this.listenTo(this.collection, 'add', this.addOne, this);
			this.render();
			this.addAll();
		},		
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		addOne: function (guest) {
			var view = new GuestView({ model: guest });
			this.$('#guest-list').append(view.render().el);
		},
		addAll: function () {
			this.$('#guest-list').html('');
			this.collection.each(this.addOne, this);
		}
	});

	var guestList = new GuestList();
	guestList.add(new Guest());
	new GuestListView({collection : guestList});
	
}());
