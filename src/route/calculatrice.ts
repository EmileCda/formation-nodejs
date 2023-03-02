/**
 * this programe regarding to calculat
 */

import { FastifyInstance } from "fastify";

export type CalculateRoute = {
  Params: {
    x: string;
    y: string;
  };
};

export type TOperation = "add" | "sub" | "mul" | "div";

export type CalcRoute = {
  Headers: {
    operation: TOperation;
  };
  Body: {
    x: number;
    y: number;
  };
};

export default async function CalculatorRoute(myApp: FastifyInstance) {
  // Route for minus calculation using params as parametre
  myApp.get<CalculateRoute>("/calc/sub/:x/:y", async (request) => {
    const x = parseInt(request.params.x, 10);
    const y = parseInt(request.params.y, 10);

    const returnValue = {
      result: x - y,
      x: x,
      y: y,
      operation: "soustraction",
    };
    const result = await myApp.mongo.db?.collection('calculatrices').insertOne(returnValue)
    return returnValue;
  });

  // Route for add calculation using params as parametre
  myApp.get<CalculateRoute>("/calc/add/:x/:y", async (request) => {
    const x = parseInt(request.params.x, 10);
    const y = parseInt(request.params.y, 10);

    const returnValue = {
      result: x + y,
      x: x,
      y: y,
      operation: "addition",
    };
    const result =  await myApp.mongo.db?.collection('calculatrices').insertOne(returnValue)
    return returnValue;
  });

  // Route for multiplication calculation using params as parametre
  myApp.get<CalculateRoute>("/calc/mul/:x/:y",async  (request) => {
    const x = parseInt(request.params.x, 10);
    const y = parseInt(request.params.y, 10);

    const returnValue = {
      result: x * y,
      x: x,
      y: y,
      operation: "muliplication",
    };
    const result =   await myApp.mongo.db?.collection('calculatrices').insertOne(returnValue)
    return returnValue;
  });
  // Route for division calculation using params as parametre
  myApp.get<CalculateRoute>("/calc/div/:x/:y",async  (request, response) => {
    const x = parseInt(request.params.x, 10);
    const y = parseInt(request.params.y, 10);

    if (y === 0) {
      response.code(400);
      return {
        error: "division par zéro",
      };
    }
    const returnValue = {
      result: x / y,
      x: x,
      y: y,
      operation: "division",
    };

    const result =  await myApp.mongo.db?.collection('calculatrices').insertOne(returnValue)
    return returnValue;
  });

  // Route for division calculation using params as parametre
  myApp.post<CalcRoute>("/calculate", async (request, response) => {
    const operation = request.headers.operation;
    const x = request.body.x;
    const y = request.body.y;
    let returnValue;
    switch (operation) {
      case "add":
        returnValue = {
          result: x + y,
          x: x,
          y: y,
          operation: operation,
        };
      case "sub":
        returnValue = {
          result: x + y,
          x: x,
          y: y,
          operation: operation,
        };
      case "mul":
        returnValue = {
          result: x + y,
          x: x,
          y: y,
          operation: operation,
        };

      case "div":
        if (y === 0) {
          response.code(400);
          returnValue = { error: "division par zéro" };
        }
        returnValue = {
          result: x + y,
          x: x,
          y: y,
          operation: operation,
        };
      default: {
        response.code(400);
        returnValue = { error: `operation ${operation} :inconnue` };
      }
    }
    const result =  await myApp.mongo.db?.collection('calculatrices').insertOne(returnValue)
    return returnValue;
  });
}
