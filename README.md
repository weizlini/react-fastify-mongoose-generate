# React and node-fastify-mongoose server
This is a demo app to generate a complete CRUD from 
server-side mongoose schemas

## About

This project contains both a server and a react app

The main aspect of this app is be able to quickly get
api routes and json schema validation created from 
mongoose schema model declarations.

It also generates code within the react-app that 
consumes the api, and generates models and state classes 
that make creating and editing new entries simple
and easy

the stacks are as follows:

### Front-end:
* ReactJS, 
* MobX (with decorators),
* Material UI

### Back-end:
* nodeJS
* fastify
* mongoose
* swagger/OAS

## Installation
in a bash shell type in
```
> ./install
```
this will execute a shell script that will do the `npm install`
for the server, the react app and the root directory

## MongoDB connection
this is simply a demo app meant to run on a local machine. if you have a standard local instance running
exposing localhost and standard mongoDB port you should simply be able to run this
app out of the box.

if you have a different mongoDB server you can edit line 13
in file `server/src/index.js` 

## Generating code based on mongoose models
mogoose model defintions should be placed within the 
`server/src/models` directory

in the root directory type the following:

```
>npm run generate
```

this will do the following:
* generate json schemas on the server
* generate routes for the api on the server
* generate front-end code to consume the api
* generate front-end mobx view models and state classes

## Running the development servers
open a terminal in the root directory and type in 
```
cd server
npm start
```
open another terminal window
```
cd react-app
npm start
```

## Creating the UI on the front-end

the `App.js` component contains a demo
using the code generated for an extremely
simple User model

after generating the code you will have
access to the state objects that will let you
automatically render a grid entries and edit
existing or create a new entry

simply replace the state class destructuring
declaration with your own after having generated
the models and state classes

and enjoy!






