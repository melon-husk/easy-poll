import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PollResult = ({ pollId }) => {
  const initialPollData = {
    id: "",
    question: "",
    options: [],
    total_votes: 0,
  };
  const [pollData, setPollData] = useState(initialPollData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/poll/", {
        params: {
          id: pollId,
        },
      })
      .then((res) => {
        setPollData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Poll Result", err);
        router.push(`/error`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <table
          className=" animate-pulse w-full ml-0  md:w-[90%] "
          style={{ borderSpacing: "10px", borderCollapse: "separate" }}
        >
          <tbody>
            <tr>
              <td className="block w-full text-left md:text-right md:w-[30%] md:table-cell h-8 mb-2 text-2xl bg-purple-900 rounded mr-2"></td>
              <td
                className=" bg-purple-800 block relative rounded-2xl pl-2 min-w-[60px] my-2 mx-0 h-6"
                style={{
                  transition: "width 0.5s cubic-bezier(1,.01,0,1) ",
                  width: "20%",
                }}
              >
                <span></span>
              </td>
            </tr>
            <tr>
              <td className="block  text-left md:text-right md:w-[30%] md:table-cell text-light-purple w-full h-8 mb-2 text-2xl bg-purple-900 rounded"></td>
              <td
                className=" bg-purple-800 block relative rounded-2xl pl-2 min-w-[60px] my-2 mx-0 h-6"
                style={{
                  transition: "width 0.5s cubic-bezier(1,.01,0,1) ",
                  width: "70%",
                }}
              >
                <span></span>
              </td>
            </tr>
            <tr>
              <td className="block  text-left md:text-right md:w-[30%] md:table-cell text-light-purple  w-full h-8 mb-2 text-2xl bg-purple-900 rounded"></td>
              <td
                className=" bg-purple-800 block relative rounded-2xl pl-2 min-w-[60px] my-2 mx-0 h-6"
                style={{
                  transition: "width 0.5s cubic-bezier(1,.01,0,1) ",
                  width: "55%",
                }}
              >
                <span></span>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full ml-0  md:w-[90%] ">
          <tbody>
            {pollData.options.map((option) => (
              <tr key={option.id}>
                <td className="block w-full text-left md:text-right md:w-[30%] md:table-cell text-light-purple pr-2">
                  {option.text}
                </td>
                <td
                  className=" bg-[#ffae11] block relative rounded-2xl pl-2 min-w-[60px] my-2 mx-0"
                  style={{
                    transition: "width 0.5s cubic-bezier(1,.01,0,1) ",
                    width: `${(
                      (option.votes / pollData.total_votes) *
                      100
                    ).toFixed(2)}%`,
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
      )}
    </>
  );
};

export default PollResult;
