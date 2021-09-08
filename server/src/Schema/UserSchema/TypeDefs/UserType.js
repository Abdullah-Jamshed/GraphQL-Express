const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "Users",
  description: "...",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

module.exports = UserType;
