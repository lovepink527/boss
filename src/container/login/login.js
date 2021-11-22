
import React from 'react'
import Logo from '../../component/logo/logo'
import {Button,WhiteSpace,WingBlank,InputItem,List} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';

@connect(
    state=>state.user,
    {login}
)

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    register() {
        this.props.history.push('/register')
    }
    handleLogin(v) {
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                <Logo/>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <h2>登录页面</h2>
                {this.props.msg?<p style={{color:'red'}}>{this.props.msg}</p>:null}
                <WingBlank>
					<List>
						{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
						<InputItem
							onChange={v=>this.handleChange('user',v)}

						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							onChange={v=>this.handleChange('pwd',v)}
							type='password'
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
            </div>
        )
    }
}

export default Login