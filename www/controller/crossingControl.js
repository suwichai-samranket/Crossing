angular.module('Crossing')

.controller('crossingController', function($scope,$state,$stateParams,GlobalService,$http,$ionicPopup,$cordovaBarcodeScanner,$cordovaGeolocation){

  $scope.txtNamePlace = $stateParams.name;
  $scope.place_id = $stateParams.place_id;

  $scope.btnBack = function(){
    console.log('Back press...');
    $state.go('place',{user_id:$stateParams.user_id})
  }

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

  $scope.scanTent = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      $scope.tentno = imageData.text
    }, function(error) {
      console.log("an error happend" + error);
    });
  }

  $scope.scanFather = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      // $scope.tentno = imageData.text
      $http({
        url: GlobalService.hostname + 'getbloomid.php',
        method: 'POST',
        data: {
          'var_variety_id': imageData.text,
        }
      }).then(function(response) {
        // console.log(response.data.results);
          $scope.father = response.data.results[0]['variety_n']
          $scope.fatherid = response.data.results[0]['variety_id']
      }, function(error) {
         console.log(error);
      });
    }, function(error) {
      console.log("an error happend" + error);
    });
  }

  $scope.scanMother = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      // $scope.tentno = imageData.text
      $http({
        url: GlobalService.hostname + 'getbloomid.php',
        method: 'POST',
        data: {
          'var_variety_id': imageData.text,
        }
      }).then(function(response) {
        console.log(response);
        $scope.mother = response.data.results[0]['variety_n']
        $scope.motherid = response.data.results[0]['variety_id']
      }, function(error) {
         console.log(error);
      });
    }, function(error) {
      console.log("an error happend" + error);
    });
  }

  $scope.btnAddCrossing= function() {
    $scope.crossingfrm = {};
    $scope.data = {};
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      title: 'เลือกการบันทึกข้อมูล',
      scope: $scope,
      buttons: [
        { text: 'ยกเลิก' },
        {
          text: '<b>บันทึก</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data) {
              //don't allow the user to close unless he enters wifi password
              // console.log($scope.data);
              e.preventDefault();
            } else {
              // console.log($scope.crossingfrm);
              $http(
                {
                  url: GlobalService.hostname+'addcrossing.php',
                  method:'POST',
                  data:{
                      'var_father':$scope.fatherid,
                      'var_mother':$scope.motherid,
                      'var_tentno':$scope.tentno,
                      'var_place_id':$scope.place_id,
                      'var_latitude':$scope.latitude,
                      'var_longitude':$scope.longitude,
                      'var_user_id':$stateParams.user_id
                  },
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain'
                  }
                }
              ).then(function(response){
                  //console.log(response);
                  //$state.go('main',{user_id:$stateParams.user_id, variety_id:$stateParams.variety_id,
                  //name:$stateParams.name,place_id:$stateParams.place_id},{reload: true});
                  $ionicPopup.show({
                    title: 'บันทึกข้อมูลเรียบร้อยแล้ว',
                    scope: $scope,
                    buttons: [
                      {
                        text: '<b>กลับไปหน้าหลัก<b>',
                        type: 'button-positive',
                        onTap: function(e) {
                          $state.go('main',{user_id:$stateParams.user_id},{reload:true})
                        }
                      },
                      {
                        text: '<b>เก็บข้อมูลอีกครั้ง</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                          $state.go('crossing',{user_id:$stateParams.user_id,place_id:$stateParams.place_id,name:$stateParams.name
                          },{reload:true})
                          //Clear Data after insert
                          $scope.tentno = "";
                          $scope.father = "";
                          $scope.mother = "";
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

})
