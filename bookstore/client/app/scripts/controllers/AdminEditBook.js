"use strict";

bookstoreApp.controller("AdminEditBookCtrl", function($scope, $location, $routeParams, BookDataService){

	$scope.submitBtnLabel = "Änderungen speichern";
	$scope.isEditMode = true;

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

	var goToAdminListView = function(){
		$location.path("/admin/books");
	}

	$scope.cancelAction = function() {
		goToAdminListView();
	}

	$scope.submitAction = function() {
		BookDataService.storeBook($scope.book).then(
			function($res){
				goToAdminListView();
			},
			function($error){
				console.log($error);
			}
		);
	}

});
