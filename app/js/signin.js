'use strict';

/* Controllers */
angular.module('RM', [
    'RM.controllers'
]);

angular.module('RM.controllers', [])
    .controller('SigninCtrl', ['$scope', '$http', '$location', '$window',
        function ($scope, $http, $location, $window){

			var Current = localStorage.getItem('Current');

			if(Current){
				$window.location.href = '/rose-mind/';
			}

			$scope.signin = function(user){
				var name_password = 'Basic ' + base64Encode(user.username + ':' + user.password);
				$http.defaults.headers.common['Authorization'] = name_password;

				$http.get(
					'/rose-mind/redmine-api/users/current.json',
					user
				)
				.error(function(){
				})
				.success(function(d){
					var data = d.user,
						redirect = localStorage.getItem('redirect');

					data['signin'] = name_password;
					localStorage.setItem('Current', JSON.stringify(data));
					if(redirect){
						localStorage.setItem('redirect', '');
						$window.location.href = redirect;
					}else{
						$window.location.reload();
					}
				});
			};

        }
    ])
	;
