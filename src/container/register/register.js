import React from 'react'
import Logo from '../../component/logo/logo'
import {Button,Input,Form,CheckList} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
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
                <Form layout='horizontal' onFinish={this.handleRegister}
                    footer={
                        <div>
                            <Button block type='submit' color='primary'>
                            注册
                            </Button>
                        </div>
                    }>
                    <Form.Item
                        name='user'
                        label='用户'
                        rules={[{ required: true, message: '用户不能为空' }]}
                    >
                        <Input onChange={v=> this.handleChange('user',v)} placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        name='pwd'
                        label='密码'
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Input onChange={v=> this.handleChange('pwd',v)} placeholder='请输入密码' type="password"/>
                    </Form.Item>
                    <Form.Item
                        name='repetetpwd'
                        label='确认密码'
                        rules={[{ required: true, message: '确认密码不能为空' }]}
                    >
                        <Input onChange={v=> this.handleChange('repeatpwd',v)} placeholder='请输入重新输入密码' type="password"/>
                    </Form.Item >
                    <Form.Item name='type'>
                    <CheckList defaultValue={['genius']} onChange={(v) =>this.handleChange('type',v[0])}>
                            <CheckList.Item value='genius'>牛人</CheckList.Item>
                            <CheckList.Item value='boss'>BOSS</CheckList.Item>
                        </CheckList>
                    </Form.Item>
                    </Form>
            </div>
        )
    }
}

export default Register