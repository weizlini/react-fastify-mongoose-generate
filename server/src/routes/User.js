/**
 * CRUD API routes for the User model
 * This file is generated
 */

const { NotFound } = require("http-errors");
const User = require("../models/User");
const UserSchema = require("../schemas/User");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/users",
    schema: {
      tags: ["users"],
      description: "Get list of User",
      response: {
        200: { type: "array", items: UserSchema },
      },
    },
    handler: async (req, res) => {
      return User.find();
    },
  });

  fastify.route({
    method: "GET",
    url: "/users/:id",
    schema: {
      tags: ["users"],
      description: "Get a User",
      params: {
        id: { type: "string" },
      },
      response: {
        200: UserSchema,
      },
    },
    handler: async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user) throw NotFound;
      return user;
    },
  });

  fastify.route({
    method: "POST",
    url: "/users/",
    schema: {
      tags: ["users"],
      description: "Create a new workpiece in the system",
      body: UserSchema,
      response: {
        201: UserSchema,
      },
    },
    handler: async (req, res) => {
      const user = new User(req.body);
      await user.save();
      return user;
    },
  });

  fastify.route({
    method: "PUT",
    url: "/users/:id",
    schema: {
      tags: ["users"],
      description: "Create a new User",
      params: {
        id: { type: "string" },
      },
      body: {
        type: "object",
        properties: UserSchema.properties,
        required: [],
      },
      response: {
        200: UserSchema,
      },
    },
    handler: async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user) throw NotFound;
      Object.keys(UserSchema.properties).forEach((key) => {
        if (req.body[key]) user[key] = req.body[key];
      });
      await user.save();
      return user;
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/users/:id",
    schema: {
      tags: ["users"],
      description: "delete a user",
      params: {
        id: { type: "string" },
      },
      response: {
        204: {},
      },
    },
    handler: async (req, res) => {
      const user = await User.findById(req.params.id);
      if (!user) throw NotFound;
      await user.remove();
      res.code(204).send();
    },
  });
}

module.exports = routes;
