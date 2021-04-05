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
        prop === "_id"
          ? "primary:true,"
          : prop === "__v" || prop === "createdAt" || prop === "updatedAt"
          ? "readOnly:true,pseudo:true"
          : ""
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
    `../react-app/src/store/models/${name}Model.js`,
    prettier.format(schemaFile, { parser: "babel" })
  );
});
let stateImports = "",
  stateInit = "",
  stateDeclarations = "";
modelFiles.forEach((fn) => {
  const Name = fn.split(".")[0];
  const name = Name.toLowerCase();
  const name_s = name + "s";
  stateImports += `
  import ${Name}State from './state/${Name}State';`;
  stateDeclarations += `
  ${name_s} = new ${Name}State(this)`;
  stateInit += `
  await this.${name_s}.init()`;

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
    `../react-app/src/store/state/${Name}State.js`,
    prettier.format(stateClass, { parser: "babel" })
  );
});
const store = `
${stateImports}
import React from "react"
import {
  observable,
  isObservable,
  action,
  computed,
  makeAutoObservable,
  runInAction,
  configure
} from 'mobx'

/**
 * The root state class which contains all others
 * an instance of this class ios created upon first import
 * this instance can be imported by using the default imports
 * recommended usage is to use the hooks useStores() or useStorePath()
 */
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
export const storesContext = React.createContext(store)

/**
 * hook to access all the stores, good for destructuring
 *
 * usage:
 * const {test,bla} = useStores();
 *
 * @return {RootState} the instance of the rootState containing all other state instances
 */
export const useStores = () => React.useContext(storesContext)

/**
 * hook to access a particular observable deeper into the object hierarchy
 *
 * usage:
 * const level1 = useStorePath("test","deep","level1");
 *   
 *
 * @return {*} returns a single object down the root states object hierachy
 */
export const useStorePath = (...paths) => {
    const stores = useStores()
    let error = false
    let current = stores
    paths.forEach((path) => {
      if (isObservable(current[path])) {
        current = current[path]
      } else {
        error = true
      }
    })
    if (error) console.error("useStorePath: path was invalid")
    return error ? null : current
  }
/**
 * the default export is simply the instance of the root state
 * this can easily be used also within components by directly importing it
 * however it is not ideal for component testing if the store is statically imported
 */  
export default store
`;
fs.writeFileSync(
  `../react-app/src/store/index.js`,
  prettier.format(store, { parser: "babel" })
);
console.log("front-end mobx models generated");
