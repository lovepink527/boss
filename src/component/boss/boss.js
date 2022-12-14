
import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../userinfo/userinfo'
import {connect} from 'react-redux'

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }
    render(){
        return (<div>
            <UserCard userlist= {this.props.userList}></UserCard>
        </div>)
    }
}

export default Boss