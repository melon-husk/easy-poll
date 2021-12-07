import axios from "axios";
import React, { useEffect, useState } from "react";

const testData = {
  _id: { $oid: "61af670dbe9d880b982aea03" },
  id: "fff12d8e-5382-48c7-9559-07132e2b09de",
  question: "Which fruit is better ?",
  options: [
    {
      id: "59252595-4263-4d6e-b70e-a9434e63c945",
      text: "🍎",
      votes: 1,
      _id: { $oid: "61af670dbe9d880b982aea04" },
    },
    {
      id: "126221df-16c8-49e5-9ca3-b2db3c69fdcd",
      text: "🥑",
      votes: 1,
      _id: { $oid: "61af670dbe9d880b982aea05" },
    },
    {
      id: "134cff57-05fe-4e10-a04f-1939592fa8c1",
      text: "🍊",
      votes: 1,
      _id: { $oid: "61af670dbe9d880b982aea06" },
    },
    {
      id: "34725d3e-4409-43f7-84a7-9ce757aec4e8",
      text: "🍍",
      votes: 0,
      _id: { $oid: "61af670dbe9d880b982aea07" },
    },
  ],
  total_votes: 3,
  __v: 0,
};
const PollResult = ({ pollId }) => {
  const initialPollData = {
    id: "",
    question: "",
    options: [],
    total_votes: 0,
  };
  const [pollData, setPollData] = useState(initialPollData);
  useEffect(() => {
    console.log({ pollId });
    axios
      .get("/api/poll/", {
        params: {
          id: pollId,
        },
      })
      .then((res) => {
        setPollData(res.data.data);
      });
  }, []);
  return (
    <table className="w-[70%] ml-0 md:mx-auto md:w-[90%]">
      <tbody>
        {pollData.options.map((option) => (
          <tr key={option.id}>
            <td className="block w-full text-left md:text-right md:w-[30%] md:table-cell ">
              {option.text}
            </td>
            <td
              className=" bg-[#ffae11] block relative rounded min-w-[4px] my-2 mx-0"
              style={{
                transition: "width 0.5s cubic-bezier(1,.01,0,1) ",
                width: `${((option.votes / pollData.total_votes) * 100).toFixed(
                  2
                )}%`,
              }}
            >
              <span>
                {((option.votes / pollData.total_votes) * 100).toFixed(2)}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PollResult;
