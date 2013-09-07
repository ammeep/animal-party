var _ = require('underscore');

var guests = [];
var nextId = 1;

Repository = function(){};

Repository.prototype.allGuests = function(callback) {
  callback(null, guests);
};

Repository.prototype.addGuest = function(guest, callback) {
  var guest = { name: guest.name, rsvp: guest.rsvp, id: nextId++ };
  guests.push(guest);
  callback(null, guest);
};

Repository.prototype.removeGuest = function(guestId, callback) {
  var indexToDelete;
  guests.forEach(function (el, index) {
    if (el.id == guestId) {
      indexToDelete = index;
    }
  });
  guests.splice(indexToDelete, 1);
  callback(null);
};

Repository.prototype.updateGuest = function(guest, callback) {
  var indexToReplace;
  guests.forEach(function (el, index) {
    if (el.id == guest.id) {
      indexToReplace = index;
    }
  });
  guests[indexToReplace].name = guest.name;
  guests[indexToReplace].rsvp = guest.rsvp;
  callback(null, guests[indexToReplace]);
};

Repository.prototype.findPartyGoers = function(callback){
  var attendingGuests = _.where(guests,{rsvp:true});
  var partyAnimals = _.map(attendingGuests,function(item){
     var randomImageNumber = _.random(1, 10);
     var randomImage = '/images/partyanimals/'+ randomImageNumber + '.jpeg';
     return _.extend(item, {photo : randomImage});
  });
  callback(null, partyAnimals);
};

exports.Repository = Repository;