import React, { useState, useContext, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const ReadOnlyOptionItem = ({
  optionText,
  optionId,
  votedOptions,
  setVotedOptions,
}) => {
  const [checked, setChecked] = useState(false);
  function handleCheck(e) {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setVotedOptions([...votedOptions, optionId]);
    }
    // if option exists in votedOptions and is unchecked, remove it
    else {
      setVotedOptions(votedOptions.filter((option) => option !== optionId));
    }
  }
  return (
    <>
      <InputGroup className="mb-2">
        <InputGroup.Checkbox onChange={handleCheck} checked={checked} />

        <FormControl
          style={{ cursor: "pointer" }}
          defaultValue={optionText}
          readOnly
        />
      </InputGroup>
    </>
  );
};

export default ReadOnlyOptionItem;
