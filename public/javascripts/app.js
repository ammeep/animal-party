(function (){
	
	var ENTER_KEY = 13;
	
	var app = app || {};
	
	var Guest = Backbone.Model.extend({});
	
	var GuestList = Backbone.Collection.extend({
		model: Guest,

		url: "guests"
	});
	
	var GuestView = Backbone.View.extend({

		template: _.template($('#guest-item-template').html()),

		tagName: 'a',

		className: 'list-group-item',

		events: {
			'click .uninvite': 'delete'
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		delete: function(){
			this.model.destroy();
		}
	});
	
	var GuestListView = Backbone.View.extend({
		el: '#app-container',

		template: _.template($('#guest-list-template').html()),

		events: {
			'keypress #guest-text-box': 'createOnEnter'
		},
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
		},

		createOnEnter: function (e) {
			if (e.which !== ENTER_KEY || !this.$('#guest-text-box').val().trim()) {
				return;
			}
			this.collection.create({ name: this.$('#guest-text-box').val() });
			this.$('#guest-text-box').val('');
		}
	});

	var PartyAnimalView = Backbone.View.extend({
		template: _.template($('#party-animal-template').html()),
		tagName: 'li',
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
		},
		jiggle: function () {
			$(this.el).addClass('jiggly');
		}
	});
	
	var PartyView = Backbone.View.extend({
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
			view.jiggle();
		},
		addAll: function () {
			this.$('#party-animals').html('');
			this.collection.each(this.addOne, this);
		},
	});
	

	var AnimalPartyRouter = Backbone.Router.extend({
		routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},
		showGuestList: function () {
			var guestList = new GuestList();
			new GuestListView({collection : guestList});
			guestList.fetch();
		},
		startTheParty: function () {
			var collection = new GuestList();
			new PartyView({collection:collection});
			collection.fetch();
		}
	});

	var router = new AnimalPartyRouter();
	
	Backbone.history.start({pushState: true});
	
	$('#party-starter').on('click', function () {
		router.navigate('start-the-party', true);
	});
	
}());
