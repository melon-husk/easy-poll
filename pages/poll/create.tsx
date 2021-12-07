import React, { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { Button, FormControl } from "react-bootstrap";
import EditableOptionItem from "../../components/EditableOptionItem";
import { useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";
interface PollOption {
  id: string;
  text: string;
}
interface State {
  pollId: string;
  pollQuestion: string;
  pollOptions: PollOption[];
}
const initialState: State = {
  pollId: "",
  pollQuestion: "",
  pollOptions: [],
};
function reducer(state: State, action: any) {
  console.log(state, action);
  switch (action.type) {
    case "SET_POLL_ID":
      return { ...state, pollId: action.payload };
    case "SET_POLL_QUESTION":
      return { ...state, pollQuestion: action.payload };
    case "ADD_POLL_OPTION":
      return {
        ...state,
        pollOptions: [
          ...state.pollOptions,
          {
            id: action.payload.id,
            text: action.payload.text,
          },
        ],
      };
    case "REMOVE_POLL_OPTION":
      return {
        ...state,
        pollOptions: state.pollOptions.filter(
          (option) => option.id !== action.payload.id
        ),
      };
    case "UPDATE_POLL_OPTION":
      return {
        ...state,
        pollOptions: state.pollOptions.map((option) => {
          if (option.id === action.payload.id) {
            return {
              ...option,
              text: action.payload.text,
            };
          }
          return option;
        }),
      };

    default:
      return state;
  }
}
const CreatePoll = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [optionList, setOptionList] = useState<JSX.Element[]>([]);
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: "SET_POLL_ID", payload: uuidv4() });
  }, []);
  function handlePollQuestionOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "SET_POLL_QUESTION", payload: e.target.value });
  }
  function handleAddOption() {
    setOptionList((prevState) => [
      ...prevState,
      <EditableOptionItem
        key={uuidv4()}
        state={state}
        dispatch={dispatch}
        id={uuidv4()}
      />,
    ]);
  }
  function handleDeployPoll() {
    // Push stuff to database
    axios
      .post("/api/poll", {
        id: state.pollId,
        question: state.pollQuestion,
        options: state.pollOptions,
      })
      .then((res) => console.log(res))
      .then(() => router.push(`/poll/${state.pollId}`));

    console.log(state);
  }
  return (
    <div className="p-2 d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <FormControl
        placeholder="Poll Question"
        className="mb-2"
        value={state.pollQuestion}
        onChange={handlePollQuestionOnChange}
      />
      {optionList}
      <div className="m-2">
        <Button className="me-2" onClick={handleAddOption}>
          Add Options
        </Button>
        <Button onClick={handleDeployPoll}>Deploy</Button>
      </div>
    </div>
  );
};

export default CreatePoll;
