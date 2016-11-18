
angular.module('TodoApp')
    .controller('TodoController', function($scope, TodoFactory) {
        function GetAllTodo() {
            var AllTodoPromise = TodoFactory.getAllTodo()
            AllTodoPromise.then(function (resolve) {
                $scope.Todo = resolve

            }, function (reject) {
                $scope.err = reject
            })
        }

        GetAllTodo();
        $scope.SaveTodo = function(Todo){
            var SaveTodoPromise = TodoFactory.saveTodo(Todo)
            SaveTodoPromise.then(function(resolve){
                if(resolve.message =='Post Action Failed'){
                    alert(resolve.message)
                }
               else {
                    GetAllTodo();
                    $scope.New = {};
               }
            }, function(reject){
                $scope.err = reject
            })

        }


        $scope.RemoveTodo = function(TodoID){
            var RemoveTodoPromise = TodoFactory.removeTodo(TodoID)
            RemoveTodoPromise.then(function(resolve){
                if(resolve.message =='Action Failed'){
                    alert(resolve.message)
                }
                else {
                    GetAllTodo();
                }
            }, function(reject){
                $scope.err = reject
            })

        }


        $scope.editTodo = function(TodoItem, index){
            $scope.Todo[index].edit = true;
        }


        $scope.updateTodo = function(Todo){
            var UpdateTodoPromise = TodoFactory.updateTodo(Todo)
            UpdateTodoPromise.then(function(resolve){

                if(resolve.message =='Action Failed'){
                    alert(resolve.message)
                }
                else {
                    GetAllTodo();
                }
            }, function(reject){
                $scope.err = reject
            })

        }


        $scope.Incomplete = function(){
            var count = 0;
            angular.forEach($scope.Todo, function(Task){
                if(Task.Completed == false){

                    count = count +1;
                }
            })

            return count;
        }


        $scope.warning = function(){
            if($scope.Incomplete() > 4){
                return 'Warning!!! No of incomplete Tasks are way more'
            }




        }


});