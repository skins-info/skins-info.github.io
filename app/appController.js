angular.module('SPA', [])
    .controller('appController', ['$scope','$http', function ($scope, $http) {

    $scope.weapons = [];
        
    $http.get('weapons.json')
        .success(function(data, status, headers, config) {
            $scope.weapons = data.results;
    }).error(function(data, status, headers, config){

    });

    $scope.currentCategory = null;
    $scope.showDeleteButton = false;
    $scope.showDetails = false;


    $scope.setCurrentCategory = function(category){
        $scope.currentCategory = category;
        if (category == 'chosen') {
            $scope.showDeleteButton = true;
            $scope.showDetails = true;
        }
        else {
            $scope.showDeleteButton = false;
            $scope.showDetails = false;
        }

        $scope.getChosenWeapons = function(chosenWeapon) {
            chosenWeapon.showSaveButton = false;
            var obj = {
                name:chosenWeapon.name,
                details:chosenWeapon.details,
                category:'chosen',
                href:chosenWeapon.href,
                src:chosenWeapon.src,
                showSaveButton:false
            };
            $scope.weapons.push(obj);
        };
    };

    $scope.deleteChosenWeapon = function(weapon) {
        for (var i = 0; i < $scope.weapons.length; i++) {
            if (weapon == $scope.weapons[i]) {
                $scope.weapons.splice(i, 1);
                return 0;
            } else
            if (weapon.name == $scope.weapons[i].name) {
                $scope.weapons[i].showSaveButton = true;
            }
        }
    };

}]);