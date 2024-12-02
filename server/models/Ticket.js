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
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        }
    }
)

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket, ticketSchema;