import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        if(!this.props.chat.chatmsg.length){
            return '没有消息' 
        }
        const msgGroup = {}
        this.props.chat.chatmsg.forEach( v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            let a_last = this.getLast(a)
            let b_last = this.getLast(b)
            return b_last - a_last
        })
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        return (
            <div>
                <List>
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from==userid?v[0].to:v[0].from
                        const unreadNum = v.filter(v=>!v.read&&v.to==userid).length
                        if(!targetId){
                            return null
                        }
                        // const name = userinfo[targetId] && userinfo[targetId].name
                        // const avatar = userinfo[targetId] ? userinfo[targetId].avatar : null
                        return <List.Item 
                        arrow="horizontal"
                        onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
                        extra={<Badge text={unreadNum}></Badge>}
                        key={lastItem._id}
                        thumb={require(`../img/${userinfo[targetId].avatar}.png`).default}
                        >
                            {lastItem.content}
                            <List.Item.Brief>{userinfo[targetId].name}</List.Item.Brief>
                        </List.Item>
                    })}
                </List>
            </div>
        )
    }
}

export default Msg