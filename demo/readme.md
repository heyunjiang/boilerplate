### 第一堂作业：实现jsx解析器与渲染器
- 安装依赖运行npm start。
- 调试playground.js，看看jsx编译后的结果是什么。
- 实现一个数据结构，把jsx编译后的结构以嵌套形式保存在数据结构对象中（参考react渲染）。
- 实现render，解析这个嵌套对象，并且把解析结果渲染到页面上。
- 渲染可以调用dom.js里createElement函数。

### 分析
调试后，发现`<div id="div">test</div>`被转义成`createElement('div', { id: 'div' }, 'test')`。

这是babel编译后的结果，所以查看babelrc文件的编译配置。配置内也包含createElement函数，在plugin-transform-react-jsx插件内。

谷歌plugin-transform-react-jsx插件使用方法，它是把jsx通过pragma提供的函数转义成react实例组件。pragma默认值为React.createElement。

题干是实现一个数据结构，这个结构实际上就是React虚拟节点。而createElement要做的，就是把参数转成React虚拟节点。React虚拟节点本次仅实现最基本的功能即可。

看过react源码同学知道react虚拟节点的基本结构为:

```
{
  _rootId: xxx,
  props: {
    ...
  },
  children: [...]
}
```
通过children来对其他虚拟节点引用。

题干实现render函数，实际上就是解析这个虚拟节点，把react虚拟节点对象解析成真实dom。

由于children存在嵌套，需递归解析虚拟节点，创建真实dom时候调用dom.js相关api即可。

### 思维流程
1. 完成作业的同学，检查是否按照上述思路。

2. 结果并不重要，重要的是分析问题的步骤，并且能画出分析后的模块图。

3. 依次检查以下内容：
  1. createElement函数是否返回了VDom实例。
  2. VDom组件是否被定义成class。
  3. render是否调用了VDom的函数进行渲染。

如果没有做到以上内容，请参考源码示例对作业进行更改，以便第二课可以复用。

### 源码示例
参考one文件夹下面文件示例，源码仅仅提供思路，请不要抄袭或者尝试调试。

