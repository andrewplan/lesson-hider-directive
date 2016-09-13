angular.module( 'directivePractice' )
    .directive( 'lessonHider', function() {
        return {
            templateUrl: './lessonHider.html'
            , restrict: 'E'
            , scope: {
                  lesson: '='
                  , dayAlert: '&'
              }
            , controller: function( $scope, lessonService ) {
                  $scope.getSchedule = lessonService.getSchedule();
              }
            , link: function( scope, element, attributes ) {
                  scope.getSchedule.then( function( result ) {
                      scope.schedule = result.data;

                      scope.schedule.forEach( function( scheduleDay ) {
                          if ( scheduleDay.lesson === scope.lesson ) {
                            scope.lessonDay = scheduleDay.weekday;
                            element.css( { 'text-decoration': 'line-through' } );
                            return;
                          }
                      } );
                  } );
              }

        }
    } );
