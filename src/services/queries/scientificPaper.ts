import gql from "graphql-tag";

const SCIENTIFIC_PAPER_QUERY = gql`
  query ScientificPaper($identificationNumber: String!) {
    scientificPaper(identificationNumber: $identificationNumber) {
      number
      identificationNumber
      documentType
      recordType
      paperType
      author
      mentor
      title
      publicationLanguage
      geographicalArea
      year
      publisher
      address
      description
      scientificField
      scientificDiscipline
      keywords
      note
      excerpt
      dateOfAcceptance
      defenseDate
      commission {
        chairman
        member
        mentor
      }
    }
  }
`;

export default SCIENTIFIC_PAPER_QUERY;
