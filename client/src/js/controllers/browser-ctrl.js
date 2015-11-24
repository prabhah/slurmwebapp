/**
 * Master Controller
 */

angular.module('RDash')
    .controller('BrowserCtrl', ['$scope', 'User', '$modal', BrowserCtrl]);

function BrowserCtrl($scope, User, $modal) {
    $scope.files = [];
    $scope.currentDir = ".";
    $scope.loading = false;
    var scope = $scope;
    var that = this;

    $scope.updateFiles = function(dir){
        $scope.loading = true;
        User.get("files", {dir:dir}, function(data, err){
            if(err){
                $scope.modalError = {};
                $scope.modalError.message = "Impossible d'accéder à " + dir;
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'templates/modal/simpleError.html',
                    scope:$scope
                });
            }else{
                $scope.currentDir = data.path;
                $scope.files = data.files;
                console.log("Operation effectued");
                console.log(JSON.stringify(data));
            }
            $scope.loading = false;
            $scope.$apply();
        });
    }

    $scope.goToFile = function(filename){
        console.log("Go to:"+$scope.currentDir + filename)
        $scope.updateFiles($scope.currentDir + filename);
    }

    $scope.updateFiles($scope.currentDir);

}
