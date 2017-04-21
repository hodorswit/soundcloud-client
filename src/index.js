import React, { Component } from "react";
import "./App.css";
import Stream from "./components/Stream";
import configureStore from "./stores/configureStore";
import * as actions from "./actions";

const tracks = [{ title: "Some track" }, { title: "Some other track" }];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(<Stream />, document.getElementById("root"));
