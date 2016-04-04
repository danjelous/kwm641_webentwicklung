"use strict";

// Insert BookDataService (Dependency Injection)
bookstoreApp.controller("BookListCtrl", function($scope, BookDataService){

	// Get our books from the service to keep our controller free from data
	$scope.books = BookDataService.getBooks();
});
