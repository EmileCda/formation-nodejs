/**
 * this programe is for install a http server by using fastify
 * adding env var
 * creating route
 */

import fastify from "fastify";

const myHttpServer = fastify();

// if environment var do not exist raise and error.
const myPort = parseInt(
  process.env.PORT === undefined ? "Port Missing" : process.env.PORT,
  10
);
const myHost = process.env.HOST;
// port is waiting for a number

myHttpServer.listen({ port: myPort, host: myHost }, () =>
  console.log(`server : ${myPort}:${myPort} started and  ready`)
);

// Add 2 resources for this server
// what to return when asking for root
myHttpServer.get("/", () => {
  return `Bienvenue sur mon serveur : Home page`;
});

// what to return when asking for hello resource
myHttpServer.get("/hello", () => {
  return `Bonjour tout le monde : Hello page`;
});

// what to return when asking for /eleves resource
// adding new fields in header (Developed-With':'fastify')
myHttpServer.get("/eleves", (request, response) => {
  // building an  array of object : full compatibility whit json format
  const returnValue = [
    { id: 1, nom: "john", prenom: "john", age: 32 },
    { id: 2, nom: "rose", prenom: "john", age: 36 },
    { id: 3, nom: "jane", prenom: "john", age: 40 },
    { id: 4, nom: "jean", prenom: "john", age: 38 },
  ];

  // adding information into the header
  response.header("Developed-With", "fastify");

  return returnValue;
});

export type CalculateRoute = {
  Params: {
    x: string;
    y: string;
  };
};
// Route for minus calculation using params as parametre
myHttpServer.get<CalculateRoute>("/calc/sub/:x/:y", (request) => {
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
myHttpServer.get<CalculateRoute>("/calc/add/:x/:y", (request) => {
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
myHttpServer.get<CalculateRoute>("/calc/mul/:x/:y", (request) => {
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
myHttpServer.get<CalculateRoute>("/calc/div/:x/:y", (request, response) => {
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
    operation: TOperation;
  };
  body: {
    x: number;
    y: number;
  };
};

// Route for division calculation usfing params as parametre
myHttpServer.post<calcHeader>("/calculate", (request: calcHeader) => {
  const operation = request.headers.operation;

  switch (operation) {
    case "add":
      return request.body.x + request.body.y;
    case "sub":
      return request.body.x - request.body.y;
    case "mul":
      return request.body.x * request.body.y;
    case "div":
      return request.body.y === 0 ? Infinity : request.body.x / request.body.y;
  }
});
