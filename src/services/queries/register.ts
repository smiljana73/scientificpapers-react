import gql from "graphql-tag";

const REGISTER_QUERY = gql`
  mutation Register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      user: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        confirmPassword: $confirmPassword
      }
    )
  }
`;

export default REGISTER_QUERY;
