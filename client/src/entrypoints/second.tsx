/**
 * The 'entry point' (in webpack terminology)
 * of the Second SPA.
 *
 * SSR has been enabled for this entry point.
 * To disable SSR:
 *  - comment out import { renderToString } ...
 *  - replace ReactDOM.hydrate with ReactDOM.render (see comments below)
 *  - comment out the SSR block at the bottom
 *  - set the 'ssr' flag to false for this SPA in spa.config.js
 *
 * Note than only one SPA (and therefore one entry point) can have SSR enabled.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { ComponentC } from "../components/ComponentC";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { renderToString } from "react-dom/server";
import * as SPAs from "../../config/spa.config";
import { isServer } from "../utils/ssr/misc";

const Second: React.FC = _props => {
  return (
    <>
      <ErrorBoundary>
        <Helmet title={SPAs.appTitle} />
        <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "3rem" }}>
          <h2>Welcome to {SPAs.appTitle}</h2>
        </div>
        <ComponentC />
      </ErrorBoundary>
    </>
  )
};

if (!isServer()) {
// ReactDOM.render(                         // .render(...) is used without SSR
   ReactDOM.hydrate(                        // .hydrate(...) is used with SSR
    <Second />,
    document.getElementById("app-root")
  );
}

/****************** SSR block start ******************/

const asString = (): string => {
 return renderToString(<Second />)
}

export default asString;

/****************** SSR block end ******************/

