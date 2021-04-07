/**
 * Note: this is a generated file
 */

const User = {
  title: "User",
  type: "object",
  properties: {
    name: { type: "string" },
    address: { type: "string" },
    _id: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
    updatedAt: { type: "string", format: "date-time" },
    createdAt: { type: "string", format: "date-time" },
    __v: { type: "number" },
  },
  required: ["name"],
};

module.exports = User;
