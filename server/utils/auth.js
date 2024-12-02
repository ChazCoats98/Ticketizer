const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;
const expiration = '2h';

const authMiddleware = function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        throw new GraphQLError('Missing authentication token.');
    }

    try {
        const tokenVerification = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch (err) {
        throw new GraphQLError('Invalid authentication token.');
    }

    return req;
};

const signToken = function({ email, _id }) {
    const payload = { email, _id };

    return jwt.sign(payload, secret, { expiresIn: expiration });
};

const AuthenticationError = new GraphQLError('Error authenticating user.', {
    extensions: {
        code: 'AUTH_ERROR',
    },
});

module.exports = {
    authMiddleware,
    signToken,
    AuthenticationError,
};