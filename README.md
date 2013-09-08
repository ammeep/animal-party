#Animal Party 
An Unsuck your Backbone Demo, useful to compare how the same app would be implemented in both [backbone.js](http://backbonejs.org/) and [marionette.js](marionettejs.com)

## The facts
 - Animals like to party.
 - Scaling backbone.js applications can be hard.
 
So to help the party animals, and provide some guidance for scaling JavaScript applications written in backbone, here is animal party.
An example app built with backbone.js and then again with marionette.js. Illustrating one way to structure your backbone application in a composite fashion.

In this demo you can create an invitation list, to keep track of who you have invited to the party of the year. Once your guests have sent back an RSVP, 
you can mark them as attending. If you decide your animal friend was mean and you no longer want them at your party
you can kick them off the list. Once you are ready - you can start the party! 

## The pieces of the demo

There are two folders, each containing an implementation of the same app, one written in backbone.js and the other written in marionette.js.
Both folders contain a web server written in node.js (express). If you are not farmiliar with Express.js you can find [more information here](http://expressjs.com/). The webserver contains a simple api for keeping track of your potential guests, and your confirmed guests.
The web server also serves up static assets like, the html, javascript and css.

## How to run the demo

To run, change directory into one of the directories (backbone, or marionette)

```
cd backbone
```

Then, install local development dependencies.  From the subroute directory, run:

```
npm install
```

Then, start the app
```
node app
```

You should now have a express web server listening on port 3000
