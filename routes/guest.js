
/*
 * GET users listing.
 */
var guests = [];
var nextId = 1;

exports.list = function(req, res){
  return res.send(guests);
};

exports.addToList = function (req, res) {
	var guest = { name: req.body.name, id: nextId++ };
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