angular.module('Blooming')

.controller('bloomController', function($scope,$state,$stateParams,$http,GlobalService,$cordovaGeolocation,$ionicPopup){

  $scope.txtVariety_id = $stateParams.variety_id;
  $scope.txtNamePlace = $stateParams.name;
  $scope.txtId = $stateParams.place_id;

  //Get GeoLocation
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
   $cordovaGeolocation
     .getCurrentPosition(posOptions)
     .then(function (position) {
       $scope.latitude = position.coords.latitude;
       $scope.longitude = position.coords.longitude;
     }, function(err) {
       // error
  });

  //Get State
  $http(
    {
      url: GlobalService.hostname+'getmaxstate.php',
      method:'POST',
      data:{
        'var_place_id': $stateParams.place_id,
        'var_variety_id': $scope.txtVariety_id
      }
    }
  ).then(function(response){
    console.log(response.data.results);
    $scope.myMaxStateArray = response.data.results
  },function(error){
    console.log(error);
  })


  //Get Variety
  $http(
    {
      url:GlobalService.hostname+'getgermplasm.php',
      method:'POST',
      data:{
        'var_variety_id': $scope.txtVariety_id,
      }
    }
  ).then(function(response){
    console.log(response.data.results);
    $scope.myDataArray = response.data.results
  },function(error){
    console.log(error);
  })

  // Triggered on a button click, or some other target
$scope.btnAddLeafFlag = function($v) {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<ion-radio ng-model="data.choice" ng-value="1">ไม่มีบันทึกข้อมูล</ion-radio><ion-radio ng-model="data.choice" ng-value="2">บันทึกข้อมูล</ion-radio>',
    title: 'เลือกการบันทึกข้อมูล',
    scope: $scope,
    buttons: [
      { text: 'ยกเลิก' },
      {
        text: '<b>บันทึก</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.choice) {
            //don't allow the user to close unless he enters wifi password

            e.preventDefault();
          } else {
            $http(
              {
                url: GlobalService.hostname+'ws_addleafflag.php',
                method:'POST',
                data:{
                  'var_user_id':$stateParams.user_id,
                  'var_variety_id': $scope.txtVariety_id,
                  'var_state_id':$v,
                  'var_place_id':$stateParams.place_id,
                  'var_latitude':$scope.latitude,
                  'var_longitude':$scope.longitude,
                  'val_choice':$scope.data.choice,
                },
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'text/plain'
                }
              }
            ).then(function(response){
                //console.log(response);
                // $state.go('bloom',{user_id:$stateParams.user_id, variety_id:$stateParams.variety_id,
                // name:$stateParams.name,place_id:$stateParams.place_id},{reload: true});
                $ionicPopup.show({
                  title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                  scope: $scope,
                  buttons: [
                    {
                      text: '<b>กลับไปหน้าหลัก<b>',
                      type: 'button-positive',
                      onTap: function(e) {
                        $state.go('flowinglist',{user_id:$stateParams.user_id},{reload:true})
                      }
                    },
                    {
                      text: '<b>เก็บข้อมูลอีกครั้ง</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                        $state.go('detail',{user_id:$stateParams.user_id,place_id:$stateParams.place_id,name:$stateParams.name
                        },{reload:true})
                      }
                    }
                  ]
                });
            });
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

 };

  //button Back
  $scope.btnBack = function(){
    console.log('Back press...');
    //$state.go('detail')
    $state.go('detail',{user_id:$stateParams.user_id, name:$stateParams.name, place_id:$stateParams.place_id});
  }

})
