const { query } = require("express");
const express = require("express");
const { GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const users = [
  { id: 1, age: 2, name: "Abdullah" },
  { id: 2, age: 4, name: "Jamshed" },
  { id: 3, age: 6, name: "Zia" },
  { id: 4, age: 4, name: "Khan" },
  { id: 5, age: 3, name: "Ahmed" },
];

const UserType = require("./TypeDefs/UserType.js");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "...",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: (parent, args) => users,
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, { id }) => {
        const user = users.filter((user) => user.id === id);
        return user[0];
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
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, { name, age }) => {
        const id = users.length + 1;
        users.push({
          id,
          name,
          age,
        });
        return { id, name, age };
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
