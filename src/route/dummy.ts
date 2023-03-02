import { FastifyInstance } from "fastify";
import { type } from "os";

export default async function DummyRoute(myApp: FastifyInstance) {
// this part is only used for typeScript compiler
// the real parametre used are with the GET methode 

  type DumRoute = { 
    headers: {
      operation: string;  
      price : string;
    };
    Body: {
      x: number;
      y: number;
    };
    Params: {
        name: string;
        age: string;
      };
    };


// route with params as parameter 
// resource = /param/sub
// param : nom & age  opération params are only string
myApp.get<DumRoute>("/param/:nom/:age", (request) => {
  return {
      nom: request.params.name,
      age: parseInt(request.params.age, 10)
  };
});



// route with headers as parameter 
// resource : /header
// param : opération params are only string
myApp.get<DumRoute>("/header", (request) => {
    const operation = request.headers.operation;
    return {
        operation:operation // key op
    };
  });

// route body as parameter 
// resource : /body
// param : x & y  param could be all type 
// must be a post methode. (Get do not work)
myApp.post<DumRoute>("/body", (request) => {
  const operation = request.headers.operation;
  const x = request.body.x;
    const y = request.body.y;
    return {
        operation:operation,
    
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