import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  return <div>{ users.map((val) => <h1>{val.firstName}</h1>)}</div>;
}

export default GetUsers;
