const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType(
    {
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            if (typeof value === 'number') {
                return new Date(value);
            }
            throw Error('Expected a `Date` object but got ' + value + ' instead');
        },
        serialize(value) {
            if (value instanceof Date) {
                return value.getTime();
            }
            throw Error('Expected a `number` but got ' + value + ' instead');
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10));
            }
            return null;
        },
    }
);

module.exports = dateScalar;