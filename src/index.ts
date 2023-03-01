/**
 * this programe is for install a http server by using fastify
 *
 */

import fastify from "fastify";

const myHttpServer = fastify();

// if environment var do not exist raise and error.
const myPort =  parseInt(process.env.PORT===undefined ?"Port Missing" :process.env.PORT,10)
const myHost = process.env.HOST 
// port is waiting for a number 

myHttpServer.listen(
  { port:myPort , host: myHost },
  () =>
    console.log(
      `server : ${process.env.HOST}:${process.env.PORT} started and  ready`
    )
);


// Add 2 resources for this server
// what to return when asking for root 
myHttpServer.get("/", () => {
  return `Bienvenue sur mon serveur:  Home page`;
});

// what to return when asking for hello resource
myHttpServer.get("/hello", () => {
  return `Bonjour tout le monde : Hello page`;
});



  