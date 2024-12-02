const { User, Ticket, Event } = require('../models');

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

        },
        register: async (parent, {username, email, password, createdAt}) => {

        }
    }
}

module.exports = resolvers;