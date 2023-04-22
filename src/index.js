import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

// pages
import MyMovies from "./watchlist";
import Account from "./account";
import Friends from "./friends";
import App from "./App";
import Tables from "./tables";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/mymovies" element={<MyMovies />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/friends" element={<Friends />} />
          <Route exact path="/tables" element={<Tables />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ChakraProvider>
);
