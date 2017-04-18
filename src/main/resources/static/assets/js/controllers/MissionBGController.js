myApp.controller('MissionBGController', function ($rootScope, $scope, $http, $mdDialog, $window) {

    $scope.currentMissionsArray = [];
    $scope.allMissions = [];
    $scope.missionsByDomaine = [];

    $scope.indexMenu = 0;
    $scope.changeMenu = function (index) {
        $scope.indexMenu = index;
        $scope.domaineSelectionne = "";
        $scope.filterBy($scope.allMissions, $scope.missionsByDomaine, $scope.testEqualDomaine, $scope.domaineSelectionne);
    };

    // boolean d'affichage des colonnes
    $scope.columns = [];
    $scope.columns.push({
        "name": "domaine",
        "label": "Domaine",
        "show": true
    }, {
        "name": "organisationsSollicitatrices",
        "label": "Organisation(s) Sollicitatrice(s)",
        "show": true
    }, {
        "name": "annee",
        "label": "Année",
        "show": true
    }, {
        "name": "nature",
        "label": "Nature",
        "show": true
    }, {
        "name": "objet",
        "label": "Objet",
        "show": true
    }, {
        "name": "documents",
        "label": "Document(s)",
        "show": true
    }, {
        "name": "emplacement",
        "label": "Emplacement",
        "show": true
    });

    $scope.missionToSave = {};

    // gestion de la pagination
    $scope.currentPage = null;
    $scope.pageIndices = [];
    $scope.nbItemsArray = [10, 20, 30, 40, 50];
    $scope.nbOfItemsToDisplay = $scope.nbItemsArray[0];

    $scope.fillPageIndices = function () {
        $scope.pageIndices = [];
        for (var index = 0; index < $scope.nbPages; ++index) {
            $scope.pageIndices.push(index + 1);
        }
    };
    $scope.changeNbOfItemsToDisplay = function () {
        $scope.currentPage = 1;
        $scope.printMissionsByPage();
    };

    $scope.selectPageIndex = function (page) {
        $scope.currentPage = page;
        $scope.printMissionsByPage();
    };

    $scope.decPageIndex = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.printMissionsByPage();
        }
    };

    $scope.incPageIndex = function () {
        if ($scope.currentPage < $scope.nbPages) {
            $scope.currentPage++;
            $scope.printMissionsByPage();
        }
    };

    $scope.missionsByPage = [];
    $scope.printMissionsByPage = function () {
        //console.log("PAGE COURANTE : " + $scope.currentPage);
        // nombre de pages
        var nbFds = $scope.currentMissionsArray.length;
        //console.log("NOMBRE DE MISSIONS : " + nbFds);
        $scope.nbPages = Math.trunc(nbFds / $scope.nbOfItemsToDisplay);
        if (nbFds % $scope.nbOfItemsToDisplay !== 0) {
            $scope.nbPages++;
        }
        //console.log("NOMBRE DE PAGES : " + $scope.nbPages);
        angular.copy($scope.currentMissionsArray.slice(
                ($scope.currentPage - 1) * $scope.nbOfItemsToDisplay, $scope.currentPage * $scope.nbOfItemsToDisplay
                ), $scope.missionsByPage);
    };

    $scope.getAllMissions = function () {
        $http.get($rootScope.urlPrefix + 'missions/all')
                .then(function (successResponse) {
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        //console.log(responseData.data);
                        $scope.currentPage = 1;
                        angular.copy(responseData.data, $scope.allMissions);
                        angular.copy(responseData.data, $scope.currentMissionsArray);
                        $scope.printMissionsByPage();
                        $scope.getAllDomaines();
                    } else {
                        console.log("ERROR FROM APPLICATION !!!");
                        console.log(responseData);
                    }
                }, function (errorResponse) {
                    console.log('ERROR !!!');
                    console.log(errorResponse);
                });
    };
    $scope.getAllMissions();

    $scope.domaineSelectionne = null;

    $scope.getAllDomaines = function () {
        $scope.domainesExistants = [];
        var nbElements = $scope.allMissions.length;
        for (var index = 0; index < nbElements; ++index) {
            if ($scope.allMissions[index].domaine && $scope.allMissions[index].domaine.length !== 0
                    && $.inArray($scope.allMissions[index].domaine, $scope.domainesExistants) === -1) {
                $scope.domainesExistants.push($scope.allMissions[index].domaine);
            }
        }
    };

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

    $scope.organisationsSollicitatricesAreaContent = null;
    $scope.documentsAreaContent = null;

    $scope.saveMission = function () {
        console.log("Demande d'enregistrement");
        if ($scope.organisationsSollicitatricesAreaContent) {
            $scope.missionToSave.organisationsSollicitatrices = $scope.organisationsSollicitatricesAreaContent.split("\n").join("#");
        }
        if ($scope.documentsAreaContent) {
            $scope.missionToSave.documents = $scope.documentsAreaContent.split("\n").join("#");
        }

        $scope.missionToSave.domaine = $scope.missionToSave.domaine.trim();
        $scope.missionToSave.emplacement = $scope.missionToSave.emplacement.trim();
        $scope.missionToSave.objet = $scope.missionToSave.objet.trim();

        $scope.missionToSave.organisationsSollicitatrices = $scope.missionToSave.organisationsSollicitatrices ? $scope.missionToSave.organisationsSollicitatrices.trim() : "";
        $scope.missionToSave.documents = $scope.missionToSave.documents ? $scope.missionToSave.documents.trim() : "";
        $scope.missionToSave.nature = $scope.missionToSave.nature ? $scope.missionToSave.nature.trim() : "";

        $http.post($rootScope.urlPrefix + 'missions', $scope.missionToSave)
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        var missionSaved = responseData.data;
                        //console.log('mission sauvegardé : ' + missionSaved);
                        // si c'est une mise à jour ...
                        if (missionSelectionnee && indexMissionSelectionnee) {
                            console.log("REDIRECTION...");
                            $window.location.href = $rootScope.urlPrefix;
                        }
                        $scope.allMissions.push(missionSaved);
                        $scope.currentPage = 1;
                        $scope.printMissionsByPage();
                        $scope.filterBy($scope.allMissions, $scope.missionsByDomaine, $scope.testEqualDomaine, "");
                        $scope.getAllDomaines();

                        $scope.missionToSave = {};
                        $scope.organisationsSollicitatricesAreaContent = null;
                        missionSelectionnee = null;
                        indexMissionSelectionnee = null;

                        $scope.showPanlSuccess = true;
                        $scope.successMessage = "La mission a été enregistrée !";
                        $rootScope.goToTheTopOfPage();
                    } else {
                        console.log("ERROR FROM BACK END");
                        console.log(responseData);
                        $scope.showPanlError = true;
                        $scope.errorMessage = "Problème survenu lors de l'enregistrement. Veuillez contactez l'administrateur.";
                    }
                }, function (errorResponse) {
                    console.log('ERROR');
                    console.log(errorResponse);
                    $scope.showPanlError = true;
                    $scope.errorMessage = "Problème survenu lors de l'enregistrement. Veuillez contactez l'administrateur.";
                });
    };

    var missionSelectionnee = null;
    var indexMissionSelectionnee = null;

    $scope.updateMission = function (missionToUpdate, indexMissionToUpdate) {
        $scope.missionToSave = clone(missionToUpdate);
        missionSelectionnee = clone(missionToUpdate);
        indexMissionSelectionnee = indexMissionToUpdate;
        $scope.changeMenu(1);
    };

    $scope.deleteMission = function (indexFdToDelete, idFdToDelete) {
        console.log("DEMANDE DE SUPPRESSION");
        console.log("INDEX DANS currentFdsArray : " + indexFdToDelete);
        $http.delete($rootScope.urlPrefix + 'missions/' + idFdToDelete)
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        // on retire le fd supprimé de la BD dans la liste des fds
                        //$scope.filterBy(($scope.allFds, $scope.fdsByDomaine, $scope.testEqualDomaine, ""));
                        // on recharge la page
                        console.log("REDIRECTION...");
                        $window.location.href = $rootScope.urlPrefix;
                    } else {
                        console.log("ERROR FROM BACK END");
                        console.log(responseData);
                    }
                }, function (errorResponse) {
                    console.log('ERROR' + errorResponse);
                });
    };

    $scope.deleteAllMissions = function () {
        $http.delete($rootScope.urlPrefix + 'missions/all')
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        // on retire le fd supprimé de la BD dans la liste des fds
                        //$scope.filterBy(($scope.allFds, $scope.fdsByDomaine, $scope.testEqualDomaine, ""));
                        // on recharge la page
                        console.log("REDIRECTION...");
                        //$window.location.href = $rootScope.urlPrefix + "index.html#/fondsdocumentaires";
                        window.location.reload();
                    } else {
                        console.log("ERROR FROM BACK END");
                        console.log(responseData);
                    }
                }, function (errorResponse) {
                    console.log('ERROR' + errorResponse);
                });
    };

    var testEquality = function (first, second) {
        return first.includes(second);
    };

    $scope.testEqualDomaine = function (currentMission) {
        return testEquality(currentMission.domaine, $scope.domaineSelectionne);
    };

    $scope.filterBy = function (parentArray, childArray, filterFunction, filterElement) {
        // la variable à modifier ici est currentFdsArray
        // le parent des fds obtenus après filtrage par domaine est allFds
        // on copie d'abord le parent dans le fils
        angular.copy(parentArray, childArray);
        if (filterElement && filterElement.length !== 0) {
            angular.copy(parentArray.filter(filterFunction), childArray);
            angular.copy(childArray, $scope.currentMissionsArray);
            //console.log("NOMBRE D'FONDS PAR DOMAINE : " + childArray.length);
            $scope.currentPage = 1;
        } else {
            angular.copy(parentArray, $scope.currentMissionsArray);
        }
        //console.log(currentFdsArray.length);
        $scope.printMissionsByPage();
    };

    $scope.showConfirmDelete = function (event) {
        $rootScope.goToTheTopOfPage();
        var confirm = $mdDialog.confirm()
                .title('Êtes - vous sûr de vouloir supprimer toutes les missions ?')
                .textContent('')
                .ariaLabel('ariaLabel')
                .targetEvent(event)
                .ok('Oui')
                .cancel('Non');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'Toutes les missions ont été supprimées.';
            if ($scope.allMissions.length !== 0) {
                $scope.deleteAllMissions();
            }
        }, function () {
            $scope.status = 'Vous avez annulé la suppression.';
        });
    };

    $scope.searchText = null;
    var missionsSearch = [];
    $scope.searchManage = function () {
        $scope.domaineSelectionne = "";
        $scope.matiereSelectionnee = "";
        $scope.specialiteSelectionnee = "";
        $scope.filterBy($scope.allMissions, missionsSearch, testContains, $scope.searchText);
    };

    var testContains = function (currentMission) {
        return currentMission.domaine.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentMission.documents.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentMission.organisationsSollicitatrices.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentMission.annee.includes($scope.searchText)
                || currentMission.objet.includes($scope.searchText)
                || currentMission.nature.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentMission.emplacement.toLowerCase().includes($scope.searchText.toLowerCase());
    };

    function clone(obj) {
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }

        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }

        return copy;
    }

});
