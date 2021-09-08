const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, graphql } = require("graphql");

const app = express();
app.set("PORT", 5000);

const users = [
  { id: 1, age: 2, name: "Abdullah" },
  { id: 2, age: 4, name: "Jamshed" },
  { id: 3, age: 6, name: "Zia" },
  { id: 4, age: 4, name: "Khan" },
  { id: 5, age: 3, name: "Ahmed" },
];

const UserType = new GraphQLObjectType({
  name: "Users",
  description: "...",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLString },
  },
});

const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "...",
    fields: () => ({
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
    }),
  }),
});

app.use("/graphql", graphqlHTTP({ schema: UserSchema, graphiql: true }));

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

app.get("/users", async (req, res) => {
  try {
    const query = `query{ user{ id, name, age} }`;
    const response = await graphql(UserSchema, query);
    res.json(response);
  } catch (error) {
    res.json({ errorMsg: error });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const query = `query{user(id:${req.params.id}){ id, name, age} }`;
    // `{users{id,name,age}}`
    const response = await graphql(UserSchema,`{users{id,name,age}}`,query);
    res.json(response);
  } catch (error) {
    res.json({ errorMsg: error });
  }
});

app.listen(app.get("PORT"), () => {
  console.log(`Listening at http://localhost:${app.get("PORT")}`);
});