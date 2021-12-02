
import React from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../userinfo/userinfo'

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        this.props.getUserList('boss')
    }
    render(){
        return (<div>
            <UserCard userlist= {this.props.userList}></UserCard>
        </div>)
    }
}

export default Genius