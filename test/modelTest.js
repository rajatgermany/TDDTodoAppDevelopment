var Todo = require('../models.js');

var chai = require('chai');
var mocha = require('mocha');
var  should = chai.should();

describe("Todo", function(){
    it('Should not save a Task without with Task name', function(done){


     var todo = new Todo();
        todo.save(function(err, docs){
            console.log(err);
            err.should.have.property('errors')
            err.should.have.property('name').eql('ValidationError')
            err.should.have.property('message').eql('Todo validation failed')
            done();

        })


    })
})