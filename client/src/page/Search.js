const React = require('react');
const API = require('../utils/API');

// socket.io assignment to variable
const socket = io();

const Search = React.createClass({

	getInitialState: function() {

		return {
			search_topic: '',
			start_year: '',
			end_year: '',
			nytdata: []
		}

	}, // end getInitialState()

	changedData: function(event) {

		// resetting the state each time the user changes something in any of the inputs by setting the id of the inputs to be the same as the key in the returned state object
		this.setState({[event.target.id]: event.target.value});

	}, // end changedData

	queryData: function(event) {

		event.preventDefault();

		// call the function below in the helpers.js file
		API.searchNYT(this.state.search_topic, this.state.start_year, this.state.end_year)
			.then(function(data) {

				// set the state of nytdata to all the data returned from the ny times api so we can map through it and display it to the screen below
				this.setState({nytdata: data});

		// .bind so we have this refering to the object returned
		}.bind(this));

	}, // end queryData()

	clickHandler: function(event) {

		event.preventDefault();

		// set the title of the article being saved to the db in a variable for socket.io to use
		const socket_article_title = event.target.parentElement.children[2].innerHTML;

		// emit the message with socket io. WARNING!!! can't use socket.on in here as it attaches event listners each time it's clicked and will call it multiple times. I put the socket.on call in a method below that self invokes
		socket.emit('message', socket_article_title);

		// this.getConnected(socket_article_title);

		// set the state of the article we're saving
		this.setState({
			article_to_save: {
				article_title: event.target.parentElement.children[2].innerHTML,
				article_url: event.target.parentElement.children[2].href,
				article_date: event.target.parentElement.children[4].innerHTML
			}
		// callback function so the state can update before we do anyting this that data
		}, function() {

			// call the postArticle function and pass the article
			API.postArticle(this.state.article_to_save);

			// need to call the setArticles function in main.js so that the newly saved articles to the database automatically show up in the saved section
			this.props.setArticles(this.state.search_topic);

		});	// end setState()

	}, // end clickHandler()

	socketIoConnection: function() {

		// send the title of the article through socket.io
		socket.on('message', function(article_to_emit) {

			// ge the element I want the title to appear on
			const just_added = document.getElementById('just-added');

			// clear out any text that was previously in that element
			just_added.innerHTML = '';

			// create the text node of the article's title
			const title_text_node = document.createTextNode('Title Added: ' + article_to_emit);

			// append the title to the element
			just_added.appendChild(title_text_node);

		}); // end socket.on()

	// socktIoConnection is a self invoking function so that it's ready to go from page load
	}(),

	render: function() {

		return (

			<div className="container">

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2 id="testing">Search</h2>
								<span id="just-added"></span>
							</div>
							<div className="panel-body">
								<form>
									<div className="form-group">
										<label>Topic</label>
										<input type="text" className="form-control" id="search_topic" onChange={this.changedData} />
									</div>
									<div className="form-group">
										<label>Start Year</label>
										<input type="text" className="form-control" id="start_year" onChange={this.changedData} />
									</div>
									<div className="form-group">
										<label>End Year</label>
										<input type="text" className="form-control" id="end_year" onChange={this.changedData} />
									</div>
									<a href="" className="btn btn-primary" onClick={this.queryData} >Seach</a>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2>Results</h2>
							</div>
							<div className="panel-body" onClick={this.clickHandler}>

								{/* loop through the articles returned and display to screen with a save button */}
								{this.state.nytdata.map(function(article, i) {

									return <p key={i}><a href="" className="btn btn-primary">Save</a> <a href={article.url}>{article.title}</a> <span>{article.date}</span></p>

								})}

							</div>
						</div>
					</div>
				</div>

			</div>

		) // end return()

	} // end render()

}); // end Search

module.exports = Search;
