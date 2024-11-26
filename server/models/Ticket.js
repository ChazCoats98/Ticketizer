const { Schema, model } = require('mongoose');
const { User, userSchema } = require('./User');
const eventSchema = require('./Event');

const ticketSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        purchaseDate: {
            type: Date,
            required: true
        },
        event: eventSchema,
        attendee: userSchema
    }
)

module.exports = ticketSchema;