import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile';
import NavLink from '../navlink/navlink'
import {Route,Switch} from 'react-router-dom'
import Boss from '../../component/boss/boss'
function Genius(){
    return <h2>牛人首页</h2>
}
function Msg(){
    return <h2>消息列表</h2>
}
function User(){
    return <h2>个人中心</h2>
}
// function NavLinkBar(){
//     return <h2>navlink</h2>
// }
@connect(
	state=>state
)
class Dashboard extends React.Component{
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
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>
                <NavLink data={navList}></NavLink>
            </div>
        )
    }
}

export default Dashboard