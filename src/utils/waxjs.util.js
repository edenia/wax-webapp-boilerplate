import * as waxjs from '@waxio/waxjs/dist'

import { walletConfig } from '../config'

export const wax = new waxjs.WaxJS({
  rpcEndpoint: walletConfig.rpcEndpoint,
  tryAutoLogin: true
})

export default wax
