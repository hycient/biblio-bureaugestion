myApp.controller('FondDocumentaireController', function ($rootScope, $scope, $http, $mdDialog, $window) {

    $scope.currentFdsArray = [];
    $scope.allFds = [];
    $scope.fdsByDomaine = [];
    $scope.fdsByMatiere = [];
    $scope.fdsBySpecialite = [];

    $scope.indexMenu = 0;
    $scope.changeMenu = function (index) {
        $scope.indexMenu = index;
        $scope.domaineSelectionne = "";
        $scope.filterBy($scope.allFds, $scope.fdsByDomaine, $scope.testEqualDomaine, $scope.domaineSelectionne);
    };

    // boolean d'affichage des colonnes
    $scope.columns = [];
    $scope.columns.push({
        "name": "domaine",
        "label": "Domaine",
        "show": true
    }, {
        "name": "matiere",
        "label": "Matière",
        "show": true
    }, {
        "name": "specialite",
        "label": "Spécialité",
        "show": true
    }, {
        "name": "titre",
        "label": "Titre",
        "show": true
    }, {
        "name": "nature",
        "label": "Nature",
        "show": true
    }, {
        "name": "etatsOrganisationsAuteurs",
        "label": "État(s) / Organisation(s) / Auteur(s)",
        "show": false
    }, {
        "name": "annee",
        "label": "Année",
        "show": true
    }, {
        "name": "emplacement",
        "label": "Emplacement",
        "show": true
    });

    $scope.fdToSave = {};

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
        $scope.printFdsByPage();
    };

    $scope.selectPageIndex = function (page) {
        $scope.currentPage = page;
        $scope.printFdsByPage();
    };

    $scope.decPageIndex = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.printFdsByPage();
        }
    };

    $scope.incPageIndex = function () {
        if ($scope.currentPage < $scope.nbPages) {
            $scope.currentPage++;
            $scope.printFdsByPage();
        }
    };

    $scope.fdsByPage = [];
    $scope.printFdsByPage = function () {
        //console.log("PAGE COURANTE : " + $scope.currentPage);
        // nombre de pages
        var nbFds = $scope.currentFdsArray.length;
        //console.log("NOMBRE DE FONDS : " + nbFds);
        $scope.nbPages = Math.trunc(nbFds / $scope.nbOfItemsToDisplay);
        if (nbFds % $scope.nbOfItemsToDisplay !== 0) {
            $scope.nbPages++;
        }
        //console.log("NOMBRE DE PAGES : " + $scope.nbPages);
        angular.copy($scope.currentFdsArray.slice(
                ($scope.currentPage - 1) * $scope.nbOfItemsToDisplay, $scope.currentPage * $scope.nbOfItemsToDisplay
                ), $scope.fdsByPage);
    };

    $scope.getAllFds = function () {
        $http.get($rootScope.urlPrefix + 'fds/all')
                .then(function (successResponse) {
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        //console.log(responseData.data);
                        $scope.currentPage = 1;
                        angular.copy(responseData.data, $scope.allFds);
                        angular.copy(responseData.data, $scope.currentFdsArray);
                        $scope.printFdsByPage();
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
    $scope.getAllFds();

    $scope.domaineSelectionne = null;
    $scope.matiereSelectionnee = null;
    $scope.specialiteSelectionnee = null;

    $scope.getAllDomaines = function () {
        $scope.domainesExistants = [];
        var nbElements = $scope.allFds.length;
        for (var index = 0; index < nbElements; ++index) {
            if ($scope.allFds[index].domaine && $scope.allFds[index].domaine.length !== 0
                    && $.inArray($scope.allFds[index].domaine, $scope.domainesExistants) === -1) {
                $scope.domainesExistants.push($scope.allFds[index].domaine);
            }
        }
    };

    $scope.matieresExistantes = [];
    $scope.getMatieres = function (domaine) {
        if (domaine && domaine.length !== 0) {
            $scope.matieresExistantes = [];
            var nbElements = $scope.fdsByDomaine.length;
            for (var index = 0; index < nbElements; ++index) {
                if ($scope.fdsByDomaine[index].matiere && $scope.fdsByDomaine[index].matiere.length !== 0
                        && $scope.fdsByDomaine[index].domaine === domaine
                        && $.inArray($scope.fdsByDomaine[index].matiere, $scope.matieresExistantes) === -1) {
                    $scope.matieresExistantes.push($scope.fdsByDomaine[index].matiere);
                }
            }
        } else {
            $scope.matieresExistantes = [];
        }
    };
    $scope.specialitesExistantes = [];
    $scope.getSpecialites = function (matiere) {
        if (matiere && matiere.length !== 0) {
            $scope.specialitesExistantes = [];
            var nbElements = $scope.allFds.length;
            for (var index = 0; index < nbElements; ++index) {
                if ($scope.allFds[index].specialite && $scope.allFds[index].specialite.length !== 0
                        && $scope.allFds[index].matiere === matiere
                        && $.inArray($scope.allFds[index].specialite, $scope.specialitesExistantes) === -1) {
                    $scope.specialitesExistantes.push($scope.allFds[index].specialite);
                }
            }
        } else {
            $scope.specialitesExistantes = [];
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

    $scope.etatsOrganisationsAuteursAreaContent = null;

    $scope.saveFd = function () {
        console.log("Demande d'enregistrement");
        if (!$scope.fdToSave.matiere || ($scope.fdToSave.matiere && $scope.fdToSave.matiere.length === 0)) {
            $scope.fdToSave.matiere = null;
        }
        if (!$scope.fdToSave.matiere && ($scope.fdToSave.specialite && $scope.fdToSave.specialite.length !== 0)) {
            $scope.showPanlWarning = true;
            $scope.warningMessage = "La spécialité ne peut pas être vide si la matière l'est.";
            $rootScope.goToTheTopOfPage();
            return;
        }
        if ($scope.etatsOrganisationsAuteursAreaContent) {
            $scope.fdToSave.etatsOrganisationsAuteurs = $scope.etatsOrganisationsAuteursAreaContent.split("\n").join("#");
        }

        $scope.fdToSave.domaine = $scope.fdToSave.domaine.trim();
        $scope.fdToSave.emplacement = $scope.fdToSave.emplacement.trim();
        $scope.fdToSave.titre = $scope.fdToSave.titre.trim();

        $scope.fdToSave.matiere = $scope.fdToSave.matiere ? $scope.fdToSave.matiere.trim() : "";
        $scope.fdToSave.specialite = $scope.fdToSave.specialite ? $scope.fdToSave.specialite.trim() : "";
        $scope.fdToSave.etatsOrganisationsAuteurs = $scope.fdToSave.etatsOrganisationsAuteurs ? $scope.fdToSave.etatsOrganisationsAuteurs.trim() : "";
        $scope.fdToSave.annee = $scope.fdToSave.annee ? $scope.fdToSave.annee.trim() : "";
        $scope.fdToSave.nature = $scope.fdToSave.nature ? $scope.fdToSave.nature.trim() : "";

        $http.post($rootScope.urlPrefix + 'fds', $scope.fdToSave)
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        var fdSaved = responseData.data;
                        //console.log('fd sauvegardé : ' + fdSaved);
                        // si c'est une mise à jour ...
                        if (fdSelectionne && indexFdSelectionne) {
                            console.log("REDIRECTION...");
                            $window.location.href = $rootScope.urlPrefix;
                        }
                        $scope.allFds.push(fdSaved);
                        $scope.currentPage = 1;
                        $scope.printFdsByPage();
                        $scope.filterBy($scope.allFds, $scope.fdsByDomaine, $scope.testEqualDomaine, "");
                        $scope.getAllDomaines();

                        $scope.fdToSave = {};
                        $scope.etatsOrganisationsAuteursAreaContent = null;
                        fdSelectionne = null;
                        indexFdSelectionne = null;

                        $scope.showPanlSuccess = true;
                        $scope.successMessage = "Le fond documentaire a été enregistré !";
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

    var fdSelectionne = null;
    var indexFdSelectionne = null;

    $scope.updateFd = function (fdToUpdate, indexFdToUpdate) {
        $scope.fdToSave = clone(fdToUpdate);
        fdSelectionne = clone(fdToUpdate);
        indexFdSelectionne = indexFdToUpdate;
        $scope.changeMenu(1);
    };

    $scope.deleteFd = function (indexFdToDelete, idFdToDelete) {
        console.log("DEMANDE DE SUPPRESSION");
        console.log("INDEX DANS currentFdsArray : " + indexFdToDelete);
        $http.delete($rootScope.urlPrefix + 'fds/' + idFdToDelete)
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

    $scope.deleteAllFds = function () {
        $http.delete($rootScope.urlPrefix + 'fds/all')
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

    $scope.testEqualDomaine = function (currentFd) {
        return testEquality(currentFd.domaine, $scope.domaineSelectionne);
    };

    $scope.testEqualMatiere = function (currentFd) {
        return testEquality(currentFd.matiere, $scope.matiereSelectionnee);
    };

    $scope.testEqualSpecialite = function (currentFd) {
        console.log("FD COURANT : " + currentFd.id + " " + currentFd.titre);
        console.log("SPECIALITÉ DU FOND COURANT : " + currentFd.specialite);
        console.log("SPECIALITÉ SÉLECTIONNÉE : " + $scope.specialiteSelectionnee);
        return testEquality(currentFd.specialite, $scope.specialiteSelectionnee);
    };

    $scope.filterBy = function (parentArray, childArray, filterFunction, filterElement) {
        // la variable à modifier ici est currentFdsArray
        // le parent des fds obtenus après filtrage par domaine est allFds
        // on copie d'abord le parent dans le fils
        angular.copy(parentArray, childArray);
        if (filterElement && filterElement.length !== 0) {
            angular.copy(parentArray.filter(filterFunction), childArray);
            angular.copy(childArray, $scope.currentFdsArray);
            //console.log("NOMBRE D'FONDS PAR DOMAINE : " + childArray.length);
            $scope.currentPage = 1;
        } else {
            angular.copy(parentArray, $scope.currentFdsArray);
        }
        //console.log(currentFdsArray.length);
        $scope.printFdsByPage();
    };

    $scope.showConfirmDelete = function (event) {
        $rootScope.goToTheTopOfPage();
        var confirm = $mdDialog.confirm()
                .title('Êtes - vous sûr de vouloir supprimer tous les fonds documentaires ?')
                .textContent('')
                .ariaLabel('ariaLabel')
                .targetEvent(event)
                .ok('Oui')
                .cancel('Non');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'Tous les fonds documentaires ont été supprimés.';
            if ($scope.allFds.length !== 0) {
                $scope.deleteAllFds();
            }
        }, function () {
            $scope.status = 'Vous avez annulé la suppression.';
        });
    };

    $scope.searchText = null;
    var fdsSearch = [];
    $scope.searchManage = function () {
        $scope.domaineSelectionne = "";
        $scope.matiereSelectionnee = "";
        $scope.specialiteSelectionnee = "";
        $scope.filterBy($scope.allFds, fdsSearch, testContains, $scope.searchText);
    };

    var testContains = function (currentFd) {
        return currentFd.domaine.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.matiere.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.specialite.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.titre.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.etatsOrganisationsAuteurs.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.annee.includes($scope.searchText)
                || currentFd.nature.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentFd.emplacement.toLowerCase().includes($scope.searchText.toLowerCase());
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
