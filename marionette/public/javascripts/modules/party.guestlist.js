Party.App.module("GuestList", function(GuestList, App, Backbone, Marionette, $, _){
  "use strict";
  this.startWithParent = false;

  var ENTER_KEY, Layout, RsvpsView, GuestsView, GuestView;
  var Guest, Guests, Controller;

  ENTER_KEY = 13;

  Guest = Backbone.Model.extend({
    
    defaults: {
      name: '',
      rsvp: false
    },

    toggleRsvp: function () {
      this.save({rsvp: !this.get('rsvp')});
    }
  });

  Guests = Backbone.Collection.extend({ 
    model: Guest,

    url: "guests",

    confirmed: function () {
      return this.filter(function (guest) {
        return guest.get('rsvp');
      });
    },

    declined: function () {
      return this.without.apply(this, this.confirmed());
    }
  });

  GuestView = Marionette.ItemView.extend({

    tagName: 'a',

    template: '#guest-item-template',

    className: 'list-group-item',

    events: {
      'click .uninvite': 'delete',
      'click .rsvp-checkbox' : 'toggelRsvp'
    },

    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    delete: function(){
      this.model.destroy();
    },

    toggelRsvp: function(){
      this.model.toggleRsvp();
    }
  });
  
  GuestsView = Marionette.CollectionView.extend({
    itemView: GuestView
  });

  RsvpsView = Marionette.ItemView.extend({

    template:'#rsvp-template',

    initialize: function(){
      this.collection.on('add',this.render,this);
      this.collection.on('change',this.render,this);
    },
    serializeData: function(){
      var confirmed = this.collection.confirmed().length;
      var declined = this.collection.declined().length;
      return {confirmed:confirmed,declined:declined};
    }

  });

  Layout = Marionette.Layout.extend({

    template: '#guest-list-template',

    regions:{
      guestList: '#guest-list',
      rsvpStats: '#rspv-counter'
    },

    events: {
      'keypress #guest-text-box': 'createOnEnter',
      'click #party-starter' : 'startTheParty'
    },

    ui:{
      guestTextBox: '#guest-text-box'
    },

    createOnEnter: function (e) {
      if (e.which !== ENTER_KEY || !this.ui.guestTextBox.val().trim()) {
        return;
      }
      this.collection.create({ name: this.ui.guestTextBox.val() });
      this.ui.guestTextBox.val('');
    },

    startTheParty: function(){
      Party.App.Router.navigate('start-the-party', true);
    }
  });

  Controller = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
    },

    show: function(){
      var view = new Layout();
      view.on('render',this.showChildViews,this);
      this.region.show(view);
    },

    showChildViews: function(layout){
      var guests, collectionView, rsvpView;
      guests = new Guests()
      collectionView = new GuestsView({collection: guests});
      rsvpView = new RsvpsView({collection: guests});
      layout.guestList.show(collectionView);
      layout.rsvpStats.show(rsvpView);
      guests.fetch();
    }
  });

  GuestList.show = function(){
    GuestList.controller.show();
  };

  GuestList.on("before:start", function(options){
    GuestList.controller = new Controller(options);
    App.vent.trigger("app:started", "guestList");
  });


  GuestList.on("before:stop",function(){
    if (GuestList.controller){
      GuestList.controller.close();
      delete GuestList.controller;
    }
  });

});