const express = require('express')
//bodyParser全局解析失效
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')


const app = express()

app.use(bodyParser());
app.use(cookieParser())
app.use('/user',userRouter)


app.listen(9000,function(){
    console.log('hahahah')
})