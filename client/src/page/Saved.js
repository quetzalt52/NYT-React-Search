conts React = require('react');
conts API = require('../utils/API');

conts Saved = React.createClass({
  getInitialState: function() {

		return {
			article_delete: ''
		}

	}, // end getInitialState()

	clickHandler: function(event) {

		event.preventDefault();

		// set the id of the article to delete to the article_id variable
		conts article_id = event.target.parentElement.children[0].id;

		// set the state of the article_id we're deleting
		this.setState({
			article_delete: {
			article_id: article_id
			}
    }, function() {

    // call the deleteArticle function and pass the article
    API.deleteArticle(this.state.article_delete);
    this.props.setDeleteArticles(this.state.article_delete);

		});	// end setState()

	}, // end clickHandler()

	render: function() {

		return (

			<div className="container">

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2>Saved Articles</h2>
							</div>
							<div className="panel-body" onClick={this.clickHandler}>
						{/* using map to loop through the array being returned from the db with the articles it holds */}
								{this.props.articles.map(function(search, i) {
									return <p key={i}><a href="" className="btn btn-danger" id={search._id} >Delete</a> <a href={search.article_url}>{search.article_title}</a> <span>{search.article_date}</span></p>
								})}
							</div>
						</div>
					</div>
				</div>

			</div>

		)
	}

});

module.exports = Saved;
