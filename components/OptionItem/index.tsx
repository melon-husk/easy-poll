import React, { useState, useContext, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { StateContext } from "../../context";

const OptionItem = () => {
  const stateContext = useContext(StateContext);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    stateContext.dispatch();
  }, []);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleRemove() {
    setRemove(true);
  }
  function handleCheck(e) {
    setChecked(e.target.checked);
    console.log({ checked });
  }
  return (
    <>
      {remove === false && (
        <>
          <InputGroup className="mb-2">
            <InputGroup.Checkbox onChange={handleCheck} checked={checked} />
            <FormControl value={value} onChange={handleChange} />
            <Button variant="outline-danger" onClick={handleRemove}>
              Delete
            </Button>
          </InputGroup>
        </>
      )}
    </>
  );
};

export default OptionItem;
