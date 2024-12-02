const { User, Ticket, Event } = require('../models');
const {signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id)
                .select('username email createdAt purchases')
                .populate('purchases');
            } else {
                throw AuthenticationError
            }
        },
        events: async () => {
            return Event.find().select('title description location date time price capacity ticketsLeft createdAt updatedAt');
        },
        event: async (parent, {eventId}) => {
            return Event.findById(eventId).select('title description location date time price capacity ticketsLeft createdAt updatedAt');
        }
    },
    Mutation:{
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            const correctPassword = await user.checkPassword(password);
            
            if (!correctPassword) {
                throw new Error('Invalid password');
            }

            const token = signToken(user);
            return { token };
        },
        register: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password, createdAt: new Date() });
            const token = signToken(user);

            return { token, user };
        },
        updateUsername: async (parent, { userId, username }) => {
            return User.findByIdAndUpdate(userId, { $set: { username }}, { new: true });
        },
        updateEmail: async (parent, { userId, email }) => {
            return User.findByIdAndUpdate(userId, { $set: { email }}, { new: true });
        },
        createEvent: async (parent, { title, description, location, date, time, price, capacity }) => {
            const event = await Event.create({ title, description, location, date, time, price, capacity, createdAt: new Date() });
            return event;
        },
        purchaseTicker: async (parent, { eventId, type }, context) => {
            if (!context.user) {
                throw new Error('You must be logged in to purchase tickets.');
            }

            const event = await Event.findById(eventId);
            if (!event) {
                throw new Error('Event not found.');
            }

            const numTicketsLeft = event.ticketsLeft - 1;
            if (ticketsLeft == 0) {
                throw new Error('Tickets sold out.');
            }

            const ticket = await Ticket.create({
                type,
                purchaseDate: new Date(),
                event: event._id
            })

            const user = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { purchases: ticket._id } },
                { new: true }
            );

            await Event.findByIdAndUpdate(eventId, {$inc: { ticketsLeft: numTicketsLeft }});
            return ticket;
        }
    }
}

module.exports = resolvers;