import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Button, FormControl, ProgressBar } from "react-bootstrap";
import ReadOnlyOptionItem from "../../components/ReadOnlyOptionItem";
import axios from "axios";
import PollResult from "../../components/PollResult";

interface Option {
  id: string;
  text: string;
  votes: number;
}

const Poll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [submitPoll, setSubmitPoll] = useState(false);
  const [votedOptions, setVotedOptions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    setFetchingData(true);
    axios
      .get("/api/poll/", {
        params: {
          id,
        },
      })
      .then((res) => {
        setQuestion(res.data.data.question);
        setOptions(res.data.data.options);
        setFetchingData(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  function handleSubmitPoll() {
    if (votedOptions.length === 0) return;
    setSubmitPoll(true);
    setSubmitting(true);
    votedOptions.forEach((option) => {
      axios.patch("/api/poll?id=" + option).then((res) => {
        console.log(res);
        setSubmitting(false);
      });
    });
    console.log(votedOptions);
  }
  return (
    <div className="h-screen min-h-full p-2 mx-auto md:w-9/12">
      <div className="flex flex-col ">
        <h1 className="my-10 text-5xl font-normal text-center text-light-purple">
          Easy Poll
        </h1>
        {fetchingData ? (
          <div className="flex flex-col animate-pulse">
            <div className="w-1/2 h-8 mb-4 text-2xl bg-purple-900 rounded"></div>
            <div className="flex mb-3 cursor-pointer">
              <span className="flex items-center justify-center px-2 transition duration-75 ease-in-out bg-purple-900 border-2 border-purple-800 rounded-tl-2xl rounded-bl-2xl">
                <input readOnly type="checkbox" className="w-5 h-5" />
              </span>
              <div className="w-full h-12 py-2 pl-5 text-2xl transition duration-150 ease-in-out bg-purple-900 rounded-tr-2xl rounded-br-2xl hover:bg-opacity-75"></div>
            </div>
            <div className="flex mb-3 cursor-pointer">
              <span className="flex items-center justify-center px-2 transition duration-75 ease-in-out bg-purple-900 border-2 border-purple-800 rounded-tl-2xl rounded-bl-2xl">
                <input readOnly type="checkbox" className="w-5 h-5" />
              </span>
              <div className="w-full h-10 py-2 pl-5 text-2xl transition duration-150 ease-in-out bg-purple-900 rounded-tr-2xl rounded-br-2xl hover:bg-opacity-75"></div>
            </div>
            <div className="flex mb-3 cursor-pointer">
              <span className="flex items-center justify-center px-2 transition duration-75 ease-in-out bg-purple-900 border-2 border-purple-800 rounded-tl-2xl rounded-bl-2xl">
                <input readOnly type="checkbox" className="w-5 h-5" />
              </span>
              <div className="w-full h-10 py-2 pl-5 text-2xl transition duration-150 ease-in-out bg-purple-900 rounded-tr-2xl rounded-br-2xl hover:bg-opacity-75"></div>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-10 text-2xl text-light-purple">{question}</p>
            {options.map((option) => (
              <ReadOnlyOptionItem
                key={option.id}
                optionText={option.text}
                optionId={option.id}
                votedOptions={votedOptions}
                setVotedOptions={setVotedOptions}
              />
            ))}
          </>
        )}

        <button
          disabled={submitPoll}
          onClick={handleSubmitPoll}
          className="inline-flex items-center px-3 py-2 mx-auto mb-3 font-semibold leading-6 transition duration-150 ease-in-out cursor-not-allowed bg-select-green rounded-2xl hover:bg-opacity-75 active:bg-opacity-50"
        >
          {submitting ? (
            <>
              <svg
                className="w-5 h-5 mr-3 -ml-1 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Poll"
          )}
        </button>
      </div>
      {submitPoll && <PollResult pollId={id} />}
    </div>
  );
};

export default Poll;
