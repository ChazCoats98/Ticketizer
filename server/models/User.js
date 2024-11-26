const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true,
            match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
                'Password must be atleast 8 characters long and must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        purchases: [ticketSchema]
    }
);

const User = model('User', userSchema);

module.exports = User;