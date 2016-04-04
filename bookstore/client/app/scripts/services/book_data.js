bookstoreApp.factory("BookDataService", function($http, $rootScope, CONFIG){

	var srv = {};

	// URL to our REST-Service
	srv._baseURL = CONFIG.serverURL;

	srv.storeBook = function(book){
		$http.post(srv._baseURL + "/api/books", book);
	}

	srv.getBooks = function(){

		// Get the json-Result from our REST-Service
		return $http.get(srv._baseURL + "/api/books.json");
	}

	srv.getBookByIsbn = function(isbn) {

		// Call REST Service
		return $http.get(srv._baseURL + "/api/books/isbn/" + isbn + ".json");
	}

	/**
	 * MODULE PATTERN - can be seen as a "class" in Java
	 * ONLY expose things we want, keep our other Stuff private (Prefix with _)
	 * So we can implement a private/public characteristic
	 */
	return {
		getBookByIsbn : function(isbn) {
			return srv.getBookByIsbn(isbn)
		},
		getBooks : function(){
			return srv.getBooks();
		},
		storeBook : function(book){
			return srv.storeBook(book);
		}
	}

});
