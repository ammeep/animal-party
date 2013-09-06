
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
});