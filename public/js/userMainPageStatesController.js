var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {
                'header':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content': {
                    templateUrl: '/ejs/tweetFeed.ejs',
                    controller: 'tweetFeedController'
                }

            }
        })
        .state('app.searchUserResultState', {
            url: 'searchUser',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/searchUserResultState.ejs',
                    controller: 'searchUserResultStateController'
                }

            }
        })
        .state('app.followersUsersState', {
            url: 'followersUsers',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/followersUsersState.ejs',
                    controller: 'followersUsersStateController'
                }

            }
        })
        .state('app.followingUsersState', {
            url: 'followingUsers',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/followingUsersState.ejs',
                    controller: 'followingUsersStateController'
                }

            }
        })
        .state('app.hashTagsResultState', {
            url: 'hashTags',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/hashTagsResultState.ejs',
                    controller: 'hashTagsResultStateController'
                }

            }
        })
    
})
routerApp.controller('tweetFeedController',['$scope','$http','$state',function($scope,$http,$state){
   $scope.makeTweet=function(){
       $http({
           method:'post',
           url:'/insertTweet',
           data:{
               "tweetData":$scope.tweet
           }

       }).success(function(data){
           if(data.statusCode==200){
               alert("tweeted successfully!");
            }
           else{
               

           }
       }).error(function(error){

       })
   }
    $scope.getTweets=function () {
        $http({
            method:'get',
            url:'/getTweets'


        }).success(function(data){
            if(data.statusCode==200){
                $scope.data=data.result;
            }
            else{


            }
        }).error(function(error){

        })
    }
    $scope.getStats=function(){
        $http({
            method:'get',
            url:'/getStats'

        }).success(function(data){
            console.log(data);
            if(data.statusCode==200){
                $scope.tweetCount=data.tweetCount;
                $scope.followingCount=data.followingCount;
                $scope.followersCount=data.followersCount;

            }
            else{


            }
        }).error(function(error){

        })
    }
}])