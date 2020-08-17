import { gql } from 'apollo-boost';

export const GET_USER_AVAILABLE_FEELINGS = gql`
  query GetUserAvailableFeelings($id: ID!) {
    feelings: getUserAvailableFeelings(id: $id)
  }
`;

export const GET_USER_AVAILABLE_EDGES = gql`
  query GetUserAvailableEdges($id: ID!) {
    edges: getUserAvailableEdges(id: $id) {
      id
      label
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      moods {
        title
        feelings
        description
      }
      thoughts {
        title
        description
        feelings
        date
      }
    }
  }
`;

export const GET_USER_DATE = gql`
  query GetDate($idUser: ID!, $date: String) {
    date: getDate(id: $idUser, date: $date) {
      thoughts {
        title
        description
        feelings
        date
      }
      situations {
        title
        description
        from
        place {
          id
        }
        feelings
        edges {
          edge
          modifier
        }
      }
    }
  }
`;
