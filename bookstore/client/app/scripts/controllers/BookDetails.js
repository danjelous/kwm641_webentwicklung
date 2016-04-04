"use strict";

// Insert BookDataService (Dependency Injection)
bookstoreApp.controller("BookDetailsCtrl", function($scope, $routeParams, BookDataService){

	// Get our books from the service to keep our controller free from data
	var currentIsbn = $routeParams.isbn;
	$scope.book = BookDataService.getBookByIsbn(currentIsbn).then(
		function($res){
			// Promise success
			$scope.book = $res.data.book[0];
		},
		function($error){
			// Promise failed
		}
	);

});
