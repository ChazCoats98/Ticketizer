const { User, Ticket, Event } = require('../models');
const {signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id).select('username email createdAt purchases');
            } else {
                throw AuthenticationError
            }
        },
        events: async (parent, args, context) => {
            if (context.events) {
                return Event.find().select('title description location date time price capacity ticketsLeft createdAt updatedAt');
            } else {
                throw AuthenticationError
            }
        },
        event: async (parent, {eventId}, context) => {
            if (context.events) {
                return Event.findById(eventId).select('title description location date time price capacity ticketsLeft createdAt updatedAt');
            } else {
                throw AuthenticationError
            }
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
        register: async (parent, {username, email, password, createdAt}) => {
            const user = await User.create({ username, email, password, createdAt: new Date() });
            const token = signToken(user);

            return { token, user };
        },
        updateUsername: async (parent, {userId, username }) => {
            return User.findByIdAndUpdate(userId, { $set: { username }}, { new: true });
        },
        updateEmail: async (parent, {userId, email}) => {
            return User.findByIdAndUpdate(userId, { $set: { email }}, { new: true });
        }
    }
}

module.exports = resolvers;