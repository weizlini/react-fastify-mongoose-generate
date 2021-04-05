const mongoose = require("mongoose");
const prettier = require("prettier");
require("mongoose-schema-jsonschema")(mongoose);
const Schema = mongoose.Schema;
const { execSync } = require("child_process");
const fs = require("fs");
const toSource = require("tosource");
const modelFiles = fs.readdirSync("./src/models");
modelFiles.forEach((fn) => {
  const name = fn.split(".")[0];
  const model = require(`./src/models/${fn}`);
  const schema = model.jsonSchema();
  const schemaFile = prettier.format(
    `
  /**
   * Note: this is a generated file
   */
     
  const ${name} = ${toSource(schema)}
  
  module.exports = ${name}
  `,
    { parser: "babel" }
  );
  fs.writeFileSync(`./src/schemas/${fn}`, schemaFile);
});
console.log("schemas generated");
