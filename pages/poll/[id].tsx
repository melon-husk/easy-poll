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
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    axios
      .get("/api/poll/", {
        params: {
          id,
        },
      })
      .then((res) => {
        setQuestion(res.data.data.question);
        setOptions(res.data.data.options);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  function handleSubmitPoll() {
    // send stuff to server
    setSubmitPoll(true);
    votedOptions.forEach((option) => {
      axios.patch("/api/poll?id=" + option).then((res) => console.log(res));
    });
    console.log(votedOptions);
  }
  return (
    <div className="h-screen min-h-full p-2">
      <div className="flex flex-col mt-40">
        <h1 className="m-1 mb-2 text-2xl font-bold text-center">{question}</h1>
        {options.map((option) => (
          <ReadOnlyOptionItem
            key={option.id}
            optionText={option.text}
            optionId={option.id}
            votedOptions={votedOptions}
            setVotedOptions={setVotedOptions}
          />
        ))}
        <Button
          variant="primary"
          className="my-2"
          disabled={submitPoll}
          onClick={handleSubmitPoll}
        >
          Submit Poll
        </Button>
      </div>
      {submitPoll && <PollResult pollId={id} />}
    </div>
  );
};

export default Poll;
