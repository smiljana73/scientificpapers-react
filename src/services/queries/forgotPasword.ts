import gql from "graphql-tag";

const FORGOT_PASSWORD_QUERY = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(userName: $email)
  }
`;

export default FORGOT_PASSWORD_QUERY;
