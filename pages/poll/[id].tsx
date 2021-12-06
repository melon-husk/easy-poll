import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import ReadOnlyOptionItem from "../../components/ReadOnlyOptionItem";
import axios from "axios";

interface Option {
  id: string;
  text: string;
  votes?: number;
}
const Poll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
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

  return (
    <div className="p-2 d-flex flex-column min-vh-100 justify-content-center align-items-center">
      {/* <FormControl placeholder="Poll Question" className="mb-2" /> */}
      <h1>{question}</h1>
      {options.map((option) => (
        <ReadOnlyOptionItem key={option.id} optionText={option.text} />
      ))}
      <Button variant="primary" className="my-2">
        Submit Poll
      </Button>
      {/* <h5>Option 1: votes</h5>
      <h5>Option 2: votes</h5> */}
    </div>
  );
};

export default Poll;
