import { useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer";

interface Option {
  id: string;
  text: string;
  checked: boolean;
}

export interface State {
  pollQuestion: string;
  pollOptions: Option[];
}

const initialState: State = {
  pollQuestion: "",
  pollOptions: [],
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext({});
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
