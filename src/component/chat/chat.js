import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,getMsgList,recvMsg} from '../../redux/chat.redux'
import { getChatId } from '../../redux/util'
import QueueAnim from 'rc-queue-anim'


@connect(
    state=>state,
    {sendMsg,getMsgList,recvMsg}
)

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text: '',
            msg:[],
            showEmoji:false
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSumbit(){
        const form  = this.props.user._id
        const to = this.props.match.params.id
        const msg = this.state.text
        this.props.sendMsg(form,to,msg)
        this.setState({text:''})
    }
    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
        const user = this.props.match.params.id
        const users = this.props.chat.users
        const chatid = getChatId(user,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        if(!users[user]){
            return null
        }
        return (
            <div id="chat-page">
                <NavBar mode="dark" icon={<Icon type="left"/>} onLeftClick={()=> this.props.history.goBack()}>
                    {users[user].name}
                </NavBar>
                <QueueAnim delay={100}>
                {chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`).default
					return v.from===user?(
						<List key={v._id}>
							<List.Item
								thumb={avatar}
							>{v.content}</List.Item>
						</List>
					
					):(
						<List key={v._id}>
							<List.Item
								extra={<img alt='头像' src={require(`../img/${users[v.to].avatar}.png`).default} />}
							 	className='chat-me'
							 	>{v.content}</List.Item>
						</List>

					)
                })}
                </QueueAnim>
                
                <div className="stick-footer">
                    <List>
                        <InputItem 
                        placeholder="请输入" 
                        value={this.state.text} 
                        onChange={v=>{this.setState({text:v})}} 
                        extra={<div><span style={{marginRight:'15px'}} 
                        onClick={()=>{this.setState({showEmoji: !this.state.showEmoji})
                        this.fixCarousel()}}>😃</span>
                        <span onClick={()=>this.handleSumbit()}>发送</span></div>}>信息</InputItem>
                    </List>
                    {this.state.showEmoji ?
                    <Grid data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true} onClick={el=>{this.setState({text:this.state.text + el.text})}}>
                    </Grid>:null}
                </div>
            </div>
        )
    }
}

export default Chat