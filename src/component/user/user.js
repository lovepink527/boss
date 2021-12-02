import React from 'react'
import {connect} from 'react-redux'
import {Result, List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import { logoutSubmit} from '../../redux/user.redux'

@connect(
	state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('注销', '确定退出登录吗', [
          { text: '取消', onPress: () => {} },
          { text: '确定', onPress: () => {
            browserCookie.erase('userid')
            this.props.logoutSubmit()
          } },
        ])
    }
    render(){
        return this.props.user?(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Result img={<img alt='头像' src= {require(`../img/${this.props.avatar}.png` ).default} style={{width:'40px'}}/>}
                title={this.props.user}
                message={this.props.type==='boss'? this.props.company:null}>
                </Result>
                <List renderHeader={()=>'简介'}>
                    <List.Item>
                        {this.props.title}
                        {this.props.desc.split('\n').map((v,key)=>(<List.Item.Brief key={key}>
                            {v}
                        </List.Item.Brief>))}
                        {this.props.money?<List.Item.Brief>
                            薪资：{this.props.money}
                        </List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick={this.logout}>
                    退出登录
                    </List.Item>
                </List>
            </div>
        ):<Redirect to={this.props.redirectTo} />
    }
}

export default User