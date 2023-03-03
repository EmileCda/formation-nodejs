/**
 * this route is for managing pizza
 *
 *
 */

import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export const pizzaCollection = "pizzas";

export type TPizzaRoute = {
  Params: {
    id: string;
  };
  Body: {
    name: string;
    price: number;
    description: string;
    image: string;
  };
  Querystring: {
    limit: string;
    page: string;
    name: string;
  };
};

export default async function PizzaRoute(myApp: FastifyInstance) {
  // this route is for adding new pizza, should have a body filled when asking for a POST
  // Insert Pizza
  myApp.post<TPizzaRoute>("/pizzas", async (request, response) => {
    // create new pizza from information provided in the body of the request
    const newPizza = {
      name: request.body.name,
      number: request.body.price,
      description: request.body.description,
      image: request.body.image,
    };
    const result = await myApp.mongo.db
      ?.collection(pizzaCollection)
      .insertOne(newPizza);

    // result is the ID returned by mongoDB if sucess
    if (result !== null) response.code(201);
    else response.code(500);

    return newPizza;
  });
  // this route is for modification the whole pizza
  // could has a path methode in order to modify a part of pizza (for instance : only the price)
  myApp.patch<TPizzaRoute>("/pizzas/:id", async (request, response) => {
    const myId = new ObjectId(request.params.id);

    const result = await myApp.mongo.db?.collection(pizzaCollection).updateOne(
      {
        _id: new ObjectId(request.params.id),
      },
      {
        $set: {
          name: request.body.name,
          number: request.body.price,
          description: request.body.description,
          image: request.body.image,
        },
      }
    );
    // return await myApp.mongo.db?.collection(pizzaCollection).findOne({_id:{result?.upsertedId}})
    const myPizza = await myApp.mongo.db
      ?.collection(pizzaCollection)
      .findOne({ _id: myId });
    return myPizza;
  });

  // this route is for deleting a pizza if the id exist

  myApp.delete<TPizzaRoute>("/pizzas/:id", async (request, response) => {
    const result = await myApp.mongo.db
      ?.collection<TPizzaRoute>("pizzas")
      .deleteOne({
        _id: new ObjectId(request.params.id),
      });

    return result;
  });

  myApp.get<TPizzaRoute>("/pizzas", async (request) => {
    const result = await myApp.mongo.db
      ?.collection<TPizzaRoute>("pizzas")
      .find({
        name :request.query.name
      })
      .limit( parseInt( request.query.limit))
      .toArray();

    

    return result;
  });
}
