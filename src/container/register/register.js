import React from 'react'
import Logo from '../../component/logo/logo'
import {Button,List,InputItem,Radio,WhiteSpace} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
const RadioItem = Radio.RadioItem;


@connect(
	state=>state.user,
	{register}
)

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: 'genuis'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key,val) {
        this.setState({
            [key]:val
        })
    }
    handleRegister(v) {
        this.props.register(this.state)
    }
    render() {
        return (
            <div>
               {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <h2>注册页</h2>
                {this.props.msg?<p style={{color:'red'}}>{this.props.msg}</p>:null}
                <List>
					{this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
					<InputItem
						onChange={v=>this.handleChange('user',v)}
					>用户名</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('pwd',v)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('repeatpwd',v)}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem
						checked={this.state.type==='genius'}
						onChange={()=>this.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<RadioItem
						checked={this.state.type==='boss'}
						onChange={()=>this.handleChange('type','boss')}
					>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册 </Button>
				</List>
            </div>
        )
    }
}

export default Register