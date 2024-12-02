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