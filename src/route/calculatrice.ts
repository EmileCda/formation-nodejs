/**
 * this programe regarding to calculat 
 */

import { FastifyInstance } from "fastify";


export default async function CalculatorRoute(myApp: FastifyInstance) {


type CalculateRoute = {
  Params: {
    x: string;
    y: string;
  };
};
// Route for minus calculation using params as parametre
myApp.get<CalculateRoute>("/calc/sub/:x/:y", (request) => {
  const x = parseInt(request.params.x, 10);
  const y = parseInt(request.params.y, 10);

  return {
    result: x - y,
    x: x,
    y: y,
    operation: "soustraction",
  };
});

// Route for add calculation usfing params as parametre
myApp.get<CalculateRoute>("/calc/add/:x/:y", (request) => {
  const x = parseInt(request.params.x, 10);
  const y = parseInt(request.params.y, 10);

  return {
    result: x + y,
    x: x,
    y: y,
    operation: "addition",
  };
});

// Route for multiplication calculation usfing params as parametre
myApp.get<CalculateRoute>("/calc/mul/:x/:y", (request) => {
  const x = parseInt(request.params.x, 10);
  const y = parseInt(request.params.y, 10);

  return {
    result: x * y,
    x: x,
    y: y,
    operation: "muliplication",
  };
});
// Route for division calculation usfing params as parametre
myApp.get<CalculateRoute>("/calc/div/:x/:y", (request, response) => {
  const x = parseInt(request.params.x, 10);
  const y = parseInt(request.params.y, 10);

  if (y === 0) {
    response.code(400);
    return {
      error: "division par zéro"
    };
  }

  return {
    result: x / y,
    x: x,
    y: y,
    operation: "division",
  };
});

type TOperation = "add" | "sub" | "mul" | "div";

type calcHeader = {
  headers: {
    operation: string;
  };
  body: {
    x: number;
    y: number;
  };
};

// Route for division calculation usfing params as parametre
myApp.post<calcHeader>("/calculate", (request ,response) => {
  const operation:TOperation = request.headers.operation;
  const x = request.body.x;
  const y = request.body.y;

  switch (operation) {
    case "add":
      return { 
        "result" :x + y,
        "x": x,
        "y": y,
        "operation": operation,
      } 
    case "sub":
      return { 
        "result" :x + y,
        "x": x,
        "y": y,
        "operation": operation,
      } 
    case "mul":
      return { 
        "result" :x + y,
        "x": x,
        "y": y,
        "operation": operation,
      } 

    case "div":
        if (y === 0) {
          response.code(400);
          return { error: "division par zéro" };
        }
        return {
        "result" :x + y,
        "x": x,
        "y": y,
        "operation": operation,
      } 
    default : {           response.code(400);
    return  `operation ${operation} :inconnue` }
    } 


    });
}

