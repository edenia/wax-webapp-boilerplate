import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { wax } from '../utils'

const SharedStateContext = React.createContext()
const initialValue = {
  useDarkMode: false,
  user: null
}

const sharedStateReducer = (state, action) => {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        ...action.payload
      }
    }

    case 'showMessage':
      return {
        ...state,
        message: action.payload
      }

    case 'hideMessage':
      return {
        ...state,
        message: null
      }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const SharedStateProvider = ({ children, ...props }) => {
  const [state, dispatch] = React.useReducer(sharedStateReducer, {
    ...initialValue
  })
  const value = React.useMemo(() => [state, dispatch], [state])

  useEffect(() => {
    const load = async () => {
      await wax.isAutoLoginAvailable()

      if (!wax.userAccount) {
        return
      }

      dispatch({
        type: 'set',
        payload: { user: { accountName: wax.userAccount } }
      })
    }

    load()
  }, [])

  return (
    <SharedStateContext.Provider value={value} {...props}>
      {children}
    </SharedStateContext.Provider>
  )
}

SharedStateProvider.propTypes = {
  children: PropTypes.node
}

export const useSharedState = () => {
  const context = React.useContext(SharedStateContext)

  if (!context) {
    throw new Error(`useSharedState must be used within a SharedStateContext`)
  }

  const [state, dispatch] = context
  const setState = payload => dispatch({ type: 'set', payload })
  const showMessage = payload => dispatch({ type: 'showMessage', payload })
  const hideMessage = () => dispatch({ type: 'hideMessage' })
  const login = async () => {
    const accountName = await wax.login()
    dispatch({ type: 'set', payload: { user: { accountName } } })
  }
  const logout = () => {
    dispatch({ type: 'set', payload: { user: null } })
    delete wax.userAccount
  }

  return [state, { setState, showMessage, hideMessage, login, logout }]
}
