'use strict';

// Declare app level module which depends on filters, and services
// angular.module('FEBG', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
angular.module('RM', [
    'RM.controllers', 'RM.directives', 'ngSanitize'
]).
config([
    '$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

		var i, item, route;

		for(i in Route){
			item = Route[i];
			route = {
				templateUrl: 'partials/' + item.template,
				controller: item.id
			};

			/*
			if(item.id === 'TaskCtrl'){
				route[ 'reloadOnSearch' ] = false;
			}
			*/
			$routeProvider.when(item.url, route);
		}
        $routeProvider.otherwise({
            redirectTo: Route.tasks.url
        });

		/*
		$httpProvider.responseInterceptors.push([ '$q', '$location', function($q, $location){
			return function(promise){
				return promise.then(
					function(response) {
						// do something on success
						return response;
					},
					function(response) {
						var status = response.status;

						console.log(status)
						if(status === 401){
							// location = '';
							$location.path(Route.signin.url);
							// return;
						}
						// do something on error
						/*
						if (canRecover(response)) {
							return responseOrNewPromise
						}
						*./
						return $q.reject(response);
					}
				);
			}
		}]);
		*/
    }
]);
