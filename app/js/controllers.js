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

			$http.get(
				URL.redmine_api.version
			)
			.success(function(d){
				var i, item, versions_raw = d.versions,
					versions = CONS.versions;

				for(i=0; i<versions_raw.length; i++){
					item = versions_raw[i];

					versions[item.id] = {
						name: item.name
					};
				}
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
    .controller('TasksCtrl', ['$scope', '$http', '$filter', '$routeParams', '$location',
        function ($scope, $http, $filter, $routeParams, $location){

			var i, item,
				assignees = {},
				assignees_raw = $routeParams.assignees;

			$scope.users = [
			];
		/*
			[
				{
					firstname: '前端组',
					lastname: '',
					id: Users.f2e.join('|')
				}
			];
				*/

			if(assignees_raw){
				assignees_raw = (assignees_raw + '').split('|');
				for(i=0; i<assignees_raw.length; i++){
					assignees[assignees_raw[i]] = true;
					// $scope.users[assignees_raw[i]]['checked'] = true;
				}
			}else{
				assignees[Current.id] = true;
				// $scope.users[Current.id]['checked'] = true;
				// $location.search('assignees', Current.id);
			}

			for(i in Users){
				item = getUser(i);

				/*
				item['id'] = i;
				item['checked'] = assignees[i*1];
				*/
				$scope.users.push({
					id: i,
					name: item.name,
					avatar: item.avatar,
					group: Users[i].group,
					checked: assignees[ i * 1 ]
				});
			};

			$scope.current = Current.id;

			$scope.toggleItem = function(user){
				if(user){
					user.checked = !user.checked;
				}

				var params = {},
					assignee = [],
					assignees = $filter('filter')($scope.users, { checked: true });

				console.log(assignees);
				if(assignees.length){
					for(i=0; i<assignees.length; i++){
						assignee.push(assignees[i].id);
					}
					params = {
						assigned_to_id: assignee.join('|')
					}
				}

				$http.get(
					URL.redmine_api.task.list,
					{
						params: params
					}
				)
				.success(function(data){
					$scope.tasks = data.issues;
				});
			}

			$scope.toggleItem();

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

			$scope.groups = [
				{
					label: '前',
					value: 'f2e'
				},
				{
					label: '后',
					value: 'b2e'
				},
				{
					label: '测',
					value: 'qc'
				},
				{
					label: '产',
					value: 'prod'
				},
				{
					label: '美',
					value: 'ui'
				},
				{
					label: '组',
					value: 'group'
				}
			];

        }
    ])
    .controller('TaskCtrl', ['$scope', '$routeParams', '$http', '$filter',
        function($scope, $routeParams, $http, $filter){

			$scope.task = {};

			var getTargetMove = function(detail){
				var name, move,
					from = detail.old_value,
					to = detail.new_value
					;

				switch(detail.property){
					case 'attr':
						switch(detail.name){
							case 'fixed_version_id':
								name = 'Target Version';
								from = CONS.versions[from].name;
								to = CONS.versions[to].name;
								break;
							case 'project_id':
								name = 'Project';
								/*
								from = CONS.versions[from].name;
								to = CONS.versions[to].name;
								*/
								break;
							case 'subject':
								name = 'Subject';
								break;
							case 'status_id':
								name = 'Status';
								from = CONS.task_statuses[from];
								to = CONS.task_statuses[to];
								break;
							case 'done_ratio':
								name = 'Done';
								break;
							case 'assigned_to_id':
								name = 'Assignee';
								from = getUser(from).name;
								to = getUser(to).name;
								break;
						}
						move = from + ' => ' + to;
						break;
					case 'attachment':
						name = 'Attachment';
						move = to + ' Added';
						break;
				}

				return {
					target: name,
					move: move
				};
			};

			$http.get(
				URL.redmine_api.task.item + $routeParams.id + '.json?include=attachments,journals'
			)
			.success(function(d){
				var i, item, journals_raw, notes, author, details, n, metas,
					comments = [],
					data = d.issue,
					journals_raw = data.journals,
					targetVersion = data.fixed_version;

				$scope.task = d.issue;

				$scope.avatar = getUser(data.assigned_to.id).avatar;

				for(i=0; i<journals_raw.length; i++){
					notes = [];

					item = journals_raw[i];
					author = getUser(item.user.id);
					details = item.details;

					for(n=0; n<details.length; n++){
						notes.push(getTargetMove(details[n]));
					}

					comments.push({
						author: {
							name: author.name,
							avatar: author.avatar
						},
						notes: notes,
						comment: item.notes,
						date: $filter('date')(item.created_on, 'MM-dd-yyyy')
					});
				}

				$scope.comments = comments;

				metas = [
					{
						label: 'Author',
						value: getUser(data.author.id).name
					},
					{
						label: 'Created',
						value: $filter('date')(data.created_on, 'MM-dd-yyyy')
					},

				];

				if(targetVersion){
					metas.push(
						{
							label: 'TV',
							value: targetVersion.name
						}
					);
				}

				$scope.metas = metas;
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
						name: getUser(uid).name,
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
