Party.App.module("PartyAnimals", function(PartyAnimals, App, Backbone, Marionette, $, _){
  "use strict";
  this.startWithParent = false;

  var Controller, PartyView, AnimalView, Animal, Party;

  Animal = Backbone.Model.extend({ });

  Party = Backbone.Collection.extend({
    model: Animal,
    url: "party"
  });

  AnimalView = Marionette.ItemView.extend({
    className: 'col-sm-6 col-md-3',
    template: '#party-animal-template',

    events: {
      'click': 'removeAnimal'
    },

    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    removeAnimal: function () {
      this.model.destroy();
    }

  });
  
  PartyView = Marionette.CollectionView.extend({
    itemView: AnimalView,
    template: '#party-template'
  });

  Controller = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
    },

    show: function(){
      var collection, view;
      collection = new Party();
      view = new PartyView({collection : collection});
      this.region.show(view);
      collection.fetch();
    }
  });

  PartyAnimals.show = function(){
    PartyAnimals.controller.show();
  };

  PartyAnimals.on("before:start", function(options){
    PartyAnimals.controller = new Controller(options);
    App.vent.trigger("app:started", "PartyAnimals");
  });


  PartyAnimals.on("before:stop",function(){
    if (PartyAnimals.controller){
      PartyAnimals.controller.close();
      delete PartyAnimals.controller;
    }
  });

});