PartyApp.module("GuestList", function(GuestList, App, Backbone, Marionette, $, _){
  "use strict";
  this.startWithParent = false;

  var ENTER_KEY, Layout, InviteGuestView, RsvpsView, GuestsView, GuestView;
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
      'click .rsvp-checkbox' : 'toggleRsvp'
    },

    modelEvents:{
      'destroy' : 'remove'
    },

    delete: function(){
      this.model.destroy();
    },

    toggleRsvp: function(){
      this.model.toggleRsvp();
    }
  });
  
  GuestsView = Marionette.CollectionView.extend({
    itemView: GuestView
  });

  RsvpsView = Marionette.ItemView.extend({

    template:'#rsvp-template',

    collectionEvents:{
      'add  change destroy' : 'render',
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
      PartyApp.Router.navigate('start-the-party', true);
    }
  });

  Controller = Marionette.Controller.extend({

    initialize: function(options){
      this.region = options.region;
      this.guests = new Guests();
    },

    show: function(){
      var view = new Layout({collection: this.guests});
      this.listenTo(view, 'render', this.showChildViews, this);
      this.region.show(view);
      this.guests.fetch();
    },

    showChildViews: function(layout){
      var collectionView, rsvpView;  
      collectionView = new GuestsView({collection: this.guests});
      rsvpView = new RsvpsView({collection: this.guests});
      layout.guestList.show(collectionView);
      layout.rsvpStats.show(rsvpView);
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