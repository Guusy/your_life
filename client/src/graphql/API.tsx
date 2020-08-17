import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  situations?: Maybe<Array<Maybe<Situation>>>;
  edges?: Maybe<Array<Maybe<Edge>>>;
  moods?: Maybe<Array<Maybe<Mood>>>;
  thoughts?: Maybe<Array<Maybe<Thought>>>;
  customFeelings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mood = {
  __typename?: 'Mood';
  title: Scalars['String'];
  feelings: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};

export type Thought = {
  __typename?: 'Thought';
  title: Scalars['String'];
  description: Scalars['String'];
  feelings: Array<Maybe<Scalars['String']>>;
  date: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Situation = {
  __typename?: 'Situation';
  title: Scalars['String'];
  description: Scalars['String'];
  place: Place;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  feelings?: Maybe<Array<Maybe<Scalars['String']>>>;
  edges?: Maybe<Array<Maybe<EdgeOfLifeImpact>>>;
};

export type Edge = {
  __typename?: 'Edge';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type EdgeOfLifeImpact = {
  __typename?: 'EdgeOfLifeImpact';
  edge?: Maybe<Scalars['String']>;
  modifier?: Maybe<Scalars['Int']>;
};

export type UserDate = {
  __typename?: 'UserDate';
  thoughts?: Maybe<Array<Maybe<Thought>>>;
  situations?: Maybe<Array<Maybe<Situation>>>;
};

export type Query = {
  __typename?: 'Query';
  /** User by id */
  getUser?: Maybe<User>;
  /** User custom feelings + standart feelings */
  getUserAvailableFeelings?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** User edges */
  getUserAvailableEdges?: Maybe<Array<Maybe<Edge>>>;
  /** Get date */
  getDate?: Maybe<UserDate>;
  /** User situtations */
  getUserSituations?: Maybe<Array<Maybe<Situation>>>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserAvailableFeelingsArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserAvailableEdgesArgs = {
  id: Scalars['ID'];
};


export type QueryGetDateArgs = {
  id: Scalars['ID'];
  date?: Maybe<Scalars['String']>;
};


export type QueryGetUserSituationsArgs = {
  id: Scalars['ID'];
};

export type AddMoodInput = {
  title: Scalars['String'];
  feelings: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  date?: Maybe<Scalars['String']>;
};

export type EdgeInput = {
  id: Scalars['String'];
  label: Scalars['String'];
};

export type CreateEdgeInput = {
  label: Scalars['String'];
};

export type AddThoughtInput = {
  title: Scalars['String'];
  feelings: Array<Maybe<Scalars['String']>>;
  edges: Array<Maybe<EdgeInput>>;
  description: Scalars['String'];
  date: Scalars['String'];
};

export type PlaceInput = {
  id?: Maybe<Scalars['String']>;
};

export type EdgeOfLifeImpactInput = {
  edgeId?: Maybe<Scalars['String']>;
  modifier?: Maybe<Scalars['Int']>;
};

export type AddSituationInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  place: PlaceInput;
  from: Scalars['String'];
  to?: Maybe<Scalars['String']>;
  feelings?: Maybe<Array<Maybe<Scalars['String']>>>;
  edges?: Maybe<Array<Maybe<EdgeOfLifeImpactInput>>>;
};

export type AddCustomFeeling = {
  feeling?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a mood */
  addMood?: Maybe<Mood>;
  /** Add a thought */
  addThought?: Maybe<Thought>;
  /** Add custom feeling to the user */
  addCustomFeeling?: Maybe<Scalars['String']>;
  /** Add a thought */
  createEdge?: Maybe<Edge>;
  /** Add situation */
  addSituation?: Maybe<Situation>;
};


export type MutationAddMoodArgs = {
  _id: Scalars['ID'];
  input: AddMoodInput;
};


export type MutationAddThoughtArgs = {
  _id: Scalars['ID'];
  input: AddThoughtInput;
};


export type MutationAddCustomFeelingArgs = {
  _id: Scalars['ID'];
  input: AddCustomFeeling;
};


export type MutationCreateEdgeArgs = {
  _id: Scalars['ID'];
  input: CreateEdgeInput;
};


export type MutationAddSituationArgs = {
  _id: Scalars['ID'];
  input: AddSituationInput;
};

export type AddCustomFeelingMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AddCustomFeeling;
}>;


export type AddCustomFeelingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCustomFeeling'>
);

