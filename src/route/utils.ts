import { ObjectId } from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export default async function UtilsRoute(myApp: FastifyInstance) {
  // Add 2 resources for this server
  // what to return when asking for root
  myApp.get("/", () => {
    return `Bienvenue sur mon serveur : Home page`;
  });

  // what to return when asking for hello resource
  myApp.get("/hello", () => {
    return `Bonjour tout le monde : Hello page`;
  });

  // what to return when asking for /eleves resource
  // adding new fields in header (Developed-With':'fastify')
  myApp.get("/eleves", (request, response) => {
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


// this route return all record from collection calculatrice
 
  myApp.get("/calculatrices", async () => {
    const collection = await myApp.mongo.db?.collection('calculatrices').find({}).toArray();
    return collection;
  });
}
