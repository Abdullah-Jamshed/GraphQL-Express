import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS, COUNT } from "../GraphQL/Queries";

function GetUsers() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { error, loading, data } = useQuery(LOAD_USERS, { variables: { first: limit, currentPage } });
  const { data: total } = useQuery(COUNT);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (total) {
      setCount(total.total);
    }
  }, [total]);

  return (
    <div>
      {users.map((val, i) => (
        <>
          <h1 key={i}>{val.id}</h1>
          <h1 key={i}>{val.firstName}</h1>
        </>
      ))}

      <div>
        <li>
          {count &&
            [...Array(Math.ceil(count / limit))].map((_, i) => (
              <ul key={i} onClick={() => setCurrentPage(i)}>
                {i + 1}
              </ul>
            ))}
        </li>
      </div>
    </div>
  );
}

export default GetUsers;
