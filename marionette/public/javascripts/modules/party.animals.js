Party.App.module("PartyAnimals", function(PartyAnimals, App, Backbone, Marionette, $, _){
  
  "use strict";
  this.startWithParent = false;

  var Controller, PartyView, PartyingAnimals,AnimalView, EmptyView, Animal, Party;

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

    modelEvents: {
      'destroy': 'removeAnimal'
    },

    removeAnimal: function () {
      this.model.destroy();
    }
  });
  
  EmptyView = Marionette.ItemView.extend({
    template:'#empty-party-view'
  });

  PartyingAnimals = Marionette.CollectionView.extend({
    itemView: AnimalView,
    emptyView: EmptyView
  });

  PartyView = Marionette.Layout.extend({
    template: '#party-template',
    regions:{
      party : '#party-animals'
    }
  });

  Controller = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
    },

    show: function(){
      var view = new PartyView();
      this.listenTo(view, 'render', this.showChildView, this);
      this.region.show(view);
    },

    showChildView: function(layout){
      var collection, view;
      collection = new Party();
      view = new PartyingAnimals({collection : collection});
      layout.party.show(view);
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