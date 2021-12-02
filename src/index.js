import React from 'react'
import ReactDom from 'react-dom'
import {createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import AuthRoute from './component/authroute/authroute'
import Chat from './component/chat/chat'
import './config'

const store = createStore(reducers,compose(applyMiddleware(thunk)))

	ReactDom.render(
		<Provider store={store}>
			<Router>
				<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/bossinfo" component={BossInfo}></Route>
					<Route path="/geniusinfo" component={GeniusInfo}></Route>
					<Route path="/chat/:id" component={Chat}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
				</div>
			</Router>
		</Provider>
		,document.getElementById('root')
	)





