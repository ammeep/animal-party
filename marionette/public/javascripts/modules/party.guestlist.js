Party.App.module("GuestList", function(GuestList, App, Backbone, Marionette, $, _){
  "use strict";
  this.startWithParent = false;

  var ENTER_KEY,GuestListView, GuestView, Guest, Guests, Controller;

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
  
  GuestListView = Marionette.CompositeView.extend({
    itemView: GuestView,
    template: '#guest-list-template',
    itemViewContainer: '#guest-list',

    events: {
      'keypress #guest-text-box': 'createOnEnter',
      'click #party-starter' : 'startTheParty'
    },

    ui:{
      guestTextBox: '#guest-text-box'
    },

    onShow:function(){
      var rsvpView = new Party.RsvpsView({collection:this.collection});
      rsvpView.render();
    },

    createOnEnter: function (e) {
      if (e.which !== ENTER_KEY || !this.ui.guestTextBox.val().trim()) {
        return;
      }
      this.collection.create({ name: this.ui.guestTextBox.val() });
      this.ui.guestTextBox.val('');
    },

    startTheParty: function(){
      Party.router.navigate('start-the-party', true);
    }
  });

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

  GuestList.show = function(){
    GuestList.controller.show();
  };

  GuestList.on("before:start", function(options){
    GuestList.controller = new Controller(options);
    Party.App.vent.trigger("app:started", "guestList");
  });


  GuestList.on("before:stop",function(){
    if (GuestList.controller){
      GuestList.controller.close();
      delete GuestList.controller;
    }
  });

});