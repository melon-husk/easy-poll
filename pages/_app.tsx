import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { StateContext, initialState, reducer } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StateContext.Provider>
  );
}

export default MyApp;
