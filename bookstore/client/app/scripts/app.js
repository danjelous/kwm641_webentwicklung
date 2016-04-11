// Dependency Injection - Der Bookstore App zusätzlich das "ngRoute"-Modul injecten
//   ("bookstore", ["ngRoute"]);    -->   vgl. PHP: include
var bookstoreApp = angular.module("bookstore", ["ngRoute", "ngCookies"]);


// Eigener Filter
angular.module("bookstore").filter("alternatingCase", function(){
	return function(input) {
		var output = "",
			 temp = "";

			for (var i = 0; i < input.length; i++) {
				tmp = input.charAt(i);

				if(i % 2 === 0) {
					output += tmp.toUpperCase();
				}
				else {
					output += tmp.toLowerCase();
				}
			}

			return output;
	}
});


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
	.when("/admin/books", {
		templateUrl: "templates/book_list.html",
		controller: "AdminBookListCtrl"
	})
	.when("/admin/books/:isbn/delete", {
		templateUrl: "templates/admin/book_delete.html",
		controller: "AdminDeleteBookCtrl"
	})
	.when("/admin/books/:isbn/edit", {
		templateUrl: "templates/admin/book_form.html",
		controller: "AdminEditBookCtrl"
	})
	.when("/admin/books/new", {
		templateUrl: "templates/admin/book_form.html",
		controller: "AdminNewBookCtrl"
	})
	.when("/admin/publishers", {
		templateUrl: "templates/admin/publisher_list.html",
		controller: "PublisherListCtrl"
	})
	.when("/admin/publishers/new", {
		templateUrl: "templates/admin/publisher_form.html",
		controller: "AdminNewPublisherCtrl"
	})
	.when("/admin/publishers/:id/edit", {
		templateUrl: "templates/admin/publisher_form.html",
		controller: "AdminEditPublisherCtrl"
	})
	.otherwise({
		// Default, wenn keine Route matched
		redirectTo: "/books"
	});
});

// "init"-method - gets called EVERYTIME something gets loaded
// for example this runs evertime a browser refresh is executed
bookstoreApp.run(function($rootScope, $location, $cookieStore, $http){

	// Check the globals object for already existent cookies
	$rootScope.globals = $cookieStore.get("globals") || {};

	// Do i have a session already?
	if ($rootScope.globals.currentUser) {

		// Add our own object to the default HTTP-Header
		$http.defaults.headers.common["Authorization"] =
			$rootScope.globals.currentUser.authdata;
	}

	// If for example a user calls a restricted page (/admin/books eg.)
 	$rootScope.$on("$locationChangeStart", function(event, next, current){

		// If someone has called a restrictedPage
		var restrictedPage = $location.path().indexOf("/admin") != -1;

		// is the user logged in?
		var loggedIn = $rootScope.globals.currentUser;

		if(restrictedPage && !loggedIn) {
			// Bad guy isn't logged in but wants access to /admin
			$location.path("/books");
		}
	});

});

// Interceptor Service
bookstoreApp.factory("HttpErrorInterceptorService", ["$q", "$rootScope", "$location","FlashService",
   function($q, $rootScope, $location,FlashService) {
       var success = function(response) {
               // pass through
               return response;
           },
           error = function(response) {
               if(response.status === 401) {
                   FlashService.Error(response.data.message);
               }

               return $q.reject(response);
           };

       return function(httpPromise) {
           return httpPromise.then(success, error);
       };
   }
]).config(["$httpProvider",
   function($httpProvider) {
       $httpProvider.responseInterceptors.push("HttpErrorInterceptorService");
   }
]);
