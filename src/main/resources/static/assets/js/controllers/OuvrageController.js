myApp.controller('OuvrageController', function ($rootScope, $scope, $http, $mdDialog, $window) {

    $scope.currentOuvragesArray = [];
    $scope.allOuvrages = [];
    $scope.ouvragesByDomaine = [];
    $scope.ouvragesByMatiere = [];
    $scope.ouvragesBySpecialite = [];

    $scope.indexMenu = 0;
    $scope.changeMenu = function (index) {
        $scope.indexMenu = index;
        $scope.domaineSelectionne = "";
        $scope.filterBy($scope.allOuvrages, $scope.ouvragesByDomaine, $scope.testEqualDomaine, $scope.domaineSelectionne);
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
        "name": "auteurs",
        "label": "Auteur(s)",
        "show": true
    }, {
        "name": "etatsOrganisations",
        "label": "État(s) / Organisation(s)",
        "show": false
    }, {
        "name": "annee",
        "label": "Année",
        "show": true
    }, {
        "name": "revueCollection",
        "label": "Revue / Collection",
        "show": true
    }, {
        "name": "numSerie",
        "label": "N° Série",
        "show": true
    }, {
        "name": "edition",
        "label": "Édition",
        "show": true
    }, {
        "name": "emplacement",
        "label": "Emplacement",
        "show": true
    });

    $scope.ouvrageToSave = {};

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
        $scope.printOuvragesByPage();
    };

    $scope.selectPageIndex = function (page) {
        $scope.currentPage = page;
        $scope.printOuvragesByPage();
    };

    $scope.decPageIndex = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.printOuvragesByPage();
        }
    };

    $scope.incPageIndex = function () {
        if ($scope.currentPage < $scope.nbPages) {
            $scope.currentPage++;
            $scope.printOuvragesByPage();
        }
    };

    $scope.ouvragesByPage = [];
    $scope.printOuvragesByPage = function () {
        //console.log("PAGE COURANTE : " + $scope.currentPage);
        // nombre de pages
        var nbOuvrages = $scope.currentOuvragesArray.length;
        //console.log("NOMBRE D'OUVRAGES : " + nbOuvrages);
        $scope.nbPages = Math.trunc(nbOuvrages / $scope.nbOfItemsToDisplay);
        if (nbOuvrages % $scope.nbOfItemsToDisplay !== 0) {
            $scope.nbPages++;
        }
        //console.log("NOMBRE DE PAGES : " + $scope.nbPages);
        angular.copy($scope.currentOuvragesArray.slice(
                ($scope.currentPage - 1) * $scope.nbOfItemsToDisplay, $scope.currentPage * $scope.nbOfItemsToDisplay
                ), $scope.ouvragesByPage);
    };

    $scope.getAllOuvrages = function () {
        $http.get($rootScope.urlPrefix + 'ouvrages/all')
                .then(function (successResponse) {
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        //console.log(responseData.data);
                        $scope.currentPage = 1;
                        angular.copy(responseData.data, $scope.allOuvrages);
                        angular.copy(responseData.data, $scope.currentOuvragesArray);
                        $scope.printOuvragesByPage();
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
    $scope.getAllOuvrages();

    $scope.domaineSelectionne = null;
    $scope.matiereSelectionnee = null;
    $scope.specialiteSelectionnee = null;

    $scope.getAllDomaines = function () {
        $scope.domainesExistants = [];
        var nbElements = $scope.allOuvrages.length;
        for (var index = 0; index < nbElements; ++index) {
            if ($scope.allOuvrages[index].domaine && $scope.allOuvrages[index].domaine.length !== 0
                    && $.inArray($scope.allOuvrages[index].domaine, $scope.domainesExistants) === -1) {
                $scope.domainesExistants.push($scope.allOuvrages[index].domaine);
            }
        }
    };

    $scope.matieresExistantes = [];
    $scope.getMatieres = function (domaine) {
        if (domaine && domaine.length !== 0) {
            $scope.matieresExistantes = [];
            var nbElements = $scope.ouvragesByDomaine.length;
            for (var index = 0; index < nbElements; ++index) {
                if ($scope.ouvragesByDomaine[index].matiere && $scope.ouvragesByDomaine[index].matiere.length !== 0
                        && $scope.ouvragesByDomaine[index].domaine === domaine
                        && $.inArray($scope.ouvragesByDomaine[index].matiere, $scope.matieresExistantes) === -1) {
                    $scope.matieresExistantes.push($scope.ouvragesByDomaine[index].matiere);
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
            var nbElements = $scope.allOuvrages.length;
            for (var index = 0; index < nbElements; ++index) {
                if ($scope.allOuvrages[index].specialite && $scope.allOuvrages[index].specialite.length !== 0
                        && $scope.allOuvrages[index].matiere === matiere
                        && $.inArray($scope.allOuvrages[index].specialite, $scope.specialitesExistantes) === -1) {
                    $scope.specialitesExistantes.push($scope.allOuvrages[index].specialite);
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

    $scope.auteursAreaContent = null;
    $scope.etatsOrganisationsAreaContent = null;

    $scope.saveOuvrage = function () {
        console.log("Demande d'enregistrement");
        if (!$scope.ouvrageToSave.matiere || ($scope.ouvrageToSave.matiere && $scope.ouvrageToSave.matiere.length === 0)) {
            $scope.ouvrageToSave.matiere = null;
        }
        if (!$scope.ouvrageToSave.matiere && ($scope.ouvrageToSave.specialite && $scope.ouvrageToSave.specialite.length !== 0)) {
            $scope.showPanlWarning = true;
            $scope.warningMessage = "La spécialité ne peut pas être vide si la matière l'est.";
            $rootScope.goToTheTopOfPage();
            return;
        }
        if ($scope.auteursAreaContent) {
            $scope.ouvrageToSave.auteurs = $scope.auteursAreaContent.split("\n").join("#");
        }
        if ($scope.etatsOrganisationsAreaContent) {
            $scope.ouvrageToSave.etatsOrganisations = $scope.etatsOrganisationsAreaContent.split("\n").join("#");
        }

        $scope.ouvrageToSave.domaine = $scope.ouvrageToSave.domaine.trim();
        $scope.ouvrageToSave.emplacement = $scope.ouvrageToSave.emplacement.trim();
        $scope.ouvrageToSave.titre = $scope.ouvrageToSave.titre.trim();

        $scope.ouvrageToSave.matiere = $scope.ouvrageToSave.matiere ? $scope.ouvrageToSave.matiere.trim() : "";
        $scope.ouvrageToSave.specialite = $scope.ouvrageToSave.specialite ? $scope.ouvrageToSave.specialite.trim() : "";
        $scope.ouvrageToSave.auteurs = $scope.ouvrageToSave.auteurs ? $scope.ouvrageToSave.auteurs.trim() : "";
        $scope.ouvrageToSave.etatsOrganisations = $scope.ouvrageToSave.etatsOrganisations ? $scope.ouvrageToSave.etatsOrganisations.trim() : "";
        $scope.ouvrageToSave.annee = $scope.ouvrageToSave.annee ? $scope.ouvrageToSave.annee.trim() : "";
        $scope.ouvrageToSave.revueCollection = $scope.ouvrageToSave.revueCollection ? $scope.ouvrageToSave.revueCollection.trim() : "";
        $scope.ouvrageToSave.numSerie = $scope.ouvrageToSave.numSerie ? $scope.ouvrageToSave.numSerie.trim() : "";
        $scope.ouvrageToSave.edition = $scope.ouvrageToSave.edition ? $scope.ouvrageToSave.edition.trim() : "";

        $http.post($rootScope.urlPrefix + 'ouvrages', $scope.ouvrageToSave)
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        var ouvrageSaved = responseData.data;
                        //console.log('Ouvrage sauvegardé : ' + ouvrageSaved);
                        // si c'est une mise à jour ...
                        if (ouvrageSelectionne && indexOuvrageSelectionne) {
                            console.log("REDIRECTION...");
                            $window.location.href = $rootScope.urlPrefix;
                        }
                        $scope.allOuvrages.push(ouvrageSaved);
                        $scope.currentPage = 1;
                        $scope.printOuvragesByPage();
                        $scope.filterBy($scope.allOuvrages, $scope.ouvragesByDomaine, $scope.testEqualDomaine, "");
                        $scope.getAllDomaines();

                        $scope.ouvrageToSave = {};
                        $scope.auteursAreaContent = null;
                        $scope.etatsOrganisationsAreaContent = null;
                        ouvrageSelectionne = null;
                        indexOuvrageSelectionne = null;

                        $scope.showPanlSuccess = true;
                        $scope.successMessage = "L'ouvrage a été enregistré !";
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

    var ouvrageSelectionne = null;
    var indexOuvrageSelectionne = null;

    $scope.updateOuvrage = function (ouvrageToUpdate, indexOuvrageToUpdate) {
        $scope.ouvrageToSave = clone(ouvrageToUpdate);
        ouvrageSelectionne = clone(ouvrageToUpdate);
        indexOuvrageSelectionne = indexOuvrageToUpdate;
        $scope.changeMenu(1);
    };

    $scope.deleteOuvrage = function (indexOuvrageToDelete, idOuvrageToDelete) {
        console.log("DEMANDE DE SUPPRESSION");
        console.log("INDEX DANS currentOuvragesArray : " + indexOuvrageToDelete);
        $http.delete($rootScope.urlPrefix + 'ouvrages/' + idOuvrageToDelete)
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        // on retire l'ouvrage supprimé de la BD dans la liste des ouvrages
                        //$scope.filterBy(($scope.allOuvrages, $scope.ouvragesByDomaine, $scope.testEqualDomaine, ""));
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

    $scope.deleteAllOuvrage = function () {
        $http.delete($rootScope.urlPrefix + 'ouvrages/all')
                .then(function (successResponse) {
                    //console.log('SUCCESS' + successResponse);
                    var responseData = successResponse.data;
                    var statusGetFromApp = responseData.status;
                    if (statusGetFromApp === 0) {
                        // on retire l'ouvrage supprimé de la BD dans la liste des ouvrages
                        //$scope.filterBy(($scope.allOuvrages, $scope.ouvragesByDomaine, $scope.testEqualDomaine, ""));
                        // on recharge la page
                        console.log("REDIRECTION...");
                        //$window.location.href = $rootScope.urlPrefix + "index.html#/ouvrages";
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

    $scope.testEqualDomaine = function (currentOuvrage) {
        return testEquality(currentOuvrage.domaine, $scope.domaineSelectionne);
    };

    $scope.testEqualMatiere = function (currentOuvrage) {
        return testEquality(currentOuvrage.matiere, $scope.matiereSelectionnee);
    };

    $scope.testEqualSpecialite = function (currentOuvrage) {
        console.log("OUVRAGE COURANT : " + currentOuvrage.id + " " + currentOuvrage.titre);
        console.log("SPECIALITÉ DE L'OUVRAGE COURANT : " + currentOuvrage.specialite);
        console.log("SPECIALITÉ SÉLECTIONNÉE : " + $scope.specialiteSelectionnee);
        return testEquality(currentOuvrage.specialite, $scope.specialiteSelectionnee);
    };

    $scope.filterBy = function (parentArray, childArray, filterFunction, filterElement) {
        // la variable à modifier ici est currentOuvragesArray
        // le parent des ouvrages obtenus après filtrage par domaine est allOuvrages
        // on copie d'abord le parent dans le fils
        angular.copy(parentArray, childArray);
        if (filterElement && filterElement.length !== 0) {
            angular.copy(parentArray.filter(filterFunction), childArray);
            angular.copy(childArray, $scope.currentOuvragesArray);
            //console.log("NOMBRE D'OUVRAGES PAR DOMAINE : " + childArray.length);
            $scope.currentPage = 1;
        } else {
            angular.copy(parentArray, $scope.currentOuvragesArray);
        }
        //console.log(currentOuvragesArray.length);
        $scope.printOuvragesByPage();
    };

    $scope.showConfirmDelete = function (event) {
        $rootScope.goToTheTopOfPage();
        var confirm = $mdDialog.confirm()
                .title('Êtes - vous sûr de vouloir supprimer tous les ouvrages ?')
                .textContent('')
                .ariaLabel('ariaLabel')
                .targetEvent(event)
                .ok('Oui')
                .cancel('Non');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'Tous les ouvrages ont été supprimés.';
            if ($scope.allOuvrages.length !== 0) {
                $scope.deleteAllOuvrage();
            }
        }, function () {
            $scope.status = 'Vous avez annulé la suppression.';
        });
    };

    $scope.searchText = null;
    var ouvragesSearch = [];
    $scope.searchManage = function () {
        $scope.domaineSelectionne = "";
        $scope.matiereSelectionnee = "";
        $scope.specialiteSelectionnee = "";
        $scope.filterBy($scope.allOuvrages, ouvragesSearch, testContains, $scope.searchText);
    };

    var testContains = function (currentOuvrage) {
        return currentOuvrage.domaine.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.matiere.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.specialite.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.titre.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.auteurs.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.etatsOrganisations.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.annee.includes($scope.searchText)
                || currentOuvrage.revueCollection.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.numSerie.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.edition.toLowerCase().includes($scope.searchText.toLowerCase())
                || currentOuvrage.emplacement.toLowerCase().includes($scope.searchText.toLowerCase());
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
