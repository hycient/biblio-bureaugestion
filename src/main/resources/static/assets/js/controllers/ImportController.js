myApp.controller('ImportController', function ($rootScope, $scope, $http) {

    $scope.nbElementsChoisis = 0;
    $scope.ouvrageCheckedHandler = function () {
        if ($scope.ouvragesImport) {
            $scope.nbElementsChoisis++;
        } else {
            $scope.nbElementsChoisis--;
        }
    };
    $scope.fdCheckedHandler = function () {
        if ($scope.fondsDocumentairesImport) {
            $scope.nbElementsChoisis++;
        } else {
            $scope.nbElementsChoisis--;
        }
    };
    $scope.missionCheckedHandler = function () {
        if ($scope.missionBGImport) {
            $scope.nbElementsChoisis++;
        } else {
            $scope.nbElementsChoisis--;
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

    // gestion des importations
    $scope.showImport = true;
    // fonction chargée de gérer l'affichage de la zone d'importation
    $scope.showImportFunc = function (bool) {
        $scope.showImport = bool;
    };

    $scope.ouvragesImport = false;
    $scope.fondsDocumentairesImport = false;
    $scope.missionBGImport = false;

    $scope.fileToImport;
    $scope.importFile = function () {
        console.log("Demande d'importation");

        if (!$scope.ouvragesImport && !$scope.fondsDocumentairesImport && !$scope.missionBGImport) {
            $scope.showPanlWarning = true;
            $scope.warningMessage = "Vous devez sélectionner au moins un élément à importer";
            return;
        }

        var formData = new FormData();
        formData.append('file', $scope.fileToImport);

        $http.post($rootScope.urlPrefix + 'import/'
                + $scope.ouvragesImport + '/' + $scope.fondsDocumentairesImport + '/' + $scope.missionBGImport, formData, {
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                })
                .then(function (successResponse) {
                    //console.log('SUCCESS IMPORT' + successResponse);
                    var responseApp = successResponse.data;
                    var statusFromApp = responseApp.status;
                    if (statusFromApp === 0) {
                        $scope.showPanlSuccess = true;
                        $scope.successMessage = "Les données ont été importées avec succès !";
                        $scope.successMessage += "\n\n" + responseApp.messages.join("\n");

                        $scope.ouvragesImport = false;
                        $scope.fondsDocumentairesImport = false;
                        $scope.missionBGImport = false;
                        $scope.fileToImport = null;
                    } else {
                        console.log('ERROR FROM BACK END');
                        console.log(successResponse);
                        $scope.showPanlError = true;
                        $scope.errorMessage = responseApp.data[0];
                    }
                }, function (errorResponse) {
                    console.log('ERROR' + errorResponse);
                    $scope.showPanlError = true;
                    $scope.errorMessage = "Problème survenu lors de la tentative d'importation. Veuillez en informer l'administrateur.";
                });
    };

    // gestion des exportations
    $scope.showExport = true;
    // fonction chargée de gérer l'affichage de la zone d'exportation
    $scope.showExportFunc = function (bool) {
        $scope.showExport = bool;
    };

});
