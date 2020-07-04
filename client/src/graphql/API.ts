export type GetUserAvailableFeelingsData = { feelings: [string] };

export type AddCustomFeelingMutationVariables = {
  id: string;
  input: { feeling: string };
};
