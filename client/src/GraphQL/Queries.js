import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query users($first: Int!, $currentPage: Int!) {
    users(first: $first, currentPage: $currentPage) {
      id
      firstName
      email
      password
    }
  }
`;

// export const LOAD_USERS = gql`
//   query {
//     users {
//       id
//       firstName
//       email
//       password
//     }
//   }
// `;
