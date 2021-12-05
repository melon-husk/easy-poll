function reducer(state: State, action: any) {
  switch (action.type) {
    case "SET_POLL_QUESTION":
      return {
        ...state,
        pollQuestion: action.payload,
      };
    case "ADD_OPTION":
      return {
        ...state,
        pollOptions: [
          ...state.pollOptions,
          {
            id: action.payload,
            text: action.payload,
            checked: false,
          },
        ],
      };
    case "REMOVE_OPTION":
      return {
        ...state,
        pollOptions: state.pollOptions.filter(
          (option) => option.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default reducer;
