const { User, Ticket, Event } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                
            }
        },
        events: async (parent, args, context) => {
            if (context.events) {
                
            }
        },
        event: async (parent, {eventId}) => {
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