import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import RemoveBtn from "../../components/RemoveBtn";
import SaveBtn from "../../components/SaveBtn";
import SearchBtn from "../../components/SearchBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { ArticleList, ArticleListItem } from "../../components/ArticleList";
import { Input,FormBtn } from "../../components/Form";
const API = require('./utils/API');

class Search extends Component {
  // Setting our component's initial state
  socketio: io(),

	getInitialState: function() {

		return {
			topic: '',
			articles: [],
			article_deleted: {}
		}

	}, // end getInitialState()

	// we need this function so the child can update the parent that an article has been saved and can then call componentDidUpdate and pull that article into the saved section without refreshing the page
	setArticles: function(search_topic) {

		this.setState({
			topic: search_topic
		});

	}, // end setArticles()

	//  this function will automatically display the items on the page
	setDeleteArticles: function(article_deleted) {

		this.setState({
			article_deleted: article_deleted
		});

	}, // end setDeleteArticles()

	// we will call this function form the component did mount and component did update functions below
	getArticlesFromHelpers: function() {

		// access helpers.js to use the getArticles function and access the get route defined in server.js
		API.getArticles()
			.then(function(response) {

				// set the state of articles with the articles stored in the database
				this.setState({
					articles: response.data
				})

		}.bind(this)); // end helpers.getArticles()

	}, // end getArticlesFromHelpers()

	componentDidUpdate: function() {

		// this is being called whenever a save article button is pressed in the search.js file
		this.getArticlesFromHelpers();

	}, // end componentDidUpdate()

	// once the page loads get all the articles in the database
	componentDidMount: function() {

		this.getArticlesFromHelpers();

	}, // end componentDidMount()

	render: function() {

		return (

			<div>

				<div className="jumbotron">
					<div className="container">
						<h1>New York Times Article Scrubber</h1>
						<p>Search for and annotate articles of interest!</p>
					</div>
				</div>

				<div className="search">
				/* we need to pass the ability to update the parent that an article has been saved to the database so that the articles can be added automatically to the saved component below */
         <Search setArticles={this.setArticles} />

				</div>

				<div className="saved">
					<Saved
						articles={this.state.articles}
						setDeleteArticles={this.setDeleteArticles} />
				</div>

			</div>

		);
	}

});
