# React and node-fastify-mongoose server
this project contains both a server and a react app

The main aspect of this app is be able to quickly get
an api created from mongoose model declarations

It also generates code within the react-app that 
consumes the api, and generates models and state classes 
that make creating and editing new entries simple
and easy

## Installation
in a bash shell type in
```
> ./install
```
this will execute a shell script that will do the `npm install`
for the server, the react app and the root directory

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
* generate front-end mobx code

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