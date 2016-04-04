"use strict";

// Insert BookDataService (Dependency Injection)
bookstoreApp.controller("BookDetailsCtrl", function($scope, $routeParams, BookDataService){

	// Get our books from the service to keep our controller free from data
	var currentIsbn = $routeParams.isbn;
	$scope.book = BookDataService.getBookByIsbn(currentIsbn);
});
