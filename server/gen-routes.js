/**
 * This program will generate fastify routes based on a template included here
 * it requires model and schema files of the same name existing in the
 * src/models and src/schemas directories
 *
 * The output will be saved in a file of the same name in src/routes
 *
 * additionally an index.js file will be created in /src/routes
 */

const prettier = require("prettier");
const fs = require("fs");
const toSource = require("tosource");
const modelFiles = fs.readdirSync("./src/models");

// create all the crud files for each model

modelFiles.forEach((fn) => {
  const fnNoExt = fn.split(".")[0];

  // create constants and ensure proper casing -- important!

  const Name = fnNoExt.substr(0, 1).toUpperCase() + fnNoExt.substr(1);
  const Name_s = Name + "s";
  const name = Name.toLowerCase();
  const name_s = name + "s";

  const route = `
  /**
   * CRUD API routes for the ${Name} model
   * This file is generated 
   */
   
   
  const { NotFound } = require('http-errors')  
  const ${Name} = require('../models/${Name}');
  const ${Name}Schema = require('../schemas/${Name}');
  
  async function routes(fastify, options) {
    fastify.route({
      method:'GET',
      url:'/${name_s}',
      schema: {
        tags: ['${name_s}'],
        description: 'Get list of ${Name}',
        response:{
          200:{type:'array',items:${Name}Schema}
        }
      },
      handler:async (req,res) =>{
          return ${Name}.find()
      }
    })
    
    fastify.route({
      method:'GET',
      url:'/${name_s}/:id',
      schema: {
        tags: ['${name_s}'],
        description: 'Get a ${Name}',
        params:{
           id:{type:'string'}
        },
        response:{
          200:${Name}Schema
        }
      },
      handler:async (req,res) =>{
          const ${name} = await ${Name}.findById(req.params.id)
          if(! ${name}) throw NotFound;
          return ${name};
      }
    })
    
    fastify.route({
      method: 'POST',
      url: '/${name_s}/',
      schema: {
        tags: ['${name_s}'],
        description: 'Create a new workpiece in the system',
        body: ${Name}Schema,
        response: {
          201: ${Name}Schema,
        },
      },
      handler: async (req,res) => {
        const ${name} = new ${Name}(req.body)
        await ${name}.save()
        return ${name}
      }
    })
    
    fastify.route({
      method: 'PUT',
      url: '/${name_s}/:id',
      schema: {
        tags: ['${name_s}'],
        description: 'Create a new ${Name}',
        params:{
            id:{type:'string'}
        },
        body: { 
          type:'object',
          properties:${Name}Schema.properties,
          required:[]
        },
        response: {
          200: ${Name}Schema,
        },
      },
      handler: async (req,res) => {
        const ${name} = await ${Name}.findById(req.params.id)
        if(!${name}) throw NotFound;
        Object.keys(${Name}Schema.properties).forEach(key=>{
           if(req.body[key])
           ${name}[key] = req.body[key]
        })
        await ${name}.save();
        return ${name};
      }
    })
   
    fastify.route({
      method: 'DELETE',
      url: '/${name_s}/:id',
      schema: {
        tags: ['${name_s}'],
        description: 'delete a ${name}',
        params:{
         id:{type:'string'}
        },
        response: {
          204:{}
        },
      },
      handler: async (req,res) => {
        const ${name} = await ${Name}.findById(req.params.id)
        if(! ${name}) throw NotFound;
        await ${name}.remove();
        res.code(204).send()
      }
    })
  }
  
  module.exports = routes;
  `;
  const formatted = prettier.format(route, { parser: "babel" });
  fs.writeFileSync(`./src/routes/${Name}.js`, formatted);
});

let index = `/**
 * this file is generated
 */
 
async function routes(fastify, options) {`;
modelFiles.forEach((fn) => {
  const fnNoExt = fn.split(".")[0];
  index += "\n" + `  fastify.register(require('./${fnNoExt}'))`;
});
index += `
}

module.exports = routes
`;
const indexFormatted = prettier.format(index, { parser: "babel" });
fs.writeFileSync("./src/routes/index.js", indexFormatted);
console.log("routes generated");
