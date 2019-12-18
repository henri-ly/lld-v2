// @flow
import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import './global.css'

import libcoreGetVersion from '../commands/libcoreGetVersion'

import App from './App'

type State = {
  error: ?Error,
}

type Props = {}

class ReactRoot extends Component<Props, State> {
  state = {
    error: null,
  }

  componentDidMount() {
    ipcRenderer.send('ready-to-show', {})
    libcoreGetVersion
      .send()
      .toPromise()
      .then(
        version => {
          console.log('libcoreGetVersion', version)
        },
        e => {
          console.error('libcoreGetVersion', e)
        },
      )
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return this.state.error.toString()
    }

    return <App />
  }
}

export default ReactRoot