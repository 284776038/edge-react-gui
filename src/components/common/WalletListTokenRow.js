// @flow

import type { EdgeDenomination } from 'edge-core-js'
import React, { PureComponent } from 'react'
import { TouchableHighlight, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { intl } from '../../locales/intl'
import T from '../../modules/UI/components/FormattedText/index'
import styles, { styles as styleRaw } from '../../styles/scenes/WalletListStyle'
import { type GuiWallet } from '../../types'
import * as UTILS from '../../util/utils'

type OwnProps = {
  parentId: string,
  sortHandlers: any,
  currencyCode: string,
  balance: string,
  fiatSymbol: string
}

export type StateProps = {
  displayDenomination: EdgeDenomination,
  settings: Object,
  exchangeRates: Object,
  currencyCode: string,
  wallet: GuiWallet
}

export type DispatchProps = {
  selectWallet: (id: string, currencyCode: string) => any
}

type Props = OwnProps & StateProps & DispatchProps

export class WalletListTokenRow extends PureComponent<Props> {
  selectWallet = () => {
    const { parentId: walletId, currencyCode } = this.props
    this.props.selectWallet(walletId, currencyCode)
    Actions.transactionList({ params: 'walletList' })
  }

  render () {
    const { wallet, currencyCode, settings, exchangeRates } = this.props
    const fiatBalance = UTILS.getCurrencyAccountFiatBalanceFromWalletWithoutState(wallet, currencyCode, settings, exchangeRates)
    return (
      <TouchableHighlight
        style={styles.tokenRowContainer}
        underlayColor={styleRaw.tokenRowUnderlay.color}
        delayLongPress={500}
        onPress={this.selectWallet}
        {...this.props.sortHandlers}
      >
        <View style={[styles.rowContent]}>
          <View style={styles.rowIconWrap} />
          <View style={[styles.rowNameTextWrapAndroidIos]}>
            <T style={[styles.tokenRowText]}>{this.props.currencyCode}</T>
          </View>
          <View style={[styles.rowBalanceTextWrap]}>
            <View style={styles.rowBalanceAmount}>
              <T style={[styles.rowBalanceAmountText]}>
                {intl.formatNumber(UTILS.convertNativeToDisplay(this.props.displayDenomination.multiplier)(this.props.balance) || '0')}
              </T>
              <T style={[styles.rowBalanceAmountText]}>({this.props.fiatSymbol + ' ' + fiatBalance})</T>
            </View>
          </View>
          <View style={styles.rowOptionsWrap} />
        </View>
      </TouchableHighlight>
    )
  }
}
