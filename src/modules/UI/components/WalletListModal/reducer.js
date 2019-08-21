// @flow

import { type Reducer, combineReducers } from 'redux'

import { type Action } from '../../../../types/reduxTypes.js'

export type WalletListModalState = {
  walletListModalVisible: boolean
}

const walletListModalVisible = (state = false, action: Action): boolean => {
  switch (action.type) {
    case 'TOGGLE_WALLET_LIST_MODAL_VISIBILITY': {
      return !state
    }

    case 'DISABLE_WALLET_LIST_MODAL_VISIBILITY': {
      return false
    }

    default:
      return state
  }
}

export const walletListModal: Reducer<WalletListModalState, Action> = combineReducers({
  walletListModalVisible
})
