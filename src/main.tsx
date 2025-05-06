import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator
      components={{
        Header() {
          return (
            <div className="relative flex  py-10 cal-sans overflow-hidden w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-800 bg-[url(/lines.png)] bg-center bg-repeat brightness-200"></div>
              <div className="px-10 self-center z-0">
                <h1 className="text-white text-4xl font-bold py-5 justify-self-center">Application Tracker</h1>
                <h1 className="text-blue-400 text-4xl animate-pulse justify-self-center">+</h1>
                <h1 className="text-white text-7xl font-bold justify-self-center">Open AI</h1>
                <h3 className="text-blue-500 py-5 justify-self-center">Track your job applications and adjust your resume</h3>
                <p className="text-white justify-self-center text-sm"> Sign up or Log in to continue! </p>
              </div>
            </div>
          );
        },
      }}
    >
      <App />
    </Authenticator>
  </React.StrictMode>
);
