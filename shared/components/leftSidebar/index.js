import React, { Component, PropTypes as Types } from 'react'
import { Link } from 'react-router'
import Icon from 'react-fa'
import styles from './index.scss'

class LeftSideBar extends Component {
  render () {
    return (
      <div className='two columns'>
        <ul className={styles.listNav}>
          <li>
            <Link to='/' onlyActiveOnIndex activeClassName={styles.navActive}>
              <Icon name='feed' /> My Feed
            </Link>
          </li>
          <li>
            <Link to='/nodes' activeClassName={styles.navActive}>
              <Icon name='globe' /> Nodes
            </Link>
          </li>
          <li>
            <Link to='/explore' activeClassName={styles.navActive}>
              <Icon name='globe' /> Explore
            </Link>
          </li>
          <li>
            <Link to='/tags' activeClassName={styles.navActive}>
              <Icon name='tags' /> Tags
            </Link>
          </li>
          <li>
            <Link to='/collections' activeClassName={styles.navActive}>
              <Icon name='circle-o' /> Collections
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default LeftSideBar
