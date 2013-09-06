var Party = Party || {};
	
(function (){

	var router = new Party.Router();
	
	Backbone.history.start({pushState: true});
	
	$('#party-starter').on('click', function () {
		router.navigate('start-the-party', true);
	});
	
}());
