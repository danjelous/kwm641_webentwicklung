// Dependency Injection - Der Bookstore App zusätzlich das "ngRoute"-Modul injecten
//   ("bookstore", ["ngRoute"]);    -->   vgl. PHP: include
var bookstoreApp = angular.module("bookstore", ["ngRoute"]);

// Für ältere Browser mit #, damit von allen Browsern die Route als "Anchor" interpretiert wird
// und keine neue Seite geladen wird.
// Für folgendes URL-Pattern mit ngRoute-Modul dann das Template mit foldendem Controller zuladen
// app/index.html#/books/12
bookstoreApp.config(function($routeProvider){
	$routeProvider.when("/books/:isbn", {
		templateUrl: "templates/book_details.html",
		controller: "BookDetailsCtrl"
	})
	.when("/books", {
		templateUrl: "templates/book_list.html",
		controller: "BookListCtrl"
	})
	.otherwise({
		// Default, wenn keine Route matched
		redirectTo: "/books"
	});
});
