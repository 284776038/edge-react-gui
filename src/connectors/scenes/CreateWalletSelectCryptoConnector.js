// @flow

import { connect } from 'react-redux'

import { CreateWalletSelectCrypto as CreateWalletSelectCryptoComponent } from '../../components/scenes/CreateWalletSelectCryptoScene.js'
import type { CreateWalletSelectCryptoStateProps } from '../../components/scenes/CreateWalletSelectCryptoScene.js'
import * as SETTINGS_SELECTORS from '../../modules/Settings/selectors.js'
import { displayErrorAlert } from '../../modules/UI/components/ErrorAlert/actions'
import type { State } from '../../types/reduxTypes.js'

const mapStateToProps = (state: State): CreateWalletSelectCryptoStateProps => {
  const supportedWalletTypes = SETTINGS_SELECTORS.getSupportedWalletTypes(state)

  // Ripple hack
  for (const type of supportedWalletTypes) {
    if (type.currencyCode.toLowerCase() === 'xrp') {
      type.label = 'Ripple'
    }
  }

  return {
    supportedWalletTypes
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    displayErrorAlert: error => dispatch(displayErrorAlert(error))
  }
}
export const CreateWalletSelectCrypto = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWalletSelectCryptoComponent)
