/**
 * Created by kee on 15/10/30.
 */
import React from 'react'
import { Link } from 'react-router'
import Defaults from '../base'
import Markdown from '../../markdownView'
import styles from './styles/index.styl'

export default (post) => {
  const { content, cover, _id } = post
  return (
    <Defaults post={post}>
      <div className={styles.cover}>
        <Link to={`/post/${_id}`}>
          <img src={cover} />
        </Link>
        <div className={styles.img}>
          <Markdown content={content} />
        </div>
      </div>
    </Defaults>
  )
}
