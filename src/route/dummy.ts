import { FastifyInstance } from "fastify";
import { type } from "os";

export default async function DummyRoute(myApp: FastifyInstance) {
  type DumRoute = {
    Headers: {
      operation: string;
    };
    Body: {
      x: number;
      y: number;
    };
    Params: {
        nom: string;
        age: string;
      };
  };


 // route with params as parameter 
 // resource = /param/sub
 // param : nom & age  opération params are only string
  myApp.get<DumRoute>("/param/:nom/:age", (request) => {
    return {
        nom: request.params.nom,
        age: parseInt(request.params.age, 10)
    };
  });



// route with headers as parameter 
// resource : /header
// param : opération params are only string
myApp.get<DumRoute>("/headers", (request) => {
    const operation = request.headers.operation;
    return {
        operation:request.headers.operation
    };
  });

// route body as parameter 
// resource : /body
// param : x & y  param could be all type 
// must be a post methode. (Get do not work)
myApp.post<DumRoute>("/body", (request) => {
    const x = request.body.x;
    const y = request.body.y;
    return {
        operation:request.headers.operation,
    
         x : x ,
         y : y ,
        
    };
  });

// route returning a code
// should add request & response even if request is not used

  myApp.get<DumRoute>("/returnCode", (request,response) => {
    return {
        status : response.code(499)
       
    };
  });




}