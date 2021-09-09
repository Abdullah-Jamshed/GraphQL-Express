const { GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const UserType = require("./TypeDefs/UserType.js");

const users = require("../../dummyData/index.json");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "...",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: { first: { type: GraphQLInt }, currentPage: { type: GraphQLInt } },
      // resolve: (parent, args) => users,
      resolve: (parent, { currentPage, first }) => {
        const data = users.slice(currentPage * first, currentPage * first + first);
        return data;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, { id }) => {
        const user = users.filter((user) => user.id === id);
        return user[0];
      },
    },
    total: {
      type: GraphQLInt,
      resolve: (parent, args) => {
        return users.length;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "...",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (parent, { firstName, lastName, email, password }) => {
        const id = users.length + 1;
        users.push({
          id,
          firstName,
          lastName,
          email,
          password,
        });
        return { id, firstName, lastName, email, password };
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
