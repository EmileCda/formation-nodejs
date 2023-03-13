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
import PizzaRoute from "./route/pizzeria";
import UtilsRoute from "./route/utils";

const myApp = fastify();

// plugin for calculator
myApp.register(fastifyPlugin(CalculatorRoute));

// plugging sandbox for testing 
myApp.register(fastifyPlugin(DummyRoute));
myApp.register(fastifyPlugin(UtilsRoute));
myApp.register(fastifyPlugin(PizzaRoute));



myApp.register(fastifyMongodb, {
  url: process.env.MONGODB_URL,
  database: process.env.DATABASE
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

