import { gql } from 'apollo-boost';

export const GET_USER_AVAILABLE_FEELINGS = gql`
  query GetUserAvailableFeelings($id: ID!) {
    getUserAvailableFeelings(id: $id) {
      feeling
      color
    }
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
      customFeelings {
        feeling
        color
      }
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

export const GET_USER_GOALS = gql`
  query GetUserGoals($id: ID!) {
    getUserGoals(id: $id) {
      id
      title
      description
      starter_day
    }
  }
`;

export const GET_USER_GOAL = gql`
  query GetUserGoal($id: ID!, $goalId: ID!) {
    getUserGoal(id: $id, goalId: $goalId) {
      id
      title
      description
      starter_day
    }
  }
`;
