import React, { Component, PropTypes as Types } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LifeSidebar from 'components/leftSidebar'
import { provideHooks } from 'redial'
import Icon from 'react-fa'
import {
  loadNodes
} from 'redux/actions/nodes'
import styles from './index.scss'

const Node = props => {
  return (
    <Link to={`/nodes/${props.data._id}`} className={styles.singleCard}>
      <div className={styles.nodeImg}>
        <img src='/img/node_default.png' alt=''/>
      </div>
      <div className={styles.nodeInfo}>
        <p className={styles.infoName}>{props.data.name}</p>
        <p className={styles.infoText}><Icon name='file-text-o' /> 12 文章</p>
        <p className={styles.infoText}><Icon name='users' /> 3 关注</p>
      </div>
    </Link>
  )
}
Node.propTypes = {
  data: Types.object.isRequired
}

@provideHooks({
  fetch: ({ dispatch, getState }) => {
    if (!getState().getIn(['NodesStore', 'loaded'])) {
      const { page } = getState().get('routing').locationBeforeTransitions.query
      return dispatch(loadNodes(page))
    }
  }
})
class NodesContainer extends Component {
  render () {
    return (
      <div>
        <Helmet title='Nodes'/>
        <div className='content row'>
          <LifeSidebar />
          <div className='ten columns animated fadeIn'>
            <div className={styles.nodeCard}>
              <div className={styles.header}>
                <Icon name='globe'/> Nodes
                <div className='u-pull-right'>
                  <a className={styles.create}>New Node</a>
                </div>
              </div>
              <div className={styles.content}>
                {this.props.nodes.map((k, i) => {
                  return <Node data={k} key={i}/>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NodesContainer.propTypes = {
  nodes: Types.array.isRequired
}

const select = state => {
  return {
    nodes: state.getIn(['NodesStore', 'nodes']).toJS()
  }
}
export default connect(select)(NodesContainer)
