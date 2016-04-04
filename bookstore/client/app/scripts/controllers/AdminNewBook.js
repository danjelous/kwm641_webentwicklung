"use strict";

bookstoreApp.controller("AdminNewBookCtrl", function($scope, $location, BookDataService){

	$scope.book = {};

	// load publisher list from REST
	BookDataService.getPublishers().then(
		function($res){
			$scope.publishers = $res.data.publishers;
		},
		function($error){
			console.log($error);
		}
	);

});
