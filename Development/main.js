var app = angular.module('TodoApp', ['ngResource']);


angular.module('TodoApp')
    .factory('resourceFactory', ['$resource', function ($resource) {




        // Assemble actions with custom headers attached
        var actions = {
            'get'   : {method: 'GET'},
            'save'  : {method: 'POST'},
            'create': {method: 'POST'},
            'query' : {method: 'GET',isArray: true},
            'remove': {method: 'DELETE'},
            'delete': {method: 'DELETE'},
            'update': {method: 'PUT'}
        };

        var Todo = $resource('/api/Todo/:Todo_ID', {Todo_ID: '@Todo_ID'}, actions);

        return Todo


    }]);

angular.module('TodoApp')
    .factory('TodoFactory', ["resourceFactory", "$q", function(resourceFactory , $q) {

        var TodoFactory = {};


        TodoFactory.getAllTodo = function () {
            var deferredObject = $q.defer();
            resourceFactory
                .query()
                .$promise
                .then(function (result) {


                    deferredObject.resolve(result)


                }, function (err) {

                    deferredObject.reject(err)
                })

            return deferredObject.promise;
        }


        TodoFactory.getSingleTodo = function (TodoID) {
            var deferredObject = $q.defer();
            resourceFactory
                .get({Todo_ID: TodoID})
                .$promise
                .then(function (result) {
                    deferredObject.resolve(result)
                }, function (err) {
                    deferredObject.reject(err)
                })

            return deferredObject.promise;


        }


        TodoFactory.saveTodo = function (Todo) {
            var deferredObject = $q.defer();
            var newTodo = new resourceFactory();
            newTodo.TodoData = Todo;
            resourceFactory.save(newTodo, function (value, m) {
                deferredObject.resolve(value);


            })


            return deferredObject.promise;
        }


        TodoFactory.removeTodo = function (TodoID) {
            var deferredObject = $q.defer();
            resourceFactory.delete({Todo_ID: TodoID}, function (value) {
                deferredObject.resolve(value)
            })

            return deferredObject.promise;
        }


        TodoFactory.updateTodo = function (Todo) {
        console.log(Todo);
        var deferredObject = $q.defer();
        resourceFactory.update({Todo_ID: Todo._id},{Todo:Todo} ,function (res) {
            deferredObject.resolve(res)
        })

        return deferredObject.promise;


    }






        return TodoFactory;

    }])

angular.module('TodoApp')
    .controller('TodoController', ["$scope", "TodoFactory", function($scope, TodoFactory) {



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


}]);