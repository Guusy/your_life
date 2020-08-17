import { gql } from 'apollo-boost';

export const ADD_CUSTOM_FEELING_USER = gql`
  mutation AddCustomFeeling($id: ID!, $input: AddCustomFeeling!) {
    addCustomFeeling(_id: $id, input: $input)
  }
`;

export const ADD_MOOD = gql`
  mutation AddMood($id: ID!, $input: AddMoodInput!) {
    addMood(_id: $id, input: $input) {
      title
      feelings
      description
    }
  }
`;


export const CREATE_EDGE = gql`
  mutation CreateEdge($id: ID!, $input: CreateEdgeInput!) {
    createEdge(_id: $id, input: $input) {
      id
      label
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation AddThought($id: ID!, $input: AddThoughtInput!) {
    addThought(_id: $id, input: $input) {
      title
      feelings
      description
    }
  }
`;
