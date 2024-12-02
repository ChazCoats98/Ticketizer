const { Schema, model } = require('mongoose');
const ticketSchema = require('./Ticket');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User, userSchema;