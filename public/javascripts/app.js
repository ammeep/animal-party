var Party = Party || {};
	
(function (){
	
	var AnimalPartyRouter = Backbone.Router.extend({
		routes: {
			'': 'showGuestList',
			'start-the-party': 'startTheParty'
		},
		showGuestList: function () {
			var guestList = new Party.GuestList();
			new Party.GuestListView({collection : guestList});
			guestList.fetch();
		},
		startTheParty: function () {
			var collection = new Party.GuestList();
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
