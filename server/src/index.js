//import fastify & mongoose
const fastify = require("fastify");
const oas = require("fastify-oas");
const mongoose = require("mongoose");
const cors = require("fastify-cors");
//initialized Fastify App
const app = fastify();

//connected fastify to mongoose
try {
  mongoose.connect("mongodb://localhost:27017/smegma", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error(e);
}

app.register(cors, {
  maxAge: 30 * 60,
});

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
app.get("/api/hello", (request, reply) => {
  try {
    reply.send("Hello world!");
  } catch (e) {
    console.error(e);
  }
});
app.register(require("./routes/index"), { prefix: "/api" });
//set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
