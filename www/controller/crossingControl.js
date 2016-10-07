angular.module('Crossing')

.controller('crossingController', function($scope,$state,$stateParams,GlobalService,$http,$ionicPopup,$cordovaBarcodeScanner){

  $scope.txtNamePlace = $stateParams.name;

  $scope.btnBack = function(){
    console.log('Back press...');
    $state.go('place',{user_id:$stateParams.user_id})
  }


  $scope.scanBarcode = function(){
      $cordovaBarcodeScanner.scan().then(function(imageData){
        //alert(imageData.text);
        // $state.go('bloom',{user_id:$stateParams.user_id, variety_id:imageData.text,
        // nameplace:$stateParams.nameplace,id:$stateParams.id});
        $http(
        {
          url: GlobalService.hostname+'getbloomid.php',
          method:'POST',
          data:{
            'var_variety_id':imageData.text,
          }
        }
        ).then(function(response){
            // console.log(response);
            if(response.data.results== null){
              alert('ไม่พบข้อมูลในระบบ');
            }
            else {
              console.log(response);
              // $state.go('bloom',{user_id:$stateParams.user_id, variety_id:imageData.text,
              // name:$stateParams.name,place_id:$stateParams.place_id});
            }
        },function(error){
            // console.log(error);
        });

        //console.log("format"+imageData.format);
      }, function(error){
        console.log("an error happend"+error);
      });
  }
})
