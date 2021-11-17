import React from 'react'
import ReactDom from 'react-dom'
import {createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';


import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
// import AuthRoute from './component/authroute/authroute'
import './config'

const store = createStore(reducers,compose(applyMiddleware(thunk)))

function Boss() {
	return <h2>boss页面</h2>
}
	ReactDom.render(
		<Provider store={store}>
			<Router>
				<Switch>
					{/* <AuthRoute></AuthRoute> */}
					<Route path="/boss" component={Boss}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
				</Switch>
			</Router>
		</Provider>
		,document.getElementById('root')
	)





