import gql from "graphql-tag";

const SEARCH_QUERY = gql`
  query Search(
    $fulltext: String!
    $from: Int
    $size: Int
    $documentType: [String!]
    $mentor: [String!]
    $year: [String!]
    $publisher: [String!]
    $scientificField: [String!]
  ) {
    queryScientificPaper(
      fulltext: $fulltext
      page: { from: $from, size: $size }
      filter: {
        documentType: $documentType
        mentor: $mentor
        year: $year
        publisher: $publisher
        scientificField: $scientificField
      }
    ) {
      scientificPapers {
        identificationNumber
        title
        documentType
        mentor
        author
        year
        publisher
        scientificField
        description
      }
      filters {
        key
        name
        values {
          value
          count
        }
      }
      totalCount
    }
  }
`;

export default SEARCH_QUERY;
