import React from "react";

interface Props {
  text: string;
  loadingText: string;
  loadingState: boolean;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({
  loadingState,
  loadingText,
  onClick,
  text,
  className,
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{ cursor: `${disabled ? "not-allowed" : "pointer"}` }}
    >
      {loadingState ? (
        <>
          <svg
            className="w-5 h-5 mr-3 -ml-1 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
