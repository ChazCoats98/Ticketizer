const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        capacity: {
            type: Number
        },
        ticketsLeft: {
            type: Number,
            default: 0
        }, 
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

Event = model('event', eventSchema);

module.exports = Event, eventSchema;