const { ApolloServer } = require('apollo-server-express');
const { startStandaloneServer } = require('apollo-server-core');
const { typeDefs, resolvers } = require('../schemas');
const { User, Ticket, Event } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.mock('../models');

describe('resolvers', () => {
    let server;
    let mongoServer;

    const mockUser = {
        _id: 'mockUserId',
        username:'mockUser',
        email: 'mockUser@email.com',
        createdAt: new Date(),
        purchases: [],
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue({
            _id: 'mockUserId',
            username: 'mockUser',
            email: 'mockUser@email.com',
            createdAt: new Date(),
            purchases: []
        })
    }

    const mockContext = {
        user: { _id: 'mockUserId' }
    };

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

    describe('Query: user', () => {
        it('should fetch the logged in user', async () => {
            User.findById.mockReturnValue(mockUser);

            const result = await resolvers.Query.user(null, null, mockContext);

            expect(result).toEqual({
                _id:'mockUserId',
                username:'mockUser',
                email:'mockUser@email.com',
                createdAt: expect.any(Date),
                purchases: []
            });
            expect(User.findById).toHaveBeenCalledWith("mockUserId");
            expect(mockUser.select).toHaveBeenCalledWith('username email createdAt purchases');
            expect(mockUser.populate).toHaveBeenCalledWith('purchases');
        });
    });
});