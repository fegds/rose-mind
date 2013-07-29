'use strict';

/* Controllers */
angular.module('RM.controllers', [])
    .controller('MainCtrl', ['$scope', '$location', '$http', '$window',
        function ($scope, $location, $http, $window){

			var i, item,
				// Current = JSON.parse(localStorage.getItem('Current') || '{}');
				Current = localStorage.getItem('Current');

			if(!Current){
				localStorage.setItem('redirect', $window.location.href);
				$window.location.href = 'sign-in.html';
			}
			Current = JSON.parse(Current);
			$window['Current'] = Current;
			$http.defaults.headers.common['Authorization'] = Current.signin;

			var route = Route,
				menus = [
					{
						text: '任务',
						id: 'tasks'
					},
					{
						text: '工时',
						id: 'times'
					}
				];

			for(i=0; i<menus.length; i++){
				item = menus[i];
				item['ctrl'] = Route[item.id].id;
				item['url'] = Route[item.id].url;
			}

            $scope.menus = menus;

			$scope.$on('$routeChangeSuccess', function(e, current, previous) { 
				var currentCtrl = current.$$route ? current.$$route.controller : Route.tasks.id,
					 prevCtrl = previous && previous.$$route ? previous.$$route.controller : '';
				if(prevCtrl){
					angular.element(document.getElementById('route_' + prevCtrl)).removeClass('active');
				}
				angular.element(document.getElementById('route_' + currentCtrl)).addClass('active');
			});

			$scope.signOut = function(){
				localStorage.setItem('Current', '');
				$window.location.href = 'sign-in.html';
				/*
				$location.path(Route.signin.url);
				$scope.menus = [];
				$location.path(Route.signin.url);
				*/
			}
        }
    ])
    .controller('TasksCtrl', ['$scope', '$http', '$filter',
        function ($scope, $http, $filter){

			var i, item;

			$scope.users = [
		/*
				{
					firstname: '前端组',
					lastname: '',
					id: Users.f2e.join('|')
				}
				*/
			];

			for(i in Users){
				item = Users[i];
				item['id'] = i;
				item['checked'] = i*1 === Current.id ? true : false;
				$scope.users.push(item);
			};

			$scope.current = Current.id;

			$scope.updateList = function(){
				var assignee = [],
					assignees = $filter('filter')($scope.users, { checked: true });

				for(i=0; i<assignees.length; i++){
					assignee.push(assignees[i].id);
				}

				$http.get(
					URL.redmine_api.task.list,
					{
						params: {
							assigned_to_id: assignee.join('|')
						}
					}
				)
				.success(function(data){
					$scope.tasks = data.issues;
				});
			}

			$scope.updateList();

			/*
			(function(){
			var i, TO,
				times = 50,
				count = 0,
				users = '{';

			for(i=0; i<times; i++){
				// console.log(i);
				(function(n){
					$http.get(
						URL.redmine_api.user.item + n + '.json'
					)
					.error(function(){
						console.log('  error  ' + n + '  --  ');

						count++;
					})
					.success(function(d){
							console.log('  success  ' + n + '  --  ');

							count++;
							var user = d.user;

							users += [
								'"' + n + '": {',
									'"firstname": "' + user.firstname + '",',
									'"lastname": "' + user.lastname + '",',
									'"created_on": "' + user.created_on + '",',
									'"mail": "' + user.mail + '"',
								'},'
							].join('');

					});
				})(i);
			}

			var check = function(){
				TO = setTimeout(function(){
					if(count === times){
						users = users.slice(0, -1) + '}';
						clearTimeout(TO);
						console.log(users);
					}else{
						check();
					}
				}, 800);
			}
			check();

			})();
			*/
        }
    ])
    .controller('TaskCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http){

			$scope.task = {};

			$http.get(
				URL.redmine_api.task.item + $routeParams.id + '.json?include=attachments,journals'
			)
			.success(function(d){
				// var data = d.user;

				$scope.task = d.issue;

				/*
				data['signin'] = name_password;
				localStorage.setItem('Current', JSON.stringify(data));
				$location.path(Route.tasks.url);
				*/
			});
        }
    ])
    .controller('TimesCtrl', ['$scope', '$routeParams', '$http', '$filter',
        function($scope, $routeParams, $http, $filter){

			var date = $filter('date')(new Date(), 'yyyy-MM-dd'),
				f2e = Users.f2e;

			$http.get(
				URL.redmine_api.times + '?user_id=' + f2e.join('|') + '&spent_on=' + date
			)
			.success(function(d){
				var i, item, user, uid, avatar,
					users = {},
					time_entries = d['time_entries'];


				for(i=0; i<f2e.length; i++){
					uid = f2e[i];

					user = Users[uid];

					avatar = user.avatar;
					if(avatar){
						avatar += '.jpg';
					}else{
						avatar = 'default.png';
					}

					users[uid] = {
						name: getUsername(uid),
						avatar: avatar,
						value: 0
					};
				}

				for(i=0; i<time_entries.length; i++){
					item = time_entries[i];
					uid = item.user.id;
					user = users[uid];

					user.value += item.hours;
				}

				$scope.users = users;
			});
        }
    ])
	;
