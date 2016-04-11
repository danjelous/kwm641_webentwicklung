bookstoreApp.factory("BookDataService", function($http, $rootScope, CONFIG){

	var srv = {};

	// URL to our REST-Service
	srv._baseURL = CONFIG.serverURL;

	srv.storeBook = function(book){
		return $http.post(srv._baseURL + "/api/books", book);
	}

	srv.getBooks = function(){

		// Get the json-Result from our REST-Service
		return $http.get(srv._baseURL + "api/books.json");
	}

	srv.updateBook = function(book) {
		return $http.put(srv._baseURL + "api/books/isbn/" + book.isbn + ".json", book)
	}

	srv.getBookByIsbn = function(isbn) {

		// Call REST Service
		return $http.get(srv._baseURL + "api/books/isbn/" + isbn + ".json");
	}

	srv.deleteBookByIsbn = function(isbn) {
		return $http.delete(srv._baseURL + "api/books/isbn/" + isbn + ".json");
	}

	srv.getPublishers = function() {
		return $http.get(srv._baseURL + "api/publishers.json")
	}

	srv.getPublisherById = function(id) {
		return $http.get(srv._baseURL + "api/publishers/" + id + ".json")
	}

	srv.storePublisher = function(publisher){
		return $http.post(srv._baseURL + "/api/publishers", publisher);
	}

	srv.updatePublisher = function(publisher) {
		return $http.put(srv._baseURL + "api/publishers/" + publisher.id + ".json", publisher)
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
		getBooks : function() {
			return srv.getBooks();
		},
		storeBook : function(book) {
			return srv.storeBook(book);
		},
		updateBook : function(book) {
			return srv.updateBook(book);
		},
		deleteBookByIsbn : function(isbn) {
			return srv.deleteBookByIsbn(isbn);
		},
		getPublishers : function() {
			return srv.getPublishers();
		},
		getPublisherById: function(id){
			return srv.getPublisherById(id);
		},
		storePublisher : function(publisher) {
			return srv.storePublisher(publisher);
		},
		updatePublisher : function(publisher) {
			return srv.updatePublisher(publisher);
		}
	}

});
