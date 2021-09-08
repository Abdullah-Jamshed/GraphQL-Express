const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { graphql } = require("graphql");
const cors = require("cors");
const UserSchema = require("./Schema/UserSchema/index.js");

const app = express();
app.set("PORT", 5000);

app.use(cors());
app.use(express.json());

app.use("/graphql", graphqlHTTP({ schema: UserSchema, graphiql: true }));

app.get("/users", async (req, res) => {
  try {
    const query = `query{ users{ id, firstName, lastName, email, password} }`;
    const response = await graphql(UserSchema, "{users{id,firstName, lastName, email, password}}", query);
    res.json(response);
  } catch (error) {
    res.json({ errorMsg: error });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const query = `query{user(id:${req.params.id}){ id,firstName, lastName, email, password} }`;
    const response = await graphql(UserSchema, query);
    res.json(response);
  } catch (error) {
    res.json({ errorMsg: error });
  }
});

app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  try {
    const mutation = `mutation { 
      createUser(firstName:"${firstName}", lastName:"${lastName}", email:"${email}", password:"${password}"){ 
        firstName,
        lastName,
        email,
        password 
      }
    }`;
    const response = await graphql(UserSchema, mutation);
    res.json(response);
  } catch (error) {
    res.json({ errorMsg: error });
  }
});

app.listen(app.get("PORT"), () => {
  console.log(`Listening at http://localhost:${app.get("PORT")}`);
});
