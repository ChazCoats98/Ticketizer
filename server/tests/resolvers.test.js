const { ApolloServer } = require('apollo-server-express');
const { startStandaloneServer } = require('apollo-server-core');
const { typeDefs, resolvers } = require('../schemas');
const { User, Ticket, Event } = require('../models');
const { describe, expect, test, mock } = require('jest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mock('../models');

describe('resolvers', () => {
    let server;
    let mongoServer;

    const mockUser = {
        _id: 'mockUserId',
        username:'mockUser',
        email: 'mockUser@email.com',
        password: 'mockUserPassword19$'
    }

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        server = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({
                user: {_id: 'mockUserId', username: 'mockUser'}
            }),
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    test('Querying for user', async () => {
        
    });
});