var myApp = angular.module('AngularBeer', ['ui.router']);

myApp.config(function($stateProvider) {
  var beersState = {
    name: 'beers',
    url: '/beers',
    controller:'beersController',
    templateUrl: './beers.html'
  }

  var addState = {
    name: 'add',
    url: '/add',
    controller:'addController',
    templateUrl: './add.html'
  }

  $stateProvider.state(beersState);
  $stateProvider.state(addState);
});

myApp.factory('beersFactory', function($http){
  var baseUrl = 'http://app-0e8bc783-1a09-485f-b91f-ab7cb10a3985.cleverapps.io/json/Beers';
  return {
    getBeers : function(){
      return $http.get(baseUrl);
    },
    addBeer : function(name, alcohol){
      return $http(
        {
          method:'POST',
          url: baseUrl,
          data: 'name=' +name+'&alcohol='+alcohol,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      );
    }
  };
});

myApp.controller('beersController', function($scope, beersFactory){
  $scope.beers = [];
  $scope.error = null;

  beersFactory.getBeers()
    .then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      if(response.status == 200){
        $scope.beers = response.data;
      } else {
        $scope.error = 'Error happened ' + response.status;
      }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $scope.error = 'Error happened ' + response.status;
  });
});
myApp.controller('addController', function($scope, beersFactory){
  $scope.submit = function(){
    beersFactory.addBeer($scope.name, $scope.alcohol)
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        if(response.status == 201){
          $scope.msg = 'Bière ajoutée.';
          $scope.name = '';
          $scope.alcohol = '';
        } else {
          $scope.error = 'Error happened ' + response.status;
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.error = 'Error happened ' + response.status;
    });
  }

});
