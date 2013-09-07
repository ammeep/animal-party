var Repository = require('./repository').Repository;
var repository = new Repository();
/*
 * GET guests listing.
 */

exports.list = function(req, res){
	repository.allGuests(function(errors,guests){
		res.send(guests)
	});
};

exports.addGuest = function (req, res) {
	var guest = { name: req.body.name, rsvp: req.body.rsvp};
	repository.addGuest(guest,function(errors,guest){
		res.send(guest)
	});
};

exports.removeGuest = function(req,res){
	repository.removeGuest(req.id,function(errors){
		res.send()
	});
};

exports.updateGuest = function(req,res){
	var guest = { id:req.params.id,name: req.body.name, rsvp: req.body.rsvp};
	repository.updateGuest(guest,function(errors,guest){
		res.send(guest)
	});
};

exports.listPartyAnimals = function(req,res){
	repository.find({rsvp:true},function(error, guests){
		console.log(guests);
		res.send(guests);
	});
};