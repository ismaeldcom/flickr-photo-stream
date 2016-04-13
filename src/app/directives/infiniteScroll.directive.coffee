angular.module 'flickrPhotoStream'
  .directive 'infiniteScroll', ($window, $timeout) ->
    scope:
      callback: '&infiniteScroll'
      distance: '=infiniteScrollDistance'
      disabled: '=infiniteScrollDisabled'
    link: (scope, elem, attrs) ->
      raw = elem[0]
      angular.element($window).bind 'scroll', ->
        distance = elem[0].offsetHeight + elem[0].offsetTop - $window.innerHeight - $window.pageYOffset
        if not scope.disabled and distance <= $window.innerHeight
          $timeout scope.callback
