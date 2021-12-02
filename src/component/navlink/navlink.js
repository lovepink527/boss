
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css';
@withRouter
@connect(
	state=>state.chat
)
class NavLink extends React.Component{
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render(){
		const navList = this.props.data.filter(v=>!v.hide)
		const {pathname} = this.props.location
		return (
            <div style={ { position:'fixed',bottom:0,height: 400,width:'100%' }}>
                <TabBar>
				{navList.map(v=>(
					<TabBar.Item
						badge={v.path==='/msg'?this.props.unread:null}
						key={v.path}
						title={v.text}
						icon={{uri: require(`./img/${v.icon}.png`).default}}
						selectedIcon={{uri: require(`./img/${v.icon}-active.png`).default}}
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>
					</TabBar.Item>
				))}
			</TabBar>
            </div>
			
		)
	}
}

export default NavLink