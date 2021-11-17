import React, { useState, createContext, useEffect, useContext } from 'react'
import useAuth from '../hooks/useAuth'
import { UserContext } from './UserProvider'

export const MiningContext = createContext({})

export default MiningProvider = props => {
    const { sub } = useContext(UserContext)
    const { get } = useAuth()
    const [accounts, setAccounts] = useState({})

    useEffect(() => {
        if(sub != null) {
            load()
        }
    }, [sub])

    const load = () => Promise.resolve()
        .then(() => get('miningaccounts'))
        .then(accounts => accounts.reduce((dict, account) => ({ ...dict, [account.id]: account }), {}))
        .then(accounts => setAccounts(accounts))

    const hasPoolAccount = poolId => Object.values(accounts)
        .filter(account => account.miningPool.id == poolId).length != 0

    return (
        <MiningContext.Provider value={{
            load,
            accounts,
            hasPoolAccount
        }}>
            {props.children}
        </MiningContext.Provider>
    )
}