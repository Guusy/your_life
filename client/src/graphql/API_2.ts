import Thought from '../../../server/domain/Thought';
import { UserDate } from '../../../server/domain/UserDate';

// Queries
export type GetUserAvailableFeelingsData = { feelings: [string] };

export type GetUserAvailableEdges = { edges: [{ id: string; label: string }] };

export type GetUserDate = {
  date: UserDate;
};
// Mutations
export type AddCustomFeelingMutationVariables = {
  id: string;
  input: { feeling: string };
};

export type AddThoughtMutationVariables = {
  id: string;
  input: Thought;
};

type EdgeInput = {
  label: string;
};

export type CreateEdgeMutationVariables = {
  id: string;
  input: EdgeInput;
};
