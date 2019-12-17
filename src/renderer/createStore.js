// @flow

import { createStore, applyMiddleware, compose } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import type { HashHistory } from 'history'
import logger from './middlewares/logger'
import reducers from './reducers'

type Props = {
  history: HashHistory,
  state?: Object,
  history?: any,
  dbMiddleware?: Function,
}

export default ({ state, history, dbMiddleware }: Props) => {
  if (!history) {
    history = createHashHistory()
  }
  // const middlewares = [routerMiddleware(history), thunk, logger]
  const middlewares = [thunk, logger]

  // middlewares.push(require('./../middlewares/sentry').default)
  // middlewares.push(require('./../middlewares/analytics').default)

  if (dbMiddleware) {
    middlewares.push(dbMiddleware)
  }
  const enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f, // eslint-disable-line
  )
  // $FlowFixMe
  return createStore(reducers, state, enhancers)
}