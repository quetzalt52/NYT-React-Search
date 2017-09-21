const React = require('react');
const Router = require('react-router');
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/RemoveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/ArticleList";
import { Input, TextArea, FormBtn } from "../../components/Form";

const Main = React.createClass({

  render: function(){

    return(

      <div className="main-container">


        <div className="container">

          <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">NYT-React</a>
              </div>

              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#/search">Search</a></li>
                  <li><a href="#/saved">Saved Articles</a></li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Scrubber</strong></h1>
            <h2 className="text-center"> Search for and annotate Articles of interest!</h2>
          </div>

          {this.props.children}

        </div>
      </div>
    )
  }
});

module.exports = Main;
