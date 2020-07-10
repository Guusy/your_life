import Thought from '../../../server/domain/Thought';

export type GetUserAvailableFeelingsData = { feelings: [string] };

export type AddCustomFeelingMutationVariables = {
  id: string;
  input: { feeling: string };
};

export type AddThoughtMutationVariables = {
  id: string;
  input: Thought;
};
