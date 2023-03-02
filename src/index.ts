/**
 * this programe is for install a http server by using fastify
 * adding env var
 * creating route
 */

import fastifyMongodb from "@fastify/mongodb";
import fastify from "fastify";
import fastifyPlugin from "fastify-plugin";
import CalculatorRoute from "./route/calculatrice";
import DummyRoute from "./route/dummy";
import UtilsRoute from "./route/utils";

const myApp = fastify();

myApp.register(fastifyPlugin(CalculatorRoute));
myApp.register(fastifyPlugin(DummyRoute));
myApp.register(fastifyPlugin(UtilsRoute));

myApp.register(fastifyMongodb, {
  url: 'mongodb+srv://emilecda:i6nhKDAkYoeZPWGW@cluster0.y8snihr.mongodb.net/?retryWrites=true&w=majority',
  database: 'Newton'
})
// myApp.mongo.db

// if environment var do not exist raise and error.
const myPort = parseInt(
  process.env.PORT === undefined ? "Port Missing" : process.env.PORT,
  10
);
const myHost = process.env.HOST;
// port is waiting for a number

myApp.listen({  host: myHost,port: myPort }, () =>
  console.log(`server : ${myHost}:${myPort} started and ready`)
);

