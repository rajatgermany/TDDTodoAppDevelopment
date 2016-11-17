
var Todo = require('../models.js');


var TodoController = {

    getAllTodo : function(req,res){
        console.log('Hit the all todos')

        Todo.find({}, function(err,docs){


            if (err){

                res.json({message : 'Action Failed', error : err})
            }
            else {

              res.json(docs);
            }

        })

    },


    saveTodo : function(req,res){
        console.log('Save End Point Hit')
        console.log(req.body)

        var newTodo = new Todo({

            Task : req.body.TodoData.Task
        })
        newTodo.save(function(err,docs){

            if(err){
                console.log(err);
                console.log('shshsh')
                res.json({message: 'Post Action Failed', error : err})
            }

            else {
                console.log('ElseBlock')
                res.json({message: 'Post Action Successful'})
            }
        })




},

    removeTodo : function(req,res) {

        Todo.remove({_id: req.params.Todo_ID}, function (err, message) {

            if (err) {
                res.json({message: 'Action Failed', error: 'Some Error Occur'})
            }

            else {
                res.json({
                    message: 'Todo Removed from the List'
                })
            }

        })

    },



    getSingleTodo: function(req,res){

        console.log(req.params)

        Todo.findOne({_id:req.params.Todo_ID}, function(err, docs){

            if(err){
                res.json({ message: 'Action Failed' , error : 'Some Error Occur'
                })
            }

            else {
                res.json(docs)
            }
        })


    },


    editTodo : function(req,res){



        Todo.findOne({_id: req.params.Todo_ID}, function (err, docs){
            if (err) {
                res.json({message: 'Action Failed', error: err})
            } else {
                for (var field in Todo.schema.paths) {
                    if ((field !== '_id') && (field !== '__v')) {

                        if (req.body.Todo[field] !== undefined) {
                            console.log(req.body.Todo[field])
                            docs[field] = req.body.Todo[field];
                        }
                    }
                }
                docs.save(function(err, docs){
                    if(err){
                        res.json({message: 'Action Failed', error: err})

                    }

                    else {

                        console.log('ElseBlocl')
                        res.json({message: 'Todo Updated', todo: docs})

                    }
                });
            }
        });

    }





}










module.exports = TodoController;