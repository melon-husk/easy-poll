import { useRouter } from "next/router";

import { v4 as uuidv4 } from "uuid";
import { useReducer, useState } from "react";
// import { Icon } from "@iconify/react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

interface Option {
  id: string;
  text: string;
  checked: boolean;
}
interface State {
  pollName: string;
  pollQuestion: string;
  options: Option[];
}
const initialState: State = {
  pollName: "",
  pollQuestion: "",
  options: [],
};

function reducer(state: State, action) {
  switch (action.type) {
    case "ADD_POLL_NAME":
      return {
        ...state,
        pollName: action.payload,
      };
    case "ADD_POLL_QUESTION":
      return {
        ...state,
        pollQuestion: action.payload,
      };
    case "ADD_OPTION":
      return {
        ...state,
        options: [
          ...state.options,
          {
            id: uuidv4(),
            text: action.payload.text,
            checked: action.payload.checked,
          },
        ],
      };

    default:
      return state;
  }
}

const Poll = () => {
  // const [options, setOptions] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleAddOption = () => {
    dispatch({
      type: "ADD_OPTION",
      payload: uuidv4(),
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center p-5">
      <FormControl placeholder="Poll Question" className="m-2" />
      <InputGroup>
        <InputGroup.Checkbox />
        <FormControl />
      </InputGroup>
      <div className="m-2">
        <Button className="me-2">Add Options</Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Poll;
