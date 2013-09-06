var Party = Party || {};
	
(function (){
	
	var Guest = Backbone.Model.extend({});
	
	var GuestList = Backbone.Collection.extend({
		model: Guest,

		url: "guests"
	});
	
	var AnimalPartyRouter = Backbone.Router.extend({
		routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},
		showGuestList: function () {
			var guestList = new GuestList();
			new Party.GuestListView({collection : guestList});
			guestList.fetch();
		},
		startTheParty: function () {
			var collection = new GuestList();
			new Party.PartyView({collection:collection});
			collection.fetch();
		}
	});

	var router = new AnimalPartyRouter();
	
	Backbone.history.start({pushState: true});
	
	$('#party-starter').on('click', function () {
		router.navigate('start-the-party', true);
	});
	
}());
