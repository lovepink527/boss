const express = require('express')
//bodyParser全局解析失效
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')


const app = express()

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/user',userRouter)
app.use(cookieParser())
// app.use(jsonParser);

app.listen(9000,function(){
    console.log('hahahah')
})