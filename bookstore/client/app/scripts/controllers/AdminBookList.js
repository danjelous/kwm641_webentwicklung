"use strict";

// Insert BookDataService (Dependency Injection)
bookstoreApp.controller("AdminBookListCtrl", function($scope, $location, BookDataService){

	// Get our books from the service to keep our controller free from data
	$scope.books = BookDataService.getBooks().then(
		function($res){
			// Promise success
			$scope.books = $res.data.books;
		},
		function($error){
			// Promise failed
		});

		// Show me dat admin area!
		$scope.isAdmin = true;
});
