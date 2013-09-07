Party.App.module("PartyAnimals", function(PartyAnimals, App, Backbone, Marionette, $, _){
  "use strict";
  this.startWithParent = false;

  var Controller;


  Controller = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
    },

    show: function(){
      var collection, view;
      collection = new Guests();
      view = new GuestListView({collection : collection});
      this.region.show(view);
      collection.fetch();
    }
  });

  PartyAnimals.show = function(){
    PartyAnimals.controller.show();
  };

  PartyAnimals.on("before:start", function(options){
    console.log(options);
    PartyAnimals.controller = new Controller(options);
    Party.App.vent.trigger("app:started", "PartyAnimals");
  });


  PartyAnimals.on("before:stop",function(){
    if (PartyAnimals.controller){
      PartyAnimals.controller.close();
      delete PartyAnimals.controller;
    }
  });

});