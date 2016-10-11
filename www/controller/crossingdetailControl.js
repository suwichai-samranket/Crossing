angular.module('Crossing')

.controller('crsdetailController', function($scope,$state,$stateParams,$http,$ionicLoading,GlobalService){

  $scope.btnHome = function(){
    // console.log('Back press...');
    $state.go('main',{user_id:$stateParams.user_id})
  }

  // $ionicLoading.show()
  $http.get( GlobalService.hostname+'getcrossingdetail.php').then(function(response){
    // $ionicLoading.hide()

    $scope.myDataArray = response.data.results
    // $scope.hide = function(){
    //   $ionicLoading.hide().then(function(){
    //      console.log("The loading indicator is now hidden");
    //   });
    // };

  },function(error){
    console.log(error);
  })

  $scope.moreDetail=function(data){
    $state.go('moreDetail',{user_id:$stateParams.user_id,crossing_id:data.crossing_id})
  }


  $scope.doRefresh = function() {
    $http.get( GlobalService.hostname+'getcrossingdetail.php').then(function(response){


      $scope.myDataArray = response.data.results
      // $scope.hide = function(){
      //   $ionicLoading.hide().then(function(){
      //      console.log("The loading indicator is now hidden");
      //   });
      // };

    },function(error){
      console.log(error);
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };




})
