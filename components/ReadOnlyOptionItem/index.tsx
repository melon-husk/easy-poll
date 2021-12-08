import React, { useState, useEffect } from "react";

const ReadOnlyOptionItem = ({
  optionText,
  optionId,
  votedOptions,
  setVotedOptions,
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      setVotedOptions([...votedOptions, optionId]);
    }
    // if option exists in votedOptions and is unchecked, remove it
    else {
      setVotedOptions(votedOptions.filter((option) => option !== optionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  function handleCheck() {
    setChecked((prevState) => !prevState);
  }
  return (
    <>
      <div className="flex mb-3 cursor-pointer" onClick={handleCheck}>
        <span
          style={{ background: `${checked ? "#9FFFAF" : "#D0D5FF"}` }}
          className="flex items-center justify-center px-2 border-2 rounded-tl-2xl rounded-bl-2xl border-select-blue "
        >
          <input
            readOnly
            type="checkbox"
            className="w-5 h-5"
            checked={checked}
          />
        </span>
        <p className="w-full py-2 pl-5 text-2xl transition duration-150 ease-in-out bg-light-purple rounded-tr-2xl rounded-br-2xl hover:bg-opacity-75">
          {optionText}
        </p>
      </div>
    </>
  );
};

export default ReadOnlyOptionItem;
