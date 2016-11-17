angular.module('TodoApp')
    .factory('TodoFactory', function(resourceFactory , $q) {

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

    })