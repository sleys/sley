/**
 * Created by kee on 15/10/30.
 */
import React, { Component, PropTypes as Types } from 'react'
import { Howl } from 'howler'
import { RotateLoader } from 'halogen'
import { VelocityComponent } from 'velocity-react'
import Defaults from '../base'
import Markdown from '../../markdownView'
import styles from './styles/index.styl'

function timeUnitFormat (time) {
  if (time < 1) {
    return '00'
  } else if (time < 10) {
    return '0' + time
  }
  return time
}

function secondsToTime (secs) {
  const _secs = Math.round(secs)
  const hours = Math.floor(_secs / (60 * 60))
  const divisorForMinutes = _secs % (60 * 60)
  const minutes = Math.floor(divisorForMinutes / 60)
  const divisorForSeconds = divisorForMinutes % 60
  const seconds = Math.ceil(divisorForSeconds)
  let time = ''
  if (hours > 0) {
    time += hours + ':'
  }

  time += timeUnitFormat(minutes) + ':'
  time += timeUnitFormat(seconds)
  return time
}

class Audio extends Component {
  state = {
    play: false,
    pause: false,
    loading: false,
    seek: 0,
    duration: 0,
    percent: 0
  };
  componentWillUnmount () {
    if (this.howler) {
      this._pause()
      this.clearsound()
    }
  }
  initHowler () {
    this.setState({
      loading: true
    })
    this.clearsound()
    this.howler = new Howl({
      src: [this.props.src],
      volume: this.props.volume,
      onload: this.soundLoadDone.bind(this),
      onend: this.playEnd.bind(this)
    })
  }
  soundLoadDone () {
    this.setState({
      duration: this.howler.duration(),
      loading: false
    })
    this.play()
  }
  playEnd () {
    this.setState({
      loading: false,
      play: false,
      pause: false
    })
  }
  play () {
    this.howler.play()
    this.interval = setInterval(() => {
      this.setState({
        seek: this.howler.seek()
      })
      if (this.state.seek && this.state.duration) {
        const percent = (this.state.seek / this.state.duration) * 100
        this.setState({
          percent: percent
        })
      }
    }, 1000)
  }
  _play () {
    this.setState({
      play: true,
      pause: false
    })
    if (!this.howler) {
      this.initHowler()
    } else {
      this.play()
    }
  }
  _pause () {
    this.setState({
      play: false,
      pause: true
    })
    this.howler.pause()
    clearInterval(this.interval)
  }
  clearsound () {
    if (this.howler) {
      this.howler.stop()
      this.howler = null
    }
  }
  renderButton () {
    let text = ''
    if (this.state.loading) {
      text = <RotateLoader color='rgb(71, 153, 219)' size='10px'/>
    } else {
      text = this.state.play ? '暂停' : '播放'
    }
    const percent = this.state.percent + '%'
    const seek = secondsToTime(this.state.seek)
    const duration = secondsToTime(this.state.duration)
    const arrowAnimation = {
      width: percent
    }
    return (
      <div className={styles.progress}>
        <VelocityComponent animation={arrowAnimation}>
          <div className={styles.progressBar} ></div>
        </VelocityComponent>
        <div className={styles.button}>
          <button className={styles.play} onClick={ this.state.play ? this._pause.bind(this) : this._play.bind(this) }>
            {text}
          </button>
          <div className={styles.text}>
            {this.props.author} - {this.props.title}
            <span className={styles.time}>{seek + ' / ' + duration}</span>
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <div>
        {this.renderButton()}
      </div>
    )
  }
}

Audio.propTypes = {
  src: Types.string.isRequired,
  volume: Types.number.isRequired,
  author: Types.string.isRequired,
  title: Types.string.isRequired
}
Audio.defaultProps = {
  src: '',
  volume: 0.5
}

class Music extends Component {
  render () {
    const { content, music } = this.props.post
    return (
      <Defaults post={this.props.post} header={false}>
        <div>
          <Audio name='audio' src={music.src} author={music.author} title={music.title} />
        </div>
        <div className={styles.music}>
          <Markdown content={content} />
        </div>
      </Defaults>
    )
  }
}
Music.propTypes = {
  post: Types.object.isRequired,
  params: Types.object
}

export default Music
