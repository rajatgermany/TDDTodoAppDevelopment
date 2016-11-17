var config = {}



config.Db = function(){
    if(process.env.NODE_ENV == 'test'){
        console.log('Test')

        return "mongodb://localhost/TodoTest"
    }

    else {
        console.log('Development')

        return "mongodb://localhost/TodoServer"
    }

}






module.exports = config;