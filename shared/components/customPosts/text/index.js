/**
 * Created by kee on 15/10/30.
 */
import React from 'react'
import Defaults from '../base'
import Markdown from '../../markdownView'
import styles from './styles/index.styl'

export default (post) => {
  const { content } = post
  return (
    <Defaults post={post}>
      <div className={styles.text}>
        <Markdown content={content} />
      </div>
    </Defaults>
  )
}
