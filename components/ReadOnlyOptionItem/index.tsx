import React, { useState, useContext, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const ReadOnlyOptionItem = ({ optionText }) => {
  const [checked, setChecked] = useState(false);
  function handleCheck(e) {
    setChecked(e.target.checked);
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
