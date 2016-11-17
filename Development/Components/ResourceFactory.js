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
