"use strict";

bookstoreApp.controller("AdminDeleteBookCtrl", function($scope, $routeParams, $location, BookDataService){

	var currentIsbn = $routeParams.isbn;
	BookDataService.getBookByIsbn(currentIsbn).then(
		function($res){
			// Promise success
			$scope.book = $res.data.book[0];
		},
		function($error){
			// Promise failed
		}
	);

	var goToAdminListView = function(){
		$location.path("/admin/books");
	}

	$scope.cancel = function() {
		goToAdminListView();
	}

	$scope.deleteBook = function(isbn) {
		BookDataService.deleteBookByIsbn(isbn).then(
			function(){
				// Ok
				goToAdminListView();
			},
			function($error){
				console.log("Error occured! :(<br>" + $error);
			}
		);
	}

});