export type AddMoodMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AddMoodInput;
}>;


export type AddMoodMutation = (
  { __typename?: 'Mutation' }
  & { addMood?: Maybe<(
    { __typename?: 'Mood' }
    & Pick<Mood, 'title' | 'feelings' | 'description'>
  )> }
);

export type CreateEdgeMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CreateEdgeInput;
}>;


export type CreateEdgeMutation = (
  { __typename?: 'Mutation' }
  & { createEdge?: Maybe<(
    { __typename?: 'Edge' }
    & Pick<Edge, 'id' | 'label'>
  )> }
);

export type AddThoughtMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AddThoughtInput;
}>;


export type AddThoughtMutation = (
  { __typename?: 'Mutation' }
  & { addThought?: Maybe<(
    { __typename?: 'Thought' }
    & Pick<Thought, 'title' | 'feelings' | 'description'>
  )> }
);

export type AddSituationMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AddSituationInput;
}>;


export type AddSituationMutation = (
  { __typename?: 'Mutation' }
  & { addSituation?: Maybe<(
    { __typename?: 'Situation' }
    & Pick<Situation, 'title'>
  )> }
);

export type GetUserAvailableFeelingsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserAvailableFeelingsQuery = (
  { __typename?: 'Query' }
  & { feelings: Query['getUserAvailableFeelings'] }
);

export type GetUserAvailableEdgesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserAvailableEdgesQuery = (
  { __typename?: 'Query' }
  & { edges?: Maybe<Array<Maybe<(
    { __typename?: 'Edge' }
    & Pick<Edge, 'id' | 'label'>
  )>>> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { moods?: Maybe<Array<Maybe<(
      { __typename?: 'Mood' }
      & Pick<Mood, 'title' | 'feelings' | 'description'>
    )>>>, thoughts?: Maybe<Array<Maybe<(
      { __typename?: 'Thought' }
      & Pick<Thought, 'title' | 'description' | 'feelings' | 'date'>
    )>>> }
  )> }
);

export type GetDateQueryVariables = Exact<{
  idUser: Scalars['ID'];
  date?: Maybe<Scalars['String']>;
}>;


export type GetDateQuery = (
  { __typename?: 'Query' }
  & { date?: Maybe<(
    { __typename?: 'UserDate' }
    & { thoughts?: Maybe<Array<Maybe<(
      { __typename?: 'Thought' }
      & Pick<Thought, 'title' | 'description' | 'feelings' | 'date'>
    )>>>, situations?: Maybe<Array<Maybe<(
      { __typename?: 'Situation' }
      & Pick<Situation, 'title' | 'description' | 'from' | 'feelings'>
      & { place: (
        { __typename?: 'Place' }
        & Pick<Place, 'id'>
      ), edges?: Maybe<Array<Maybe<(
        { __typename?: 'EdgeOfLifeImpact' }
        & Pick<EdgeOfLifeImpact, 'edge' | 'modifier'>
      )>>> }
    )>>> }
  )> }
);


export const AddCustomFeelingDocument = gql`
    mutation AddCustomFeeling($id: ID!, $input: AddCustomFeeling!) {
  addCustomFeeling(_id: $id, input: $input)
}
    `;
export type AddCustomFeelingMutationFn = Apollo.MutationFunction<AddCustomFeelingMutation, AddCustomFeelingMutationVariables>;

