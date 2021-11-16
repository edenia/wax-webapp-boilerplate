import EosApi from 'eosjs-api'

import { walletConfig } from '../config'

export const eosApi = EosApi({
  httpEndpoint: walletConfig.rpcEndpoint,
  verbose: false,
  fetchConfiguration: {}
})
