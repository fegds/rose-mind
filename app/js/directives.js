'use strict';

/* Directives */
angular.module('RM.directives', [])

.directive({
	dropdownToggle: [
		"$document", "$location", "$window", function (h, e) {
			var d = null,
				a;
			return {
				restrict: "C",
				link: function (g, b) {
					g.$watch(function () {
						return e.path()
					}, function () {
						a && a()
					});
					b.parent().bind("click", function () {
						a && a()
					});
					b.bind("click", function (i) {
						i.preventDefault();
						i.stopPropagation();
						i = !1;
						d && (i = d === b, a());
						i || (b.parent().addClass("open"), d = b, a = function (c) {
							c && c.preventDefault();
							c && c.stopPropagation();
							h.unbind("click", a);
							b.parent().removeClass("open");
							d = a = null
						}, h.bind("click", a))
					})
				}
			}
		}
	],
	tabbable: function () {
		return {
			restrict: "C",
			compile: function (h) {
				var e = angular.element('<ul class="nav nav-tabs"></ul>'),
					d = angular.element('<div class="tab-content"></div>');
				d.append(h.contents());
				h.append(e).append(d)
			},
			controller: [
				"$scope", "$element", function (h, e) {
					var d = e.contents().eq(0),
						a = e.controller("ngModel") || {},
						g = [],
						b;
					a.$render = function () {
						var a = this.$viewValue;
						if (b ? b.value != a : a) if (b && (b.paneElement.removeClass("active"), b.tabElement.removeClass("active"), b = null),
						a) {
							for (var c = 0, d = g.length; c < d; c++) if (a == g[c].value) {
								b = g[c];
								break
							}
							b && (b.paneElement.addClass("active"), b.tabElement.addClass("active"))
						}
					};
					this.addPane = function (e, c) {
						function l() {
							f.label = c.label;
							f.value = c.value || c.label;
							if (!a.$setViewValue && (!a.$viewValue || f == b)) a.$viewValue = f.value;
							a.$render()
						}
						var k = angular.element("<li><a href></a></li>"),
							m = k.find("a"),
							f = {
								paneElement: e,
								paneAttrs: c,
								tabElement: k
							};
						g.push(f);
						c.$observe("value", l)();
						c.$observe("label", function () {
							l();
							m.text(f.label)
						})();
						d.append(k);
						k.bind("click", function (b) {
							b.preventDefault();
							b.stopPropagation();
							a.$setViewValue ? h.$apply(function () {
								a.$setViewValue(f.value);
								a.$render()
							}) : (a.$viewValue = f.value, a.$render())
						});
						return function () {
							f.tabElement.remove();
							for (var a = 0, b = g.length; a < b; a++) f == g[a] && g.splice(a, 1)
						}
					}
				}
			]
		}
	},
	tabPane: function () {
		return {
			require: "^tabbable",
			restrict: "C",
			link: function (h, e, d, a) {
				e.bind("$remove", a.addPane(e, d))
			}
		}
	}
})
/*
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  */
/*
	.directive('navMenu', function($location) {
	  return function(scope, element, attrs) {
		var links = element.find('a'),
			link,
			currentLink,
			urlMap = {},
			i;

		for (i = 0; i < links.length; i++) {
		  link = angular.element(links[i]);
		  urlMap[link.attr('href')] = link;
		}

		scope.$on('$routeChangeStart', function() {
			/*
		  var pathLink = urlMap[$location.path()];

		  if (pathLink) {
			if (currentLink) {
			  currentLink.removeClass('on');
			}
			currentLink = pathLink;
			currentLink.addClass('on');
		  }
		  *./
		});
	  };
	});
*/
;
