
/*
 * GET users listing.
 */
var guests = [];
var nextId = 1;

exports.list = function(req, res){
  return res.send(guests);
};

exports.addToList = function (req, res) {
	var guest = { name: req.body.name, rsvp: req.body.rsvp, id: nextId++ };
	guests.push(guest);
	return res.send(guest);
};

exports.removeFromList = function(req,res){
	var indexToDelete;
	guests.forEach(function (el, index) {
		if (el.id == req.params.id) {
			indexToDelete = index;
		}
	});
	guests.splice(indexToDelete, 1);
	return res.send({});
};

exports.update = function(req,res){
	var indexToReplace;
	guests.forEach(function (el, index) {
		if (el.id == req.params.id) {
			indexToReplace = index;
		}
	});

	guests[indexToReplace].name = req.body.name;
	guests[indexToReplace].rsvp = req.body.rsvp;
	
	return res.send({});
};