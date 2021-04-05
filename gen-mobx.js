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
  let schemaFile = `
  import {observable,action,computed,makeAutoObservable} from 'mobx' 
  import {BaseModel,Field,FieldType} from "../base/";
  import api from '../api/${name}';
  export default class ${name}Model extends BaseModel{
     constructor(){
        super()
        makeAutoObservable(this)
     }
  `;
  Object.keys(schema.properties).forEach((prop) => {
    schemaFile += `
    //@observable
    ${prop} = new Field(this, '${prop}', {
      type:FieldType.${schema.properties[prop].type},
      required:${schema.required.includes(prop) ? "true" : "false"},
      label:'${prop}',  
      validation:(v,model)=>{${
        schema.properties[prop].pattern
          ? "if(!/" +
            schema.properties[prop].pattern +
            "/.text(v)) return 'error'"
          : "return null"
      }
      },
      ${
        prop === "_id" ? "primary:true," : prop === "__v" ? "readOnly:true" : ""
      }                       
    })
    `;
  });
  schemaFile += `
      async create(){
          return api.create(this.toJS(true))
      }
      
      async update(){
          return api.update(this.toJS(true))
      }
  }
  `;
  //const formatted = prettier.format(model, { parser: "babel" });
  fs.writeFileSync(
    `./front-end/store/models/${name}Model.js`,
    prettier.format(schemaFile, { parser: "babel" })
  );
});
let stateImports = "",
  stateInit = "",
  stateDeclarations = "";
modelFiles.forEach((fn) => {
  const Name = fn.split(".")[0];
  const name = Name.toLowerCase();
  stateImports += `
  import ${Name}State from './state/${Name}State';`;
  stateDeclarations += `
  ${name} = new ${Name}State(this)`;
  stateInit += `
  await this.${name}.init()`;

  const stateClass = `
  import {
    observable,
    action,
    computed,
    makeAutoObservable,
  } from 'mobx';
  import {BaseState} from '../base/';
  import ${Name}Api from '../api/${Name}';
  import ${Name}Model from '../models/${Name}Model';
  
  export default class ${Name}State extends BaseCrudState{
      api = ${Name}Api
      modelClass = ${Name}Model
      constructor(root){
        super(root)
        makeAutoObservable(this)
      }
  }     
  `;
  fs.writeFileSync(
    `./front-end/store/state/${Name}State.js`,
    prettier.format(stateClass, { parser: "babel" })
  );
});
const store = `
${stateImports}
import {
  observable,
  action,
  computed,
  makeAutoObservable,
  runInAction,
  configure
} from 'mobx'
class RootState {
   ${stateDeclarations}
   isLoaded = false
   constructor() {
      makeAutoObservable(this)
   }
   async init(){
     ${stateInit}
     runInAction(()=>{
        this.isLoaded = true
     })
   }
}
configure({enforceActions:'observable'});
const store = new RootState();
export default store

`;
fs.writeFileSync(
  `./front-end/store/index.js`,
  prettier.format(store, { parser: "babel" })
);
console.log("front-end mobx models generated");
