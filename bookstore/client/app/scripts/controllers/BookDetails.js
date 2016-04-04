"use strict";

bookstoreApp.controller("BookDetailsCtrl", function($scope, $routeParams){

	$scope.book = getBook();

	function getBook() {

		// Get ISBN from current URL
		var currentIsbn = $routeParams.isbn;

		// Access scope from parent Ctrl
		for (var i = 0; i < $scope.books.length; i++) {
			if ($scope.books[i].isbn == currentIsbn) {
				return $scope.books[i];
			}
		}
	}
});
