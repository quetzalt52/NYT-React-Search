import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { ArticleList, ArticleListItem } from "./components/ArticleList";
import { Container, Row, Col } from "./components/Grid";
import Search from "./page/Search";

const App =() => (
  <div>
    < Search />
  </div>
);
export default App;
