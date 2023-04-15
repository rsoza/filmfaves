import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

// pages
import MyMovies from "./myMovies";
import Account from "./account";
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
          <Route exact path="/tables" element={<Tables />} />
          {/* <Route exact path="/review" element={<review />} /> */}
        </Routes>
      </Router>
    </React.StrictMode>
  </ChakraProvider>
);
