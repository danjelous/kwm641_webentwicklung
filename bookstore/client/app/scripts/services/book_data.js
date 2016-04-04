bookstoreApp.factory("BookDataService", function(){

	var srv = {};

	srv._books =
	[
		{
				title   	: 'JavaScript für Enterprise-Entwickler 1',
				subtitle	: 'Professionell programmieren im Browser und auf dem Server',
				isbn    	: '978-3-89864-728-1',
				abstract	: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
				numPages	: 302,
				author  	: 'Oliver Ochs',
				publisher   : {
					name: 'dpunkt.verlag',
					url : 'http://dpunkt.de/'
				}
		},
		{
				title   	: 'JavaScript für Enterprise-Entwickler 2',
				subtitle	: 'Professionell programmieren im Browser und auf dem Server',
				isbn    	: '978-3-89864-728-2',
				abstract	: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
				numPages	: 302,
				author  	: 'Oliver Ochs',
				publisher   : {
					name: 'dpunkt.verlag',
					url : 'http://dpunkt.de/'
				}
		},
		{
				title   	: 'JavaScript für Enterprise-Entwickler 3',
				subtitle	: 'Professionell programmieren im Browser und auf dem Server',
				isbn    	: '978-3-89864-728-3',
				abstract	: 'JavaScript ist längst nicht mehr nur für klassische Webprogrammierer interessant.',
				numPages	: 302,
				author  	: 'Oliver Ochs',
				publisher   : {
					name: 'dpunkt.verlag',
					url : 'http://dpunkt.de/'
				}
		}
	];

	srv.getBooks = function(){

		// Return a copy of the local JSON
		return angular.copy(srv._books);
	}

	srv.getBookByIsbn = function(isbn) {

		for (var i = 0; i < srv._books.length; i++) {
			if (srv._books[i].isbn == isbn) {

				// Copy to ensure, that our current value doesn't get changed from other interactions
				return angular.copy(srv._books[i]);
			}
		}

		// Nothing found =/
		return null;
	}

	/**
	 * MODULE PATTERN - can be seen as a "class" in Java
	 * ONLY expose things we want, keep our other Stuff private (Prefix with _)
	 * So we can implement a private/public characteristic
	 */
	return {
		getBookByIsbn : function(isbn) {
			return srv.getBookByIsbn(isbn)
		},
		getBooks : function(){
			return srv.getBooks();
		}
	}

});
