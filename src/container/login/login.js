
import React from 'react'
import Logo from '../../component/logo/logo'
import {Space,Button,Input,Form} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

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
                <Space>
                    <Form layout='horizontal'
                    footer={
                        <div>
                            <Button block type='submit' color='primary' onClick={this.handleLogin}>
                            登陆
                            </Button>
                        </div>
                    }>
                    <Form.Item
                        name='user'
                        label='用户'
                        rules={[{ required: true, message: '用户不能为空' }]}
                    >
                        <Input placeholder='请输入用户名' onChange={v=> this.handleChange('user',v)}/>
                    </Form.Item>
                    <Form.Item
                        name='pwd'
                        label='密码'
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Input placeholder='请输入密码' onChange={v=> this.handleChange('pwd',v)}/>
                    </Form.Item>
                    </Form>
                </Space>
                <Space>
                <Button onClick={this.register} block color='primary'>
                    注册
                </Button>
                </Space>
            </div>
        )
    }
}

export default Login