import React from 'react'
import immutable from 'immutable'
import _ from 'lodash'

/**
 * 判断组件是否是react的Component
 * @param  {Function}  Component 自定义组件
 * @return {Boolean}
 */
function isReactComponent (component) {
  return !!component.prototype.render
}

/**
 * 获取对应type的组件
 * @param  {Array} components
 * @return {Function}
 */
export function getTypeComponent (components) {
  return (type, props) => {
    const custom = components[type]
    if (!custom) {
      return console.warn(`自定义组件${type}不存在`)
    }
    return isReactComponent(custom) ? (
      React.createElement(custom, {
        post: props
      })
    ) : custom(props)
  }
}

export function createConstantsType (baseType) {
  const REQUEST = 'REQUEST'
  const SUCCESS = 'SUCCESS'
  const FAILURE = 'FAILURE'
  const res = {}
  _.forEach([REQUEST, SUCCESS, FAILURE], (type) => {
    res[type] = `${baseType}_${type}`
  })
  return res
}

export function immutifyState (state) {
  let obj = _.assign({}, state)

  Object
    .keys(obj)
    .forEach(key => {
      obj[key] = immutable.fromJS(obj[key])
    })

  return obj
}
