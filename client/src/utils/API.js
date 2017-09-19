import axios from "axios";
conts axios = require('axios');
conts API = {
searchNYT: function(searchTopic, startYear, endYear) {
  conts nytAPI =  "ccd643a4a1be49fea941d4a756f36147";
  // build the query url for the new york times api
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=";
			queryURL += searchTopic;
			queryURL += "&begin_date=" + startYear + "0101";
			queryURL += "&end_date=" + endYear + "0101";
      // ajax call to the new york times articles search api using axios
    		return axios.get(queryURL)
    			.then(function(nytdata) {

    				// store the articles returned in a variable
    				var articles = nytdata.data.response.docs;

    				// map through the array and build an object for each article that holds the data we need to pass back to the Search component
    				var articles_obj_array = articles.map(function(article) {
    					var articlesObj = {
    						title: article.title,
    						date: article.date,
    						url: article.url
    					};
    					return articlesObj;
    				});

    				// return the object to have access to it on the .then callback in the Search component
    				return articles_obj_array;

    		}); // end axios.get()

    	}, // end searchNYT()

    	// post the article to the db
    	postArticle: function(article_to_post) {

    		// console.log(article_to_post);

    		// use axios to grab the post route defined in our server.js file so we can post this article to the db
    		return axios.post('/api',article_to_post)
    			.then(function(response) {

    				// return(results);

    		}); // end axios.post()

    	}, // end postArticle()

    	// get all the articles in the db
    	getArticles: function() {

    		// using axios to access the get route defined in server.js and will return all the articles in our db
    		return axios.get('/api')
    			.then(function(response) {

    				// return response so we have access to it in main.js, which will then set the state and send it to saved.js
    				return response;

    		}); // end axios.get()

    	}, // end getArticles()

    	// delete the article from the db
    	deleteArticle: function(article_id) {

    		// use axios to access the api/delete route. Needed to make this one different from the others as I couldn't get .delete to work so needed to use .post to remove from mongodb
    		return axios.post('/api/delete/', article_id)
    			.then(function(response) {

    				return response;

    			}); // end axios.post()

    	} // end deleteArticle()

    } //
}//end of API
module.exports =API;
