require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const {
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageLocalDefault} = require('apollo-server-core');
const http = require('http');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        const app = express();

        app.use(cors());
        app.use(express.json());

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

        await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
        console.log(`��� Server ready at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error.message);
    }
}

startServer();
