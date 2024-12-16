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

        it('should throw an error if user is not authenticated', async () => {
            await expect(resolvers.Query.user(null, null, {})).rejects.toThrow('Error authenticating user.');
        });
    });

    describe('Query: events', () => {
        it('should fetch all events', async () => {
            const mockEvents = [
                {
                    title: 'Event 1', 
                    description: 'Description 1', 
                    location: '4 event place', 
                    date: new Date(), 
                    price: 59.99,
                    capacity: 100,
                    ticketsLeft: 50,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    title: 'Event 2', 
                    description: 'Description 2', 
                    location: '7 event place', 
                    date: new Date(), 
                    price: 79.99,
                    capacity: 200,
                    ticketsLeft: 150,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            Event.find.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockEvents)
            });

            const result = await resolvers.Query.events();
            expect(result).toEqual([
                {
                    title: 'Event 1', 
                    description: 'Description 1', 
                    location: '4 event place', 
                    date: expect.any(Date), 
                    price: 59.99,
                    capacity: 100,
                    ticketsLeft: 50,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                },
                {
                    title: 'Event 2', 
                    description: 'Description 2', 
                    location: '7 event place', 
                    date: expect.any(Date), 
                    price: 79.99,
                    capacity: 200,
                    ticketsLeft: 150,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date)
                }
            ]);
            expect(Event.find).toHaveBeenCalledWith();
        });
    });

    describe('Query: Event', () => {
        it('should fetch a single event', async () => {
            const mockEvent = {
                _id: 'mockEventId123',
                title: 'Event 1', 
                description: 'Description 1', 
                location: '123 Event Street', 
                date: new Date(), 
                price: 59.99,
                capacity: 100,
                ticketsLeft: 50,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            Event.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockEvent)
            });

            const result = await resolvers.Query.event(null, { eventId:'mockEventId123' });
            expect(result).toEqual({
                _id:'mockEventId123',
                title: 'Event 1', 
                description: 'Description 1', 
                location: '123 Event Street', 
                date: expect.any(Date), 
                price: 59.99,
                capacity: 100,
                ticketsLeft: 50,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
            expect(Event.findById).toHaveBeenCalledWith('mockEventId123');
        })
    })
});