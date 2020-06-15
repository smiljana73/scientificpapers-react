import gql from "graphql-tag";

const LOGIN_QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(userName: $email, password: $password)
  }
`;

export default LOGIN_QUERY;
