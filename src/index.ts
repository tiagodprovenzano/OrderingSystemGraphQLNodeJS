import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { OrdersAPI } from "./orders/data/OrdersAPI";
import { ordersResolvers } from "./orders/resolvers";
import { typeDefs } from "./schema.graphql";
import { UsersAPI } from "./users/data/UsersAPI";
import { usersResolvers } from "./users/resolvers";

const context = {
  ordersAPI: new OrdersAPI(),
  usersAPI: new UsersAPI()
};

const resolvers = [ordersResolvers, usersResolvers];

export type IContext = typeof context;

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  
  const subscriptionsServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
},{
    server: httpServer,
    path: "/"
})
  const server = new ApolloServer({
    schema,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return{
                    async drainServer(){
                        subscriptionsServer.close()
                    }
                }
            }
        }
    ],
  });

  
  await server.start();
  server.applyMiddleware({
      app,
      path: "/",
    });
    

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, () => {
      resolve();
    })
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

start();
