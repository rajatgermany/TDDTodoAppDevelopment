var mongoose = require('mongoose');
var Schema = mongoose.Schema



var TodoSchema = Schema({

    Task : {

        type : String,
        required : true
    },

    Completed: {

        type: Boolean,
        default : false
    },

    Created_by: {

        type : Date,
        default : Date.now()


    }

})


module.exports = mongoose.model('Todo', TodoSchema);