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

  const api = `
  /**
   * FRONT END API functions ${Name}
   * copy into front end project to be used 
   * This file is generated 
   */
   
   const baseUrl = 'http://localhost:5000/api'
   
   export async function get${Name_s}(){
      try{
        const response = await fetch(\`\${baseUrl}/${name}\`)
        if(response.ok)
        {
          const textResponse = await response.text();
          const parsedResponse = JSON.parse(textResponse);
        }else{
          console.error(response)
          return []
        }
      }catch(e){
         console.log(e)
         return []
      }  
   }
   
   export async function get${Name}(id){
      try{
        const response = await fetch(\`\${baseUrl}/${name}/\${id}\`)
        if(response.ok)
        {
          const textResponse = await response.text();
          const parsedResponse = JSON.parse(textResponse);
        }else{
          console.error(response)
          return null
        }
      }catch(e){
         console.log(e)
         return null
      } 
   }
   
   export async function create${Name}(data){
      try{
        const response = await fetch(\`\${baseUrl}/${name}/\${id}\`,{
          method:'POST',
          headers: {
            'content-type': 'application/json',
          },
          body:JSON.stringify(data),
        })
        if(response.ok)
        {
          const textResponse = await response.text();
          const parsedResponse = JSON.parse(textResponse);
        }else{
          console.error(response)
          return null
        }
      }catch(e){
        console.log(e)
        return null
      }
   }
   
   export async function update${Name}(data){
      let putData = {...data}
      delete putData._id;
      delete putData.__v;
      try{
        const response = await fetch(\`\${baseUrl}/${name}/\${data._id}\`,{
          method:'PUT',
          headers:{
            'content-type': 'application/json',
          },
          body:JSON.stringify(putData),
        })
        if(response.ok)
        {
          const textResponse = await response.text();
          const parsedResponse = JSON.parse(textResponse);
        }else{
          console.error(response)
          return false
        }
      }catch(e){
        console.log(e)
        return false
      }
   }
   
   export async function delete${Name}(id){
      try{
        const response = await fetch(\`\${baseUrl}/${name}/\${id}\`,{
          method:'DELETE'
        })
        if(response.ok)
        {
          return true
        }else{
          console.error(response)
          return false
        }
      }catch(e){
         console.log(e)
         return false
      } 
   }
   
   export default {
     getList:get${Name_s},
     get:get${Name},
     create:create${Name},
     update:update${Name},
     delete:delete${Name} 
   }
   
  `;
  const formatted = prettier.format(api, { parser: "babel" });
  fs.writeFileSync(`../react-app/src/api/${Name}.js`, formatted);
});
console.log("front-end api sdk created");
