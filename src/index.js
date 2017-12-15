import dva from 'dva'
import { createHashHistory } from 'history'
import createLoading from 'dva-loading'
import { message } from 'antd'
import 'babel-polyfill'

import './index.less'

const ERROR_MSG_DURATION = 3 // 3 秒

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHashHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION)
    // log error to server
  },
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/global'))
// Moved to router.js

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
