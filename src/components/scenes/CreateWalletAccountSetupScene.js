// @flow

import React, { Component } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Text from '../../modules/UI/components/FormattedText'
import { Actions } from 'react-native-router-flux'
import { sprintf } from 'sprintf-js'
import { scale } from '../../lib/scaling.js'
import * as Constants from '../../constants/indexConstants'
import s from '../../locales/strings.js'
import { PrimaryButton } from '../../modules/UI/components/Buttons/index'
import Gradient from '../../modules/UI/components/Gradient/Gradient.ui'
import SafeAreaView from '../../modules/UI/components/SafeAreaView/index'
import { MaterialInputOnWhite } from '../../styles/components/FormFieldStyles.js'
import styles from '../../styles/scenes/CreateWalletStyle.js'
import type { GuiFiatType, GuiWalletType } from '../../types.js'
import { FormField } from '../common/FormField.js'
import eosLogo from '../../assets/images/currencies/fa_logo_eos.png'
import steemLogo from '../../assets/images/currencies/fa_logo_steem.png'
import invalidIcon from '../../assets/images/createWallet/invalid_icon.png'
import validIcon from '../../assets/images/createWallet/valid_icon.png'
import { PLATFORM } from '../../theme/variables/platform.js'

const deviceWidth = PLATFORM.deviceWidth

const logos = {
  eos: eosLogo,
  steem: steemLogo
}

export type CreateWalletAccountSetupOwnProps = {
  selectedFiat: GuiFiatType,
  selectedWalletType: GuiWalletType
}
type Props = CreateWalletAccountSetupOwnProps
type State = {
  accountHandle: string
}

export class CreateWalletAccountSetup extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      accountHandle: ''
    }
  }

  modifiedStyle = {
    ...MaterialInputOnWhite,
    container: {
      ...MaterialInputOnWhite.container,
      marginTop: scale(16),
      marginBottom: scale(24),
      width: deviceWidth - scale(25) - scale(40) // substract padding and validation icon
    }
  }

  onBack = () => {
    Actions.pop()
  }

  handleChangeHandle = (accountHandle: string) => {
    const { checkHandleAvailability } = this.props
    this.setState({ accountHandle })
    checkHandleAvailability(accountHandle)
  }

  onSetup = () => {
    Actions[Constants.CREATE_WALLET_ACCOUNT_SELECT]({
      ...this.props,
      accountHandle: this.state.accountHandle
    })
  }

  render () {
    const { isCheckingHandleAvailability, isHandleAvailable } = this.props
    const validityIcon = isHandleAvailable ? validIcon : invalidIcon

    return (
      <SafeAreaView>
        <View style={styles.scene}>
          <Gradient style={styles.gradient} />
          <KeyboardAwareScrollView>
            <View style={styles.view}>
              <Image source={logos['eos']} style={styles.currencyLogo} resizeMode={'cover'} />
              <View style={[styles.createWalletPromptArea, { paddingTop: 24, paddingBottom: 16 }]}>
                <Text style={styles.instructionalText}>{sprintf(s.strings.create_wallet_account_review_instructions, 'EOS')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FormField
                  style={this.modifiedStyle}
                  autoFocus
                  clearButtonMode={'while-editing'}
                  autoCorrect={false}
                  onChangeText={this.handleChangeHandle}
                  label={s.strings.create_wallet_account_handle}
                  value={this.state.accountHandle}
                  returnKeyType={'next'}
                  onSubmitEditing={this.onNext}
                  error={''}
                />
                <View style={{width: scale(25), height: scale(25)}}>
                  {isCheckingHandleAvailability ? <ActivityIndicator style={styles.feedbackIcon} /> : <Image source={validityIcon} style={styles.feedbackIcon} />}
                </View>
              </View>
              <View style={styles.buttons}>
                <PrimaryButton style={[styles.next]} onPress={this.onSetup} disabled={isCheckingHandleAvailability || !isHandleAvailable}>
                  <PrimaryButton.Text>{s.strings.string_next_capitalized}</PrimaryButton.Text>
                </PrimaryButton>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