/**
 * __useAddCustomFeelingMutation__
 *
 * To run a mutation, you first call `useAddCustomFeelingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCustomFeelingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCustomFeelingMutation, { data, loading, error }] = useAddCustomFeelingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCustomFeelingMutation(baseOptions?: Apollo.MutationHookOptions<AddCustomFeelingMutation, AddCustomFeelingMutationVariables>) {
        return Apollo.useMutation<AddCustomFeelingMutation, AddCustomFeelingMutationVariables>(AddCustomFeelingDocument, baseOptions);
      }
export type AddCustomFeelingMutationHookResult = ReturnType<typeof useAddCustomFeelingMutation>;
export type AddCustomFeelingMutationResult = Apollo.MutationResult<AddCustomFeelingMutation>;
export type AddCustomFeelingMutationOptions = Apollo.BaseMutationOptions<AddCustomFeelingMutation, AddCustomFeelingMutationVariables>;
export const AddMoodDocument = gql`
    mutation AddMood($id: ID!, $input: AddMoodInput!) {
  addMood(_id: $id, input: $input) {
    title
    feelings
    description
  }
}
    `;
export type AddMoodMutationFn = Apollo.MutationFunction<AddMoodMutation, AddMoodMutationVariables>;

/**
 * __useAddMoodMutation__
 *
 * To run a mutation, you first call `useAddMoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMoodMutation, { data, loading, error }] = useAddMoodMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMoodMutation(baseOptions?: Apollo.MutationHookOptions<AddMoodMutation, AddMoodMutationVariables>) {
        return Apollo.useMutation<AddMoodMutation, AddMoodMutationVariables>(AddMoodDocument, baseOptions);
      }
export type AddMoodMutationHookResult = ReturnType<typeof useAddMoodMutation>;
export type AddMoodMutationResult = Apollo.MutationResult<AddMoodMutation>;
export type AddMoodMutationOptions = Apollo.BaseMutationOptions<AddMoodMutation, AddMoodMutationVariables>;
export const CreateEdgeDocument = gql`
    mutation CreateEdge($id: ID!, $input: CreateEdgeInput!) {
  createEdge(_id: $id, input: $input) {
    id
    label
  }
}
    `;
export type CreateEdgeMutationFn = Apollo.MutationFunction<CreateEdgeMutation, CreateEdgeMutationVariables>;

/**
 * __useCreateEdgeMutation__
 *
 * To run a mutation, you first call `useCreateEdgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEdgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEdgeMutation, { data, loading, error }] = useCreateEdgeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEdgeMutation(baseOptions?: Apollo.MutationHookOptions<CreateEdgeMutation, CreateEdgeMutationVariables>) {
        return Apollo.useMutation<CreateEdgeMutation, CreateEdgeMutationVariables>(CreateEdgeDocument, baseOptions);
      }
export type CreateEdgeMutationHookResult = ReturnType<typeof useCreateEdgeMutation>;
export type CreateEdgeMutationResult = Apollo.MutationResult<CreateEdgeMutation>;
export type CreateEdgeMutationOptions = Apollo.BaseMutationOptions<CreateEdgeMutation, CreateEdgeMutationVariables>;
export const AddThoughtDocument = gql`
    mutation AddThought($id: ID!, $input: AddThoughtInput!) {
  addThought(_id: $id, input: $input) {
    title
    feelings
    description
  }
}
    `;
export type AddThoughtMutationFn = Apollo.MutationFunction<AddThoughtMutation, AddThoughtMutationVariables>;

/**
 * __useAddThoughtMutation__
 *
 * To run a mutation, you first call `useAddThoughtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddThoughtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addThoughtMutation, { data, loading, error }] = useAddThoughtMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddThoughtMutation(baseOptions?: Apollo.MutationHookOptions<AddThoughtMutation, AddThoughtMutationVariables>) {
        return Apollo.useMutation<AddThoughtMutation, AddThoughtMutationVariables>(AddThoughtDocument, baseOptions);
      }
export type AddThoughtMutationHookResult = ReturnType<typeof useAddThoughtMutation>;
export type AddThoughtMutationResult = Apollo.MutationResult<AddThoughtMutation>;
export type AddThoughtMutationOptions = Apollo.BaseMutationOptions<AddThoughtMutation, AddThoughtMutationVariables>;
export const AddSituationDocument = gql`
    mutation AddSituation($id: ID!, $input: AddSituationInput!) {
  addSituation(_id: $id, input: $input) {
    title
  }
}
    `;
export type AddSituationMutationFn = Apollo.MutationFunction<AddSituationMutation, AddSituationMutationVariables>;

/**
 * __useAddSituationMutation__
 *
 * To run a mutation, you first call `useAddSituationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSituationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSituationMutation, { data, loading, error }] = useAddSituationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSituationMutation(baseOptions?: Apollo.MutationHookOptions<AddSituationMutation, AddSituationMutationVariables>) {
        return Apollo.useMutation<AddSituationMutation, AddSituationMutationVariables>(AddSituationDocument, baseOptions);
      }
export type AddSituationMutationHookResult = ReturnType<typeof useAddSituationMutation>;
export type AddSituationMutationResult = Apollo.MutationResult<AddSituationMutation>;
export type AddSituationMutationOptions = Apollo.BaseMutationOptions<AddSituationMutation, AddSituationMutationVariables>;
export const GetUserAvailableFeelingsDocument = gql`
    query GetUserAvailableFeelings($id: ID!) {
  feelings: getUserAvailableFeelings(id: $id)
}
    `;

/**
 * __useGetUserAvailableFeelingsQuery__
 *
 * To run a query within a React component, call `useGetUserAvailableFeelingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAvailableFeelingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAvailableFeelingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserAvailableFeelingsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserAvailableFeelingsQuery, GetUserAvailableFeelingsQueryVariables>) {
        return Apollo.useQuery<GetUserAvailableFeelingsQuery, GetUserAvailableFeelingsQueryVariables>(GetUserAvailableFeelingsDocument, baseOptions);
      }
export function useGetUserAvailableFeelingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAvailableFeelingsQuery, GetUserAvailableFeelingsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserAvailableFeelingsQuery, GetUserAvailableFeelingsQueryVariables>(GetUserAvailableFeelingsDocument, baseOptions);
        }
export type GetUserAvailableFeelingsQueryHookResult = ReturnType<typeof useGetUserAvailableFeelingsQuery>;
export type GetUserAvailableFeelingsLazyQueryHookResult = ReturnType<typeof useGetUserAvailableFeelingsLazyQuery>;
export type GetUserAvailableFeelingsQueryResult = Apollo.QueryResult<GetUserAvailableFeelingsQuery, GetUserAvailableFeelingsQueryVariables>;
export const GetUserAvailableEdgesDocument = gql`
    query GetUserAvailableEdges($id: ID!) {
  edges: getUserAvailableEdges(id: $id) {
    id
    label
  }
}
    `;

/**
 * __useGetUserAvailableEdgesQuery__
 *
 * To run a query within a React component, call `useGetUserAvailableEdgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAvailableEdgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAvailableEdgesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserAvailableEdgesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserAvailableEdgesQuery, GetUserAvailableEdgesQueryVariables>) {
        return Apollo.useQuery<GetUserAvailableEdgesQuery, GetUserAvailableEdgesQueryVariables>(GetUserAvailableEdgesDocument, baseOptions);
      }
export function useGetUserAvailableEdgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAvailableEdgesQuery, GetUserAvailableEdgesQueryVariables>) {
          return Apollo.useLazyQuery<GetUserAvailableEdgesQuery, GetUserAvailableEdgesQueryVariables>(GetUserAvailableEdgesDocument, baseOptions);
        }
export type GetUserAvailableEdgesQueryHookResult = ReturnType<typeof useGetUserAvailableEdgesQuery>;
export type GetUserAvailableEdgesLazyQueryHookResult = ReturnType<typeof useGetUserAvailableEdgesLazyQuery>;
export type GetUserAvailableEdgesQueryResult = Apollo.QueryResult<GetUserAvailableEdgesQuery, GetUserAvailableEdgesQueryVariables>;
export const GetUserDocument = gql`
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

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetDateDocument = gql`
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

/**
 * __useGetDateQuery__
 *
 * To run a query within a React component, call `useGetDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDateQuery({
 *   variables: {
 *      idUser: // value for 'idUser'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetDateQuery(baseOptions?: Apollo.QueryHookOptions<GetDateQuery, GetDateQueryVariables>) {
        return Apollo.useQuery<GetDateQuery, GetDateQueryVariables>(GetDateDocument, baseOptions);
      }
export function useGetDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDateQuery, GetDateQueryVariables>) {
          return Apollo.useLazyQuery<GetDateQuery, GetDateQueryVariables>(GetDateDocument, baseOptions);
        }
export type GetDateQueryHookResult = ReturnType<typeof useGetDateQuery>;
export type GetDateLazyQueryHookResult = ReturnType<typeof useGetDateLazyQuery>;
export type GetDateQueryResult = Apollo.QueryResult<GetDateQuery, GetDateQueryVariables>;