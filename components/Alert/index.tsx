import React, { useEffect } from "react";

type Props = {
  statusCode: string;
  errorText?: string;
};
const Alert = ({ statusCode, errorText }: Props) => {
  useEffect(() => {
    throw new Error(errorText);
  }, []);
  return (
    <div
      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
      role="alert"
    >
      <strong className="font-bold">Oh no!</strong>
      <span className="block sm:inline">
        Something seriously bad happened. This is the status-code I got{" "}
        {statusCode}. Please refresh the page.{" "}
        {errorText && `More info about the error ${errorText}`}
      </span>
    </div>
  );
};

export default Alert;
