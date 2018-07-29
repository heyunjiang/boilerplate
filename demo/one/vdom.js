const { each } = require('../util/common')
const { createElement, updateElement } = require('../util/dom')
const $ = require('jquery')

const STRING = 'string'

class VDOMUtilMixIn {
  randomId(type) {
    const construct = this.constructor
    return `${type}${construct.count++}`
  }

  getDOMNode() {
    return document.getElementById(this._rootId)
  }

  wrapperText = (innerHTML) => {
    const Construct = this.constructor
    return new Construct(STRING, { innerHTML }, [])
  }

  wrapperUndefined = (innerHTML) => {
    const Construct = this.constructor
    return new Construct('undefined', { }, [])
  }

  analyzeChildren = (children) => {
    return children.map(child => {
      if (typeof child === STRING) {
        return this.wrapperText(child)
      } else if (typeof child === undefined) {
        return this.wrapperUndefined(child)
      }
      return child
    })
  }
}

export default class VDom extends VDOMUtilMixIn {
  static count = 0;

  constructor(type, attributes, children) {
    super()
    this._rootId = this.randomId(type)
    this.node = {
      type,
      attributes: {
        ...attributes,
        id: this._rootId,
      },
      children: this.analyzeChildren(children),
    }
  }

  _mountComponentIntoDOM() {
    const construct = this.constructor
    construct.count = 0
    const invoke = (fn, ...args) => fn(this, ...args)
    return createElement(this.node, false, invoke)
  }

  mountComponent = () => {
    const { node } = this
    const { children } = node
    const element = this._mountComponentIntoDOM()
    if (children && children.length) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.innerHTML += child
        } else {
          element.appendChild(child.mountComponent())
        }
      })
    }
    return element
  }
}
