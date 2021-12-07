import axios from "axios";
import React, { useEffect, useState } from "react";

const PollResult = ({ pollId }) => {
  const initialPollData = {
    id: "",
    question: "",
    options: [],
    total_votes: 0,
  };
  const [pollData, setPollData] = useState(initialPollData);
  useEffect(() => {
    axios
      .get("/api/poll/", {
        params: {
          id: pollId,
        },
      })
      .then((res) => {
        setPollData(res.data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <table className="w-full ml-0 md:mx-auto md:w-[90%] ">
      <tbody>
        {pollData.options.map((option) => (
          <tr key={option.id}>
            <td className="block w-full text-left md:text-right md:w-[30%] md:table-cell text-light-purple">
              {option.text}
            </td>
            <td
              className=" bg-[#ffae11] block relative rounded-2xl pl-2 min-w-[60px] my-2 mx-0"
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
