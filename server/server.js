// import {renderToString,renderToNodeStream}  from 'react-dom/server'
const express = require('express');
//bodyParser全局解析失效
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const proxy = require('http-proxy-middleware')
const models = require('./model');
const Chat = models.getModel('chat');
const path = require('path')

const app = express()

const server = require('http').Server(app,{cors:true})
const io = require('socket.io')(server)

io.on('connection',function(socket){
	console.log('user login')
	socket.on('sendMsg',data=>{
		console.log(data)
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
		io.emit('recvmsg',data)
	})
})
const userRouter = require('./user')



//跨域代理
// app.use(async (ctx, next) => {
//     if(ctx.url.startsWith('/cityjson')) {
//         ctx.respond = false
//         return proxy({
//             target: 'http://localhost:9000', // 服务器地址
//             changeOrigin: true,
//         })(ctx.req, ctx.res, next)
//     }
//     return next()
// })

app.use(bodyParser());
app.use(cookieParser())
app.use('/user',userRouter)
//路由拦截
app.use(function(req,res,next){
	if(req.url.startsWith('/user')||req.url.startsWith('/static/')){
		return next()
	}
	return res.sendFile(path.resolve('../build/index.html'))
})
app.use('/',express.static(path.resolve('../build')))

server.listen(9000,function(){
    console.log('hahahah')
})