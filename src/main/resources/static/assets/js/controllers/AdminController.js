myApp.controller('AdminController', function ($rootScope, $scope, $http) {

    $scope.showUsersList = true;
    $scope.showUsersListFunc = function (bool) {
        $scope.showUsersList = bool;
    };

    $scope.showUserSave = true;
    $scope.showUserSaveFunc = function (bool) {
        $scope.showUserSave = bool;
    };

    $scope.users = [];
    $scope.getAllUsers = function () {
        $http.get($rootScope.urlPrefix + 'users/all')
                .then(function (successResponse) {
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        //console.log(responseData.data);
                        $scope.users = responseData.data;
                    }
                }, function (errorResponse) {
                    console.log('ERROR !!!');
                    console.log(errorResponse);
                });
    };
    $scope.getAllUsers();

    $scope.roles = [];
    $scope.getAllRoles = function () {
        $http.get($rootScope.urlPrefix + 'roles/all')
                .then(function (successResponse) {
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        //console.log(responseData.data);
                        $scope.roles = responseData.data;
                    } else {
                        console.log('PB FROM BACK-ECND !!!');
                        console.log(successResponse);
                    }
                }, function (errorResponse) {
                    console.log('ERROR !!!');
                    console.log(errorResponse);
                });
    };
    $scope.getAllRoles();

    $scope.deleteUser = function (idUserToDelete, indexUserToDelete) {
        $http.delete($rootScope.urlPrefix + 'users?username=' + idUserToDelete)
                .then(function (successResponse) {
                    console.log('SUCCESS');
                    console.log(successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        // on retire l'utilisateur supprimé de la BD dans la liste des utilisateurs
                        $scope.ouvrages.splice(indexUserToDelete, 1);
                    } else {
                        console.log('PB FROM BACK-ECND !!!');
                        console.log(successResponse);
                    }
                }, function (errorResponse) {
                    console.log('ERROR' + errorResponse);
                });
    };

    $scope.userToSave = {};
    $scope.firstPassword = null;
    $scope.secondPassword = null;
    $scope.availabeTitles = ['M.', 'Mme', 'Dr', 'Pr'];
    $scope.genders = ['Homme', 'Femme'];
    $scope.selectedGender = $scope.genders[0];
    $scope.selectedRole = null;
    $scope.saveUser = function () {
        if ($scope.firstPassword === $scope.secondPassword) {
            $scope.userToSave.password = $scope.firstPassword;
            $scope.userToSave.gender = $scope.selectedGender === $scope.genders[0];
            // on peut démarrer l'enregistrement
            console.log($scope.userToSave);
            $http.post($rootScope.urlPrefix + 'users', $scope.userToSave)
                    .then(function (successResponse) {
                        console.log('SUCCESS' + successResponse);
                        var responseData = successResponse.data;
                        var statusGetFromApp = responseData.status;
                        if (statusGetFromApp === 0) {
                            var userSaved = responseData.data;
                            console.log('Utilisateur sauvegardé : ' + userSaved);
                            $scope.users.push(userSaved);

                            $scope.userToSave = {};
                            $scope.firstPassword = null;
                            $scope.secondPassword = null;
                            $scope.selectedGender = null;
                            $scope.selectedActivation = null;

                            $scope.showPanlSuccess = true;
                            $scope.successMessage = "Utilisateur enregistré !";
                        } else {
                            $scope.showPanlError = true;
                            $scope.errorMessage = "Problème survenu lors de l'enregistrement de l'utilisateur !";
                        }
                    }, function (errorResponse) {
                        console.log('ERROR' + errorResponse);
                        $scope.showPanlError = true;
                        $scope.errorMessage = "Problème survenu lors de l'enregistrement de l'utilisateur !";
                    });
        } else {
            $scope.showPanlError = true;
            $scope.errorMessage = "Les mots de pass doivent être identiques !";
        }
    };

    $scope.resetSaveForm = function () {
        $scope.userToSave = {};
        $scope.firstPassword = null;
        $scope.secondPassword = null;
        $scope.selectedGender = null;
        $scope.selectedActivation = null;
    };

    // gestion des alertes
    $scope.showPanlSuccess = false;
    $scope.successMessage = null;
    $scope.hidePanlSuccess = function () {
        $scope.showPanlSuccess = false;
        $scope.successMessage = null;
    };

    $scope.showPanlWarning = false;
    $scope.warningMessage = null;
    $scope.hidePanlWarning = function () {
        $scope.showPanlWarning = false;
        $scope.warningMessage = null;
    };

    $scope.showPanlError = false;
    $scope.errorMessage = null;
    $scope.hidePanlError = function () {
        $scope.showPanlError = false;
        $scope.errorMessage = null;
    };

    $scope.rolesToString = function (rolesFromAppArray) {
        var rolesResult = [];

        var nbRoles = rolesFromAppArray.length;
        for (var index = 0; index < nbRoles; ++index) {
            rolesResult.push(rolesFromAppArray[index].role);
        }

        return rolesResult.join(" ");
    };

});
