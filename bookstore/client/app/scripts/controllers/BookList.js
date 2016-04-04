"use strict";

bookstoreApp.controller("BookListCtrl", function($scope){

	$scope.books =
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

});
