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
                            element.find( 'span' ).addClass( 'linethrough' );
                            scope.isChecked = true;
                            return;
                          }
                      } );
                  } );

                  scope.toggleLineThrough = function() {
                    element.find( 'span' ).toggleClass( 'linethrough' );
                  };

                  var removeLessonButton = angular.element( element[0].querySelector( '.remove-lesson' ) );
                  removeLessonButton.on( 'click', function( event ) {
                      event.preventDefault();

                      for ( var i = scope.schedule.length - 1; i >= 0; i--) {
                          if ( element.find( 'span' ).text() === scope.schedule[ i ].lesson ) {
                            scope.schedule.splice( i, 1 );
                            console.log( scope.schedule );
                          }
                      }

                      element.remove();

                  } );

              }

        }
    } );
