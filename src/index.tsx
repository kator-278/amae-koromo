import * as React from "react";
import { render } from "react-dom";

import "./styles/bootstrap-custom.scss";
import "./styles/styles.scss";

import App from "./components/app";

const rootElement = document.getElementById("root");
render(<App />, rootElement);