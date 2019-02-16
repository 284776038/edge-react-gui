// @flow

import { type EdgeContext, MakeEdgeContext, MakeFakeEdgeWorld } from 'edge-core-js'
import makeBitcoinIo from 'edge-currency-bitcoin/lib/react-native-io.js'
import makeMoneroIo from 'edge-currency-monero/lib/react-native-io.js'
import React, { PureComponent } from 'react'
import { View } from 'react-native'

import ENV from '../../../env.json'
import EdgeAccountCallbackManager from './EdgeAccountCallbackManager.js'
import EdgeContextCallbackManager from './EdgeContextCallbackManager.js'
import EdgeWalletsCallbackManager from './EdgeWalletsCallbackManager.js'

type Props = {
  onLoad: (context: EdgeContext) => mixed,
  onError: (error: any) => mixed
}

const contextOptions = {
  apiKey: ENV.AIRBITZ_API_KEY,
  appId: '',
  plugins: {
    // edge-currency-accountbased:
    eos: true,
    ethereum: {
      etherscanApiKey: ENV.ETHERSCAN_API_KEY,
      infuraProjectId: ENV.INFURA_PROJECT_ID
    },
    stellar: true,
    ripple: true,
    // edge-currency-bitcoin:
    bitcoin: true,
    bitcoincash: true,
    bitcoincashtestnet: false,
    bitcoingold: true,
    bitcoingoldtestnet: false,
    bitcoinsv: true,
    bitcointestnet: false,
    dash: true,
    digibyte: true,
    dogecoin: true,
    eboost: false,
    feathercoin: true,
    groestlcoin: true,
    litecoin: true,
    qtum: true,
    smartcash: true,
    ufo: true,
    vertcoin: true,
    zcoin: true,
    // edge-currency-monero:
    monero: true, // {apiKey: ??}
    // rate plugins:
    'shapeshift-rate': true,
    coinbase: true,
    coincap: true,
    currencyconverterapi: true,
    // swap plugins:
    changelly: ENV.CHANGELLY_INIT,
    changenow: { apiKey: ENV.CHANGE_NOW_API_KEY },
    faast: true,
    shapeshift: { apiKey: ENV.SHAPESHIFT_API_KEY }
  }
}

const nativeIo = {
  'edge-currency-bitcoin': makeBitcoinIo(),
  'edge-currency-monero': makeMoneroIo()
}

export class EdgeCoreManager extends PureComponent<Props> {
  render () {
    return (
      <View>
        {ENV.USE_FAKE_CORE ? (
          <MakeFakeEdgeWorld
            debug
            users={[]}
            onLoad={world => world.makeEdgeContext(contextOptions).then(this.props.onLoad)}
            onError={this.props.onError}
            nativeIo={nativeIo}
          />
        ) : (
          <MakeEdgeContext debug options={contextOptions} onLoad={this.props.onLoad} onError={this.props.onError} nativeIo={nativeIo} />
        )}
        <EdgeContextCallbackManager />
        <EdgeAccountCallbackManager />
        <EdgeWalletsCallbackManager />
      </View>
    )
  }
}
