import React, { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import EditableOptionItem from "../../components/EditableOptionItem";
import Button from "../../components/Button";
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
  // console.log(state, action);
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
  const [deploying, setDeploying] = useState(false);
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
      <EditableOptionItem key={uuidv4()} dispatch={dispatch} id={uuidv4()} />,
    ]);
  }
  function handleDeployPoll() {
    setDeploying(true);
    axios
      .post("/api/poll", {
        id: state.pollId,
        question: state.pollQuestion,
        options: state.pollOptions,
      })
      .then((res) => console.log(res))
      .then(() => setDeploying(false))
      .then(() => router.push(`/poll/${state.pollId}`));
  }
  // check if question and options are filled
  function isValid() {
    console.log(
      state.pollQuestion.length > 0 &&
        state.pollOptions.length > 0 &&
        state.pollOptions.every((option) => option.text.length > 0)
    );
    return (
      state.pollQuestion.length > 0 &&
      state.pollOptions.length > 0 &&
      state.pollOptions.every((option) => option.text.length > 0)
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-2 pb-3 mx-auto md:w-9/12">
      <h1 className="my-10 text-5xl font-normal text-center text-light-purple">
        Easy Poll
      </h1>
      <input
        type="text"
        name="poll-question"
        className="py-[0.7rem] mb-10 pl-5 text-2xl outline-none bg-light-purple rounded-2xl placeholder-light-gray"
        placeholder="Poll Question"
        autoComplete="off"
        autoFocus={true}
        value={state.pollQuestion}
        onChange={handlePollQuestionOnChange}
      />
      <div className="flex-grow ">{optionList}</div>
      <div className="flex justify-around">
        <button
          onClick={handleAddOption}
          className="px-3 py-1 text-2xl font-semibold text-black transition-all duration-200 bg-light-purple rounded-2xl hover:bg-opacity-75 active:bg-opacity-50"
        >
          Add Options
        </button>

        <Button
          text="Deploy"
          loadingState={deploying}
          loadingText="Deploying..."
          onClick={handleDeployPoll}
          className="inline-flex items-center px-3 py-1 text-2xl font-semibold text-black transition-all duration-200 bg-light-purple rounded-2xl hover:bg-opacity-75 active:bg-opacity-50"
          disabled={!isValid()}
        />
      </div>
    </div>
  );
};

export default CreatePoll;
