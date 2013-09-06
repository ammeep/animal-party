
/*
 * GET users listing.
 */
var guests = [];

exports.list = function(req, res){
  return res.send(guests);
};