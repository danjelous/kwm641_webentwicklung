"use strict";

bookstoreApp.controller("AdminNewBookCtrl", function($scope, $location, BookDataService){

	$scope.book = {};
	$scope.isEditMode = false;
	$scope.submitBtnLabel = "Neues Buch anlegen";

	// load publisher list from REST
	BookDataService.getPublishers().then(
		function($res){
			$scope.publishers = $res.data.publishers;
		},
		function($error){
			console.log($error);
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
