import gql from "graphql-tag";

const UPDATE_USER_QUERY = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $oldPassword: String
    $newPassword: String
    $confirmPassword: String
  ) {
    updateUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        oldPassword: $oldPassword
        newPassword: $newPassword
        confirmPassword: $confirmPassword
      }
    ) {
      firstName
      lastName
    }
  }
`;

export default UPDATE_USER_QUERY;
