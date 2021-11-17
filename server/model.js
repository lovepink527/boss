
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
    console.log('mongoose success')
})

const models = {
    user: {
        'user': {type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        //头像
        'avatar':{type:String,require:true},
        //个人介绍
        'desc': {type: String},
        //职位
        'title': {type: String},
        //如果是boss有公司和钱
        'company':{type: String},
        'money':{type: Number}
    },
    chat: {

    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}