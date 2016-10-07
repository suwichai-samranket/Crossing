angular.module('Crossing')

.controller('mainController', function($scope,$state,$stateParams,$http,GlobalService){

  $scope.btnBloom = function(){
    console.log('Back press...');
    $state.go('bloomlist',{user_id:$stateParams.user_id})
  }

})
