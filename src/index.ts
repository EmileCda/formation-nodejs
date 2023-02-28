/**
 * this programe is for install a http server by using fastify
 *
 */

import fastify from "fastify";

const myHttpServer = fastify();
// if environment var do not exist back to defaul port .
const defaultPort = "0";
// port is waiting for a number 

myHttpServer.listen(
  { port: parseInt(process.env.PORT!==undefined ? process.env.PORT : defaultPort, 10), host: process.env.HOST },
  () =>
    console.log(
      `serveur : ${process.env.HOST}:${process.env.PORT} started and  ready`
    )
);


// Add 2 resources for this server
// what to return when asking for root 
myHttpServer.get("/", () => {
  return `Bienvenue sur mon serveur`;
});



// what to return when asking for hello resource

myHttpServer.get("/hello", () => {
  return `Bonjour tout le monde`;
});
