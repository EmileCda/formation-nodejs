/**
 * this route is for managing pizza
 *
 *
 */

import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export const pizzaCollection = "pizzas";

export type TPizzaCreateRoute = {
  Body: {
    name: string;
    price: number;
    description: string;
    image: string;
  };
};

export type TpizzaUpdateRoute = TPizzaCreateRoute & TPizzaDelete;

export type TPizzaDelete = {
  Params: {
    id: string;
  };
};

export type TPizzaSelect = {
  Querystring: {
    limit: string;
    page: string;
    name: string;
  };
};

export default async function PizzaRoute(myApp: FastifyInstance) {
  /**
   *  this route is for adding new pizza,
   * should have a body filled when asking for a POST Insert Pizza
   *
   */

  myApp.post<TPizzaCreateRoute>("/pizzas", async (request, response) => {
    // create new pizza from information provided in the body of the request
    const newPizza = { ...request.body };

    const result = await myApp.mongo.db
      ?.collection(pizzaCollection)
      .insertOne(newPizza);

    // result is the ID returned by mongoDB if sucess
    response.code(201);

    return newPizza;
  });
  /**
   *this route is for modification the a part of a pizza
   *PizzaId is passed to params
   */
  //    name: request.body.name ? request.body.name: ,
  //    number: request.body.price,
  //    description: request.body.description,
  //    image: request.body.image,
  //  },

  myApp.patch<TpizzaUpdateRoute>("/pizzas/:id", async (request) => {
    const myId = new ObjectId(request.params.id);

    const updatePizza = { ...request.body }; // in order to keep the same type const updatePizza = request.body is no good;
    const result = await myApp.mongo.db?.collection(pizzaCollection).updateOne(
      {
        _id: new ObjectId(request.params.id),
      },
      {
        $set: updatePizza,
      }
    );
    // after modifing the pizza we retreive it in order to return it to the sender
    const myPizza = await myApp.mongo.db
      ?.collection(pizzaCollection)
      .findOne({ _id: myId });
    return myPizza;
  });

  /**
   * this route is for deleting a pizza if the id exist
   * it return acknowledged: true  if succes,
   * deletedCount: nomber of document deleted
   */

  myApp.delete<TPizzaDelete>("/pizzas/:id", async (request, response) => {
    const id = new ObjectId(request.params.id);

    await myApp.mongo.db?.collection("pizzas").findOne({ _id: id });
    const result = await myApp.mongo.db
      ?.collection("pizzas")
      .deleteOne({ _id: id });

    return result;
  });
  /**
   * this route is for retreiving collection pizza
   * do accept queryString as name and limit
   *  looking for the way to sur page()
   */
  myApp.get<TPizzaSelect>("/pizzas", async (request) => {
    const myLimit = request.query.limit ? parseInt(request.query.limit) : 0;
    const myOffset = request.query.page
      ? myLimit * parseInt(request.query.page)
      : 0;
    const nameSearch = request.query.name;

    const result = await myApp.mongo.db
      ?.collection("pizzas")
      // .find( nameSearch ?   { name : {$text: nameSearch } } : {} )
      .find(nameSearch ? { name: new RegExp(nameSearch, 'i') } : {})
      // .find(nameSearch ? { name : nameSearch } :{}  )
      .limit(myLimit)
      .skip(myOffset)
      .toArray();
    return result;
  });
}
