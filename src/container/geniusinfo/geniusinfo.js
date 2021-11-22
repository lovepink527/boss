import React from 'react'
import { NavBar,List,InputItem,TextareaItem,Button} from 'antd-mobile'
import  AvatarSelector  from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css';

@connect(
    state=>state.user,
    {update}
)

class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            desc:''
        }
    }
    onChange(key,value){
        this.setState({
            [key]:value
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect>: null}
                <NavBar back={null} mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}></AvatarSelector>
                <List
                style={{
                    '--prefix-width': '6em',
                }}
                >
                <List.Item prefix='求职岗位'>
                <InputItem onChange={(v)=>this.onChange('title',v)}>求职岗位</InputItem>
                </List.Item>
                <List.Item prefix='个人简介'>
                <TextareaItem title="个人简介" autoHeight onChange={(v)=>this.onChange('desc',v)}/>
                </List.Item>
                </List>
                <Button type="primary" onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo