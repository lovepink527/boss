import axios from 'axios'
import React from 'react'
import { Card, WingBlank } from 'antd-mobile';

class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=genius').then(res =>{
                if(res.data.code===0){
                    this.setState({data:res.data.data})
                }
        })
    }
    render(){
        return (<div>
            <WingBlank size="lg">
                {this.state.data.map(v=>{
                    <Card>
                    <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`).default}
                        extra={<span>{v.title}</span>}
                    />
                    <Card.Body>
                        <div>{v.desc}</div>
                    </Card.Body>
                </Card>
                })}
            </WingBlank>
        </div>)
    }
}

export default Boss