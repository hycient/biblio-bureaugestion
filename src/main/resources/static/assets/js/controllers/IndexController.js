myApp.controller('IndexController', function ($rootScope, $scope, $http, $location, $window) {

    $rootScope.urlPrefix = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/bureaugestion-biblio/";
    $rootScope.goToTheTopOfPage = function () {
        $('html, body').animate({scrollTop: 0}, 'fast');
    };

    var menuElements = $scope.menuElements = ["Ouvrages", "Fonds Documentaires", "Missions"];
    $scope.selectedMenu = null;
    $scope.selectMenu = function (index) {
        $scope.selectedMenu = $scope.menuElements[index];
    };

    $scope.connectedUser = {};
    $scope.connectedUserRoles = [];
    $scope.isUser = false;
    $scope.isAdmin = false;
    // récupération des informations sur l'utilisateur connecté
    $scope.getConnectedUser = function () {
        $http.get($rootScope.urlPrefix + 'loged-user')
                .then(function (successResponse) {
                    //console.log('SUCCESS :');
                    //console.log(successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        $scope.connectedUser = responseData.data;
                        //console.log(responseData.data.roles);
                        var roles = responseData.data.roles;
                        var nbRoles = roles.length;
                        for (var index = 0; index < nbRoles; ++index) {
                            //console.log(roles[index].role);
                            //console.log(roles[index].role === "ADMIN");
                            if (roles[index].role === "ADMIN") {
                                $scope.isAdmin = true;
                            }
                            if (roles[index].role === "USER") {
                                $scope.isUser = true;
                            }
                        }
                        //console.log('USERS INFOS :');
                        //console.log($scope.connectedUser);
                    }
                }, function (errorResponse) {
                    console.log('ERROR' + errorResponse);
                });
    };
    $scope.getConnectedUser();

    $scope.logout = function () {
        $window.location.href = $rootScope.urlPrefix + "logout";
    };

});
