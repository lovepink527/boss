import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import NavLink from '../navlink/navlink'
import {Route,Redirect} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
@connect(
	state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render(){
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path: '/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component: Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        // 让动画生效，之渲染一个router
        const page = navList.find(v=>v.path == pathname)
        return page?(
            <div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <QueueAnim type={'scaleX'} duration={800}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
				</div>
                <NavLink  data={navList}></NavLink>
            </div>
        ) : <Redirect to="/msg"></Redirect>
    }
}

export default Dashboard