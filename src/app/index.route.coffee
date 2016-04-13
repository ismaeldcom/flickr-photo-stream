angular.module 'flickrPhotoStream'
  .config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
      .state 'main',
        url: '/'
        templateUrl: 'app/pages/main.html'
        controller: 'MainController'
        controllerAs: 'main'

    $urlRouterProvider.otherwise '/'
