
1. npm i -g create-react-app
2. create-react-app boss
3. npm start
4. npm install redux --save
5. npm run eject //修改配置
6. npm i antd-mobile@next --save
```javascript
// 按需导入
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["import",{"libraryName": "antd-mobile","style": "css"}]
    ]
  }
```
7. react扩展redux扩展
- Redux状态管理，单一状态，单向数据流
- 核心概念： store,state,action,reducer
- store保存所有状态,那里都有记录state
- 需要改变得时候，需要告诉专员dispatch要干什么action
- 处理变化得人reducer拿到state和action,生成新的state
- 首先通过reducer新建store,随时通过store.getState获取状态
- 需要状态变更，store.dispatch(action) 来修改状态
- reducer函数接收state和action,返回新的state,可以用store.subscribe监听每次修改
```javascript
npm i redux --save
import {createStore} from 'redux'
//根据老的state和action生成新的state
function counter(state=0,action){
  switch(action.type){
    case '加机关枪':
      return state+1,
    default:
      return 10
  }
}
// 1. 新建store
const store = createStore(counter)
const init = store.getState()
//监听state
function listener() {
  const current = store.getState()
  console.log(`现在有机关枪${current}`)
}
//订阅监听
store.subscribe(listener)
// 派发事件，传递action
store.dispath({type: '加机关枪'})
```
###### redux和react一起用
- 把store.dispatch方法传递给组件，内部可以调用修改状态
- subscribe订阅render函数，每次修改都重新渲染
- redux相关内容，移动单独的文件index.redux.js单独管理

###### 处理异步
- 插件redux-thunk插件
npm install redux-devtools-extension 
npm install redux-thunk --save
- 使用applyMiddleware开启thunk中间件
- action可以返回函数，使用dispatch提交action
 ```javascript
  export function addGunAsync() {
    return dispatch => {
      setTimeout(() => {
        dispatch(addGun())
      },2000)
    }
  }
// 浏览器插件
  const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension(): f=>f
  ))
 ```
###### 使用react-redux

- npm install react-redux -- save
- 忘记subscribe，记住reducer,action和dispatch即可
- react-redux提供Provider和connect两个接口来链接
- Provider组件在应用最外层，传入store即可，只用一次
- connect负责从外部获取组件需要的参数
- connect可以用装饰器的方式来写
 ```javascript
 import {Provider} from 'react-redux'
ReactDom.render(
  (<Provider store={store}>
    <App/>
  <Provider>)
)
 ```
 ```javascript
import {connect} from 'react-redux';
class App extends React.component {
  render() {
    const store = this.props.num
  }
  return (
    <div>
      <h1>现在有机关枪{num}</h1>
      <button onClick={addGun}>申请武器</button>
    </div>
  )
}
const mapStatetoProps(state){
  return {num: state}
}
const actionCreators = {addGun,removeGun,addGunAsync}
App = connect(mapStatetoProps,actionCreators)(App)

 ```

 8. router4
 - BrowserRouter,包裹整个应用
 - router路由对应渲染的组件，可嵌套
 - link跳转专用

 - url参数，Route组件参数可用冒号表示参数
 - Reduirect组件 跳转
 - Switch只渲染一个子Route组件
 ```javascript
 npm install react-router-dom --save

 import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom'

 ReactDom.render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">
        一营
      </Link>
      </li>
      <li>
        <Link to="/erying">
        二营
      </Link>
      </li>erying
    </ul>
    <Switch>
      <Redirect to="/"></Redirect>
      <Route path="/:location" component={Text}></Route>
      <Route path="/erying" component={erying}></Route>
    </Switch>
  </BrowserRouter>
)

class Test extends React.component{
  render() {
    return <h2>{this.props.match.params.location}</h2>
  }
}
 ```
 