//import fastify & mongoose
const fastify = require('fastify');
const mongoose = require('mongoose');

//initialized Fastify App
const app = fastify();

//connected fastify to mongoose
try {
  mongoose.connect('mongodb://localhost:27017/notes_db');
} catch (e) {
  console.error(e);
}

//handle root route
app.get('/', (request, reply) => {
  try{
    reply.send("Hello world!");
  } catch(e) {
    console.error(e);
  }
})

//set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});