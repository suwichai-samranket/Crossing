angular.module('Crossing')

.controller('placeController', function($scope,$state,$http,$stateParams,GlobalService){

  $http.get(GlobalService.hostname+'getplace.php').then(function(response){
    // console.log(response.data.results);
    $scope.myDataArray = response.data.results
  },function(error){
    console.log(error);
  })

  $scope.btnCrossing = function (data){
     console.log(data);
    // console.log('List controller start');
    $state.go('crossing',{user_id:$stateParams.user_id,place_id:data.place_id,name:data.name
    })
  }

  $scope.btnBack = function(){
    // console.log('Back press...');
    $state.go('bloomlist',{user_id:$stateParams.user_id},{reload: true})
  }

})
