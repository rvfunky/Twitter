routerApp.controller('followersUsersStateController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.getFollowersUsers=function () {
        $http({
            method:'get',
            url:'/getFollowersUsers',
            data:{
                
            }

        }).success(function(data){
            if(data.statusCode==200){
                $scope.data=data.result;
            }
            else{


            }
        }).error(function(error){

        })
    }
}]);