angular.module('Crossing')

.controller('loginController', function($scope,$state,$http,GlobalService){

  $scope.form = {};

  // console.log("login controller stat...");
  $scope.btnLogin = function(){
    $http(
      {
        url: GlobalService.hostname+'ws_login.php',
        method:'POST',
        data:{
          'var_username':$scope.form.txt_usr,
          'var_password':$scope.form.txt_pwd,
        }
      }
    ).then(function(response){
        console.log(response);
        if(response.data.results=='success_login'){
          $state.go('main',{user_id:response.data.user_id},{reload:true})
        }
        else {
          alert("Username / Password ไม่ถูกต้อง")
        }
    },function(error){
        console.log(error);
        alert("ไม่สามารถติดต่อ Server ได้")
    });
  }

})
