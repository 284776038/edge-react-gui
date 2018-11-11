// @flow

import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import { sprintf } from 'sprintf-js'
import * as Constants from '../../constants/indexConstants'
import s from '../../locales/strings.js'
import { PrimaryButton } from '../../modules/UI/components/Buttons/index'
import Gradient from '../../modules/UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../modules/UI/components/SafeAreaView/index'
import styles from '../../styles/scenes/CreateWalletStyle.js'
import type { GuiFiatType, GuiWalletType } from '../../types.js'
import Text from '../../modules/UI/components/FormattedText'
import eosLogo from '../../assets/images/currencies/fa_logo_eos.png'
import steemLogo from '../../assets/images/currencies/fa_logo_steem.png'
import WalletListModal from '../../modules/UI/components/WalletListModal/WalletListModalConnector.js'

const logos = {
  eos: eosLogo,
  steem: steemLogo
}

export type CreateWalletAccountSelectOwnProps = {
  selectedFiat: GuiFiatType,
  selectedWalletType: GuiWalletType
}
type Props = CreateWalletAccountSelectOwnProps
type State = {
  walletName: string
}

export class CreateWalletAccountSelect extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isModalVisible: false,
      error: ''
    }
  }

  onBack = () => {
    Actions.pop()
  }

  handleChangeHandle = (accountHandle: string) => {
    this.setState({ accountHandle })
  }

  handleChangePassword = (password: string) => {
    this.setState({ password })
  }

  onPressSelect = () => {
    this.setState({
      isModalVisible: true
    })
  }

  onSelectWallet = (walletId: string, currencyCode: string) => {
    if (true) {
      this.setState({
        isModalVisible: false,
        walletId
      })
    } else {
      this.setState({
        isModalVisible: false,
        error: 'There is an error'
      })
    }
  }

  renderSelectWallet = () => {
    return (
      <View style={styles.selectPaymentLower}>
        <View style={styles.buttons}>
          <PrimaryButton style={[styles.next]} onPress={this.onPressSelect}>
            <PrimaryButton.Text>{s.strings.create_wallet_account_select_wallet}</PrimaryButton.Text>
          </PrimaryButton>
        </View>
        <View style={styles.paymentArea}>
          <Text style={styles.paymentLeft}>Amount due:</Text>
          <Text style={styles.paymentRight}>5.00 EOS</Text>
        </View>
      </View>
    )
  }

  renderPaymentReview = () => {
    const walletName = 'My Wallet'
    return (
      <View>
        <View style={styles.selectPaymentLower}>
          <View style={styles.accountReviewWalletNameArea}>
            <Text style={styles.accountReviewWalletNameText}>{walletName}</Text>
          </View>
          <View style={styles.paymentArea}>
            <Text style={styles.paymentLeft}>Amount due:</Text>
            <Text style={styles.paymentRight}>5.00 EOS</Text>
          </View>
        </View>
        <View style={styles.accountReviewInfoArea}>
          <Text style={styles.accountReviewInfoText}>{s.strings.create_wallet_account_payment_source} {walletName}</Text>
          <Text style={styles.accountReviewInfoText}>{s.strings.create_wallet_crypto_type_label} {walletName}</Text>
          <Text style={styles.accountReviewInfoText}>{s.strings.create_wallet_fiat_type_label} {walletName}</Text>
          <Text style={styles.accountReviewInfoText}>{s.strings.create_wallet_name_label} {walletName}</Text>
        </View>
        <View style={styles.accountReviewConfirmArea}>
          <Text style={styles.accountReviewConfirmText}>{s.strings.create_wallet_account_confirm}</Text>
        </View>
        <View style={styles.confirmButtonArea}>
          <PrimaryButton style={[styles.confirmButton]} onPress={this.onPressSelect}>
            <PrimaryButton.Text>{s.strings.submit}</PrimaryButton.Text>
          </PrimaryButton>
        </View>
      </View>
    )
  }

  render () {
    const amountString = '20 EOS'
    const instructionSyntax = sprintf(s.strings.create_wallet_account_select_instructions, amountString)
    const confirmMessageSyntax = sprintf(s.strings.create_wallet_account_make_payment, 'EOS')
    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <KeyboardAwareScrollView>
            <View style={styles.view}>
              <Image source={logos['eos']} style={styles.currencyLogo} resizeMode={'cover'} />
              <View style={styles.createWalletPromptArea}>
                <Text style={styles.instructionalText}>{this.state.walletId ? confirmMessageSyntax : instructionSyntax}</Text>
              </View>
            </View>
            {this.state.walletId ? this.renderSelectWallet() : this.renderPaymentReview()}
          </KeyboardAwareScrollView>
          {this.state.isModalVisible && (
            <WalletListModal
              topDisplacement={Constants.TRANSACTIONLIST_WALLET_DIALOG_TOP}
              type={Constants.FROM}
              onSelectWallet={this.onSelectWallet}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }
}
