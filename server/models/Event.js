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
            type: Float,
            required: true
        },
        capacity: {
            type: Int
        },
        ticketsLeft: {
            type: Int,
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

module.exports = eventSchema;