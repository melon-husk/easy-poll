import React, { useState, useEffect } from "react";

const EditableOptionItem = ({ dispatch, id }) => {
  const [value, setValue] = useState("");
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    dispatch({
      type: "ADD_POLL_OPTION",
      payload: {
        id,
        text: "",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      {remove === false && (
        <div className="flex mb-3">
          <input
            autoFocus={true}
            value={value}
            onChange={handleChange}
            type="text"
            className="min-w-0 py-2 pl-5 text-2xl outline-none bg-light-purple rounded-tl-2xl rounded-bl-2xl placeholder-light-gray"
          />
          <button
            onClick={handleRemove}
            className="px-2 border-2 text-dark-red border-dark-red rounded-tr-2xl rounded-br-2xl bg-light-red"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default EditableOptionItem;
