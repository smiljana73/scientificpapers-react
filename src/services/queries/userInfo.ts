import gql from "graphql-tag";

const USER_INFO_QUERY = gql`
  query UserInfo {
    getUser {
      firstName
      lastName
    }
  }
`;

export default USER_INFO_QUERY;
