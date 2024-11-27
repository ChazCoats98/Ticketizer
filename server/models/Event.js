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
        }
    }
)