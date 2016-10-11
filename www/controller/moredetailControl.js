angular.module('Crossing')

.controller('moredetailController', function($scope,$state,$stateParams,$http,$cordovaBarcodeScanner,$cordovaGeolocation,$ionicPopup,GlobalService){


  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
    }, function(err) {
      // error
    });



  $http({
    url:GlobalService.hostname+"getcrosschange.php",
    method:"POST",
    data:{"var_crossing_id":$stateParams.crossing_id}

  }).then(function(response){

    if(response.data.results=="null"){
      console.log("no data");
      $scope.myDataArray=[{data:"ยังไม่เคยเปลี่ยนพ่อพันธุ์",param:true}]
    }
    else {
      console.log(response.data.results);
      $scope.myDataArray=response.data.results

    }


  },function(error){
    console.log(error);
  })
  $scope.btnBack = function(){
  console.log('Back press...');
  $state.go('crossingDetail',{user_id:$stateParams.user_id})


}


  $scope.doRefresh = function() {
    $http({
      url:GlobalService.hostname+"getcrosschange.php",
      method:"POST",
      data:{"var_crossing_id":$stateParams.crossing_id}

    }).then(function(response){

      if(response.data.results=="null"){
        console.log("no data");
        $scope.myDataArray=[{data:"ยังไม่เคยเปลี่ยนพ่อพันธุ์",param:true}]
      }
      else {
        console.log(response.data.results);
        $scope.myDataArray=response.data.results

      }


    },function(error){
      console.log(error);
    })
    .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });

    };




$scope.scanBarcode = function(){
      $cordovaBarcodeScanner.scan().then(function(imageData){
        //alert(imageData.text);
        // $state.go('bloom',{user_id:$stateParams.user_id, variety_id:imageData.text,
        // nameplace:$stateParams.nameplace,id:$stateParams.id});


        //console.log("format"+imageData.format);
        var myPopup = $ionicPopup.show({
            template: '<div style="text-align:center"><p>ต้องการบันทึกข้อมูลใช่หรือไม่</p><div>',
            title: 'กรุณายืนยัน',

            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>บันทึก</b>',
                type: 'button-positive',
                onTap: function(e) {
                  $http({
                    url: GlobalService.hostname+"addcrossingchange.php",
                    method:"POST",
                    data:{"var_crossing_id":$stateParams.crossing_id,
                          "var_father_id":imageData.text,
                          "var_latitude":$scope.lat,
                          "var_longitude":$scope.long,
                          "var_user_id":$stateParams.user_id
                        }

                  }).then(function(response){


                  },function(error){
                    console.log(error);
                  })

                  $http({
                    url:GlobalService.hostname+"getcrosschange.php",
                    method:"POST",
                    data:{"var_crossing_id":$stateParams.crossing_id}

                  }).then(function(response){

                    if(response.data.results=="null"){
                      console.log("no data");
                      $scope.myDataArray=[{data:"ยังไม่เคยเปลี่ยนพ่อพันธุ์",param:true}]
                    }
                    else {
                      console.log(response.data.results);
                      $scope.myDataArray=response.data.results

                    }


                  },function(error){
                    console.log(error);
                  })


                }
              }
            ]
          });

          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });







      }, function(error){
        console.log("an error happend"+error);
      });
  }





})
