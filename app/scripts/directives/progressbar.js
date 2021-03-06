'use strict';

/**
 * @ngdoc directive
 * @name frontEndTestApp.directive:progressBar
 * @description
 * # progressBar
 */
angular.module('frontEndTestApp')
  .directive('progressBar', function ($interval, $timeout) {
      return {
          templateUrl: 'views/directives/progressBar.html',
          restrict: 'E',
          scope: {
              start: '=',
              finish: '=',
              duration: '='
          },
          link: function postLink(scope, element) {

              var stop, cancel;

              scope.progress = scope.start;

              scope.complete = false;

              scope.intervals = scope.duration / scope.finish;

             scope.completeProgressBar = function completeProgressBar() {

                  scope.progress = scope.finish;
                  $interval.cancel(stop);
                  scope.complete = true;
               
              }

              scope.updatePorgressBar = function updateProgressBar() {

                  if (scope.progress !== scope.finish) {
                      scope.progress = scope.progress + 1;
                  } 

              }

              stop = $interval(scope.updatePorgressBar, scope.intervals);

              cancel = $timeout(scope.completeProgressBar, scope.duration);

              element.on('$destroy', function () {
                  $interval.cancel(stop);
                  $timeout.cancel(cancel);
              });

          }
      };
  });
