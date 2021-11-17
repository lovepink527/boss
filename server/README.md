1. 安装express
```javascript
npm install express --save
```
2. 写一个服务器
```javascript
const express = require('express')

const app = express()

app.get('/',function(req,res){
    res.send('<h1>hello.word!</h1>')
})

app.listen(9000,function(){
    console.log('hahahah')
})
```
3. 连接数据库
```javascript
npm install mongoose --save

const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
    console.log('mongoose success')
})
```
4. 定义表结构
```javascript
const User = mongoose.model('user',new mongoose.Schema({
    name: {type: String,require: true},
    age: {type: Number,require: true}
}))
User.create({
    name: 'boss',
    age: 18
},function(err,doc){
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})
User.find({},function(err,doc){
         console.log(doc)
    })
```