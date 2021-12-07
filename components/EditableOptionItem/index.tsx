import React, { useState, useContext, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const EditableOptionItem = ({ state, dispatch, id }) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [remove, setRemove] = useState(false);
  // const id = uuidv4();

  useEffect(() => {
    dispatch({
      type: "ADD_POLL_OPTION",
      payload: {
        id,
        text: "",
      },
    });
  }, []);
  function handleChange(e) {
    setValue(e.target.value);
    dispatch({
      type: "UPDATE_POLL_OPTION",
      payload: {
        id,
        text: e.target.value,
      },
    });
  }

  function handleRemove() {
    dispatch({
      type: "REMOVE_POLL_OPTION",
      payload: {
        id,
      },
    });
    setRemove(true);
  }
  function handleCheck(e) {
    setChecked(e.target.checked);
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

export default EditableOptionItem;
