const express = require('express')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const utils = require('utility')
const bodyParser = require('body-parser')
const json = require('body-parser/lib/types/json')
const cookieParser = require('cookie-parser')

const _filter = {'pwd': 0,'_v':0}

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return  res.json({code:1,msg:'后端出错啦'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.get('/list',function(req,res){
    // console.log(req.query)
    const {type} = req.query
    // User.remove({},function(e,d){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})

Router.post('/login',bodyParser.json(),function(req,res){
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名和密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.post('/register',bodyParser.json(),function(req,res){
    const {type,pwd,user} = req.body
	User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
		}
    })
    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d){
        if(e){
            return res.json({code:1,msg:'后端出错啦'})
        }
        const {user,type,_id} = d
        res.cookie('userid',_id)
        return res.json({code:0,data:{user,type,_id}})
    })
})

Router.post('/update',bodyParser.json(),function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
            return res.json({code:0,data})
    })
})
function md5Pwd(pwd){
    const salt = 'imooc_is_good_234354324234'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router

