import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { createContext, useEffect, useReducer, useState } from "react";
// import { Icon } from "@iconify/react";
import { Button, FormControl } from "react-bootstrap";
import OptionItem from "../../components/OptionItem";

const Poll = () => {
  const [optionList, setOptionList] = useState<JSX.Element[]>([]);
  const router = useRouter();
  const { id } = router.query;

  function handleAddOption() {
    setOptionList((prevState) => [...prevState, <OptionItem key={uuidv4()} />]);
  }
  return (
    <div className="p-2 d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <FormControl placeholder="Poll Question" className="mb-2" />
      {optionList}
      <div className="m-2">
        <Button className="me-2" onClick={handleAddOption}>
          Add Options
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Poll;
