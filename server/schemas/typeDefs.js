const typeDefs = `
    scalar Date

    type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    createdAt: Date
    purchases: [Ticket]
    }

    type AuthPayload {
    token: String!
    user: User!
    }
    
    type Ticket {
    _id: ID
    type: String!
    purchaseDate: Date
    event: Event!
    attendee: User!
    }

    type Event {
    _id: ID
    title: String!
    description: String
    location: String!
    date: Date!
    time: String!
    price: Float!
    capacity: Int
    ticketsLeft: Int
    createdAt: Date
    updatedAt: Date
    }

    type Query {
    user: User
    events: [Event]
    event(_id: ID!): Event
    }
    
    type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(username: String!, email: String!, password: String!): AuthPayload
    updateUsername(_id: ID!, email: String!): User
    updateEmail(_id: ID!, email: String!): User
    createEvent(title: String!, description: String, location: String!, date: String!, time: String!, price: Float!, capacity: Int): Event
    purchaseTicket(_id: ID!): Ticket
    }
    `;

module.exports = typeDefs;