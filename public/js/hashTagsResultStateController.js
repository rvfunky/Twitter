routerApp.controller('hashTagsResultStateController',function($scope,$http,$state,$localStorage) {
    console.log($localStorage.hashTags);
    $scope.hashTags = $localStorage.hashTags;

});