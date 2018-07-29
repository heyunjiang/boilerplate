const VDom = require('./vdom')

/*
* 返回虚拟dom
*/
const createElement = (type, props, ...children) => {
  const vDom = new VDom(type, props, children)
  return vDom
}

class Render {
  constructor(vnode, dom) {
    this.dom = dom
    this.vnode = vnode
  }

  render(data) {
    const vdom = this.vnode(data)
    this.draw(vdom)
  }

  draw(vdom) {
    const element = vdom.mountComponent()
    this.dom.innerHTML = element.outerHTML
  }
}

const user1 = { name: 'zhangsan', href: 'http://www.baidu.com', link: 'link1', hello: 'hello world 1' }
const App = ({ user }) => {
  return (user.flag !== 'true' ? <div id="wrapper"
    onClick={(context) => {
      context.replaceAttributes({
        style: { color: 'blue' }
      })
    }}>
    <div><span>姓名：{user.name}</span></div>
    <div style={{ margin: "20px 0", color: 'red' }}>介绍：<a href={user.href} target="_blank">{user.link}</a></div>
    {user.hello}
  </div> : <span>{user.flag}</span>)
}

const app = new Render(App, document.getElementById('root'))

app.render({
  user: user1,
})
