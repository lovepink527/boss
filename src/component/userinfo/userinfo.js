import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
    static propsTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v){
        console.log(v.user)
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        return (<div>
            <WingBlank size="lg">
            {
                this.props.userlist.map(v=>{
                    return (
                        v.avatar?(
                            <Card key={v.id} onClick={()=>this.handleClick(v)}>
                    <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`).default}
                        extra={<span>{v.title}</span>}
                    />
                    <Card.Body>
                        <div>
                        {v.type==="boss"? <div>薪资：{v.money}</div> :null}
                        {v.type==="boss"? <div>公司：{v.company}</div> :null}
                            {v.desc.split('\n').map((v,index)=>(
                            <div key={index}>{v}</div>
                            ))
                            }
                        </div>
                    </Card.Body>
                </Card>
                        ): null
                    )
                })
            }
            </WingBlank>
        </div>)
    }
}

export default UserCard