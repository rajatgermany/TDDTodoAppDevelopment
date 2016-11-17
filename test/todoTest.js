var Todo = require('../models.js');
var TodoController = require('../routes/TodoController.js')
var sinon = require('sinon');
var chai = require('chai');
var mocha = require('mocha');
var  should = chai.should();
describe('Get All Todo', function(){


    var request = {}
    var responseSuccess= {

        json: function(docs){
            docs.should.be.a('object');
            docs.should.have.property('message').eql('Action Successfull');
            docs.should.have.property('todo').eql([]);

        }
    }


    var responseError= {

        json: function(docs){
            console.log(docs);
            docs.should.be.a('object');
            docs.should.have.property('message').eql('Action Failed');


        }
    }

    it('Should return all the Todos', function(done){
        var stub = sinon.stub(Todo, 'find');
        var expectedResult = {message: 'Action Successfull', todo: []};
        stub.withArgs({}).yields(null, expectedResult);
        TodoController.getAllTodo(request,responseSuccess);
        stub.restore();

        done();
    })


})


describe('Post new Todo to the List', function(){
    it('Post Successfull ! Todo List Updated', function(done){

        var expectedResult = {message: 'Action Successful'};
        var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        TodoMock.expects('save').yields(null, expectedResult);
        todo.save(function (err, docs) {
            TodoMock.verify();
            TodoMock.restore();
            docs.should.be.a('object');
            docs.should.have.property('message').eql('Action Successful');
            done();
        });

    })




    it('Returns Error if Post Fails', function(done){
        var expectedResult = {message: 'Action Failed' , error : 'Something Went Wrong'};
        var mock = sinon.mock(new Todo ({ Task : 'Project Todo'}))
        var todo = mock.object;
        mock.expects('save').yields(expectedResult, null);
        todo.save(function(err,docs){
            mock.verify();
            mock.restore();
            err.should.be.a('object');
            err.should.have.property('message').eql('Action Failed');
            err.should.have.property('error').eql('Something Went Wrong');
            done();

        })

    })

})







describe('Delete Todo from the List', function(){


    var request = {
        params:{
            id: '1234'
        }
    }
    var responseSuccess ={
        json: function(docs){
            docs.should.be.a('object');
            docs.should.have.property('message').eql('Todo Removed from the List');


        }
    }

    var responseError ={
        json: function(docs){
            docs.should.be.a('object');
            docs.should.have.property('message').eql('Action Failed');
            docs.should.have.property('error').eql('Some Error Occur')


        }
    }

    it('Delete Successfull ! Todo List Updated', function(done){

        var expectedResult = {status: 'TodoSaved'};
        var stub = sinon.stub(Todo, 'remove');
        stub.withArgs({_id:request.params.id}).yields(null, expectedResult);
        TodoController.removeTodo(request,responseSuccess);
        stub.restore();
        done();
    })

    

    it('Returns errors if delete action is failed', function(done){
        var expectedResult = {status: 'Todo Not Deleted' , error : 'Something Went Wrong'};
        var stub = sinon.stub(Todo, 'remove');
        stub.withArgs({_id: request.params.id}).yields(expectedResult, null);
        TodoController.removeTodo(request,responseError);
        stub.restore();
        done();
    })

})