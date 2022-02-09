import React from "react";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col px-2 pt-40">
      <h1 className="text-3xl font-bold text-center text-red-500">
        Something bad happened.....
      </h1>
      {/* <p className="text-2xl font-medium text-center text-red-400">
        ${error.message}
      </p> */}
      <button
        onClick={router.back}
        className="bg-red-500 text-white font-medium text-2xl self-start mx-auto mt-20 rounded-md px-8 py-2 hover:bg-red-600 active:bg-red-700 transform-gpu hover:scale-[1.05] transition-all"
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
