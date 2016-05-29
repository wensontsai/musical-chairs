routerApp
  .controller('MainCtrl', ['$scope', 
    function($scope){

      $scope.chairsAll = [];
      $scope.chairsRemoved = [];
      $scope.numChairs = null;
      $scope.removeOrder = [];
      $scope.winner = false;

      $scope.startChairs = function () {
        prepareAllChairs();
        prepareRemoveOrder();

        // every 500 ms, remove a chair, add to removed chairs
        $scope.timer = setInterval(function(){
          if($scope.removeOrder.length === 1){
            stopTimer();
            $scope.winner = $scope.removeOrder[0];
            $scope.$apply();
          } else {
            $scope.chairsAll[$scope.removeOrder[0]].show = false;
            $scope.chairsAll = angular.copy($scope.chairsAll);
            $scope.chairsRemoved.unshift($scope.removeOrder[0]);
            $scope.removeOrder.shift();
            $scope.$apply();
          }   
        }, 500);
      }

      function prepareAllChairs () {
        $scope.allNums = Array.apply(null, {length: $scope.numChairs}).map(Number.call, Number);
        for(i in $scope.allNums){
          var obj = { num: Number(i), show: true };
          $scope.chairsAll.push(obj);
        }
      }

      function prepareRemoveOrder () {
        $scope.removeOrder = angular.copy($scope.allNums);
        shuffle($scope.removeOrder);
      }

      function stopTimer () {
        clearInterval($scope.timer);
      }

      function shuffle(array) {
        var counter = array.length;
        while (counter > 0) {
          var index = Math.floor(Math.random() * counter);
          counter--;
          var temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
      }
    }]);