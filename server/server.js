require('@dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
import { 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import http from 'http';

async function startServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embedded: true})
        ]
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 3001 }, resolve));
    console.log(`��� Server ready at http://localhost:3001${server.graphqlPath}`);
}

startServer(typeDefs, resolvers);
