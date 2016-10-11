angular.module('Crossing')

.controller('mainController', function($scope,$state,$stateParams,$http,GlobalService){

  $scope.btnBloom = function(){
    console.log('Back press...');
    $state.go('bloomlist',{user_id:$stateParams.user_id})
  }

  $scope.btnCrossing = function(){
    console.log('Back press...');
    $state.go('crossingDetail',{user_id:$stateParams.user_id})
  }

})
