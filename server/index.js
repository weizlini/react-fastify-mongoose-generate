//import fastify & mongoose
const fastify = require("fastify");
const oas = require("fastify-oas");
const mongoose = require("mongoose");
const cors = require("fastify-cors");
const fetch = require("node-fetch");
const websockets = require("fastify-websocket");
//initialize Fastify App
const app = fastify();

//connect fastify to mongoose
try {
  mongoose.connect("mongodb://localhost:27017/demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error(e);
}

// add websocket
app.register(websockets);

// add cors
app.register(cors, {
  maxAge: 30 * 60,
});

// add swagger
app.register(oas, {
  routePrefix: "/docs",
  addModels: true,
  swagger: {
    openapi: "3.0.0",
    schemes: ["http"],
    info: {
      title: "Test openapi",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    servers: [
      {
        url: `http://localhost:5000`,
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  exposeRoute: true,
});
let eventcount = 0;
let bla = setInterval(() => {
  eventcount++;
}, 100);

// basic route

app.get("/", (request, reply) => {
  try {
    reply.send("Server is working !");
  } catch (e) {
    console.error(e);
  }
});

// simple test of obtaining value of a changing local variable

app.get("/events", (request, reply) => {
  try {
    reply.send({ eventCount: eventcount });
  } catch (e) {
    console.error(e);
  }
});

//simple test of http requests on the backend

app.get("/test-http", async (request, reply) => {
  const response = await fetch("https://api.github.com/orgs/iptoki/repos");
  const json = await response.json();
  console.log(json);
  return json;
});

const connections = [];
setInterval(() => {
  connections.forEach((conn) => {
    conn.Write(JSON.stringify({ eventCount: eventcount }));
  });
}, 5000);

// registering of model based CRUD
try {
  app.register(require("./src/routes/index"), { prefix: "/api" });
} catch (e) {
  console.log(e);
}

//set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
  console.log(`api docs are here: ${address}/docs`);
});
