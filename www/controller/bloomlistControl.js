angular.module('Crossing')

.controller('bloomlistController', function($scope,$state,$http,$stateParams,GlobalService,$ionicSlideBoxDelegate){

  $scope.btnHome = function(){
    // console.log('Back press...');
    $state.go('main',{user_id:$stateParams.user_id})
  }

  $scope.btnPlace = function(){
    // console.log('Back press...');
    $state.go('place',{user_id:$stateParams.user_id})
  }

  $http.get(GlobalService.hostname+'getbloom.php')
  .then(function(response){
    console.log(response.data.results);
    $scope.myDataArray = response.data.results
    $ionicSlideBoxDelegate.update();
  },function(error){
    console.log(error);
  })

  $scope.doRefresh = function() {
      $http.get(GlobalService.hostname+'getflowing.php')
       .then(function(response) {
         $scope.FlowingDataArray = response.data.results;
       })
       .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });
    };


  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;

  };
  $scope.btnInsert = function (){
    $state.go('list',{user_id:$stateParams.user_id
    })
  }
  $scope.nextSlide = function() {
   $ionicSlideBoxDelegate.next();
 }

})
