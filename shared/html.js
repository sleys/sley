import React, { Component, PropTypes as Types } from 'react'

import Helmet from 'react-helmet'

const Html = (props) => {
  const {assets, component, store} = props
  const head = Helmet.rewind()
  return (
    <html>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {!__DEVELOPMENT__ ? (
          <link rel='stylesheet' href={assets.app.css}/>
        ) : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{__html: content}} className='animated fadeIn'/>
        <script dangerouslySetInnerHTML={{__html: `window.__INIT__STATE__=${JSON.stringify(store.getState().toJS())}`}}/>
        {__DEVELOPMENT__ ? (
          <script src='http://localhost:4001/dist/js/bundle.js' />
        ) : (
          <script src={assets.app.js} />
        )}
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: Types.object,
  component: Types.element.isRequired,
  store: Types.object.isRequired
}

export default Html
