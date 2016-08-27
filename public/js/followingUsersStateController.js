routerApp.controller('followingUsersStateController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.getFollowingUsers=function () {
        console.log("hello");
        $http({
            method:'get',
            url:'/getFollowingUsers',
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